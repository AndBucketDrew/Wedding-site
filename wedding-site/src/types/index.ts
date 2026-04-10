// ─── Post ─────────────────────────────────────────────────────────────────────
export type PostStatus = 'draft' | 'published'

export interface Post {
  id: string
  title: string
  description: string
  content: string
  coverImage: string       // URL — Storage or placeholder
  slug: string
  status: PostStatus
  createdAt: string | null
  updatedAt: string | null
}

export type PostInput = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface AppUser {
  uid: string
  email: string | null
}

// ─── Contact form ─────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  avatar: string
}
