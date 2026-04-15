'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  // Reset password
  const [modoReset, setModoReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetEnviado, setResetEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

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

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })
    setEnviando(false)
    setResetEnviado(true)
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#f6f4f1] pt-20">
      <div className="w-full max-w-sm bg-white border border-[#e0ddd8] p-10">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#7d5d24] mb-3">llum & glow</p>
          <h1 className="font-['EB_Garamond'] text-3xl italic text-[#1b1b1b]">
            {modoReset ? 'Restablecer contraseña' : 'Panel de administración'}
          </h1>
        </div>

        {!modoReset ? (
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
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#1b1b1b] hover:bg-[#333] disabled:opacity-50 text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors mt-2"
            >
              {cargando ? 'Entrando...' : 'Entrar'}
            </button>
            <p className="text-center">
              <button
                type="button"
                onClick={() => setModoReset(true)}
                className="text-[10px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] transition-colors underline underline-offset-4"
              >
                ¿Has olvidado tu contraseña?
              </button>
            </p>
          </form>
        ) : (
          <div>
            {!resetEnviado ? (
              <form onSubmit={handleReset} className="space-y-5">
                <p className="text-sm text-[#666] leading-relaxed">
                  Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    autoFocus
                    className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full bg-[#1b1b1b] hover:bg-[#333] disabled:opacity-50 text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors"
                >
                  {enviando ? 'Enviando...' : 'Enviar enlace'}
                </button>
                <p className="text-center">
                  <button type="button" onClick={() => setModoReset(false)}
                    className="text-[10px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] transition-colors">
                    Volver al login
                  </button>
                </p>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <p className="text-sm text-[#666] leading-relaxed">
                  Revisa tu bandeja de entrada (y la carpeta de spam). Te hemos enviado un enlace para restablecer tu contraseña.
                </p>
                <button type="button" onClick={() => { setModoReset(false); setResetEnviado(false) }}
                  className="text-[10px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] transition-colors underline underline-offset-4">
                  Volver al login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
