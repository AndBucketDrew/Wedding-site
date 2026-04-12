import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '@/lib/firebase'

/**
 * Uploads an image to Firebase Storage under /posts/{filename}.
 * Returns the public download URL.
 * Optional `onProgress` receives 0–100.
 */
export function uploadPostImage(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const filename   = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
    const storageRef = ref(storage, `posts/${filename}`)
    const task       = uploadBytesResumable(storageRef, file)

    task.on(
      'state_changed',
      snapshot => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress?.(Math.round(pct))
      },
      err => reject(err),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        resolve(url)
      },
    )
  })
}

export async function deletePostImage(url: string): Promise<void> {
  try {
    await deleteObject(ref(storage, url))
  } catch {
    // Already deleted or external URL — ignore
  }
}

/**
 * Uploads an image to Firebase Storage under /gallery/{filename}.
 * Returns the public download URL.
 * Optional `onProgress` receives 0–100.
 */
export function uploadGalleryImage(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const filename   = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
    const storageRef = ref(storage, `gallery/${filename}`)
    const task       = uploadBytesResumable(storageRef, file)

    task.on(
      'state_changed',
      snapshot => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress?.(Math.round(pct))
      },
      err => reject(err),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        resolve(url)
      },
    )
  })
}

export async function deleteGalleryImage(url: string): Promise<void> {
  try {
    await deleteObject(ref(storage, url))
  } catch {
    // Already deleted or external URL — ignore
  }
}
