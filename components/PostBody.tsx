// useMDXComponent returns a dynamic component from a compiled MDX string — this
// is contentlayer2's documented rendering API and cannot be restructured to
// avoid the react-hooks/static-components rule.
/* eslint-disable react-hooks/static-components */
'use client'

import React, { useRef, useState } from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'

function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  function handleCopy(): void {
    const text = preRef.current?.textContent ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="not-prose my-6 relative group rounded-lg text-sm overflow-x-auto">
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-gray-700 text-gray-200 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}

interface PostBodyProps {
  code: string
}

export default function PostBody({ code }: PostBodyProps) {
  const MDXContent = useMDXComponent(code)

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXContent components={{ pre: Pre }} />
    </article>
  )
}
