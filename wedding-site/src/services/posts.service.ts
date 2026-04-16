import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  type Timestamp,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Post, PostInput } from '@/types'

const COL = 'posts'
const postsRef = () => collection(db, COL)

function tsToISO(ts: Timestamp | null | undefined): string | null {
  if (!ts) return null
  return ts.toDate().toISOString()
}

function docToPost(id: string, data: DocumentData): Post {
  return {
    id,
    title:          data.title          ?? '',
    title_bs:       data.title_bs       ?? '',
    description:    data.description    ?? '',
    description_bs: data.description_bs ?? '',
    content:        data.content        ?? '',
    content_bs:     data.content_bs     ?? '',
    coverImage:     data.coverImage     ?? '',
    images:         Array.isArray(data.images) ? data.images : [],
    slug:           data.slug           ?? '',
    status:         data.status         ?? 'draft',
    createdAt:      tsToISO(data.createdAt),
    updatedAt:      tsToISO(data.updatedAt),
  }
}

// ── Public ─────────────────────────────────────────────────────────────────────

export async function getPublishedPosts(): Promise<Post[]> {
  // Only filter by status — no orderBy — to avoid requiring a composite index.
  // Sort newest-first client-side instead.
  const q    = query(postsRef(), where('status', '==', 'published'))
  const snap = await getDocs(q)
  const posts = snap.docs.map(d => docToPost(d.id, d.data()))
  return posts.sort((a, b) => {
    const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0
    return tb - ta
  })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q    = query(postsRef(), where('slug', '==', slug), where('status', '==', 'published'))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return docToPost(d.id, d.data())
}

// ── Admin ──────────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  const q    = query(postsRef(), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => docToPost(d.id, d.data()))
}

export async function getPostById(id: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, COL, id))
  if (!snap.exists()) return null
  return docToPost(snap.id, snap.data())
}

export async function createPost(input: PostInput): Promise<string> {
  const ref = await addDoc(postsRef(), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updatePost(id: string, input: Partial<PostInput>): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    ...input,
    updatedAt: serverTimestamp(),
  })
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id))
}
