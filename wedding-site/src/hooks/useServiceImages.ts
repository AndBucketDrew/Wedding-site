import { use } from 'react'
import { ServiceImagesContext } from '@/context/ServiceImagesContext'

export function useServiceImages() {
  return use(ServiceImagesContext)
}
