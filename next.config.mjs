import { withContentlayer } from 'next-contentlayer2'
import { fileURLToPath } from 'url'
import path from 'path'
import crypto from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Must match the themeScript string in lib/theme-script.ts.
// If you change that string, recompute this hash:
//   node -e "const c=require('crypto'),s=require('fs').readFileSync('lib/theme-script.ts','utf8').match(/\`([\s\S]*?)\`/)[1];console.log(c.createHash('sha256').update(s).digest('base64'))"
const themeScriptContent = `(function(){
  var stored = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})()`
const themeScriptHash = `'sha256-${crypto.createHash('sha256').update(themeScriptContent).digest('base64')}'`

const csp = [
  "default-src 'self'",
  `script-src 'self' ${themeScriptHash}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://va.vercel-scripts.com",
  "frame-src 'self' https://giscus.app",
].join('; ')

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: csp },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['contentlayer/generated'] = path.resolve(
      __dirname,
      '.contentlayer/generated/index.mjs'
    )
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withContentlayer(nextConfig)
