import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/posts', () => ({
  getAllPublishedPosts: () => [
    {
      title: 'Hello World',
      description: 'My first post',
      date: '2026-01-01',
      url: '/blog/hello-world',
      tags: ['nextjs'],
    },
    {
      title: 'Second Post',
      description: 'Another post',
      date: '2026-02-01',
      url: '/blog/second-post',
      tags: [],
    },
  ],
}))

import { GET } from '@/app/feed.xml/route'

describe('GET /feed.xml', () => {
  it('returns a 200 response', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
  })

  it('sets Content-Type to application/rss+xml', async () => {
    const res = await GET()
    expect(res.headers.get('Content-Type')).toContain('application/rss+xml')
  })

  it('includes post titles in the feed', async () => {
    const res = await GET()
    const body = await res.text()
    expect(body).toContain('Hello World')
    expect(body).toContain('Second Post')
  })

  it('includes post descriptions', async () => {
    const res = await GET()
    const body = await res.text()
    expect(body).toContain('My first post')
    expect(body).toContain('Another post')
  })

  it('is valid RSS 2.0 XML', async () => {
    const res = await GET()
    const body = await res.text()
    expect(body).toContain('<?xml version="1.0"')
    expect(body).toContain('<rss version="2.0"')
    expect(body).toContain('</channel>')
    expect(body).toContain('</rss>')
  })

  it('includes atom:link self-reference', async () => {
    const res = await GET()
    const body = await res.text()
    expect(body).toContain('rel="self"')
    expect(body).toContain('/feed.xml')
  })
})
