import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('contentlayer/generated', () => ({
  allPosts: [
    {
      title: 'Alpha Post',
      date: '2026-01-01',
      description: 'First post',
      tags: ['nextjs', 'react'],
      published: true,
      slug: 'alpha-post',
      url: '/blog/alpha-post',
      readingTime: { text: '2 min read', minutes: 2, time: 120000, words: 400 },
      body: { code: '', raw: '' },
      _id: 'alpha',
      _raw: { sourceFileName: 'alpha-post.mdx', flattenedPath: 'posts/alpha-post' },
    },
    {
      title: 'Beta Post',
      date: '2026-03-01',
      description: 'Second post',
      tags: ['typescript'],
      published: true,
      slug: 'beta-post',
      url: '/blog/beta-post',
      readingTime: { text: '3 min read', minutes: 3, time: 180000, words: 600 },
      body: { code: '', raw: '' },
      _id: 'beta',
      _raw: { sourceFileName: 'beta-post.mdx', flattenedPath: 'posts/beta-post' },
    },
    {
      title: 'Draft Post',
      date: '2026-02-01',
      description: 'Unpublished',
      tags: ['draft'],
      published: false,
      slug: 'draft-post',
      url: '/blog/draft-post',
      readingTime: { text: '1 min read', minutes: 1, time: 60000, words: 200 },
      body: { code: '', raw: '' },
      _id: 'draft',
      _raw: { sourceFileName: 'draft-post.mdx', flattenedPath: 'posts/draft-post' },
    },
  ],
}))

import { getAllPublishedPosts, getPostBySlug } from '@/lib/posts'

describe('getAllPublishedPosts', () => {
  it('excludes unpublished posts', () => {
    const posts = getAllPublishedPosts()
    expect(posts.every((p) => p.published)).toBe(true)
    expect(posts.find((p) => p.slug === 'draft-post')).toBeUndefined()
  })

  it('sorts by date descending', () => {
    const posts = getAllPublishedPosts()
    expect(posts[0].slug).toBe('beta-post')
    expect(posts[1].slug).toBe('alpha-post')
  })

  it('returns all published posts', () => {
    const posts = getAllPublishedPosts()
    expect(posts).toHaveLength(2)
  })
})

describe('getPostBySlug', () => {
  it('returns a published post by slug', () => {
    const post = getPostBySlug('alpha-post')
    expect(post).toBeDefined()
    expect(post?.title).toBe('Alpha Post')
  })

  it('returns undefined for draft posts', () => {
    expect(getPostBySlug('draft-post')).toBeUndefined()
  })

  it('returns undefined for unknown slugs', () => {
    expect(getPostBySlug('does-not-exist')).toBeUndefined()
  })
})
