import { portfolioContext } from "@/lib/portfolio-context";

export const runtime = "nodejs";

const RATE_LIMIT_MAX_REQUESTS = Number(
  process.env.OPENCODE_RATE_LIMIT_MAX_REQUESTS ?? 3,
);
const RATE_LIMIT_WINDOW_MS = Number(
  process.env.OPENCODE_RATE_LIMIT_WINDOW_MS ?? 60_000,
);
const DEFAULT_PROVIDER_ID = "opencode-go";
const DEFAULT_MODEL = "opencode-go/deepseek-v4-flash";
const CHAT_COMPLETIONS_ENDPOINT = "https://opencode.ai/zen/go/v1/chat/completions";
const MESSAGES_ENDPOINT = "https://opencode.ai/zen/go/v1/messages";

type RateLimitEntry = {
  count: number;
  windowStartedAt: number;
};

type ConfiguredModel = {
  providerID: string;
  modelID: string;
  fullID: string;
};

type OpenAiCompatibleResponse = {
  choices?: Array<{
    message?: {
      content?:
        | string
        | Array<{
            type?: string;
            text?: string;
          }>;
    };
  }>;
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
};

type AnthropicCompatibleResponse = {
  content?: Array<{
    type?: string;
    text?: string;
  }>;
  error?: {
    message?: string;
    type?: string;
  };
};

type AskOpenCodeGoResult =
  | {
      answer: string;
    }
  | {
      errorResponse: Response;
    };

const rateLimitStore = globalThis as typeof globalThis & {
  portfolioAssistantRateLimit?: Map<string, RateLimitEntry>;
};

function getRateLimitMap() {
  if (!rateLimitStore.portfolioAssistantRateLimit) {
    rateLimitStore.portfolioAssistantRateLimit = new Map<string, RateLimitEntry>();
  }

  return rateLimitStore.portfolioAssistantRateLimit;
}

const instructions = `
You are the assistant for Ayan Modak's portfolio website.
Answer visitor questions using only the provided portfolio context.
Be concise, accurate, and professional.
If the portfolio context does not include the answer, say that the detail is not listed on the site.
Do not invent dates, employers, links, credentials, or project details.
When useful, mention relevant project names or skills from the context.
`.trim();

function getConfiguredApiKey() {
  return process.env.OPENCODE_API_KEY;
}

function isConfiguredApiKey(apiKey: string | undefined) {
  return Boolean(apiKey && apiKey !== "your_opencode_api_key_here");
}

function getConfiguredModel(): ConfiguredModel {
  const rawModel = process.env.OPENCODE_MODEL?.trim() || DEFAULT_MODEL;

  if (rawModel.includes("/")) {
    const [providerID, ...modelParts] = rawModel.split("/");
    const modelID = modelParts.join("/").trim();

    if (providerID && modelID) {
      return {
        providerID,
        modelID,
        fullID: `${providerID}/${modelID}`,
      };
    }
  }

  return {
    providerID: DEFAULT_PROVIDER_ID,
    modelID: rawModel,
    fullID: `${DEFAULT_PROVIDER_ID}/${rawModel}`,
  };
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function checkRateLimit(request: Request) {
  const now = Date.now();
  const clientId = getClientIdentifier(request);
  const rateLimitMap = getRateLimitMap();

  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  }

  const currentEntry = rateLimitMap.get(clientId);

  if (!currentEntry || now - currentEntry.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientId, { count: 1, windowStartedAt: now });
    return null;
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((RATE_LIMIT_WINDOW_MS - (now - currentEntry.windowStartedAt)) / 1000),
    );

    return Response.json(
      {
        error:
          "Too many assistant requests from this client. Please wait a moment before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      },
    );
  }

  currentEntry.count += 1;
  rateLimitMap.set(clientId, currentEntry);

  return null;
}

function getErrorText(error: { message?: string; type?: string; code?: string } | undefined) {
  return [error?.message, error?.type, error?.code].filter(Boolean).join(" ").toLowerCase();
}

function getOpenCodeGoEndpoint(modelID: string) {
  if (modelID.startsWith("minimax-")) {
    return MESSAGES_ENDPOINT;
  }

  return CHAT_COMPLETIONS_ENDPOINT;
}

function collectTextParts(value: unknown): string[] {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectTextParts(item));
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const preferredKeys = [
      "text",
      "value",
      "content",
      "message",
      "output_text",
      "output",
      "response",
    ];

    for (const key of preferredKeys) {
      if (key in record) {
        const parts = collectTextParts(record[key]);

        if (parts.length > 0) {
          return parts;
        }
      }
    }
  }

  return [];
}

function extractOpenAiCompatibleAnswer(data: OpenAiCompatibleResponse & Record<string, unknown>) {
  const content = data.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .filter((part) => part.type === "text" && typeof part.text === "string")
      .map((part) => part.text!.trim())
      .filter(Boolean)
      .join("\n\n")
      .trim();
  }

  const fallbackParts = collectTextParts(
    data.choices?.[0] ?? data.output_text ?? data.output ?? data.response ?? data,
  );

  if (fallbackParts.length > 0) {
    return fallbackParts.join("\n\n").trim();
  }

  return "";
}

function extractAnthropicCompatibleAnswer(data: AnthropicCompatibleResponse & Record<string, unknown>) {
  const answer =
    data.content
      ?.filter((part) => part.type === "text" && typeof part.text === "string")
      .map((part) => part.text!.trim())
      .filter(Boolean)
      .join("\n\n")
      .trim() ?? "";

  if (answer) {
    return answer;
  }

  const fallbackParts = collectTextParts(data.content ?? data.message ?? data.response ?? data);

  return fallbackParts.join("\n\n").trim();
}

function getProviderErrorResponse(status: number, errorText: string) {
  if (
    errorText.includes("invalid_api_key") ||
    errorText.includes("api key was rejected") ||
    errorText.includes("incorrect api key") ||
    errorText.includes("invalid api key")
  ) {
    return Response.json(
      {
        error:
          "The portfolio assistant is unavailable because the configured OpenCode Go API key was rejected.",
      },
      { status: 503 },
    );
  }

  if (errorText.includes("insufficient_quota") || errorText.includes("quota")) {
    return Response.json(
      {
        error:
          "The portfolio assistant is unavailable because the configured provider has no remaining quota.",
      },
      { status: 503 },
    );
  }

  if (
    errorText.includes("model_not_found") ||
    errorText.includes("model not found") ||
    errorText.includes("unknown model")
  ) {
    return Response.json(
      {
        error:
          "The configured model is unavailable. Update OPENCODE_MODEL to a supported OpenCode Go model id.",
      },
      { status: 503 },
    );
  }

  if (status === 429) {
    return Response.json(
      {
        error:
          "The portfolio assistant is temporarily rate-limited. Please try again in a moment.",
      },
      { status: 429 },
    );
  }

  return Response.json(
    { error: "The portfolio assistant is unavailable right now." },
    { status: 500 },
  );
}

async function requestOpenCodeGo(
  apiKey: string,
  model: ConfiguredModel,
  question: string,
  endpoint: string,
) {
  const isMessagesEndpoint = endpoint === MESSAGES_ENDPOINT;
  const payload = isMessagesEndpoint
    ? {
        model: model.modelID,
        system: instructions,
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: `Portfolio context:\n${portfolioContext}\n\nVisitor question:\n${question}`,
          },
        ],
      }
    : {
        model: model.modelID,
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content: instructions,
          },
          {
            role: "user",
            content: `Portfolio context:\n${portfolioContext}\n\nVisitor question:\n${question}`,
          },
        ],
      };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as
    | OpenAiCompatibleResponse
    | AnthropicCompatibleResponse
    | null;

  if (!response.ok) {
    const errorText =
      data && "error" in data
        ? getErrorText(data.error)
        : `http ${response.status}`.toLowerCase();

    return {
      errorResponse: getProviderErrorResponse(response.status, errorText),
    };
  }

  const answer = isMessagesEndpoint
    ? extractAnthropicCompatibleAnswer(data as AnthropicCompatibleResponse & Record<string, unknown>)
    : extractOpenAiCompatibleAnswer(data as OpenAiCompatibleResponse & Record<string, unknown>);

  return {
    answer,
  };
}

async function askOpenCodeGo(
  apiKey: string,
  model: ConfiguredModel,
  question: string,
): Promise<AskOpenCodeGoResult> {
  const primaryEndpoint = getOpenCodeGoEndpoint(model.modelID);
  const primaryResult = await requestOpenCodeGo(apiKey, model, question, primaryEndpoint);

  if ("errorResponse" in primaryResult || primaryResult.answer) {
    return primaryResult;
  }

  console.warn("OpenCode Go returned an empty answer on the configured endpoint.", {
    model: model.modelID,
    primaryEndpoint,
  });

  return {
    answer: "",
  };
}

export async function POST(request: Request) {
  const apiKey = getConfiguredApiKey();

  if (!isConfiguredApiKey(apiKey)) {
    return Response.json(
      {
        error:
          "OpenCode is not configured yet. Add your OpenCode Go API key to OPENCODE_API_KEY to enable portfolio answers.",
      },
      { status: 503 },
    );
  }

  const configuredApiKey = apiKey as string;

  const rateLimitResponse = checkRateLimit(request);

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const question =
    typeof payload === "object" &&
    payload !== null &&
    "question" in payload &&
    typeof payload.question === "string"
      ? payload.question.trim()
      : "";

  if (!question) {
    return Response.json({ error: "Please enter a question." }, { status: 400 });
  }

  if (question.length > 800) {
    return Response.json(
      { error: "Please keep your question under 800 characters." },
      { status: 400 },
    );
  }

  const configuredModel = getConfiguredModel();

  if (configuredModel.providerID !== DEFAULT_PROVIDER_ID) {
    return Response.json(
      {
        error:
          "This deployment only supports OpenCode Go models. Set OPENCODE_MODEL to an opencode-go/* model id.",
      },
      { status: 503 },
    );
  }

  try {
    const result = await askOpenCodeGo(configuredApiKey, configuredModel, question);

    if ("errorResponse" in result) {
      return result.errorResponse;
    }

    return Response.json({
      answer:
        result.answer || "I could not generate an answer from the portfolio context.",
    });
  } catch (error) {
    console.error("OpenCode Go portfolio assistant error:", error);

    return Response.json(
      { error: "The portfolio assistant is unavailable right now." },
      { status: 500 },
    );
  }
}
