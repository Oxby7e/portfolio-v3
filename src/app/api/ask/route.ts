import {
  createOpencode,
  type ApiError as OpencodeApiError,
  type AssistantMessage,
  type Part,
  type ProviderAuthError,
} from "@opencode-ai/sdk";
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

type RateLimitEntry = {
  count: number;
  windowStartedAt: number;
};

type ConfiguredModel = {
  providerID: string;
  modelID: string;
  fullID: string;
};

type AssistantError = AssistantMessage["error"];
type RuntimeError = NodeJS.ErrnoException & { path?: string };

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

function isProviderAuthError(error: AssistantError): error is ProviderAuthError {
  return error?.name === "ProviderAuthError";
}

function isApiError(error: AssistantError): error is OpencodeApiError {
  return error?.name === "APIError";
}

function getErrorText(error: OpencodeApiError) {
  return [error.data.message, error.data.responseBody].filter(Boolean).join(" ").toLowerCase();
}

function getOpencodeErrorResponse(error: AssistantError) {
  if (isProviderAuthError(error)) {
    return Response.json(
      {
        error:
          "The portfolio assistant is unavailable because the configured provider has no remaining quota.",
      },
      { status: 503 },
    );
  }

  if (isApiError(error)) {
    const errorText = getErrorText(error);

    if (
      error.data.statusCode === 401 ||
      errorText.includes("invalid_api_key") ||
      errorText.includes("incorrect api key")
    ) {
      return Response.json(
        {
          error:
            "The portfolio assistant is unavailable because the configured provider has no remaining quota.",
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

    if (error.data.statusCode === 429) {
      return Response.json(
        {
          error:
            "The portfolio assistant is temporarily rate-limited. Please try again in a moment.",
        },
        { status: 429 },
      );
    }
  }

  return Response.json(
    { error: "The portfolio assistant is unavailable right now." },
    { status: 500 },
  );
}

function isRuntimeError(error: unknown): error is RuntimeError {
  return error instanceof Error;
}

function isMissingOpencodeBinaryError(error: unknown) {
  return (
    isRuntimeError(error) &&
    error.code === "ENOENT" &&
    typeof error.path === "string" &&
    error.path.includes("opencode")
  );
}

function getUnexpectedRuntimeErrorResponse(error: unknown) {
  if (isMissingOpencodeBinaryError(error)) {
    return Response.json(
      {
        error:
          "The portfolio assistant is not available in this deployment because the OpenCode CLI binary is missing on the server.",
      },
      { status: 503 },
    );
  }

  return Response.json(
    { error: "The portfolio assistant is unavailable right now." },
    { status: 500 },
  );
}

function extractAnswer(parts: Part[]) {
  return parts
    .filter(
      (part): part is Extract<Part, { type: "text" }> => part.type === "text" && !part.ignored,
    )
    .map((part) => part.text.trim())
    .filter(Boolean)
    .join("\n\n")
    .trim();
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
  let opencode: Awaited<ReturnType<typeof createOpencode>> | null = null;
  try {
    opencode = await createOpencode({
      config: {
        model: configuredModel.fullID,
        provider: {
          [configuredModel.providerID]: {
            options: {
              apiKey,
            },
          },
        },
      },
    });

    const sessionResult = await opencode.client.session.create({
      body: {
        title: "Portfolio assistant",
      },
    });
    const session = sessionResult.data;

    if (sessionResult.error || !session) {
      throw new Error("Failed to create a temporary OpenCode session.");
    }

    try {
      const promptResult = await opencode.client.session.prompt({
        path: { id: session.id },
        body: {
          system: instructions,
          model: {
            providerID: configuredModel.providerID,
            modelID: configuredModel.modelID,
          },
          parts: [
            {
              type: "text",
              text: `Portfolio context:\n${portfolioContext}\n\nVisitor question:\n${question}`,
            },
          ],
        },
      });
      const response = promptResult.data;

      if (promptResult.error || !response) {
        throw new Error("Failed to generate a portfolio assistant response.");
      }

      if (response.info.error) {
        console.error("OpenCode portfolio assistant error:", response.info.error);
        return getOpencodeErrorResponse(response.info.error);
      }

      return Response.json({
        answer:
          extractAnswer(response.parts) ||
          "I could not generate an answer from the portfolio context.",
      });
    } finally {
      const deleteResult = await opencode.client.session.delete({ path: { id: session.id } });

      if (deleteResult.error) {
        console.warn("Failed to delete temporary OpenCode session for portfolio assistant.");
      }
    }
  } catch (error) {
    console.error("OpenCode portfolio assistant error:", error);
    return getUnexpectedRuntimeErrorResponse(error);
  } finally {
    opencode?.server.close();
  }
}
