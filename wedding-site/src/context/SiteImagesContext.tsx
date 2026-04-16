import { createContext, useEffect, useState, type ReactNode } from 'react'
import { getSiteImages } from '@/services/siteSettings.service'
import type { SiteImages } from '@/types'

interface SiteImagesContextValue {
  images:  Partial<SiteImages>
  loading: boolean
  refresh: () => void
}

export const SiteImagesContext = createContext<SiteImagesContextValue>({
  images:  {},
  loading: true,
  refresh: () => {},
})

export function SiteImagesProvider({ children }: { children: ReactNode }) {
  const [images,  setImages]  = useState<Partial<SiteImages>>({})
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    getSiteImages()
      .then(setImages)
      .catch(() => setImages({}))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  return (
    <SiteImagesContext value={{ images, loading, refresh: load }}>
      {children}
    </SiteImagesContext>
  )
}
