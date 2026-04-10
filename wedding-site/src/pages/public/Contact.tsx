import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/sections/Hero'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import type { ContactFormData } from '@/types'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'

const INITIAL: ContactFormData = { name: '', email: '', phone: '', message: '' }

export function Contact() {
  const [form,      setForm]      = useState<ContactFormData>(INITIAL)
  const [sending,   setSending]   = useState(false)
  const [sent,      setSent]      = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name:    form.name,
          from_email:   form.email,
          phone:        form.phone,
          message:      form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY',
      )
      setSent(true)
      setForm(INITIAL)
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <Layout>
      <Hero
        image="https://picsum.photos/seed/dzejlan-contact/1920/600"
        eyebrow="Get in Touch"
        title="Let's Create\nSomething Beautiful"
        subtitle="Tell us about your vision and we'll make it a reality."
        fullScreen={false}
        ctaLabel={undefined}
        ctaTo={undefined}
      />

      <section className="py-24 px-6 bg-[#F8F5F0]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
          {/* Info column */}
          <div className="flex flex-col gap-10">
            <FadeIn direction="right">
              <h2 className="font-serif text-3xl text-[#111111] font-bold">
                We'd love to hear from you
              </h2>
              <p className="font-sans text-[#6B6B6B] mt-4 leading-relaxed">
                Whether you're planning a wedding, a portrait session, or a commercial shoot —
                reach out and we'll get back to you within 24 hours.
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col gap-6">
                {[
                  { icon: Mail,    label: 'Email',    value: 'hello@dzejlan.com' },
                  { icon: Phone,   label: 'Phone',    value: '+1 (555) 000-0000' },
                  { icon: MapPin,  label: 'Location', value: 'New York, NY' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-[#C9A96E] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#C9A96E]" />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">{label}</p>
                      <p className="font-sans text-sm text-[#2A2A2A] font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <img
                src="https://picsum.photos/seed/contact-side/600/400"
                alt="Studio"
                className="w-full object-cover rounded-sm"
              />
            </FadeIn>
          </div>

          {/* Form column */}
          <FadeIn delay={0.15}>
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-6 text-center h-full py-20">
                <CheckCircle size={56} className="text-[#C9A96E]" />
                <h3 className="font-serif text-2xl text-[#111111]">Message Sent!</h3>
                <p className="font-sans text-[#6B6B6B] text-sm max-w-xs">
                  Thank you for reaching out. We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="border border-[#E8E4DF] bg-white px-4 py-3 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="border border-[#E8E4DF] bg-white px-4 py-3 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                      placeholder="jane@email.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="border border-[#E8E4DF] bg-white px-4 py-3 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="border border-[#E8E4DF] bg-white px-4 py-3 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                    placeholder="Tell us about your project, event date, location..."
                  />
                </div>

                {error && (
                  <p className="font-sans text-sm text-red-500">{error}</p>
                )}

                <Button type="submit" disabled={sending} size="lg" className="self-start">
                  {sending ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </Layout>
  )
}
