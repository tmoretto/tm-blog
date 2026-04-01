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

let highlighter: Highlighter | null = null

export async function getHighlighter(): Promise<Highlighter> {
  if (highlighter) return highlighter
  highlighter = await createHighlighter({
    langs: [...LANGS],
    themes: [...THEMES],
  })
  return highlighter
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
