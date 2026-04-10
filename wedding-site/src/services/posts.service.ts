/**
 * Mock posts service — localStorage-backed CRUD with seed data.
 *
 * To switch to Firebase: replace this file with the Firestore implementation.
 * The exported function signatures are identical, so no other file changes are needed.
 */
import type { Post, PostInput } from '@/types'

const STORAGE_KEY = 'dzejlan_posts'

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_POSTS: Post[] = [
  {
    id: 'seed-1',
    title: 'Golden Hour in Tuscany',
    slug: 'golden-hour-tuscany',
    description: 'A sun-drenched wedding ceremony amid rolling hills and ancient olive groves.',
    content: `The light came in low and golden, the way it only does in late September in Tuscany.

Sophie and James had planned their wedding for two years, but nothing could have prepared them for the way the afternoon wrapped itself around that old farmhouse. The vines were heavy. The air smelled of rosemary and dry earth.

We spent the ceremony hour moving quietly through the crowd, letting moments happen rather than chasing them. The result is a collection of images that feel less like documentation and more like memory — hazy at the edges, luminous at the centre.

This is what we believe photography should do: not record a day, but preserve a feeling.`,
    coverImage: 'https://picsum.photos/seed/tuscany-wedding/1200/800',
    status: 'published',
    createdAt: new Date('2024-09-15').toISOString(),
    updatedAt: new Date('2024-09-15').toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Urban Editorial — New York',
    slug: 'urban-editorial-new-york',
    description: 'A moody editorial shoot exploring the tension between softness and the city.',
    content: `New York doesn't stop for anyone. That's precisely what makes it such a compelling backdrop.

We spent a morning in the Lower East Side, moving through alleyways and rooftops before the city fully woke up. The model — an artist herself — brought an intuitive understanding of stillness that made each frame feel considered.

We were after something specific: the way vulnerability reads differently against hard architecture. Soft fabric against concrete. A gaze turned inward in the middle of the loudest city on earth.

The images speak to that tension. They don't resolve it — they live inside it.`,
    coverImage: 'https://picsum.photos/seed/nyc-editorial/1200/800',
    status: 'published',
    createdAt: new Date('2024-11-02').toISOString(),
    updatedAt: new Date('2024-11-02').toISOString(),
  },
  {
    id: 'seed-3',
    title: 'Intimate Portrait Series',
    slug: 'intimate-portrait-series',
    description: 'Close, quiet portraits that ask nothing of their subjects except presence.',
    content: `Portraits are an act of trust.

The subject trusts that what you see in them is worth showing to the world. The photographer trusts that sitting still long enough to be seen is itself a kind of courage.

This series was shot over three days in a converted loft in Brooklyn. Natural light only. No direction beyond "just be here." The results are the most honest work we've made — unguarded, unhurried, entirely themselves.

We hope you feel it.`,
    coverImage: 'https://picsum.photos/seed/portrait-series/1200/800',
    status: 'published',
    createdAt: new Date('2025-01-20').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    id: 'seed-4',
    title: 'Spring Engagement Session',
    slug: 'spring-engagement',
    description: 'Lena and Artan, Central Park, early May — before the tourists arrived.',
    content: `We met Lena and Artan at 6am, which is the only sane time to be in Central Park in May.

By the time the light reached us through the trees, there was almost no one else around. Just the two of them, laughing at something we never quite caught, and us — trying to stay out of the way of something real.

Engagement sessions work best when they're not really sessions at all. When the couple forgets the camera exists. That happened about twenty minutes in, and everything after that was a gift.`,
    coverImage: 'https://picsum.photos/seed/spring-engagement/1200/800',
    status: 'published',
    createdAt: new Date('2025-05-08').toISOString(),
    updatedAt: new Date('2025-05-08').toISOString(),
  },
  {
    id: 'seed-5',
    title: 'Commercial Campaign — Summer Collection',
    slug: 'commercial-summer-collection',
    description: 'A lookbook shoot for an independent fashion label — minimal, clean, confident.',
    content: `Commercial work done well disappears into the product. Done exceptionally well, it gives the product a soul.

We worked with the brand team over two days to develop a visual language that felt cohesive without being sterile. The palette was built around cream, shadow, and the particular blue of late afternoon.

Every frame was deliberate. Every piece of clothing earned its space in the image.`,
    coverImage: 'https://picsum.photos/seed/summer-campaign/1200/800',
    status: 'draft',
    createdAt: new Date('2025-03-10').toISOString(),
    updatedAt: new Date('2025-03-10').toISOString(),
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function load(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_POSTS
    const parsed = JSON.parse(raw) as Post[]
    return parsed.length > 0 ? parsed : SEED_POSTS
  } catch {
    return SEED_POSTS
  }
}

function save(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

function now(): string {
  return new Date().toISOString()
}

function uid(): string {
  return `post_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getPublishedPosts(): Promise<Post[]> {
  return load()
    .filter(p => p.status === 'published')
    .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return load().find(p => p.slug === slug) ?? null
}

// ─── Admin API ────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  return load().sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
}

export async function getPostById(id: string): Promise<Post | null> {
  return load().find(p => p.id === id) ?? null
}

export async function createPost(input: PostInput): Promise<string> {
  const posts = load()
  const id    = uid()
  const post: Post = { id, ...input, createdAt: now(), updatedAt: now() }
  save([post, ...posts])
  return id
}

export async function updatePost(id: string, input: Partial<PostInput>): Promise<void> {
  const posts   = load()
  const updated = posts.map(p =>
    p.id === id ? { ...p, ...input, updatedAt: now() } : p,
  )
  save(updated)
}

export async function deletePost(id: string): Promise<void> {
  save(load().filter(p => p.id !== id))
}
