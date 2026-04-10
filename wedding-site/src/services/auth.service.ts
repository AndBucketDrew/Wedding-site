/**
 * Mock auth service — uses sessionStorage.
 * Login checks against VITE_ADMIN_EMAIL / VITE_ADMIN_PASSWORD env vars.
 *
 * To switch to Firebase: replace this file with:
 *   import { signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth'
 *   import { auth } from '@/lib/firebase'
 *   export const signIn = (e, p) => signInWithEmailAndPassword(auth, e, p)
 *   export const signOut = () => fbSignOut(auth)
 */
import type { AppUser } from '@/types'

const SESSION_KEY = 'dzejlan_admin_user'

const ADMIN_EMAIL    = import.meta.env.VITE_ADMIN_EMAIL    || 'admin@dzejlan.com'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

export async function signIn(email: string, password: string): Promise<AppUser> {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const user: AppUser = { uid: 'mock-admin', email }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return user
  }
  throw new Error('auth/invalid-credential')
}

export async function signOut(): Promise<void> {
  sessionStorage.removeItem(SESSION_KEY)
}

export function getStoredUser(): AppUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as AppUser) : null
  } catch {
    return null
  }
}
