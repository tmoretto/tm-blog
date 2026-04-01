# CLAUDE.md — Personal Tech Blog

This file gives Claude Code context about the project so it can assist effectively.

## Project Overview

A personal tech/dev blog built with Next.js. Posts are written in MDX, syntax highlighting is handled by Shiki, and the site is styled with Tailwind CSS. Deployed on Vercel.

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js (App Router) | Use `app/` directory conventions |
| Content | MDX + Contentlayer | Posts live in `content/posts/` |
| Syntax highlighting | Shiki | Configured in `lib/shiki.ts` |
| Styling | Tailwind CSS | `tailwind.config.ts` at root |
| Typography | @tailwindcss/typography | Apply `prose` class to post body |
| Deployment | Vercel | Auto-deploy on push to `main` |

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home — latest posts list
│   ├── blog/
│   │   ├── page.tsx        # All posts index
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post page
│   └── globals.css         # Tailwind directives
├── components/
│   ├── PostCard.tsx        # Post preview card
│   ├── PostBody.tsx        # Renders MDX with prose styles
│   ├── CodeBlock.tsx       # Shiki-powered code block
│   ├── Header.tsx
│   └── Footer.tsx
├── content/
│   └── posts/             # MDX files go here
│       └── example-post.mdx
├── lib/
│   ├── posts.ts           # Helpers to read/sort posts
│   └── shiki.ts           # Shiki highlighter singleton
├── public/
├── contentlayer.config.ts
├── tailwind.config.ts
├── next.config.mjs
└── CLAUDE.md
```

## Content & Frontmatter

Every post is an `.mdx` file in `content/posts/`. Required frontmatter:

```mdx
---
title: "Post title"
date: "2026-03-30"
description: "One-sentence summary shown in post cards."
tags: ["nextjs", "react"]
published: true
---

Post body starts here...
```

- `published: false` drafts are excluded from all listings.
- `tags` is an optional string array used for filtering.

## Contentlayer Config (`contentlayer.config.ts`)

- Document type: `Post`
- Fields match the frontmatter above plus computed `slug` (derived from filename) and `readingTime`
- Use `makeSource` with `contentDirPath: 'content'`

## Shiki Setup

- Initialise a **singleton** highlighter in `lib/shiki.ts` — call `getSingletonHighlighter` once and reuse it.
- Default themes: `github-light` (light mode), `github-dark` (dark mode).
- Support at minimum: `typescript`, `tsx`, `javascript`, `jsx`, `bash`, `json`, `css`, `markdown`, `mdx`.
- `CodeBlock.tsx` receives `code` (string) and `lang` (string) props and returns the highlighted HTML via `dangerouslySetInnerHTML`.

## Styling Conventions

- Use **Tailwind utility classes** throughout — no custom CSS files except `globals.css`.
- Wrap post body in `<article className="prose prose-neutral dark:prose-invert max-w-none">`.
- Dark mode is class-based: `darkMode: 'class'` in `tailwind.config.ts`. Toggle class on `<html>`.
- Responsive: mobile-first, breakpoints `sm` / `md` / `lg` only.
- No inline styles.

## Commands

```bash
# Development
npm run dev          # Start dev server on :3000

# Build & check
npm run build        # Production build (also validates Contentlayer)
npm run lint         # ESLint

# Content
# Just create/edit .mdx files in content/posts/ — hot reload picks them up
```

## Key Conventions

- **File names** = post slugs. Use `kebab-case`. Example: `my-first-post.mdx` → `/blog/my-first-post`.
- **Static generation**: all post pages use `generateStaticParams` — no runtime DB calls.
- **Images**: store in `public/images/posts/<slug>/`. Reference as `/images/posts/<slug>/cover.png`. Use `next/image` with explicit `width` and `height`.
- **No client components by default**. Add `'use client'` only when you need browser APIs or interactivity (e.g. theme toggle, copy-code button).
- **TypeScript strict mode** is on. All props and return types must be explicit.
- **Absolute imports** via `@/` alias (configured in `tsconfig.json`).

## Do / Don't

| Do | Don't |
|---|---|
| Use App Router (`app/`) patterns | Use Pages Router (`pages/`) |
| Use `next/link` for internal links | Use plain `<a>` for internal links |
| Use `next/image` for all images | Use plain `<img>` |
| Keep components in `components/` | Co-locate components inside `app/` unless route-specific |
| Use Contentlayer computed fields for slug | Parse filenames manually |
| Use `prose` + `prose-invert` for post body | Write custom article typography |

## Optional Extras (may or may not be installed)

- **`reading-time`** — attached to Contentlayer computed fields as `readingTime.text` (e.g. `"4 min read"`)
- **`rehype-pretty-code`** — alternative to the custom Shiki setup; check `contentlayer.config.ts` to see which is active
- **Giscus** — GitHub Discussions-based comments, configured in `components/Comments.tsx`

## Environment Variables

```bash
# .env.local — none required for core blog functionality
# Add if using Giscus:
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

## Deployment

- **Platform**: Vercel. Connect the GitHub repo; Vercel auto-detects Next.js.
- **Branch**: `main` → production. Feature branches → preview URLs.
- No special build command needed — `npm run build` is detected automatically.
- Environment variables are set in the Vercel dashboard under Project → Settings → Environment Variables.