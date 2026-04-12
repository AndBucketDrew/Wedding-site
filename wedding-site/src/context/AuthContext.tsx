import { createContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import type { AppUser } from '@/types'

interface AuthContextValue {
  user: AppUser | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
})

function toAppUser(firebaseUser: User): AppUser {
  return { uid: firebaseUser.uid, email: firebaseUser.email }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser ? toAppUser(firebaseUser) : null)
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <AuthContext value={{ user, loading }}>
      {children}
    </AuthContext>
  )
}
