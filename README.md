# PRAVI — Family ID Demo

Gujarati-first Gujarat Government-style Family ID demonstration.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Framework: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.

No database or API keys are required for this demo.

## Demo

Citizen portal:
`/`

Officer portal:
`/?portal=officer`

The demo uses localStorage so the citizen application and officer approval flow can be demonstrated in one browser.
