# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

Simple login authentication project with two separate packages:

**`client/`** — Vite + React 19 + TypeScript + TailwindCSS v4 (ESM)
- `src/App.tsx` — Root component, checks auth state, routes between Login and Home
- `src/Login.tsx` — Login page
- `src/Home.tsx` — Post-login landing page
- `src/api.ts` — Unified API layer (fetch wrappers)
- `src/main.tsx` — React entry point, mounts `<App />` to `#root`

**`server/`** — Express 5 + better-sqlite3 + jsonwebtoken + TypeScript (ESM, via tsx)
- `app.ts` — Server entry, starts Express on port 3000
- `auth.ts` — Login logic (JWT issuance, password verification)
- `middleware/auth.ts` — JWT verification middleware for protected routes
- `scripts/createUser.ts` — CLI script to create/manage user credentials
- `db.sqlite` — SQLite database file

## Commands

### Client
- `cd client && pnpm dev` — Start Vite dev server (default http://localhost:5173)
- `cd client && pnpm build` — Type-check with tsc, then Vite production build
- `cd client && pnpm preview` — Preview production build locally

### Server
- `cd server && pnpm start` — Start Express server via tsx (default http://localhost:3000)
- `cd server && pnpm create-user` — Run user creation script

## Key conventions

- Both packages use **ESM** (`"type": "module"`)
- Client uses `verbatimModuleSyntax` — import types with `import type` syntax
- Server uses **tsx** to run TypeScript directly (no build step)
- TailwindCSS v4 is configured via the `@tailwindcss/vite` plugin (no `tailwind.config` file)
