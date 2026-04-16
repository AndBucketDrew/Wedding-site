import { useEffect, useState } from 'react'
import { getSiteImages } from '@/services/siteSettings.service'
import type { SiteImages } from '@/types'

export function useSiteImages() {
  const [images,  setImages]  = useState<Partial<SiteImages>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSiteImages()
      .then(setImages)
      .catch(() => setImages({}))
      .finally(() => setLoading(false))
  }, [])

  return { images, loading }
}
