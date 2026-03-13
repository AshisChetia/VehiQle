import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/icons/VehiQleLogo.png'  // ← Import your logo

const NAV_LINKS = [
  { label: 'Features',     href: '#features'     },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About',        href: '#about'        },
]

export default function Navbar() {
  const [open,     setOpen    ] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${scrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="VehiQle logo"
              className="h-9 w-9 rounded-xl object-contain"
            />
            <span className="font-display text-xl font-bold tracking-tight text-gray-900">
              Vehi<span className="text-primary">Qle</span>
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md
                         transition-all duration-200 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started Free
            </Link>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        {open && (
          <div className="md:hidden mt-3 border-t border-primary-muted/50 pt-4 pb-3 space-y-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600
                           hover:bg-primary-pale hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Link
                to="/login"
                className="rounded-xl border border-primary-muted py-2.5 text-center text-sm
                           font-medium text-gray-700 hover:bg-primary-pale transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-white"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}