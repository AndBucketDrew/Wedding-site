import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { label: 'Portfolio', to: '/posts' },
  { label: 'About',     to: '/#about' },
  { label: 'Contact',   to: '/contact' },
]

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#F8F5F0]/95 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6',
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={cn(
            'font-script text-3xl transition-colors duration-300',
            scrolled ? 'text-[#111111]' : 'text-white',
          )}
        >
          Dzejlan
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300',
                    isActive
                      ? 'text-[#C9A96E]'
                      : scrolled
                        ? 'text-[#2A2A2A] hover:text-[#C9A96E]'
                        : 'text-white/90 hover:text-[#C9A96E]',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className={cn(
            'md:hidden transition-colors duration-300',
            scrolled ? 'text-[#111111]' : 'text-white',
          )}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-400',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="bg-[#F8F5F0] flex flex-col px-6 pb-6 gap-5 pt-4">
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'font-sans text-xs tracking-[0.2em] uppercase',
                    isActive ? 'text-[#C9A96E]' : 'text-[#2A2A2A] hover:text-[#C9A96E]',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
