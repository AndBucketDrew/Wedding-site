import { useState, type ChangeEvent } from 'react'
import { AdminLayout } from '../AdminLayout'
import { useServiceImages } from '@/hooks/useServiceImages'
import { uploadServiceImage, deleteServiceImage } from '@/services/storage.service'
import {
  setServiceHero,
  addServiceGalleryImage,
  removeServiceGalleryImage,
} from '@/services/serviceImages.service'
import type { ServiceSlug } from '@/types'
import { ImagePlus, CheckCircle, X, Images } from 'lucide-react'

const SERVICES: { slug: ServiceSlug; label: string }[] = [
  { slug: 'niski-dim', label: 'Dancing on Clouds' },
  { slug: 'vatromet', label: 'Fireworks' },
  { slug: 'photobook', label: 'Photobook' },
  { slug: 'lazni-maticar', label: 'Fake Officiant' },
]

export function ServicesManager() {
  const { serviceImages, refresh } = useServiceImages()

  const [heroUploading, setHeroUploading] = useState<ServiceSlug | null>(null)
  const [heroUploadPct, setHeroUploadPct] = useState<number | null>(null)
  const [heroSaved, setHeroSaved] = useState<ServiceSlug | null>(null)
  const [galleryUploading, setGalleryUploading] = useState<ServiceSlug | null>(null)
  const [galleryUploadPct, setGalleryUploadPct] = useState<number | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleHeroUpload(slug: ServiceSlug, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setHeroUploading(slug)
    setHeroUploadPct(0)
    setError(null)
    try {
      const url = await uploadServiceImage(slug, file, pct => setHeroUploadPct(pct))
      await setServiceHero(slug, url)
      refresh()
      setHeroSaved(slug)
      setTimeout(() => setHeroSaved(null), 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setHeroUploading(null)
      setHeroUploadPct(null)
    }
  }

  async function handleGalleryUpload(slug: ServiceSlug, e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    e.target.value = ''
    setGalleryUploading(slug)
    setGalleryUploadPct(0)
    setError(null)
    try {
      for (const file of files) {
        const url = await uploadServiceImage(slug, file, pct => setGalleryUploadPct(pct))
        await addServiceGalleryImage(slug, url)
      }
      refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setGalleryUploading(null)
      setGalleryUploadPct(null)
    }
  }

  async function handleDeleteGallery(slug: ServiceSlug, url: string) {
    setDeleting(url)
    setError(null)
    try {
      await deleteServiceImage(url)
      await removeServiceGalleryImage(slug, url)
      refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-charcoal">Services</h1>
          <p className="font-sans text-xs text-mid mt-1">
            Manage the hero image and photo gallery for each service page
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-sm font-sans text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-10">
          {SERVICES.map(({ slug, label }) => {
            const data = serviceImages[slug] ?? { heroImage: '', galleryImages: [] }
            const isHeroUploading = heroUploading === slug
            const isHeroSaved = heroSaved === slug
            const isGalUploading = galleryUploading === slug

            return (
              <div key={slug} className="bg-white rounded-sm shadow-sm overflow-hidden">
                {/* Service header */}
                <div className="px-6 py-4 border-b border-[#F0EDE8]">
                  <h2 className="font-serif text-xl text-charcoal">{label}</h2>
                </div>

                <div className="p-6 flex flex-col gap-8">
                  {/* Hero image */}
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-mid mb-3">
                      Hero Image
                    </p>
                    <div className="flex gap-5 items-start">
                      {/* Preview */}
                      <div className="relative w-48 aspect-video bg-cream rounded-sm overflow-hidden shrink-0">
                        {data.heroImage ? (
                          <img
                            src={data.heroImage}
                            alt={`${label} hero`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImagePlus size={24} className="text-gold/40" />
                          </div>
                        )}

                        {isHeroUploading && (
                          <div className="absolute inset-0 bg-charcoal/60 flex flex-col items-center justify-center gap-2">
                            <div className="w-3/4 h-1 bg-white/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold transition-all duration-200"
                                style={{ width: `${heroUploadPct ?? 0}%` }}
                              />
                            </div>
                            <span className="font-sans text-[10px] text-white/70 tracking-widest">
                              {heroUploadPct ?? 0}%
                            </span>
                          </div>
                        )}

                        {isHeroSaved && (
                          <div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center">
                            <CheckCircle size={28} className="text-gold" />
                          </div>
                        )}
                      </div>

                      <label
                        className={`flex items-center gap-2 px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase cursor-pointer transition-colors rounded-sm ${isHeroUploading
                            ? 'bg-mist text-mid pointer-events-none'
                            : 'bg-gold text-white hover:bg-[#b8935a]'
                          }`}
                      >
                        <ImagePlus size={13} />
                        {isHeroUploading ? 'Uploading…' : data.heroImage ? 'Replace' : 'Upload'}
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          disabled={isHeroUploading}
                          onChange={e => handleHeroUpload(slug, e)}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Gallery images */}
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-mid mb-3">
                      Gallery Images
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      {data.galleryImages.map(url => (
                        <div key={url} className="relative w-32 aspect-square rounded-sm overflow-hidden group">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleDeleteGallery(slug, url)}
                            disabled={deleting === url}
                            className="absolute top-1 right-1 w-6 h-6 bg-charcoal/70 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))}

                      {/* Add slot */}
                      <label
                        className={`w-32 aspect-square rounded-sm border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${isGalUploading
                            ? 'border-gold/40 pointer-events-none'
                            : 'border-[#D9D4CC] hover:border-gold'
                          }`}
                      >
                        {isGalUploading ? (
                          <>
                            <div className="w-3/4 h-1 bg-[#E8E4DE] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold transition-all duration-200"
                                style={{ width: `${galleryUploadPct ?? 0}%` }}
                              />
                            </div>
                            <span className="font-sans text-[9px] text-mid">{galleryUploadPct ?? 0}%</span>
                          </>
                        ) : (
                          <>
                            <Images size={18} className="text-gold/50" />
                            <span className="font-sans text-[10px] text-mid">Add photos</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="sr-only"
                          disabled={isGalUploading}
                          onChange={e => handleGalleryUpload(slug, e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
