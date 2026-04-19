import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { SiteImagesProvider } from '@/context/SiteImagesContext'
import { ServiceImagesProvider } from '@/context/ServiceImagesContext'
import { router } from '@/router'

export default function App() {
  return (
    <AuthProvider>
      <SiteImagesProvider>
        <ServiceImagesProvider>
          <RouterProvider router={router} />
        </ServiceImagesProvider>
      </SiteImagesProvider>
    </AuthProvider>
  )
}
