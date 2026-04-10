import { createContext, useEffect, useState, type ReactNode } from 'react'
import { getStoredUser } from '@/services/auth.service'
import type { AppUser } from '@/types'

interface AuthContextValue {
  user: AppUser | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Read persisted session on mount
    setUser(getStoredUser())
    setLoading(false)

    // Sync across tabs
    function onStorage(e: StorageEvent) {
      if (e.key === 'dzejlan_admin_user') {
        setUser(getStoredUser())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <AuthContext value={{ user, loading }}>
      {children}
    </AuthContext>
  )
}
