'use client'

import { useRouter } from 'next/navigation'

interface TagFilterProps {
  tags: string[]
  activeTag?: string
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
  const router = useRouter()

  if (tags.length === 0) return null

  function handleTag(tag: string): void {
    if (tag === activeTag) {
      router.push('/blog')
    } else {
      router.push(`/blog?tag=${encodeURIComponent(tag)}`)
    }
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter posts by tag">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTag(tag)}
          aria-pressed={tag === activeTag}
          className={`px-3 py-1 text-sm rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            tag === activeTag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
