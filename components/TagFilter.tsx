'use client'

import Link from 'next/link'

interface TagFilterProps {
  tags: string[]
  activeTag?: string
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Filter posts by tag">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={tag === activeTag ? '/blog' : `/blog?tag=${encodeURIComponent(tag)}`}
          aria-current={tag === activeTag ? 'page' : undefined}
          className={`px-3 py-1 text-sm rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            tag === activeTag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {tag}
        </Link>
      ))}
    </nav>
  )
}
