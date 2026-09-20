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

Public website: `/`

Citizen portal: `/citizen`

Officer portal: `/officer`

Demo citizen: `9876543210` / `Citizen@123`

Demo officer: `officer@gujarat.gov.in` / `Officer@123`

The demo uses localStorage for users, families, applications, documents, sessions, and verification status. A citizen can apply for an eligible scheme, then an officer can review and approve it from the separate officer portal.
