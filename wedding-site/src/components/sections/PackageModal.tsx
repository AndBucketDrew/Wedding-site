import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { X, CheckCircle } from 'lucide-react'

export interface PackageData {
  name: string
  price: string
  description: string
  features: string[]
  highlight?: boolean
  custom?: boolean
}

interface Props {
  pkg: PackageData
  onClose: () => void
}

const EXTRAS = [
  'dron',
  'niski-dim',
  'prskalice',
  'vatromet',
  'photobook',
  'lazni-maticar',
  'printanje',
  'dodatni-fotograf',
] as const

type ExtraKey = (typeof EXTRAS)[number]

function DotSlider({
  label,
  options,
  index,
  onChange,
}: {
  label: string
  options: string[]
  index: number
  onChange: (i: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
        {label}
      </span>

      {/* Track — dots only, no text, so lines stay tight */}
      <div className="flex items-center">
        {options.map((opt, i) => (
          <React.Fragment key={opt}>
            {i > 0 && (
              <div
                className={`h-px flex-1 transition-colors duration-200 ${
                  i <= index ? 'bg-[#C9A96E]' : 'bg-[#E8E4DF]'
                }`}
              />
            )}
            <button
              type="button"
              onClick={() => onChange(i)}
              className="group"
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                  i === index
                    ? 'bg-[#C9A96E] border-[#C9A96E] scale-110'
                    : 'bg-white border-[#C9A96E]/40 group-hover:border-[#C9A96E]'
                }`}
              />
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Labels row — grid so each label sits under its dot */}
      <div className="grid grid-cols-3">
        {options.map((opt, i) => (
          <span
            key={opt}
            onClick={() => onChange(i)}
            className={`font-sans text-xs cursor-pointer transition-colors select-none ${
              i === 0 ? 'text-left' : i === options.length - 1 ? 'text-right' : 'text-center'
            } ${i === index ? 'text-[#C9A96E] font-semibold' : 'text-[#9C9C9C]'}`}
          >
            {opt}
          </span>
        ))}
      </div>
    </div>
  )
}

export function PackageModal({ pkg, onClose }: Props) {
  const { t } = useTranslation()
  const isCustom = !!pkg.custom

  const [step, setStep] = useState<1 | 2>(isCustom ? 1 : 2)
  const [photoIdx, setPhotoIdx] = useState(0)
  const [videoIdx, setVideoIdx] = useState(0)
  const [extras, setExtras] = useState<Set<ExtraKey>>(new Set())
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function toggleExtra(key: ExtraKey) {
    setExtras(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError(null)

    const photoOptions = [
      t('packages.modal.photoOpt1'),
      t('packages.modal.photoOpt2'),
      t('packages.modal.photoOpt3'),
    ]

    let messageBody = form.message.trim()

    if (isCustom) {
      const selectedExtras = EXTRAS.filter(k => extras.has(k)).map(k =>
        t(`packages.modal.extras.${k}`)
      )
      messageBody = [
        `${t('packages.modal.packageLabel')}: ${pkg.name}`,
        `${t('packages.modal.photography')}: ${photoOptions[photoIdx]}`,
        `${t('packages.modal.video')}: ${['1h', '2h', '3h'][videoIdx]}`,
        selectedExtras.length
          ? `${t('packages.modal.extrasLabel')}: ${selectedExtras.join(', ')}`
          : null,
        messageBody ? `\n${messageBody}` : null,
      ]
        .filter(Boolean)
        .join('\n')
    } else {
      const featureLines = pkg.features.map(f => `• ${f}`).join('\n')
      messageBody = [
        `${t('packages.modal.packageLabel')}: ${pkg.name}`,
        featureLines,
        messageBody ? `\n${messageBody}` : null,
      ]
        .filter(Boolean)
        .join('\n')
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          name:    form.name,
          email:   form.email,
          phone:   form.phone,
          message: messageBody,
          time:    new Date().toLocaleString('en-GB'),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY',
      )
      setSent(true)
    } catch {
      setError(t('contact.form.error'))
    } finally {
      setSending(false)
    }
  }

  const photoOptions = [
    t('packages.modal.photoOpt1'),
    t('packages.modal.photoOpt2'),
    t('packages.modal.photoOpt3'),
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Gold accent bar */}
        <div className="h-1 bg-[#C9A96E]" />

        {/* Step progress bar (custom only) */}
        {isCustom && !sent && (
          <div className="flex gap-1 px-8 pt-6">
            {([1, 2] as const).map(s => (
              <div
                key={s}
                className={`h-0.5 flex-1 transition-colors duration-300 ${
                  s <= step ? 'bg-[#C9A96E]' : 'bg-[#E8E4DF]'
                }`}
              />
            ))}
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-5 pb-2">
          <div>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C9A96E]">
              {isCustom
                ? step === 1
                  ? t('packages.modal.step1Title')
                  : t('packages.modal.step2Title')
                : t('packages.modal.bookTitle')}
            </span>
            <h3 className="font-serif text-2xl text-[#111111] mt-0.5">{pkg.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="mt-1 text-[#9C9C9C] hover:text-[#111111] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-8 pb-8 pt-4">
          {/* ── Success state ─────────────────────────────────── */}
          {sent ? (
            <div className="flex flex-col items-center gap-6 text-center py-10">
              <CheckCircle size={48} className="text-[#C9A96E]" />
              <div>
                <h4 className="font-serif text-xl text-[#111111]">
                  {t('contact.form.successTitle')}
                </h4>
                <p className="font-sans text-sm text-[#6B6B6B] mt-2 max-w-xs mx-auto">
                  {t('contact.form.successText')}
                </p>
              </div>
              <button
                onClick={onClose}
                className="font-sans text-xs tracking-[0.25em] uppercase bg-[#C9A96E] text-white px-8 py-3 hover:bg-[#A8843E] transition-colors"
              >
                {t('packages.modal.close')}
              </button>
            </div>

          ) : isCustom && step === 1 ? (
            /* ── Step 1: services picker ──────────────────────── */
            <div className="flex flex-col gap-8">
              <DotSlider
                label={t('packages.modal.photography')}
                options={photoOptions}
                index={photoIdx}
                onChange={setPhotoIdx}
              />

              <DotSlider
                label={t('packages.modal.video')}
                options={['1h', '2h', '3h']}
                index={videoIdx}
                onChange={setVideoIdx}
              />

              <div className="flex flex-col gap-3">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                  {t('packages.modal.extrasLabel')}
                </span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {EXTRAS.map(key => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => toggleExtra(key)}
                        className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${
                          extras.has(key)
                            ? 'bg-[#C9A96E] border-[#C9A96E]'
                            : 'border-[#CCCCCC] hover:border-[#C9A96E]'
                        }`}
                      >
                        {extras.has(key) && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path
                              d="M1 4l2 2 4-4"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => toggleExtra(key)}
                        className="font-sans text-sm text-[#444444] select-none"
                      >
                        {t(`packages.modal.extras.${key}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="font-sans text-xs tracking-[0.25em] uppercase bg-[#C9A96E] text-white px-8 py-3 hover:bg-[#A8843E] transition-colors"
                >
                  {t('packages.modal.next')} →
                </button>
              </div>
            </div>

          ) : (
            /* ── Step 2 / Contact form ────────────────────────── */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {isCustom && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] self-start flex items-center gap-1.5 hover:text-[#A8843E] transition-colors -mt-1 mb-1"
                >
                  ← {t('packages.modal.back')}
                </button>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="border border-[#E8E4DF] bg-white px-3 py-2.5 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="border border-[#E8E4DF] bg-white px-3 py-2.5 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="border border-[#E8E4DF] bg-white px-3 py-2.5 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                  placeholder={t('contact.form.phonePlaceholder')}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                  {t('contact.form.message')}
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="border border-[#E8E4DF] bg-white px-3 py-2.5 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              {error && <p className="font-sans text-sm text-red-500">{error}</p>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={sending}
                  className="font-sans text-xs tracking-[0.25em] uppercase bg-[#C9A96E] text-white px-8 py-3 hover:bg-[#A8843E] transition-colors disabled:opacity-60"
                >
                  {sending ? t('contact.form.sending') : t('contact.form.send')}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
