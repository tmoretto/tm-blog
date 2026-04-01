import { getAllPublishedPosts } from '@/lib/posts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export async function GET(): Promise<Response> {
  const posts = getAllPublishedPosts()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${post.url}`
      const pubDate = new Date(post.date).toUTCString()
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TM's Blog</title>
    <link>${SITE_URL}</link>
    <description>Regular guy thoughts.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
