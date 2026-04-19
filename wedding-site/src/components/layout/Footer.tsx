import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gold text-white/80 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Brand */}
        <Link to="/" className="h-14 overflow-visible flex items-center">
          <img
            src="/logo.svg"
            alt="Hallači Wedding"
            className="h-40 w-auto invert"
          />
        </Link>

        {/* Contact + Social */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-start gap-2">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-1">{t('footer.contact')}</p>
            <a href="mailto:info@halilagicweddings.com" className="font-sans text-sm text-white/70 hover:text-gold transition-colors">
              info@halilagicweddings.com
            </a>
            <a href="tel:+38761068664" className="font-sans text-sm text-white/70 hover:text-gold transition-colors">
              +387 61 068 664
            </a>
            <a href="tel:+38761181644" className="font-sans text-sm text-white/70 hover:text-gold transition-colors">
              +387 61 181 644
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a href="https://www.instagram.com/halilagic.weddings/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 hover:text-gold transition-colors duration-300">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582464824329" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/50 hover:text-gold transition-colors duration-300">
              <FacebookIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="font-sans text-xs tracking-wider text-white/30">
        <p className="font-sans text-xs tracking-wider">
          &copy; {year} Halilagic Weddings. {t('footer.copyright')}
        </p>
          Site made by{' '}
          <a
            href="https://andrijaturcic.work"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors duration-300"
          >
            @andrijaturcic
          </a>
        </p>

      </div>
    </footer>
  )
}
