## Repository guidance for AI coding agents

This file gives concise, actionable pointers for an AI assistant to be immediately productive in this codebase.

- Project type: Next.js (App Router) + TypeScript. Root app code lives under `src/app/`.
- Data backend: Supabase (Postgres). Supabase client wrappers are in `src/lib/supabase.ts` and a mock fallback in `src/lib/supabase-mock.ts`.
- API endpoints: Next.js route handlers under `src/app/api/*` (e.g. `src/app/api/products/route.ts`). They use `supabase` and return `NextResponse.json(...)`.

Key actionable facts and patterns
- App router usage: pages and nested routes live in `src/app/`. Layouts are per-directory (`src/app/layout.tsx`, `src/app/admin/layout.tsx`). Keep route-level logic in those files.
- Client vs Server components: files that need browser APIs or hooks declare `'use client'` at the top (see `src/app/admin/layout.tsx` and `src/hooks/useFavorites.ts`). Follow this convention.
- Supabase fallback: When `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not set (or set to placeholders), the app automatically uses `src/lib/supabase-mock.ts`. To use the real DB, set these env vars and provide `SUPABASE_SERVICE_ROLE_KEY` for admin server operations.
  - Example env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- Authentication: The admin area enforces auth in `src/app/admin/layout.tsx`. Demo credentials are referenced in `README.md` (email: `admin@example.com`, password: `admin123`) and the mock auth in `supabase-mock.ts` simulates that.
- Favorites: Client-side wishlist is stored in localStorage using key `ceramic-catalog-favorites`. Hook: `src/hooks/useFavorites.ts`.
- Images: `next.config.ts` contains `images.remotePatterns` that allow external hosts (Unsplash and Supabase storage). Respect these patterns when adding remote image URLs.

Developer workflows & common commands
- Install & dev: `npm install` then `npm run dev` (runs `next dev`).
- Build & prod start: `npm run build` then `npm start` (`next build` / `next start`).
- Lint: `npm run lint`.

Files to inspect when making changes
- Data / DB behavior: `src/lib/supabase.ts`, `src/lib/supabase-mock.ts`, `supabase/schema.sql` (DB schema).
- API behavior & filters: `src/app/api/products/route.ts` (example query building and filters). Follow its pattern for selecting, filtering and returning `filters` metadata.
- Admin flow and auth: `src/app/admin/layout.tsx` (getSession, onAuthStateChange, redirect to `/admin/login`).
- UI primitives & composition: `src/components/*` — `ProductGrid.tsx`, `ProductDetailClient.tsx`, `ProductForm.tsx` are representative component patterns.

Conventions to follow (concrete)
- Use the App Router (files under `src/app/`). Add nested `layout.tsx` where you need per-section state or guards (see `src/app/admin/layout.tsx`).
- Use `supabase`/`supabaseAdmin` exports from `src/lib/supabase.ts` for DB access. Prefer the existing query patterns (chain `.from(...).select(...).eq(...).order(...)`) to maintain consistency.
- For client-only logic use `'use client'` at top of file and avoid server-only APIs (like environment-only secrets) in client components.
- When adding or changing API routes, return well-formed JSON via `NextResponse.json(...)` and log errors to the server console as current handlers do.

Quick examples (copy-paste safe)
- Enable real Supabase locally: create a `.env.local` with:
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

- Add a new API route that mirrors existing style:
  - Place file under `src/app/api/<name>/route.ts`.
  - Use `import { supabase } from '@/lib/supabase'` and `return NextResponse.json({ ... })`.

Notes and gotchas
- Mock-first design: many features work without Supabase because of `supabase-mock.ts` — tests or local edits may not surface real DB issues.
- Admin redirects rely on `supabase.auth.getSession()` and `onAuthStateChange` — be careful when modifying auth listeners to avoid redirect loops.

If anything in this file is unclear or you'd like a different focus (tests, CI, more examples), tell me which areas to expand. I will iterate.
