// ─── Post ─────────────────────────────────────────────────────────────────────
export type PostStatus = 'draft' | 'published'

export interface Post {
  id: string
  title: string
  title_bs: string
  description: string
  description_bs: string
  content: string
  content_bs: string
  coverImage: string       // URL — Storage or placeholder
  images: string[]         // Gallery images for the post
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
  role_bs: string
  quote: string
  quote_bs: string
  avatar: string
  createdAt: string | null
}

export type TestimonialInput = Omit<Testimonial, 'id' | 'createdAt'>

// ─── Site images ──────────────────────────────────────────────────────────────
export interface SiteImages {
  heroHome:       string
  heroPortfolio:  string
  heroContact:    string
  cta:            string
  contactStudio:  string
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export interface GalleryImage {
  id: string
  url: string
  alt: string
  order: number
  createdAt: string | null
}

export type GalleryImageInput = Omit<GalleryImage, 'id' | 'createdAt'>
