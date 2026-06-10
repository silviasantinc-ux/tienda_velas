'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { verificarAdmin } from '@/lib/admin-auth'
import { ArrowLeft, Check } from 'lucide-react'

export default function AdminConfiguracion() {
  const [telefono, setTelefono] = useState('')
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    verificarAdmin().then((ok) => {
      if (!ok) { router.replace('/admin/login'); return }
      supabase.from('configuracion').select('valor').eq('clave', 'telefono').single()
        .then(({ data }) => {
          setTelefono(data?.valor ?? '')
          setCargando(false)
        })
    })
  }, [])

  const guardar = async () => {
    setGuardando(true)
    setError(null)
    setGuardado(false)
    const { error: err } = await supabase
      .from('configuracion')
      .upsert({ clave: 'telefono', valor: telefono.trim() })
    if (err) {
      setError(err.message)
    } else {
      setGuardado(true)
      setTimeout(() => setGuardado(false), 3000)
    }
    setGuardando(false)
  }

  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      <header className="bg-white border-b border-[#e0ddd8] px-8 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-[#767676] hover:text-[#1b1b1b] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">Configuración</span>
      </header>

      <main className="max-w-xl mx-auto px-8 py-10">
        {cargando ? (
          <p className="text-sm text-[#767676] text-center py-20">Cargando...</p>
        ) : (
          <div className="bg-white border border-[#e0ddd8] p-8 space-y-6">
            <h2 className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">WhatsApp</h2>

            <div>
              <label className={labelCls}>Número de teléfono</label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="34612345678"
                className={inputCls}
              />
              <p className="mt-2 text-[10px] text-[#999] leading-relaxed">
                Formato internacional sin el signo +. Ejemplo: 34612345678 para España.<br />
                Si está vacío, el botón de WhatsApp no se mostrará en la tienda.
              </p>
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              onClick={guardar}
              disabled={guardando}
              className="flex items-center gap-2 bg-[#1b1b1b] hover:bg-[#333] disabled:opacity-50 text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium px-6 py-3 transition-colors"
            >
              {guardado ? <Check className="w-3.5 h-3.5" /> : null}
              {guardando ? 'Guardando...' : guardado ? 'Guardado' : 'Guardar'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

const labelCls = 'block text-[10px] uppercase tracking-widest text-[#767676] mb-2'
const inputCls = 'w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] focus:outline-none focus:border-[#1b1b1b] transition-colors'
