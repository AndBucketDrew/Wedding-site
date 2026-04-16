import { useState, type ChangeEvent } from 'react'
import { AdminLayout } from '../AdminLayout'
import { updateSiteImage } from '@/services/siteSettings.service'
import { uploadSiteImage } from '@/services/storage.service'
import { useSiteImages } from '@/hooks/useSiteImages'
import type { SiteImages } from '@/types'
import { ImagePlus, CheckCircle } from 'lucide-react'

interface Slot {
  key:   keyof SiteImages
  label: string
  desc:  string
}

const SLOTS: Slot[] = [
  { key: 'heroHome',      label: 'Home Hero',          desc: 'Full-screen hero on the landing page' },
  { key: 'heroPortfolio', label: 'Portfolio Hero',      desc: 'Banner on the Portfolio page' },
  { key: 'heroContact',   label: 'Contact Hero',        desc: 'Banner on the Contact page' },
  { key: 'cta',           label: 'CTA Background',      desc: 'Background for the "Book Now" call-to-action section' },
  { key: 'contactStudio', label: 'Contact Studio',      desc: 'Studio photo on the Contact page sidebar' },
]

export function SiteImagesManager() {
  const { images, refresh } = useSiteImages()
  const [uploading, setUploading] = useState<keyof SiteImages | null>(null)
  const [uploadPct, setUploadPct] = useState<number | null>(null)
  const [saved,     setSaved]     = useState<keyof SiteImages | null>(null)
  const [error,     setError]     = useState<string | null>(null)

  async function handleUpload(key: keyof SiteImages, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setUploading(key)
    setUploadPct(0)
    setError(null)

    try {
      const url = await uploadSiteImage(key, file, pct => setUploadPct(pct))
      await updateSiteImage(key, url)
      refresh()
      setSaved(key)
      setTimeout(() => setSaved(null), 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(null)
      setUploadPct(null)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-charcoal">Site Images</h1>
          <p className="font-sans text-xs text-mid mt-1">
            Upload custom images for key sections across the site
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-sm font-sans text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SLOTS.map(({ key, label, desc }) => {
            const current   = images[key]
            const isUploading = uploading === key
            const isSaved     = saved === key

            return (
              <div key={key} className="bg-white rounded-sm shadow-sm overflow-hidden flex flex-col">
                {/* Preview */}
                <div className="relative aspect-video bg-cream overflow-hidden">
                  {current ? (
                    <img
                      src={current}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImagePlus size={28} className="text-gold/40" />
                    </div>
                  )}

                  {/* Upload progress overlay */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-charcoal/60 flex flex-col items-center justify-center gap-2">
                      <div className="w-3/4 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold transition-all duration-200"
                          style={{ width: `${uploadPct ?? 0}%` }}
                        />
                      </div>
                      <span className="font-sans text-[10px] text-white/70 tracking-widest">
                        {uploadPct ?? 0}%
                      </span>
                    </div>
                  )}

                  {/* Saved indicator */}
                  {isSaved && (
                    <div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center">
                      <CheckCircle size={32} className="text-gold" />
                    </div>
                  )}
                </div>

                {/* Info + upload */}
                <div className="px-4 py-3 flex flex-col gap-3 flex-1">
                  <div>
                    <p className="font-sans text-sm font-medium text-charcoal">{label}</p>
                    <p className="font-sans text-[11px] text-mid mt-0.5 leading-relaxed">{desc}</p>
                  </div>

                  <label
                    className={`mt-auto flex items-center justify-center gap-2 px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase cursor-pointer transition-colors rounded-sm ${
                      isUploading
                        ? 'bg-mist text-mid pointer-events-none'
                        : 'bg-gold text-white hover:bg-[#b8935a]'
                    }`}
                  >
                    <ImagePlus size={13} />
                    {isUploading ? 'Uploading…' : current ? 'Replace' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      disabled={isUploading}
                      onChange={e => handleUpload(key, e)}
                    />
                  </label>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
