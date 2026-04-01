import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockCodeToHtml = vi.fn().mockReturnValue('<pre><code>highlighted</code></pre>')

vi.mock('shiki', () => ({
  createHighlighter: vi.fn().mockResolvedValue({
    codeToHtml: mockCodeToHtml,
  }),
}))

describe('getHighlighter', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('caches the Promise — concurrent calls return the same instance', async () => {
    const { getHighlighter } = await import('@/lib/shiki')
    const p1 = getHighlighter()
    const p2 = getHighlighter()
    expect(p1).toBe(p2)
  })

  it('resolves to a highlighter with codeToHtml', async () => {
    const { getHighlighter } = await import('@/lib/shiki')
    const hl = await getHighlighter()
    expect(typeof hl.codeToHtml).toBe('function')
  })
})

describe('highlight', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('returns non-empty HTML for known language', async () => {
    const { highlight } = await import('@/lib/shiki')
    const html = await highlight('const x = 1', 'typescript')
    expect(html.length).toBeGreaterThan(0)
  })

  it('falls back to bash for unknown language', async () => {
    const { highlight } = await import('@/lib/shiki')
    await highlight('echo hi', 'unknownlang')
    expect(mockCodeToHtml).toHaveBeenCalledWith(
      'echo hi',
      expect.objectContaining({ lang: 'bash' })
    )
  })
})
