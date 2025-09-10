## Roamly – AI Travel Itinerary Planner

Roamly helps you generate, refine, and save travel itineraries using AI. It includes authentication, persistence, streaming responses, and a clean, mobile‑friendly UI.

### Features

- **AI itinerary generation**: Streaming output with markdown rendering and images
- **Auth**: Email/password + OAuth (Better Auth), email verification, profile page
- **Itineraries**: Save, view detail, rename, delete (with confirm dialog)
- **Reader**: Table of contents + collapsible sections for easy scanning
- **Safety**: Rate limiting and max token cap for generation

### Tech Stack

- **Web**: Next.js 15 (App Router), React 19, TypeScript, Tailwind (shadcn/ui)
- **AI**: Vercel AI SDK with OpenAI‑compatible Perplexity (model: `sonar`)
- **Auth**: Better Auth (server + client)
- **DB**: Prisma + PostgreSQL
- **Email**: Resend
