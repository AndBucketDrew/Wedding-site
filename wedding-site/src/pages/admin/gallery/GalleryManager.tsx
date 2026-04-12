import { useState, type ChangeEvent } from 'react'
import { AdminLayout } from '../AdminLayout'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getGalleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImageDoc } from '@/services/gallery.service'
import { uploadGalleryImage, deleteGalleryImage } from '@/services/storage.service'
import type { GalleryImage } from '@/types'
import { ImagePlus, Trash2, ArrowUp, ArrowDown, Pencil, Check, X } from 'lucide-react'
import { useEffect } from 'react'

export function GalleryManager() {
  const [images, setImages]       = useState<GalleryImage[]>([])
  const [loading, setLoading]     = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadPct, setUploadPct] = useState<number | null>(null)
  const [error, setError]         = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editAlt, setEditAlt]     = useState('')

  async function load() {
    setLoading(true)
    try {
      const data = await getGalleryImages()
      setImages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    e.target.value = ''
    setUploading(true)
    setError(null)

    try {
      const nextOrder = images.length > 0 ? Math.max(...images.map(i => i.order)) + 1 : 0

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const url = await uploadGalleryImage(file, pct => {
          setUploadPct(Math.round(((i / files.length) + pct / 100 / files.length) * 100))
        })
        await addGalleryImage({ url, alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '), order: nextOrder + i })
      }

      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      setUploadPct(null)
    }
  }

  async function handleDelete(image: GalleryImage) {
    if (!confirm(`Delete this image? This cannot be undone.`)) return
    setError(null)
    try {
      await deleteGalleryImageDoc(image.id)
      await deleteGalleryImage(image.url)
      setImages(prev => prev.filter(i => i.id !== image.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= images.length) return

    const next = [...images]
    const aOrder = next[index].order
    const bOrder = next[swapIndex].order
    next[index]     = { ...next[index],     order: bOrder }
    next[swapIndex] = { ...next[swapIndex], order: aOrder }
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]

    setImages(next)
    try {
      await Promise.all([
        updateGalleryImage(next[index].id,     { order: next[index].order }),
        updateGalleryImage(next[swapIndex].id, { order: next[swapIndex].order }),
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reorder failed')
      await load()
    }
  }

  function startEdit(image: GalleryImage) {
    setEditingId(image.id)
    setEditAlt(image.alt)
  }

  async function saveEdit(id: string) {
    try {
      await updateGalleryImage(id, { alt: editAlt })
      setImages(prev => prev.map(i => i.id === id ? { ...i, alt: editAlt } : i))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setEditingId(null)
    }
  }

  const inputCls = 'border border-[#E8E4DF] bg-white px-3 py-2 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors w-full'

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#111111]">Gallery</h1>
            <p className="font-sans text-xs text-[#9C9C9C] mt-1">
              {images.length} {images.length === 1 ? 'photo' : 'photos'} — these appear on the home page gallery section
            </p>
          </div>

          <label className={`flex items-center gap-2 px-5 py-3 font-sans text-xs tracking-[0.15em] uppercase cursor-pointer transition-all duration-300 ${uploading ? 'bg-[#E8E4DF] text-[#9C9C9C] pointer-events-none' : 'bg-[#C9A96E] text-white hover:bg-[#b8935a]'}`}>
            <ImagePlus size={15} />
            {uploading ? (uploadPct !== null ? `Uploading ${uploadPct}%` : 'Uploading…') : 'Upload Photos'}
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-sm font-sans text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-[#E8E4DF] rounded-sm gap-4">
            <ImagePlus size={40} className="text-[#C9A96E]" />
            <p className="font-sans text-sm text-[#9C9C9C]">No photos yet. Upload some to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, i) => (
              <div key={image.id} className="bg-white rounded-sm shadow-sm overflow-hidden group">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleMove(i, 'up')}
                      disabled={i === 0}
                      title="Move up"
                      className="p-2 bg-white/90 rounded-full hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ArrowUp size={14} className="text-[#2A2A2A]" />
                    </button>
                    <button
                      onClick={() => handleMove(i, 'down')}
                      disabled={i === images.length - 1}
                      title="Move down"
                      className="p-2 bg-white/90 rounded-full hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ArrowDown size={14} className="text-[#2A2A2A]" />
                    </button>
                    <button
                      onClick={() => startEdit(image)}
                      title="Edit alt text"
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer"
                    >
                      <Pencil size={14} className="text-[#2A2A2A]" />
                    </button>
                    <button
                      onClick={() => handleDelete(image)}
                      title="Delete"
                      className="p-2 bg-white/90 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                  {/* Order badge */}
                  <div className="absolute top-2 left-2 bg-black/50 text-white font-sans text-[10px] px-2 py-0.5 rounded-full">
                    #{i + 1}
                  </div>
                </div>

                {/* Alt text row */}
                <div className="px-3 py-2.5">
                  {editingId === image.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        value={editAlt}
                        onChange={e => setEditAlt(e.target.value)}
                        className={inputCls}
                        autoFocus
                        onKeyDown={e => {
                          if (e.key === 'Enter') saveEdit(image.id)
                          if (e.key === 'Escape') setEditingId(null)
                        }}
                      />
                      <button onClick={() => saveEdit(image.id)} className="text-[#C9A96E] hover:text-[#b8935a] flex-shrink-0 cursor-pointer">
                        <Check size={16} />
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-[#9C9C9C] hover:text-[#2A2A2A] flex-shrink-0 cursor-pointer">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <p className="font-sans text-xs text-[#6B6B6B] truncate" title={image.alt}>
                      {image.alt || <span className="text-[#C0C0C0] italic">No alt text</span>}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
