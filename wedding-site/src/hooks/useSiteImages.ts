import { use } from 'react'
import { SiteImagesContext } from '@/context/SiteImagesContext'

export function useSiteImages() {
  return use(SiteImagesContext)
}
