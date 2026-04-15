'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)
  const [resetEnviado, setResetEnviado] = useState(false)

  const handleReset = async () => {
    if (!email) { setError('Introduce tu email primero'); return }
    setError(null)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })
    setResetEnviado(true)
  }
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setCargando(true)
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err || !data.session) {
        setError('Credenciales incorrectas')
        return
      }
      router.push('/admin')
      router.refresh()
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#f6f4f1] pt-20">
      <div className="w-full max-w-sm bg-white border border-[#e0ddd8] p-10">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#7d5d24] mb-3">llum & glow</p>
          <h1 className="font-['EB_Garamond'] text-3xl italic text-[#1b1b1b]">Panel de administración</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
            />
          </div>

          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
          {resetEnviado && <p className="text-xs text-green-700 text-center">Revisa tu email para restablecer la contraseña.</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-[#1b1b1b] hover:bg-[#333] disabled:opacity-50 text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors mt-2"
          >
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full text-[10px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] transition-colors pt-2"
          >
            ¿Has olvidado tu contraseña?
          </button>
        </form>
      </div>
    </div>
  )
}
