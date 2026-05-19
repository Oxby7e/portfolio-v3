import OpenAI, { APIError } from "openai";
import { portfolioContext } from "@/lib/portfolio-context";

export const runtime = "nodejs";

const RATE_LIMIT_MAX_REQUESTS = Number(process.env.OPENAI_RATE_LIMIT_MAX_REQUESTS ?? 5);
const RATE_LIMIT_WINDOW_MS = Number(process.env.OPENAI_RATE_LIMIT_WINDOW_MS ?? 60_000);

type RateLimitEntry = {
  count: number;
  windowStartedAt: number;
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

function isConfiguredApiKey(apiKey: string | undefined) {
  return Boolean(apiKey && apiKey !== "your_openai_api_key_here");
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

function getOpenAIErrorResponse(error: APIError) {
  if (error.code === "insufficient_quota") {
    return Response.json(
      {
        error:
          "The portfolio assistant is unavailable because the configured OpenAI project has no remaining quota. Add billing or use an API key from a funded project.",
      },
      { status: 503 },
    );
  }

  if (error.status === 401 || error.code === "invalid_api_key") {
    return Response.json(
      {
        error:
          "The portfolio assistant is not configured with a valid OpenAI API key.",
      },
      { status: 503 },
    );
  }

  if (error.code === "model_not_found") {
    return Response.json(
      {
        error:
          "The configured OpenAI model is unavailable. Update OPENAI_MODEL to a model your project can access.",
      },
      { status: 503 },
    );
  }

  if (error.status === 429) {
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

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!isConfiguredApiKey(apiKey)) {
    return Response.json(
      {
        error:
          "OpenAI is not configured yet. Add OPENAI_API_KEY to your environment to enable portfolio answers.",
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

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-5.2",
      instructions,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Portfolio context:\n${portfolioContext}\n\nVisitor question:\n${question}`,
            },
          ],
        },
      ],
      max_output_tokens: 350,
    });

    return Response.json({
      answer:
        response.output_text?.trim() ||
        "I could not generate an answer from the portfolio context.",
    });
  } catch (error) {
    console.error("OpenAI portfolio assistant error:", error);

    if (error instanceof APIError) {
      return getOpenAIErrorResponse(error);
    }

    return Response.json(
      { error: "The portfolio assistant is unavailable right now." },
      { status: 500 },
    );
  }
}
