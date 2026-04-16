import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { SiteImagesProvider } from '@/context/SiteImagesContext'
import { router } from '@/router'

export default function App() {
  return (
    <AuthProvider>
      <SiteImagesProvider>
        <RouterProvider router={router} />
      </SiteImagesProvider>
    </AuthProvider>
  )
}
