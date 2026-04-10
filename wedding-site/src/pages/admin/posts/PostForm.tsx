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
  title:       '',
  description: '',
  content:     '',
  coverImage:  '',
  slug:        '',
  status:      'draft',
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
  const [imageFile,  setImageFile]  = useState<File | null>(null)
  const [preview,    setPreview]    = useState<string>(initialValues?.coverImage ?? '')
  const [uploadPct,  setUploadPct]  = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState<string | null>(null)

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      let coverImage = form.coverImage

      // Upload new image if selected
      if (imageFile) {
        coverImage = await uploadPostImage(imageFile, pct => setUploadPct(pct))
        setUploadPct(null)
      }

      await onSubmit({ ...form, coverImage })
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

          {/* Title */}
          <div>
            <label htmlFor="title" className={labelCls}>Title *</label>
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
          <div>
            <label htmlFor="description" className={labelCls}>Short Description *</label>
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

          {/* Content */}
          <div>
            <label htmlFor="content" className={labelCls}>Content *</label>
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
