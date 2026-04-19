import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { ServiceSlug, ServiceImages } from '@/types'

const EMPTY: ServiceImages = { heroImage: '', galleryImages: [] }

function docRef(slug: ServiceSlug) {
  return doc(db, 'serviceImages', slug)
}

export async function getServiceImages(slug: ServiceSlug): Promise<ServiceImages> {
  const snap = await getDoc(docRef(slug))
  if (!snap.exists()) return { ...EMPTY }
  const raw = snap.data() as Partial<ServiceImages>
  return { heroImage: raw.heroImage ?? '', galleryImages: raw.galleryImages ?? [] }
}

export async function setServiceHero(slug: ServiceSlug, url: string): Promise<void> {
  await setDoc(docRef(slug), { heroImage: url }, { merge: true })
}

export async function addServiceGalleryImage(slug: ServiceSlug, url: string): Promise<void> {
  const current = await getServiceImages(slug)
  await setDoc(docRef(slug), { galleryImages: [...current.galleryImages, url] }, { merge: true })
}

export async function removeServiceGalleryImage(slug: ServiceSlug, url: string): Promise<void> {
  const current = await getServiceImages(slug)
  await setDoc(
    docRef(slug),
    { galleryImages: current.galleryImages.filter(u => u !== url) },
    { merge: true },
  )
}
