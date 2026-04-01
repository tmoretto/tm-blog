'use client'

import { useState } from 'react'

interface CodeBlockProps {
  html: string
  code: string
}

export default function CodeBlock({ html, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy(): void {
    navigator.clipboard.writeText(code).then(() => {
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
      <div
        className="[&>pre]:p-4 [&>pre]:overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
