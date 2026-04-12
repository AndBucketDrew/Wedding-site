import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookImage, GalleryHorizontal, Quote, LogOut, ExternalLink } from 'lucide-react'
import { signOut } from '@/services/auth.service'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'

const NAV = [
  { label: 'Dashboard',    to: '/admin/dashboard',    icon: LayoutDashboard },
  { label: 'Posts',        to: '/admin/posts',        icon: BookImage },
  { label: 'Gallery',      to: '/admin/gallery',      icon: GalleryHorizontal },
  { label: 'Testimonials', to: '/admin/testimonials', icon: Quote },
]

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const navigate  = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#111111] flex flex-col fixed top-0 left-0 h-full z-40">
        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/10">
          <span className="font-script text-3xl text-[#C9A96E]">Dzejlan</span>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mt-1">
            Admin
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {NAV.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all font-sans text-xs tracking-wide',
                  isActive
                    ? 'bg-[#C9A96E]/15 text-[#C9A96E]'
                    : 'text-white/50 hover:text-white hover:bg-white/5',
                )
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-5 border-t border-white/10 flex flex-col gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 font-sans text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <ExternalLink size={14} />
            View Site
          </a>
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
              <span className="font-sans text-[10px] text-[#C9A96E] font-semibold">
                {user?.email?.[0]?.toUpperCase() ?? 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[10px] text-white/60 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="text-white/30 hover:text-red-400 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-60 flex-1 flex flex-col">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
