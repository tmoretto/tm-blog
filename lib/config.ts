const url = process.env.NEXT_PUBLIC_SITE_URL

if (!url && process.env.NODE_ENV === 'production') {
  console.warn(
    'Warning: NEXT_PUBLIC_SITE_URL is not set. ' +
      'OG tags, canonical links, sitemap, and RSS feed will use the localhost fallback. ' +
      'Set this variable in your Vercel project settings.'
  )
}

export const SITE_URL: string = url ?? 'http://localhost:3000'
