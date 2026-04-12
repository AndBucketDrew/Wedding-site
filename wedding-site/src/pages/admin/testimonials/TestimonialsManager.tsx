import { useEffect, useState } from 'react'
import { AdminLayout } from '../AdminLayout'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '@/services/testimonials.service'
import type { Testimonial, TestimonialInput } from '@/types'
import { Plus, Pencil, Trash2, Check, X, Quote } from 'lucide-react'

const EMPTY: TestimonialInput = { name: '', role: '', quote: '', avatar: '' }

export function TestimonialsManager() {
  const [items, setItems]       = useState<Testimonial[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [saving, setSaving]     = useState(false)

  // form state — null means "closed"
  const [form, setForm]         = useState<TestimonialInput | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    try {
      setItems(await getTestimonials())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditingId(null)
    setForm({ ...EMPTY })
  }

  function openEdit(t: Testimonial) {
    setEditingId(t.id)
    setForm({ name: t.name, role: t.role, quote: t.quote, avatar: t.avatar })
  }

  function closeForm() {
    setForm(null)
    setEditingId(null)
  }

  async function handleSave() {
    if (!form) return
    if (!form.name.trim() || !form.quote.trim()) {
      setError('Name and quote are required.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      if (editingId) {
        await updateTestimonial(editingId, form)
      } else {
        await addTestimonial(form)
      }
      await load()
      closeForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete testimonial from "${name}"? This cannot be undone.`)) return
    setError(null)
    try {
      await deleteTestimonial(id)
      setItems(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const inputCls = 'border border-[#E8E4DF] bg-white px-3 py-2 font-sans text-sm text-[#2A2A2A] focus:outline-none focus:border-[#C9A96E] transition-colors w-full'
  const labelCls = 'font-sans text-xs text-[#9C9C9C] uppercase tracking-wide mb-1 block'

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#111111]">Testimonials</h1>
            <p className="font-sans text-xs text-[#9C9C9C] mt-1">
              {items.length} {items.length === 1 ? 'review' : 'reviews'} — shown on the home page
            </p>
          </div>
          {!form && (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 bg-[#C9A96E] text-white font-sans text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#b8935a] transition-colors"
            >
              <Plus size={14} />
              Add Testimonial
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 font-sans text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Inline form */}
        {form && (
          <div className="bg-white border border-[#E8E4DF] p-6 mb-6 flex flex-col gap-4">
            <h2 className="font-sans text-sm font-semibold text-[#111111]">
              {editingId ? 'Edit Testimonial' : 'New Testimonial'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Name *</label>
                <input
                  className={inputCls}
                  value={form.name}
                  onChange={e => setForm(f => f && { ...f, name: e.target.value })}
                  placeholder="Sophie & James"
                />
              </div>
              <div>
                <label className={labelCls}>Role / Session type</label>
                <input
                  className={inputCls}
                  value={form.role}
                  onChange={e => setForm(f => f && { ...f, role: e.target.value })}
                  placeholder="Wedding Clients"
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Quote *</label>
              <textarea
                className={`${inputCls} resize-none`}
                rows={3}
                value={form.quote}
                onChange={e => setForm(f => f && { ...f, quote: e.target.value })}
                placeholder="Share what the client said…"
              />
            </div>

            <div>
              <label className={labelCls}>Avatar URL <span className="normal-case text-[#C0C0C0]">(optional)</span></label>
              <input
                className={inputCls}
                value={form.avatar}
                onChange={e => setForm(f => f && { ...f, avatar: e.target.value })}
                placeholder="https://…"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#C9A96E] text-white font-sans text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#b8935a] transition-colors disabled:opacity-50"
              >
                <Check size={14} />
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={closeForm}
                disabled={saving}
                className="inline-flex items-center gap-2 border border-[#E8E4DF] text-[#9C9C9C] font-sans text-xs tracking-widest uppercase px-5 py-2.5 hover:text-[#2A2A2A] transition-colors"
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : items.length === 0 && !form ? (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-[#E8E4DF] gap-4">
            <Quote size={36} className="text-[#C9A96E]" />
            <p className="font-sans text-sm text-[#9C9C9C]">No testimonials yet. Add one to get started.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map(t => (
              <div key={t.id} className="bg-white border border-[#E8E4DF] p-5 flex items-start gap-5">
                {/* Avatar */}
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-sans text-sm font-semibold text-[#C9A96E]">
                      {t.name[0]?.toUpperCase() ?? '?'}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-semibold text-[#111111]">{t.name}</p>
                  <p className="font-sans text-xs text-[#C9A96E] tracking-wide mb-2">{t.role}</p>
                  <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed line-clamp-2">{t.quote}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(t)}
                    title="Edit"
                    className="p-2 text-[#9C9C9C] hover:text-[#2A2A2A] transition-colors cursor-pointer"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    title="Delete"
                    className="p-2 text-[#9C9C9C] hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
