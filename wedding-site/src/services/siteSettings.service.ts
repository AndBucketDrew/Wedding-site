import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { SiteImages } from '@/types'

const DOC = doc(db, 'siteSettings', 'images')

export async function getSiteImages(): Promise<Partial<SiteImages>> {
  const snap = await getDoc(DOC)
  return snap.exists() ? (snap.data() as Partial<SiteImages>) : {}
}

export async function updateSiteImage(key: keyof SiteImages, url: string): Promise<void> {
  await setDoc(DOC, { [key]: url }, { merge: true })
}
