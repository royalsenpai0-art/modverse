# MODVerse (animeverse) — Complete Website Audit

**Date:** 2026-09-14 · **Repo:** `royalsenpai0-art/modverse` · **Site:** `https://modversepk.online`

---

## 1. Overview — What This Site Is

| Aspect | Detail |
|---|---|
| Product | MODVerse — Android MOD APK download portal + blog |
| Stack | Next.js **16.2.9** (App Router) · React 19.2.4 · Tailwind CSS v4 · Supabase (DB + Auth + Storage) · TipTap editor (blog) |
| Monetization | Monetag (popunder + in-page push + vignette) · Google Analytics 4 (`G-KNERTYSZJJ`) |
| Scale | ~9,700 lines of TS/TSX · 31 routes · 23 components |
| Data model | `games` table (title, slug, mod/original/mirror links, downloads, views, featured/trending/popular flags, SEO fields, FAQs) · `blogs` table |

**Verdict (short):** Solid SEO groundwork and a clean dark UI, but the project has **critical broken assets (empty favicon/icons), a client-side-only admin with no server protection, XSS-prone HTML rendering, race-condition-prone counters, and several functional bugs (blog renders raw HTML text, sitemap may fail, field-name mismatches)**. Details below, ordered by severity.

---

## 2. 🔴 CRITICAL Issues

### 2.1 Empty/broken files in `public/` (site is shipping broken icons)
These files are **0 bytes** in the repo:

```
public/ads.txt            ← 0 bytes (kills Monetag/ads.txt compliance)
public/favicon.ico        ← 0 bytes
public/icon-192.png       ← 0 bytes  (PWA manifest points here)
public/icon-512.png       ← 0 bytes  (PWA manifest points here)
public/apple-touch-icon.png ← 0 bytes (manifest points here)
public/banner.png         ← 0 bytes
public/hero.webp          ← 0 bytes
```

Only `logo.png` (63 KB) and `images.jpg` (74 KB) have real content.
**Impact:** broken favicon, broken PWA install, broken OG images if referenced, empty `ads.txt` = ad networks may refuse to serve/attribute. Looks like binary files got wiped during a copy/export. **Re-export these binaries from the original project.**

### 2.2 Admin panel has no server-side protection
- `/admin` is a `"use client"` component. Auth check is only a client-side `useEffect` → `supabase.auth.getSession()` → `router.replace("/login")` (`app/admin/page.tsx`).
- There is **no `middleware.ts`** and no server-side session guard.
- All admin data operations (insert/update/delete games & blogs, storage uploads) run with the **public anon Supabase key in the browser**.
- Therefore the *only* real security boundary is your **Supabase RLS policies — which are not in this repo and cannot be audited here.**

**If RLS on `games`/`blogs`/storage allows anon `INSERT/UPDATE/DELETE`, anyone can edit your entire site without logging in.** Action items:
1. Verify RLS: `SELECT` allowed for anon; write operations only for `authenticated` (ideally a dedicated admin role/email check).
2. Add a `middleware.ts` protecting `/admin` + `/login` hygiene, or move admin ops to server API routes using the **service_role key**.
3. `/admin` is only "hidden" via `robots.txt` disallow — that stops no one.

### 2.3 Stored XSS risk via un-sanitized HTML
`app/game/[slug]/page.tsx` renders admin-entered HTML directly:

```tsx
dangerouslySetInnerHTML={{ __html: game.description || "" }}
```

No sanitization (no DOMPurify / server sanitizer). If the DB is ever compromised, RLS is misconfigured, or an admin account leaks, an attacker can inject `<script>`/event handlers seen by every visitor. Sanitize on write (admin API) and/or on render.

### 2.4 Data-model / field-name mismatch (broken UI on download page)
- Admin panel writes/reads field `android` (`game.android`).
- Game page reads `game.android` ✅
- **Download page reads `game.android_version`** (`app/download/[slug]/page.tsx` lines 117, 214) — a different column name. One of the two pages is showing nothing/undefined unless both columns exist in the DB.

### 2.5 Blog pages render raw HTML as plain text (functional bug)
TipTap editor produces **HTML**, and the admin stores it in `blogs.content`. But `app/blog/[slug]/page.tsx` renders:

```tsx
<article className="prose prose-invert ... whitespace-pre-line">
  {blog.content}   {/* escapes HTML → visitors see raw tags */}
</article>
```

Visitors literally see `<p>...</p>` markup instead of formatted content. Needs `dangerouslySetInnerHTML` **with sanitization**.

### 2.6 Sitemap may be silently broken
`app/sitemap.ts` queries:

```ts
.select("slug, updated_at, image_url")
```

`image_url` doesn't appear anywhere else in the codebase (games use `icon`/`banner`). If that column doesn't exist, Supabase returns an error, `data` is `null` → **sitemap.xml becomes empty**, and Google gets zero game URLs. Verify the column or remove it.

---

## 3. 🟠 Security (other findings)

| # | Finding | Location | Fix |
|---|---|---|---|
| 1 | **No security headers** (no CSP, X-Frame-Options, Referrer-Policy, X-Content-Type-Options) | `next.config.ts` | Add `headers()` config |
| 2 | **Download/view counters are non-atomic read-modify-write** (select → +1 → update) in 4 places; concurrent hits lose counts; trivially scriptable | `ViewCounter.tsx`, `DownloadCounter.tsx`, `DownloadClient.tsx`, `api/download/route.ts` | Single SQL RPC: `UPDATE games SET downloads = downloads + 1 WHERE id = $1` |
| 3 | **No rate limiting** on `/api/download` or client counter writes | `app/api/download/route.ts` | Rate-limit + atomic increment; counts are client-inflatable anyway |
| 4 | Weak input validation: `Number(id)`; `if (!id)` treats `id: 0` as missing | `api/download/route.ts` | `Number.isInteger` check |
| 5 | Download counter "dedup" uses `localStorage` (`download-${id}`) — bypassed by clearing storage / incognito; counts are not trustworthy metrics | `DownloadClient.tsx` | Server-side dedup by IP/hash if accuracy matters |
| 6 | Dead route files still redirect to **unvalidated external URLs** (`game.mod_link`, `game.original_link`) | `download/[slug]/route-backup.ts`, `download/original/slug.ts` | Delete dead files; validate URLs (https, allowlist) |
| 7 | `images.remotePatterns: hostname "**"` + `unoptimized: true` — allows any remote host | `next.config.ts` | Restrict to your Supabase storage domain |
| 8 | Console logging of IDs in production API | `api/download/route.ts` | Remove `console.log` |
| 9 | No secrets committed (`.env*` ignored) ✅ — but anon key is in the client bundle by design; everything depends on RLS | `lib/supabase.ts` | Audit RLS in Supabase dashboard |
| 10 | `alert()` used for auth errors leaks Supabase error strings verbatim | `app/login/page.tsx`, admin (14 `alert()` calls total) | Toast UI + generic messages |
| 11 | Legal: distributing MOD APKs carries DMCA/copyright risk. DMCA + Privacy pages exist ✅, but ad-heavy MOD distribution is also high-risk for Google Search penalties | site-wide | Business/legal decision |

---

## 4. 🟡 SEO Audit

**Good ✅**
- `metadataBase`, title template, per-page `generateMetadata` with canonical URLs, OG/Twitter cards.
- JSON-LD: `WebSite` + `SearchAction`, `Organization`, per-game `SoftwareApplication` + FAQ + Breadcrumb schemas.
- `robots.ts` (blocks `/admin`, `/api`), `sitemap.ts` with 6h ISR (`revalidate = 21600`), search page set `noindex`.
- Category page uses proper `notFound()` → real 404 status.

**Problems ❌**
1. **Soft-404s:** `/game/[slug]`, `/blog/[slug]`, `/download/[slug]` render "Not Found" UI with **HTTP 200** when a slug is missing. Only `/category` calls `notFound()`. Google will treat these as soft 404s. Add `notFound()` everywhere.
2. **`app/page.tsx` uses `export const dynamic = "force-dynamic"`** — the homepage is re-fetched from Supabase on *every* request, and the header search dropdown + hero search add 2 more client queries per visit. For a content site, use ISR (`revalidate = 300–900`) to cut DB load and improve TTFB.
3. **Sitemap risk** (see 2.6) — possibly empty. Also `changeFrequency: "always"` + `priority: 0.95` on every URL is noise; Google ignores priority hints.
4. **Blog list has no pagination** (`blogs` select all, no limit) — will degrade as posts grow.
5. Homepage fires **5 sequential Supabase queries** (hero, latest, popular, trending, count) — parallelize with `Promise.all`.
6. `globals.css` references `--font-geist-sans` but **no `next/font` is set up** → font var is undefined, site falls back to Arial. Either add `next/font/geist` or remove the reference.
7. `ads.txt` is empty — required for programmatic ads verification.

---

## 5. 🟡 Performance Audit

| Issue | Detail | Fix |
|---|---|---|
| `images.unoptimized: true` | `next/image` does zero optimization — full-size remote images served raw | Enable optimization; keep Supabase domain in `remotePatterns` |
| Homepage force-dynamic | No caching on the most visited page | ISR |
| 5 sequential Supabase awaits on homepage | Waterfall latency | `Promise.all` |
| `ViewCounter` does 2 extra Supabase round-trips on **every game page view** client-side | Wasted requests, race-prone | Server-side increment or batched RPC |
| `Header.tsx` is a big client component fetching games for search on every page (and `Hero.tsx` duplicates the search UI) | JS weight + duplicate data fetching | One shared search component; server-render nav, hydratable search |
| 3 Monetag scripts + GA on every page (popunder, in-page push, vignette) | Heavy third-party JS, hurts LCP/INP and UX (popunders) | Lazy-load, reduce formats, measure with Lighthouse |
| No `<Suspense>`/streaming; only 2 `loading.tsx` files | Slow perceived navigation | Add `loading.tsx` to dynamic segments |
| Admin page is **one 1,918-line component with 60+ `useState` hooks** | Slow renders, hard to maintain | Split into forms/tabs, `useReducer`/react-hook-form |
| `localStorage` keys `viewed-${id}` / `download-${id}` accumulate forever | Storage bloat per user | Expiry or one namespaced object |

---

## 6. 🟠 Accessibility (a11y)

- Only **1 `aria-*` attribute in the entire app**; interactive dropdowns (Header categories, search suggestions) lack `aria-expanded`, `role="listbox"`, keyboard navigation.
- Admin form fields have **no `<label>` elements** (placeholder-only inputs).
- Errors shown via `alert()` (14 usages) — bad UX, blocks screen readers' flow.
- Emoji used as meaningful icons (📥, ⭐, 🍪) without `aria-hidden`/text alternatives.
- Positives: images do have `alt` text; dark theme contrast is mostly adequate.

---

## 7. 🟠 Code Quality & Repo Hygiene

**Bugs / dead code**
- `app/admin/page.tsx`: **`useEffect(() => { loadGames(); }, [])` is declared twice** (lines ~193 & ~249) → games fetched twice on mount.
- `increaseDownload` (DownloadCounter) imported in `game/[slug]/page.tsx` and `download/[slug]/page.tsx` but **never called** — dead import of a browser-only function into server components.
- `MonetagAds.tsx` and `InPagePush.tsx` are components that `return null` — dead files.
- `app/download/[slug]/route-backup.ts` and `app/download/original/slug.ts` — dead/invalid route files (`slug.ts` isn't a route at all).
- `app/api/download/route.ts` appears **unused** (DownloadClient increments directly via supabase-js).
- `Game` interface in admin says `downloads: string` / `rating: string` but DB values are numbers.
- Game page: `.neq("id", game.id).limit(6);;` (double semicolon), inconsistent casing of section comments.

**Quality observations**
- No tests, no CI workflow, no lint-on-commit. Biome is configured (`npm run lint`) — good, but enforce it.
- 9 `console.log/error` left in app code.
- Sitemap file is full of nonsensical AI-generated comments ("Authority operational dynamic map paths setups") — clean up.
- Root-level `package-lock.json` is junk (`"name": "cd animeverse"`, empty packages) — created by accidentally running npm in the wrong dir. Delete.
- Stray file `animeverse/images (1).jpg` (74 KB, space in filename) — looks like an accidental download artifact. Delete.
- `next.config.ts` has `allowedDevOrigins: ["192.168.100.21"]` — harmless dev leftover.
- README is the default create-next-app text; AGENTS.md warns about Next 16 breaking changes — write a real README.

---

## 8. 🔵 Privacy / Consent (GDPR-ish)

- `CookieConsent` shows Accept/Reject, but **both buttons only write to localStorage** — GA4 and all three Monetag scripts load **regardless of the choice** (they're in the root layout, not gated by consent). "Reject" currently means nothing.
- No consent mode (`gtag('consent', ...)`) configured.
- Privacy policy page exists ✅ (195 lines).

---

## 9. ✅ What's Done Well

- Clean, consistent dark UI; thoughtful component structure (Breadcrumb, ShareButtons, CookieConsent, PWA manifest, security.txt).
- Strong on-page SEO scaffolding (schemas, canonicals, OG tags, sitemap/robots).
- Sensible tech choices (Next 16 App Router, server components for data pages, Supabase).
- `.env` files properly gitignored; no secrets found in git history.
- Admin UI is feature-rich (games + blogs + TipTap + uploads + SEO fields + FAQs).
- robots.txt blocks `/admin` and `/api`; search page noindexed.

---

## 10. 🌐 Live Site Verification (modversepk.online, checked 2026-09-14)

Verified against the **production site**:

| # | Finding (LIVE) | Severity |
|---|---|---|
| 1 | **Sitemap is broken**: `sitemap.xml` contains only **9 URLs** (home, recently-updated, popular, trending, blog, 4 legal pages). **ZERO game URLs, ZERO download URLs, ZERO blog posts.** The `select("slug, updated_at, image_url")` query in `sitemap.ts` is failing (column `image_url` doesn't exist in the schema used elsewhere) → `data` is null → empty maps. Google currently has no sitemap map of your actual content. Blogs were also never added to sitemap code. | 🔴 CRITICAL |
| 2 | **`/favicon.ico` and `/ads.txt` return HTTP 500 on production** (files are 0 bytes in repo). PWA `manifest.webmanifest` loads, but all 4 icons it references (`favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`) are empty files → PWA install broken, no favicon in browser tab. Note: **Monetag ads still work fine without ads.txt** (direct script tags don't need it) — ads confirmed running by owner; ads.txt only matters if adding programmatic/AdSense-style demand later. Favicon/icons part remains critical. | 🔴 CRITICAL (icons) / 🟡 (ads.txt) |
| 3 | **Download page field bug confirmed live**: `/download/subway-surfers-mod-menu` shows the "Android" info tile **completely empty** (game page shows "Android 6.0 and Above" fine). Download page reads `game.android_version`, DB has `android`. | 🔴 Confirmed bug |
| 4 | **Download page shows raw ISO timestamp**: "Updated 2026-07-21T05:14:58.567+00:00" — no date formatting on that page. | 🟠 UX bug |
| 5 | **All `/download/*` pages share the generic title "MODVerse"** — no `generateMetadata` on the download route → duplicate titles + no descriptions for every download page (SEO). | 🟠 SEO gap |
| 6 | **Soft-404 confirmed**: `/game/this-game-does-not-exist-xyz123` renders "Game Not Found" with a normal page (no `notFound()`, HTTP 200). | 🟠 SEO |
| 7 | `/login` is publicly reachable with the admin form visible (expected for login, but remember `/admin` protection is client-side only → **RLS is your only real lock**). | 🟠 Security reminder |
| 8 | Blog pages show **0 views** — view counter only exists for games, blogs have no counter wired. "Related Blogs" section renders empty. | 🟡 Minor |
| 9 | Data-quality: FRAG Pro Shooter slug is duplicated garbage: `/game/frag-pro-shooter-mod-apkfrag-pro-shooter-mod-apk-v5-3-2-download` (auto-slug bug when title already contains "Mod APK"). | 🟡 Data hygiene |
| 10 | Homepage, game pages, category pages, robots.txt, search — all render correctly with live Supabase data ✅ | ✅ Working |

**Top live-site priorities:** ① fix `sitemap.ts` (drop `image_url`, add blogs) ② restore the 7 empty binary files ③ fix `android_version` → `android` on download page + add metadata + format the date ④ add `notFound()` to dynamic routes.

---

## 11. Prioritized Action Plan

**Do now (critical):**
1. Restore the empty binary files: favicon, icon-192/512, apple-touch-icon, banner, hero.webp; fill `ads.txt` with your Monetag line.
2. Audit Supabase **RLS policies** on `games`, `blogs` and the `games` storage bucket (anon = read-only; writes require authenticated admin).
3. Fix `blog/[slug]` rendering (sanitized HTML) and the `android` vs `android_version` mismatch.
4. Verify sitemap actually generates (check `image_url` column).

**This week (high):**
5. Replace read-modify-write counters with one atomic SQL RPC; delete the 3 duplicated counter implementations.
6. Add `notFound()` to game/blog/download pages; remove `force-dynamic`, use ISR + `Promise.all` on homepage.
7. Add middleware or server guard for `/admin`; delete dead files (`MonetagAds`, `InPagePush`, `route-backup`, `original/slug.ts`, root lockfile, `images (1).jpg`).
8. Sanitize `game.description` HTML; add security headers in `next.config.ts`.

**Later (medium):**
9. Gate GA/ads behind real consent; add `loading.tsx`/Suspense; enable image optimization.
10. Split the 1,918-line admin page; add labels/aria for a11y; remove `alert()`s and console.logs.
11. Add CI (biome check + `next build`), a smoke test, and a real README.
