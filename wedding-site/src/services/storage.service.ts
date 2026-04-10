/**
 * Mock storage service — converts images to base64 and stores in localStorage.
 * Images persist across page refreshes and survive for the session.
 *
 * To switch to Firebase Storage: replace this file with the Firebase implementation.
 * The exported function signatures are identical.
 */

const IMAGE_KEY_PREFIX = 'dzejlan_img_'

/**
 * "Uploads" an image by reading it as a base64 data URL and storing it in
 * localStorage. Returns a data URL that can be used as an <img> src directly.
 * The optional `onProgress` callback is called with 0 → 100 as the file is read.
 */
export function uploadPostImage(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onprogress = e => {
      if (e.lengthComputable) {
        onProgress?.(Math.round((e.loaded / e.total) * 100))
      }
    }

    reader.onload = () => {
      const dataUrl = reader.result as string
      const key     = `${IMAGE_KEY_PREFIX}${Date.now()}`
      try {
        localStorage.setItem(key, dataUrl)
      } catch {
        // localStorage full — fall back to in-memory object URL
        const objUrl = URL.createObjectURL(file)
        resolve(objUrl)
        return
      }
      onProgress?.(100)
      resolve(dataUrl)
    }

    reader.onerror = () => reject(new Error('Failed to read image file.'))
    reader.readAsDataURL(file)
  })
}

export async function deletePostImage(url: string): Promise<void> {
  // Find and remove the matching localStorage entry
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(IMAGE_KEY_PREFIX) && localStorage.getItem(key) === url) {
      localStorage.removeItem(key)
      break
    }
  }
}
