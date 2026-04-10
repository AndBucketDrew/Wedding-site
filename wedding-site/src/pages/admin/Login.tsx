import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '@/services/auth.service'

export function Login() {
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
      navigate('/admin/dashboard')
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-script text-4xl text-[#C9A96E]">Dzejlan</span>
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-white/40 mt-2">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 text-white px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
              placeholder="admin@dzejlan.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 text-white px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-sans text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#C9A96E] text-white font-sans text-xs tracking-[0.25em] uppercase py-4 hover:bg-[#A8843E] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
