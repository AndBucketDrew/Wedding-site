import { createPost } from '@/services/posts.service'
import { PostForm } from './PostForm'
import type { PostInput } from '@/types'

export function PostCreate() {
  async function handleSubmit(data: PostInput) {
    await createPost(data)
  }

  return (
    <PostForm
      pageTitle="New Post"
      submitLabel="Create Post"
      onSubmit={handleSubmit}
    />
  )
}
