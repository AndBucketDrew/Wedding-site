import { useEffect, useState } from 'react'
import { getPublishedPosts } from '@/services/posts.service'
import type { Post } from '@/types'

export function usePosts() {
  const [posts, setPosts]     = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load posts'))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading, error }
}
