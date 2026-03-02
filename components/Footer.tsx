import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ocean-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl" aria-hidden="true">🏄</span>
              <span className="text-lg font-bold">Surf Travel Blog</span>
            </Link>
            <p className="text-ocean-300 text-sm leading-relaxed">
              Chase waves. Discover destinations. Share the stoke. Your source
              for surf travel stories from around the globe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ocean-400 mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/posts" className="text-ocean-200 hover:text-white text-sm transition-colors">
                  All Stories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-ocean-200 hover:text-white text-sm transition-colors">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-ocean-200 hover:text-white text-sm transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ocean-400 mb-4">
              Powered By
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-200 hover:text-white text-sm transition-colors"
                >
                  Cosmic CMS
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-200 hover:text-white text-sm transition-colors"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-200 hover:text-white text-sm transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ocean-800 mt-10 pt-6 text-center">
          <p className="text-ocean-400 text-sm">
            © {currentYear} Surf Travel Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}