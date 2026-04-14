import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#111111] text-white/60 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <Link to="/" className="font-script text-4xl text-white hover:text-[#C9A96E] transition-colors">
          Dzejlan
        </Link>

        {/* Links */}
        <nav className="flex gap-8">
          {[
            { label: t('footer.portfolio'), to: '/posts' },
            { label: t('footer.contact'),   to: '/contact' },
            { label: t('footer.admin'),     to: '/admin' },
          ].map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="font-sans text-xs tracking-[0.2em] uppercase hover:text-[#C9A96E] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="font-sans text-xs tracking-wider">
          &copy; {year} Dzejlan. {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}
