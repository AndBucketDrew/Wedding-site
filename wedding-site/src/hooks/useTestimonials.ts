import { useEffect, useState } from 'react'
import { getTestimonials } from '@/services/testimonials.service'
import type { Testimonial } from '@/types'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState<string | null>(null)

  useEffect(() => {
    getTestimonials()
      .then(setTestimonials)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load testimonials'))
      .finally(() => setLoading(false))
  }, [])

  return { testimonials, loading, error }
}
