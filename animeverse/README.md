# MODVerse

MODVerse is a Next.js website for discovering Android game releases, game details, and download information.

## Local setup

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create a local environment file from the example:

   ```bash
   cp .env.example .env.local
   ```

3. Add the public Supabase URL and anon key from the Supabase project to `.env.local`.

   `SUPPORT_EMAIL` is optional. When set, it appears as a clickable contact address on the Contact page. Do not commit `.env.local` or any secret keys.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Validate before deployment:

   ```bash
   npx tsc --noEmit
   npm run lint
   npm run build
   ```

## Scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run Biome checks
- `npm run format` — format the codebase with Biome

## Deployment checklist

- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the hosting environment.
- Set `SUPPORT_EMAIL` once the support inbox is ready.
- Verify the generated `/sitemap.xml`, `/robots.txt`, contact page, game search, and a download page after deployment.
- Keep Supabase Row Level Security enabled and restrict administrative write access to authorized users only.
