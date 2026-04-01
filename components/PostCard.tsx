import Link from 'next/link'
import type { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="border-b border-gray-200 dark:border-gray-800 py-8 last:border-0">
      <Link href={post.url} className="group block">
        <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
      </Link>
      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <time dateTime={post.date}>{date}</time>
        <span>·</span>
        <span>{post.readingTime.text}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-3">{post.description}</p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
