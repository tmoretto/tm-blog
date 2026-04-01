# Tasks

## M1 — Foundation

- [x] **#1** Scaffold Next.js project with Tailwind CSS and Contentlayer
  Run `npx create-next-app@latest` with App Router and TypeScript strict mode. Install and configure Tailwind CSS, @tailwindcss/typography, and Contentlayer. Set up the `contentlayer.config.ts` with the Post document type (title, date, description, tags, published, slug, readingTime computed fields). Create the `content/posts/` directory and add one example MDX post. Verify `npm run dev` starts without errors.

- [x] **#2** Configure Shiki syntax highlighting (FR-03)
  Create `lib/shiki.ts` with a singleton highlighter using `getSingletonHighlighter`. Support languages: typescript, tsx, javascript, jsx, bash, json, css, markdown, mdx. Themes: github-light and github-dark. Build `components/CodeBlock.tsx` that accepts `code` and `lang` props and renders highlighted HTML via `dangerouslySetInnerHTML`. Wire it up as the MDX code component in `PostBody.tsx`.

## M2 — Core Features

- [x] **#3** Build post listing page — home and /blog index (FR-01)
  Implement `app/page.tsx` (latest posts) and `app/blog/page.tsx` (all posts). Create `lib/posts.ts` helpers to read all published posts from Contentlayer, sort by date descending, and filter drafts (`published: false`). Build `components/PostCard.tsx` showing title, date, description, reading time, and tags. Layout should be responsive (mobile-first).

- [x] **#4** Build post detail page (FR-02)
  Implement `app/blog/[slug]/page.tsx`. Use `generateStaticParams` to pre-render all published posts at build time. Display title, date, reading time, tags, and the MDX body. Create `components/PostBody.tsx` wrapping the MDX content in `<article className="prose prose-neutral dark:prose-invert max-w-none">`. Wire `CodeBlock` as the MDX `pre`/`code` component.

- [x] **#5** Implement dark mode toggle (FR-04)
  Set `darkMode: 'class'` in `tailwind.config.ts`. Create a `'use client'` theme toggle component in `components/Header.tsx` (or a dedicated `ThemeToggle.tsx`). On mount, read preference from `localStorage`; fall back to `prefers-color-scheme`. Toggle the `dark` class on `<html>`. Persist the chosen theme to `localStorage` on each toggle. Ensure Shiki renders both `github-light` and `github-dark` and the correct one is visible per theme.

- [x] **#6** Add copy-to-clipboard button on code blocks (FR-09)
  Extend `components/CodeBlock.tsx` (mark it `'use client'`). Add a copy button overlaid on the top-right of the code block. On click, call `navigator.clipboard.writeText(code)` and briefly show a "Copied!" confirmation. Style with Tailwind; ensure it's keyboard-accessible (focusable, labelled).

## M3 — SEO & Feeds

- [x] **#9** Add Open Graph metadata and Article structured data (FR-07, NFR-03)
  Use Next.js `generateMetadata` on all pages to export `title`, `description`, `openGraph` (title, description, type, url, images), and `twitter` card fields. On post pages, also inject a JSON-LD `Article` schema script. Generate `sitemap.xml` (Next.js built-in `app/sitemap.ts`) listing all published post URLs. Add canonical URLs via the metadata API.

- [x] **#8** Generate RSS/Atom feed at /feed.xml (FR-06)
  Create a Next.js Route Handler at `app/feed.xml/route.ts`. Build a valid RSS 2.0 XML string from all published posts (title, link, description, pubDate). Return it with `Content-Type: application/rss+xml`. Add a `<link rel="alternate">` tag in the root layout so browsers discover the feed.

- [x] **#10** Set Content Security Policy headers (NFR-04)
  Add HTTP security headers in `next.config.mjs` using the `headers()` function. Include a CSP that allows self, your CDN, and Giscus origins; also set `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy`. Verify no secrets are bundled client-side (check bundle with `ANALYZE=true npm run build` if `@next/bundle-analyzer` is installed).

## M4 — Polish

- [x] **#7** Implement tag filtering on blog index (FR-05)
  Add tag filter UI to `app/blog/page.tsx`. Render a list of all unique tags as clickable pills. Selecting a tag filters the displayed posts client-side (or via URL search params for shareability). Active tag is visually highlighted. Selecting the same tag again deselects it (shows all posts).

- [x] **#11** Accessibility and performance audit (NFR-01, NFR-02)
  Add a skip-navigation link at the top of the root layout. Verify all interactive elements are keyboard-reachable and have visible focus rings. Check colour contrast ratios meet WCAG 2.1 AA. Run Lighthouse on the post detail page (mobile, simulated throttling) and hit ≥ 90 on Performance, Accessibility, Best Practices, and SEO. Fix any flagged issues.

## M5 — Launch

- [ ] **#12** Deploy to Vercel and connect custom domain
  Push the repo to GitHub. Import it in the Vercel dashboard (auto-detects Next.js — no custom build config needed). Set any required environment variables in Project → Settings → Environment Variables. Connect your custom domain and confirm HTTPS is active. Do a final smoke test: open the home page, a post page, and /feed.xml on a real mobile viewport (375 px wide) and verify everything renders correctly.

## Backlog (Optional)

- [ ] **#13** Add Giscus comments to post pages (FR-10)
  Enable GitHub Discussions on your repo. Go to giscus.app, configure the widget, and copy the generated `data-*` attributes. Create `components/Comments.tsx` (`'use client'`) that loads the Giscus `<script>`. Add environment variables `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID`. Render `<Comments />` at the bottom of the post detail page.

- [ ] **#14** Client-side full-text search (FR-11)
  Install `fuse.js` (lightweight fuzzy search, no server needed). At build time, export a search index JSON containing each post's slug, title, description, and tags. Create a `'use client'` search component that loads the index and runs Fuse queries as the user types. Render matching posts inline. Add the search UI to the blog index page or a dedicated `/search` route.

- [ ] **#15** Related posts section (FR-12)
  In `lib/posts.ts`, write a `getRelatedPosts(slug, tags, limit = 3)` helper that returns the top N other published posts sharing the most tags with the current post. Render them as `PostCard` components in a "You might also like" section at the bottom of `app/blog/[slug]/page.tsx`, above the comments widget.
