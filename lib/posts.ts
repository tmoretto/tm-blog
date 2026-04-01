import { allPosts, type Post } from 'contentlayer/generated'

export type { Post }

export function getAllPublishedPosts(): Post[] {
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug && post.published)
}
