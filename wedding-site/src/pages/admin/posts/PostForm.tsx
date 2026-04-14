/**
 * Shared form component used by both PostCreate and PostEdit.
 */
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminLayout } from '../AdminLayout'
import { Button } from '@/components/ui/Button'
import { uploadPostImage } from '@/services/storage.service'
import type { PostInput, PostStatus } from '@/types'
import { ImagePlus, X } from 'lucide-react'

interface PostFormProps {
  initialValues?: Partial<PostInput>
  onSubmit: (data: PostInput) => Promise<void>
  submitLabel: string
  pageTitle: string
}

const EMPTY: PostInput = {
  title:          '',
  title_bs:       '',
  description:    '',
  description_bs: '',
  content:        '',
  content_bs:     '',
  coverImage:     '',
  images:         [],
  slug:           '',
  status:         'draft',
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function PostForm({ initialValues, onSubmit, submitLabel, pageTitle }: PostFormProps) {
  const navigate = useNavigate()
  const [form,       setForm]       = useState<PostInput>({ ...EMPTY, ...initialValues })
  const [imageFile,    setImageFile]    = useState<File | null>(null)
  const [preview,      setPreview]      = useState<string>(initialValues?.coverImage ?? '')
  const [uploadPct,    setUploadPct]    = useState<number | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(initialValues?.images ?? [])
  const [submitting,   setSubmitting]   = useState(false)
  const [error,        setError]        = useState<string | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from title if slug hasn't been manually touched
      ...(name === 'title' && !initialValues?.slug ? { slug: toSlug(value) } : {}),
    }))
  }

  function handleImagePick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  function clearImage() {
    setImageFile(null)
    setPreview('')
    setForm(prev => ({ ...prev, coverImage: '' }))
  }

  function handleGalleryPick(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setGalleryFiles(prev => [...prev, ...files])
    setGalleryPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
    // reset input so the same file can be re-selected if removed then re-added
    e.target.value = ''
  }

  function removeGalleryImage(index: number) {
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index))
    // If the index falls within newly added files (after existing saved URLs), remove it too
    const existingCount = (initialValues?.images ?? []).length
    if (index >= existingCount) {
      setGalleryFiles(prev => prev.filter((_, i) => i !== index - existingCount))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      let coverImage = form.coverImage

      if (imageFile) {
        coverImage = await uploadPostImage(imageFile, pct => setUploadPct(pct))
        setUploadPct(null)
      }

      // Upload any new gallery images; existing URLs are already in galleryPreviews
      const existingUrls = (initialValues?.images ?? [])
      const uploadedUrls = await Promise.all(
        galleryFiles.map(f => uploadPostImage(f))
      )
      const images = [
        ...galleryPreviews.filter(p => existingUrls.includes(p)),
        ...uploadedUrls,
      ]

      await onSubmit({ ...form, coverImage, images })
      navigate('/admin/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setUploadPct(null)
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = 'border border-[#E8E4DF] bg-white px-4 py-3 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors w-full'
  const labelCls = 'font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C] mb-1.5 block'

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-[#111111]">{pageTitle}</h1>
          <button
            type="button"
            onClick={() => navigate('/admin/posts')}
            className="font-sans text-xs text-[#9C9C9C] hover:text-[#111111] transition-colors cursor-pointer"
          >
            ← Back to posts
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7 bg-white p-8 rounded-sm shadow-sm">
          {/* Cover image */}
          <div>
            <label className={labelCls}>Cover Image</label>
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Cover preview" className="w-full h-56 object-cover rounded-sm" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-3 right-3 bg-white/90 rounded-full p-1 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <X size={16} className="text-red-500" />
                </button>
                {uploadPct !== null && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-sm">
                    <div className="bg-white rounded-full px-4 py-2 font-sans text-xs font-semibold">
                      Uploading {uploadPct}%
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#E8E4DF] cursor-pointer hover:border-[#C9A96E] transition-colors rounded-sm gap-3">
                <ImagePlus size={28} className="text-[#C9A96E]" />
                <span className="font-sans text-xs text-[#9C9C9C]">Click to upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImagePick}
                />
              </label>
            )}
          </div>

          {/* Gallery images */}
          <div>
            <label className={labelCls}>Gallery Images</label>
            <div className="grid grid-cols-3 gap-3">
              {galleryPreviews.map((src, i) => (
                <div key={i} className="relative aspect-square">
                  <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover rounded-sm" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-1.5 right-1.5 bg-white/90 rounded-full p-1 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <X size={14} className="text-red-500" />
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-mist cursor-pointer hover:border-gold transition-colors rounded-sm gap-2">
                <ImagePlus size={22} className="text-[#C9A96E]" />
                <span className="font-sans text-[10px] text-mid">Add photos</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={handleGalleryPick}
                />
              </label>
            </div>
          </div>

          {/* Title */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className={labelCls}>Title (English) *</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="Wedding in Tuscany"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="title_bs" className={labelCls}>Title (Bosnian) *</label>
              <input
                id="title_bs"
                name="title_bs"
                type="text"
                required
                value={form.title_bs}
                onChange={handleChange}
                placeholder="Vjenčanje u Toskani"
                className={inputCls}
              />
            </div>
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className={labelCls}>Slug *</label>
            <input
              id="slug"
              name="slug"
              type="text"
              required
              value={form.slug}
              onChange={handleChange}
              placeholder="wedding-in-tuscany"
              className={inputCls}
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="description" className={labelCls}>Short Description (English) *</label>
              <textarea
                id="description"
                name="description"
                required
                rows={2}
                value={form.description}
                onChange={handleChange}
                placeholder="One or two sentences that appear in cards and SEO..."
                className={`${inputCls} resize-none`}
              />
            </div>
            <div>
              <label htmlFor="description_bs" className={labelCls}>Short Description (Bosnian) *</label>
              <textarea
                id="description_bs"
                name="description_bs"
                required
                rows={2}
                value={form.description_bs}
                onChange={handleChange}
                placeholder="Jedna ili dvije rečenice…"
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="content" className={labelCls}>Content (English) *</label>
              <textarea
                id="content"
                name="content"
                required
                rows={12}
                value={form.content}
                onChange={handleChange}
                placeholder="Write your post content here. Paragraph breaks are preserved."
                className={`${inputCls} resize-y`}
              />
            </div>
            <div>
              <label htmlFor="content_bs" className={labelCls}>Content (Bosnian) *</label>
              <textarea
                id="content_bs"
                name="content_bs"
                required
                rows={12}
                value={form.content_bs}
                onChange={handleChange}
                placeholder="Napišite sadržaj objave ovdje…"
                className={`${inputCls} resize-y`}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className={labelCls}>Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {error && (
            <p className="font-sans text-sm text-red-500">{error}</p>
          )}

          <div className="flex gap-4 pt-2">
            <Button type="submit" disabled={submitting} size="lg">
              {submitting ? 'Saving…' : submitLabel}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/posts')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

// ── Convenience wrappers ─────────────────────────────────────────────────────
export type { PostStatus }
