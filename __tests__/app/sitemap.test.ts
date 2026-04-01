import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/posts', () => ({
  getAllPublishedPosts: () => [
    {
      title: 'Hello World',
      date: '2026-01-01',
      url: '/blog/hello-world',
    },
    {
      title: 'Second Post',
      date: '2026-02-01',
      url: '/blog/second-post',
    },
  ],
}))

import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  it('includes the home and blog index URLs', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/')|| !u.includes('/blog'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/blog'))).toBe(true)
  })

  it('includes an entry for every published post', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls.some((u) => u.includes('/blog/hello-world'))).toBe(true)
    expect(urls.some((u) => u.includes('/blog/second-post'))).toBe(true)
  })

  it('returns at least home + blog + posts entries', () => {
    const entries = sitemap()
    expect(entries.length).toBeGreaterThanOrEqual(4)
  })

  it('all entries have a url and lastModified', () => {
    const entries = sitemap()
    for (const entry of entries) {
      expect(entry.url).toBeTruthy()
      expect(entry.lastModified).toBeInstanceOf(Date)
    }
  })
})
