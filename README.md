# Akansha Lakhina — Portfolio

An interactive, 3D portfolio for an AI & full-stack engineer.

**Stack:** Next.js 14 (App Router) · TypeScript · React Three Fiber with custom GLSL shaders · Framer Motion · Lenis smooth scroll · Tailwind CSS

## What's inside

| Section | Highlight |
| --- | --- |
| Hero | A WebGL "neural core" of 6,500 shader-driven particles, ringed by 18 orbiting agent nodes (one per agent in Alpha Titans). Reacts to the cursor and disperses on scroll. |
| About | Scroll-lit statement and count-up impact numbers. |
| Selected work | Three case studies with sticky, live visuals: an animated LangGraph replay (Alpha Titans), a guardrail chat replay that blocks a prompt injection (WhizUnik AI Layer), and a 3D screenshot stack (Adventra). |
| Experience | Timeline that draws itself as you scroll. |
| Side projects | 3D tilt cards with real screenshots. |
| Toolkit | Draggable 3D skill sphere. |
| Recognition | "1 of 40,000+" dot field for the Amazon Future Engineer scholarship. |
| Contact | Form via Web3Forms, copy-email, links. |
| Extras | `⌘K` / `Ctrl+K` command menu, "Ask my AI twin" chat, custom cursor, boot sequence, OG image, DevTools easter egg, `prefers-reduced-motion` support. |

## Edit the content

Everything you see comes from **`data/portfolio.ts`**: profile, case studies, experience, projects, skills, honors. Images live in `public/work` (company projects) and `public/projects` (side projects).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Needed for |
| --- | --- |
| `WEB3FORMS_ACCESS_KEY` | Contact form delivery |
| `GEMINI_API_KEY` | Optional. Lets the AI twin answer with Gemini. Without it, the twin answers from a built-in knowledge base. |
| `GEMINI_MODEL` | Optional. Defaults to `gemini-2.5-flash`. |
| `NEXT_PUBLIC_SITE_URL` | Optional. Your deployed URL, used for social-share previews. |

## Deploy

Push to GitHub and import the repo in Vercel. Add the environment variables above in the Vercel dashboard.
