'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [guardando, setGuardando] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmar) { setError('Las contraseñas no coinciden'); return }
    if (password.length < 6) { setError('Mínimo 6 caracteres'); return }
    setError(null)
    setGuardando(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    setGuardando(false)
    if (err) { setError(err.message); return }
    router.push('/admin')
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#f6f4f1] pt-20">
      <div className="w-full max-w-sm bg-white border border-[#e0ddd8] p-10">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#7d5d24] mb-3">llum & glow</p>
          <h1 className="font-['EB_Garamond'] text-3xl italic text-[#1b1b1b]">Nueva contraseña</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#767676] mb-2">Nueva contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required autoFocus
              className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] focus:outline-none focus:border-[#1b1b1b] transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#767676] mb-2">Confirmar contraseña</label>
            <input type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)}
              required
              className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] focus:outline-none focus:border-[#1b1b1b] transition-colors" />
          </div>
          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
          <button type="submit" disabled={guardando}
            className="w-full bg-[#1b1b1b] hover:bg-[#333] disabled:opacity-50 text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors">
            {guardando ? 'Guardando...' : 'Guardar contraseña'}
          </button>
        </form>
      </div>
    </div>
  )
}
