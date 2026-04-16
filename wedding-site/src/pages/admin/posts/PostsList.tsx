import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminLayout } from '../AdminLayout'
import { getAllPosts, deletePost, updatePost } from '@/services/posts.service'
import type { Post } from '@/types'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'

export function PostsList() {
  const [posts,   setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const data = await getAllPosts().catch(() => [] as Post[])
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => { void load() }, [])

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await deletePost(id)
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  async function handleToggleStatus(post: Post) {
    const next = post.status === 'published' ? 'draft' : 'published'
    await updatePost(post.id, { status: next })
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: next } : p))
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#111111]">Posts</h1>
            <p className="font-sans text-sm text-[#9C9C9C] mt-1">
              {posts.length} post{posts.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-[#C9A96E] text-white font-sans text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#A8843E] transition-colors"
          >
            <Plus size={14} />
            New Post
          </Link>
        </div>

        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_120px] gap-4 px-6 py-3 border-b border-[#E8E4DF] bg-[#F8F5F0]">
            {['Post', 'Slug', 'Status', 'Actions'].map(h => (
              <span key={h} className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#9C9C9C]">
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {loading ? (
            <p className="px-6 py-10 font-sans text-sm text-[#9C9C9C]">Loading…</p>
          ) : posts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="font-sans text-sm text-[#9C9C9C] mb-4">No posts yet.</p>
              <Link
                to="/admin/posts/new"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-wide uppercase text-[#C9A96E] border border-[#C9A96E] px-5 py-2.5 hover:bg-[#C9A96E] hover:text-white transition-colors"
              >
                <Plus size={12} /> Create your first post
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#E8E4DF]">
              {posts.map(post => (
                <div
                  key={post.id}
                  className="grid grid-cols-[2fr_1fr_1fr_120px] gap-4 items-center px-6 py-4 hover:bg-[#F8F5F0]/60 transition-colors"
                >
                  {/* Post info */}
                  <div className="flex items-center gap-3 min-w-0">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-sm flex-shrink-0 bg-[#E8E4DF]" />
                    )}
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-medium text-[#111111] truncate">{post.title}</p>
                      <p className="font-sans text-xs text-[#9C9C9C] truncate">{post.description}</p>
                    </div>
                  </div>

                  {/* Slug */}
                  <p className="font-sans text-xs text-[#9C9C9C] truncate font-mono">{post.slug}</p>

                  {/* Status */}
                  <span
                    className={`justify-self-start font-sans text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {post.status}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleStatus(post)}
                      title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                      className="text-[#9C9C9C] hover:text-[#C9A96E] transition-colors cursor-pointer"
                    >
                      {post.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <Link
                      to={`/admin/posts/${post.id}/edit`}
                      className="text-[#9C9C9C] hover:text-[#C9A96E] transition-colors"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="text-[#9C9C9C] hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
