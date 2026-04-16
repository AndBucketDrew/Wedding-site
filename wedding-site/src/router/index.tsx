import { createBrowserRouter, Navigate } from 'react-router-dom'

// Public pages
import { Home }       from '@/pages/public/Home'
import { Posts }      from '@/pages/public/Posts'
import { PostDetail } from '@/pages/public/PostDetail'
import { Contact }    from '@/pages/public/Contact'
import { Service }    from '@/pages/public/Service'

// Admin pages
import { Login }          from '@/pages/admin/Login'
import { Dashboard }      from '@/pages/admin/Dashboard'
import { PostsList }      from '@/pages/admin/posts/PostsList'
import { PostCreate }     from '@/pages/admin/posts/PostCreate'
import { PostEdit }       from '@/pages/admin/posts/PostEdit'
import { GalleryManager }       from '@/pages/admin/gallery/GalleryManager'
import { TestimonialsManager } from '@/pages/admin/testimonials/TestimonialsManager'
import { SiteImagesManager }   from '@/pages/admin/site/SiteImagesManager'

// Guard
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  // ── Public ─────────────────────────────────────────────────────────────────
  { path: '/',         element: <Home /> },
  { path: '/posts',    element: <Posts /> },
  { path: '/posts/:slug', element: <PostDetail /> },
  { path: '/contact',  element: <Contact /> },
  { path: '/services/:slug', element: <Service /> },

  // ── Admin auth ─────────────────────────────────────────────────────────────
  { path: '/admin',    element: <Login /> },

  // ── Admin (protected) ──────────────────────────────────────────────────────
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: '/admin/posts',
    element: <ProtectedRoute><PostsList /></ProtectedRoute>,
  },
  {
    path: '/admin/posts/new',
    element: <ProtectedRoute><PostCreate /></ProtectedRoute>,
  },
  {
    path: '/admin/posts/:id/edit',
    element: <ProtectedRoute><PostEdit /></ProtectedRoute>,
  },
  {
    path: '/admin/gallery',
    element: <ProtectedRoute><GalleryManager /></ProtectedRoute>,
  },
  {
    path: '/admin/testimonials',
    element: <ProtectedRoute><TestimonialsManager /></ProtectedRoute>,
  },
  {
    path: '/admin/site',
    element: <ProtectedRoute><SiteImagesManager /></ProtectedRoute>,
  },

  // ── Fallback ───────────────────────────────────────────────────────────────
  { path: '*', element: <Navigate to="/" replace /> },
])
