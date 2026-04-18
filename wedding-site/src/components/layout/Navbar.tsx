import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  const NAV_LINKS = [
    { label: t('nav.gallery'), to: '/posts' },
    { label: t('nav.about'),   to: '/#about' },
    { label: t('nav.contact'), to: '/contact' },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'bs' ? 'en' : 'bs')
  }

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
        <Link to="/" className="h-14 overflow-visible flex items-center">
          <img
            src="/logo.svg"
            alt="Halilagic Weddings"
            className={cn(
              'h-20 w-auto transition-all duration-500',
              scrolled ? '' : 'invert',
            )}
          />
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

          {/* Language toggle */}
          <li>
            <button
              onClick={toggleLang}
              className={cn(
                'flex items-center transition-opacity duration-300 hover:opacity-60',
                scrolled ? 'opacity-90' : 'opacity-80',
              )}
              aria-label="Switch language"
            >
              <span
                className={cn('fi', i18n.language === 'bs' ? 'fi-gb' : 'fi-ba')}
                style={{ width: '28px', height: '18px', display: 'block', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
              />
            </button>
          </li>
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
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0',
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
          {/* Mobile language toggle */}
          <li>
            <button
              onClick={() => { toggleLang(); setMenuOpen(false) }}
              className="flex items-center opacity-80 hover:opacity-60 transition-opacity duration-300"
              aria-label="Switch language"
            >
              <span
                className={cn('fi', i18n.language === 'bs' ? 'fi-gb' : 'fi-ba')}
                style={{ width: '28px', height: '18px', display: 'block', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
              />
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
