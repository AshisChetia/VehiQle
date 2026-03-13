import { Link } from 'react-router-dom'
import { Github, Twitter, Zap } from 'lucide-react'

const FOOTER_LINKS = [
  {
    group: 'Product',
    links: [
      { label: 'Features',     href: '#features'     },
      { label: 'How It Works', href: '#how-it-works' },
    ],
  },
  {
    group: 'Account',
    links: [
      { label: 'Sign Up', href: '/register' },
      { label: 'Sign In', href: '/login'    },
    ],
  },
  {
    group: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Use',   href: '#terms'   },
    ],
  },
]

const SOCIALS = [
  { Icon: Github,  href: 'https://github.com',    label: 'GitHub'  },
  { Icon: Twitter, href: 'https://twitter.com',   label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Top Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 py-16">

          {/* Brand Column — takes 2 cols on large */}
          <div className="lg:col-span-2">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mb-5 w-fit group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary
                              shadow-md transition-transform duration-200 group-hover:scale-105">
                <Zap size={17} className="text-white" fill="white" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Auto<span className="text-primary-light">Sage</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs mb-7">
              Your intelligent automotive companion. Track services, predict maintenance,
              and chat with an AI mechanic — all in one place.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-700
                             text-gray-400 transition-all duration-200
                             hover:border-primary hover:text-primary hover:bg-primary/10"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {FOOTER_LINKS.map(({ group, links }) => (
            <div key={group}>
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-500">
                {group}
              </p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith('/') ? (
                      <Link
                        to={href}
                        className="text-sm text-gray-400 transition-colors duration-200 hover:text-primary-light"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        className="text-sm text-gray-400 transition-colors duration-200 hover:text-primary-light"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3
                        border-t border-gray-800/60 py-7">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} VehiQle. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <p className="text-xs text-gray-600">
              All systems operational
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}