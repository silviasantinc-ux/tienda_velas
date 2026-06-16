'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Plus, Pencil, Trash2, Check, X } from 'lucide-react'

type Sinonimo = { id: string; termino: string; busca: string; activo: boolean }

const inputCls = 'w-full border border-[#e0ddd8] bg-white px-3 py-2 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors'

export default function PaginaSinonimos() {
  const [lista, setLista] = useState<Sinonimo[]>([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState<string | null>(null)
  const [form, setForm] = useState({ termino: '', busca: '' })
  const [nuevo, setNuevo] = useState(false)
  const [formNuevo, setFormNuevo] = useState({ termino: '', busca: '' })

  const cargar = async () => {
    const { data } = await supabase.from('sinonimos').select('*').order('termino')
    setLista((data as Sinonimo[]) ?? [])
    setCargando(false)
  }

  useEffect(() => { cargar() }, [])

  const guardarNuevo = async () => {
    if (!formNuevo.termino.trim() || !formNuevo.busca.trim()) return
    await supabase.from('sinonimos').insert({ termino: formNuevo.termino.trim().toLowerCase(), busca: formNuevo.busca.trim().toLowerCase(), activo: true })
    setFormNuevo({ termino: '', busca: '' })
    setNuevo(false)
    cargar()
  }

  const guardarEdicion = async (id: string) => {
    if (!form.termino.trim() || !form.busca.trim()) return
    await supabase.from('sinonimos').update({ termino: form.termino.trim().toLowerCase(), busca: form.busca.trim().toLowerCase() }).eq('id', id)
    setEditando(null)
    cargar()
  }

  const toggleActivo = async (s: Sinonimo) => {
    await supabase.from('sinonimos').update({ activo: !s.activo }).eq('id', s.id)
    setLista((prev) => prev.map((x) => x.id === s.id ? { ...x, activo: !s.activo } : x))
  }

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar este sinónimo?')) return
    await supabase.from('sinonimos').delete().eq('id', id)
    setLista((prev) => prev.filter((x) => x.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      <header className="bg-white border-b border-[#e0ddd8] px-8 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-[#767676] hover:text-[#1b1b1b] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">Sinónimos de búsqueda</span>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-[#767676]">
            Cuando el cliente escriba el <strong>término</strong>, se buscará por el <strong>equivalente</strong>. Ej: "candela" → "vela"
          </p>
          <button
            onClick={() => setNuevo(true)}
            className="flex items-center gap-1.5 bg-[#1b1b1b] text-[#f6f4f1] text-[10px] uppercase tracking-widest px-4 py-2.5 hover:bg-[#333] transition-colors"
          >
            <Plus className="w-3 h-3" /> Añadir
          </button>
        </div>

        <div className="mt-6 border border-[#e0ddd8] bg-white divide-y divide-[#f0ede8]">
          {/* Cabecera */}
          <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-4 px-4 py-2 bg-[#f6f4f1]">
            <p className="text-[10px] uppercase tracking-widest text-[#767676]">El cliente escribe</p>
            <p className="text-[10px] uppercase tracking-widest text-[#767676]">Se busca por</p>
            <p className="text-[10px] uppercase tracking-widest text-[#767676]">Activo</p>
            <p></p>
          </div>

          {/* Fila nueva */}
          {nuevo && (
            <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-4 items-center px-4 py-3 bg-[#fffdf9]">
              <input value={formNuevo.termino} onChange={(e) => setFormNuevo((f) => ({ ...f, termino: e.target.value }))} placeholder="candela" className={inputCls} autoFocus />
              <input value={formNuevo.busca} onChange={(e) => setFormNuevo((f) => ({ ...f, busca: e.target.value }))} placeholder="vela" className={inputCls} />
              <div />
              <div className="flex gap-2">
                <button onClick={guardarNuevo} className="text-[#7d5d24] hover:text-[#1b1b1b] transition-colors"><Check className="w-4 h-4" /></button>
                <button onClick={() => setNuevo(false)} className="text-[#ccc] hover:text-[#b97979] transition-colors"><X className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {cargando && (
            <p className="px-4 py-6 text-sm text-[#767676]">Cargando...</p>
          )}

          {!cargando && lista.length === 0 && !nuevo && (
            <p className="px-4 py-6 text-sm text-[#767676] text-center">Sin sinónimos. Añade el primero.</p>
          )}

          {lista.map((s) => (
            <div key={s.id} className="grid grid-cols-[1fr_1fr_80px_80px] gap-4 items-center px-4 py-3">
              {editando === s.id ? (
                <>
                  <input value={form.termino} onChange={(e) => setForm((f) => ({ ...f, termino: e.target.value }))} className={inputCls} autoFocus />
                  <input value={form.busca} onChange={(e) => setForm((f) => ({ ...f, busca: e.target.value }))} className={inputCls} />
                  <div />
                  <div className="flex gap-2">
                    <button onClick={() => guardarEdicion(s.id)} className="text-[#7d5d24] hover:text-[#1b1b1b] transition-colors"><Check className="w-4 h-4" /></button>
                    <button onClick={() => setEditando(null)} className="text-[#ccc] hover:text-[#b97979] transition-colors"><X className="w-4 h-4" /></button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#1b1b1b]">{s.termino}</p>
                  <p className="text-sm text-[#7d5d24]">→ {s.busca}</p>
                  <button
                    onClick={() => toggleActivo(s)}
                    className={`text-[10px] uppercase tracking-widest font-medium transition-colors ${s.activo ? 'text-[#7d5d24]' : 'text-[#ccc]'}`}
                  >
                    {s.activo ? 'Sí' : 'No'}
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditando(s.id); setForm({ termino: s.termino, busca: s.busca }) }} className="text-[#767676] hover:text-[#1b1b1b] transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => eliminar(s.id)} className="text-[#ccc] hover:text-[#b97979] transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
