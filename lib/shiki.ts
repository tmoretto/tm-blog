import { createHighlighter, type Highlighter } from 'shiki'

const LANGS = [
  'typescript',
  'tsx',
  'javascript',
  'jsx',
  'bash',
  'json',
  'css',
  'markdown',
  'mdx',
] as const

const THEMES = ['github-light', 'github-dark'] as const

// Cache the Promise (not the resolved value) to prevent duplicate initialization
// when concurrent calls arrive before the first createHighlighter resolves.
let highlighterPromise: Promise<Highlighter> | null = null

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      langs: [...LANGS],
      themes: [...THEMES],
    })
  }
  return highlighterPromise
}

export async function highlight(code: string, lang: string): Promise<string> {
  const hl = await getHighlighter()
  const language = LANGS.includes(lang as (typeof LANGS)[number])
    ? lang
    : 'bash'
  return hl.codeToHtml(code, {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  })
}
