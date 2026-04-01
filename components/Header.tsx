import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          TM&apos;s Blog
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            Posts
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
