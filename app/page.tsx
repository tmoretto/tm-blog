import PostCard from '@/components/PostCard'
import { getAllPublishedPosts } from '@/lib/posts'
import Link from 'next/link'

export default function Home() {
  const posts = getAllPublishedPosts().slice(0, 5)

  return (
    <main className="max-w-2xl mx-auto px-4 py-12" id="main-content">
      <h1 className="text-3xl font-bold mb-2">Tech Blog</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        Thoughts on software development.
      </p>
      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
      ) : (
        <>
          <div>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              View all posts →
            </Link>
          </div>
        </>
      )}
    </main>
  )
}
