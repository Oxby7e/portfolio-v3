This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Portfolio Assistant

The hero section can answer visitor questions using an OpenCode SDK-backed
server-side route. It is configured for OpenCode Go models.
The production route talks directly to the OpenCode Go HTTP API, so deployment
only needs the environment variables and does not need the local OpenCode CLI.

Create a local environment file and add:

```bash
OPENCODE_API_KEY="your_opencode_go_api_key_here"
OPENCODE_MODEL="opencode-go/deepseek-v4-flash"
OPENCODE_RATE_LIMIT_MAX_REQUESTS="5"
OPENCODE_RATE_LIMIT_WINDOW_MS="60000"
```

`OPENCODE_MODEL` is optional. The app defaults to `opencode-go/deepseek-v4-flash`
when it is not set. Use the `provider/model` format so OpenCode can route the
request correctly. The rate-limit variables are optional. By default, the
assistant allows 5 requests per client IP per 60 seconds.

Supported OpenCode Go model ids include:

- `opencode-go/glm-5.1`
- `opencode-go/kimi-k2.6`
- `opencode-go/mimo-v2.5-pro`
- `opencode-go/qwen3.6-plus`
- `opencode-go/minimax-m2.7`
- `opencode-go/deepseek-v4-pro`
- `opencode-go/qwen3.5-plus`
- `opencode-go/deepseek-v4-flash`

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
