import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[#111111] text-white/60 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Brand */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.svg"
            alt="Hallači Wedding"
            className={cn('h-14 w-auto scale-[2.75] ')}
          />
        </Link>

        {/* Contact + Social */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-start gap-2">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-1">{t('footer.contact')}</p>
            <a href="mailto:placeholder@email.com" className="font-sans text-sm text-white/70 hover:text-gold transition-colors">
              placeholder@email.com
            </a>
            <a href="tel:+000000000" className="font-sans text-sm text-white/70 hover:text-gold transition-colors">
              +000 000 000
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-white/50 hover:text-gold transition-colors duration-300">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Facebook" className="text-white/50 hover:text-gold transition-colors duration-300">
              <FacebookIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="font-sans text-xs tracking-wider text-white/30">
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
