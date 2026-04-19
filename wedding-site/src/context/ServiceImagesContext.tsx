import { createContext, useEffect, useState, type ReactNode } from 'react'
import { getServiceImages } from '@/services/serviceImages.service'
import type { ServiceSlug, ServiceImages } from '@/types'

const SLUGS: ServiceSlug[] = ['niski-dim', 'vatromet', 'photobook', 'lazni-maticar']
const EMPTY: ServiceImages  = { heroImage: '', galleryImages: [] }

type AllServiceImages = Record<ServiceSlug, ServiceImages>

interface ServiceImagesContextValue {
  serviceImages: AllServiceImages
  loading:       boolean
  refresh:       () => void
}

const defaultAll = Object.fromEntries(SLUGS.map(s => [s, { ...EMPTY }])) as AllServiceImages

export const ServiceImagesContext = createContext<ServiceImagesContextValue>({
  serviceImages: defaultAll,
  loading:       true,
  refresh:       () => {},
})

export function ServiceImagesProvider({ children }: { children: ReactNode }) {
  const [serviceImages, setServiceImages] = useState<AllServiceImages>(defaultAll)
  const [loading, setLoading]             = useState(true)

  function load() {
    setLoading(true)
    Promise.all(SLUGS.map(slug => getServiceImages(slug).then(data => [slug, data] as const)))
      .then(entries => setServiceImages(Object.fromEntries(entries) as AllServiceImages))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  return (
    <ServiceImagesContext value={{ serviceImages, loading, refresh: load }}>
      {children}
    </ServiceImagesContext>
  )
}
