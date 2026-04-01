import PostCard from '@/components/PostCard'
import TagFilter from '@/components/TagFilter'
import { getAllPublishedPosts } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'All posts',
}

interface Props {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogIndex({ searchParams }: Props) {
  const { tag } = await searchParams
  const allPosts = getAllPublishedPosts()
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags))).sort()
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts

  return (
    <main className="max-w-2xl mx-auto px-4 py-12" id="main-content">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <TagFilter tags={allTags} activeTag={tag} />
      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 mt-8">No posts found.</p>
      ) : (
        <div className="mt-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
