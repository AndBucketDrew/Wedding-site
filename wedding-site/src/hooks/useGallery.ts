import { useEffect, useState } from 'react'
import { getGalleryImages } from '@/services/gallery.service'
import type { GalleryImage } from '@/types'

export function useGallery() {
  const [images, setImages]   = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    getGalleryImages()
      .then(setImages)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load gallery'))
      .finally(() => setLoading(false))
  }, [])

  return { images, loading, error }
}
