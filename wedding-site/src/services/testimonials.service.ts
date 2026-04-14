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
import type { Testimonial, TestimonialInput } from '@/types'

const COL = 'testimonials'
const testimonialsRef = () => collection(db, COL)

function tsToISO(ts: Timestamp | null | undefined): string | null {
  if (!ts) return null
  return ts.toDate().toISOString()
}

function docToTestimonial(id: string, data: DocumentData): Testimonial {
  return {
    id,
    name:      data.name      ?? '',
    role:      data.role      ?? '',
    quote:     data.quote     ?? '',
    quote_bs:  data.quote_bs  ?? '',
    avatar:    data.avatar    ?? '',
    createdAt: tsToISO(data.createdAt),
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const q    = query(testimonialsRef(), orderBy('createdAt', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => docToTestimonial(d.id, d.data()))
}

export async function addTestimonial(input: TestimonialInput): Promise<string> {
  const ref = await addDoc(testimonialsRef(), {
    ...input,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateTestimonial(id: string, input: Partial<TestimonialInput>): Promise<void> {
  await updateDoc(doc(db, COL, id), { ...input })
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id))
}
