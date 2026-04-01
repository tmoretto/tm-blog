'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import CodeBlock from '@/components/CodeBlock'
import { highlight } from '@/lib/shiki'
import { useEffect, useState } from 'react'

function Pre({ children }: { children?: React.ReactNode }) {
  const child = children as React.ReactElement<{
    className?: string
    children?: string
  }> | null

  const lang = child?.props?.className?.replace('language-', '') ?? 'bash'
  const code = child?.props?.children ?? ''
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    highlight(String(code), lang).then(setHtml)
  }, [code, lang])

  if (!html) {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-900 p-4 text-sm">
        <code>{code}</code>
      </pre>
    )
  }

  return <CodeBlock html={html} code={String(code)} />
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
