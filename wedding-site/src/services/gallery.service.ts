import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  type Timestamp,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { GalleryImage, GalleryImageInput } from '@/types'

const COL = 'gallery'
const galleryRef = () => collection(db, COL)

function tsToISO(ts: Timestamp | null | undefined): string | null {
  if (!ts) return null
  return ts.toDate().toISOString()
}

function docToImage(id: string, data: DocumentData): GalleryImage {
  return {
    id,
    url:       data.url       ?? '',
    alt:       data.alt       ?? '',
    order:     data.order     ?? 0,
    createdAt: tsToISO(data.createdAt),
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const q    = query(galleryRef(), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => docToImage(d.id, d.data()))
}

export async function addGalleryImage(input: GalleryImageInput): Promise<string> {
  const ref = await addDoc(galleryRef(), {
    ...input,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateGalleryImage(id: string, input: Partial<GalleryImageInput>): Promise<void> {
  await updateDoc(doc(db, COL, id), { ...input })
}

export async function deleteGalleryImageDoc(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id))
}
