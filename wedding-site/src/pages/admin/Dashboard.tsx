import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminLayout } from './AdminLayout'
import { getAllPosts } from '@/services/posts.service'
import { Images, FileText, Eye, Plus } from 'lucide-react'
import type { Post } from '@/types'

export function Dashboard() {
  const [posts,   setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  const published = posts.filter(p => p.status === 'published').length
  const drafts    = posts.filter(p => p.status === 'draft').length

  const stats = [
    { label: 'Total Posts',      value: loading ? '–' : posts.length,   icon: Images,   color: '#C9A96E' },
    { label: 'Published',        value: loading ? '–' : published,       icon: Eye,      color: '#22C55E' },
    { label: 'Drafts',           value: loading ? '–' : drafts,          icon: FileText, color: '#9C9C9C' },
  ]

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#111111]">Dashboard</h1>
            <p className="font-sans text-sm text-[#9C9C9C] mt-1">Overview of your content</p>
          </div>
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-[#C9A96E] text-white font-sans text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#A8843E] transition-colors"
          >
            <Plus size={14} />
            New Post
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {stats.map(s => (
            <div key={s.label} className="bg-white p-6 flex items-center gap-5 rounded-sm shadow-sm">
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}18` }}
              >
                <s.icon size={20} style={{ color: s.color }} />
              </div>
              <div>
                <p className="font-sans text-3xl font-semibold text-[#111111]">{s.value}</p>
                <p className="font-sans text-xs tracking-wide text-[#9C9C9C] uppercase mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent posts */}
        <div className="bg-white rounded-sm shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DF]">
            <h2 className="font-sans text-sm font-semibold text-[#111111]">Recent Posts</h2>
            <Link to="/admin/posts" className="font-sans text-xs text-[#C9A96E] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[#E8E4DF]">
            {loading ? (
              <p className="px-6 py-8 font-sans text-sm text-[#9C9C9C]">Loading…</p>
            ) : posts.length === 0 ? (
              <p className="px-6 py-8 font-sans text-sm text-[#9C9C9C]">
                No posts yet.{' '}
                <Link to="/admin/posts/new" className="text-[#C9A96E] hover:underline">
                  Create your first post
                </Link>
              </p>
            ) : (
              posts.slice(0, 5).map(post => (
                <div key={post.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-sm flex-shrink-0 bg-[#E8E4DF]" />
                    )}
                    <div>
                      <p className="font-sans text-sm text-[#111111] font-medium">{post.title}</p>
                      <p className="font-sans text-xs text-[#9C9C9C]">{post.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-sans text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {post.status}
                    </span>
                    <Link
                      to={`/admin/posts/${post.id}/edit`}
                      className="font-sans text-xs text-[#C9A96E] hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
