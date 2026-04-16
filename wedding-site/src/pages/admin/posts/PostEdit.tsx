import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostById, updatePost } from '@/services/posts.service'
import { PostForm } from './PostForm'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { AdminLayout } from '../AdminLayout'
import type { Post, PostInput } from '@/types'

export function PostEdit() {
  const { id } = useParams<{ id: string }>()
  const [post,    setPost]    = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getPostById(id)
      .then(p => {
        if (!p) setError('Post not found.')
        else setPost(p)
      })
      .catch(() => setError('Failed to load post.'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(data: PostInput) {
    if (!id) return
    await updatePost(id, data)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="pt-20"><LoadingSpinner /></div>
      </AdminLayout>
    )
  }

  if (error || !post) {
    return (
      <AdminLayout>
        <p className="font-sans text-sm text-red-500 mt-8">{error ?? 'Post not found.'}</p>
      </AdminLayout>
    )
  }

  return (
    <PostForm
      pageTitle="Edit Post"
      submitLabel="Save Changes"
      initialValues={{
        title:          post.title,
        title_bs:       post.title_bs,
        description:    post.description,
        description_bs: post.description_bs,
        content:        post.content,
        content_bs:     post.content_bs,
        coverImage:     post.coverImage,
        images:         post.images,
        slug:           post.slug,
        status:         post.status,
      }}
      onSubmit={handleSubmit}
    />
  )
}
