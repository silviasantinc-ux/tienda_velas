'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { verificarAdmin } from '@/lib/admin-auth'
import { ArrowLeft, Plus, Pencil, Trash2, Check, X } from 'lucide-react'

type Badge = { id: string; nombre: string; nombre_ca: string }

export default function AdminBadges() {
  const [items, setItems] = useState<Badge[]>([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState<Badge | null>(null)
  const [nuevo, setNuevo] = useState(false)
  const [form, setForm] = useState({ id: '', nombre: '', nombre_ca: '' })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    verificarAdmin().then((ok) => { if (!ok) router.replace('/admin/login'); else cargar() })
  }, [])

  const cargar = async () => {
    setCargando(true)
    const { data } = await supabase.from('badges').select('*').order('nombre')
    setItems(data ?? [])
    setCargando(false)
  }

  const guardar = async () => {
    setError(null)
    if (!form.nombre.trim()) { setError('El nombre es obligatorio'); return }
    if (nuevo && !form.id.trim()) { setError('El ID es obligatorio'); return }
    if (nuevo) {
      const { error: err } = await supabase.from('badges').insert(form)
      if (err) { setError(err.message); return }
    } else {
      const { error: err } = await supabase.from('badges').update({ nombre: form.nombre, nombre_ca: form.nombre_ca }).eq('id', form.id)
      if (err) { setError(err.message); return }
    }
    setNuevo(false); setEditando(null); setForm({ id: '', nombre: '', nombre_ca: '' })
    cargar()
  }

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar este badge?')) return
    await supabase.from('badges').delete().eq('id', id)
    cargar()
  }

  const iniciarEdicion = (b: Badge) => { setEditando(b); setNuevo(false); setForm({ id: b.id, nombre: b.nombre, nombre_ca: b.nombre_ca ?? '' }); setError(null) }
  const iniciarNuevo = () => { setNuevo(true); setEditando(null); setForm({ id: '', nombre: '', nombre_ca: '' }); setError(null) }
  const cancelar = () => { setNuevo(false); setEditando(null); setForm({ id: '', nombre: '', nombre_ca: '' }); setError(null) }

  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      <header className="bg-white border-b border-[#e0ddd8] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-[#999] hover:text-[#1b1b1b] transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
          <span className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">Badges</span>
        </div>
        <button onClick={iniciarNuevo}
          className="flex items-center gap-2 bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium px-5 py-3 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Nuevo badge
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-10 space-y-6">
        {(nuevo || editando) && (
          <div className="bg-white border border-[#e0ddd8] p-6">
            <h2 className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b] mb-4">
              {nuevo ? 'Nuevo badge' : 'Editar badge'}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {nuevo && (
                <div>
                  <label className={labelCls}>ID</label>
                  <input value={form.id} onChange={(e) => setForm(f => ({ ...f, id: e.target.value }))}
                    placeholder="ej: oferta" className={inputCls} />
                </div>
              )}
              <div>
                <label className={labelCls}>Nombre ES <span className="text-[#7d5d24]">*</span></label>
                <input value={form.nombre} onChange={(e) => setForm(f => ({ ...f, nombre: e.target.value }))}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Nombre CA</label>
                <input value={form.nombre_ca} onChange={(e) => setForm(f => ({ ...f, nombre_ca: e.target.value }))}
                  className={inputCls} />
              </div>
            </div>
            {error && <p className="text-xs text-red-600 mt-3">{error}</p>}
            <div className="flex gap-3 mt-4">
              <button onClick={guardar} className="flex items-center gap-1.5 bg-[#1b1b1b] text-[#f6f4f1] text-[10px] uppercase tracking-widest px-4 py-2.5 hover:bg-[#333] transition-colors">
                <Check className="w-3.5 h-3.5" /> Guardar
              </button>
              <button onClick={cancelar} className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] transition-colors">
                <X className="w-3.5 h-3.5" /> Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="bg-white border border-[#e0ddd8]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e0ddd8]">
                <th className={thCls}>ID</th>
                <th className={thCls}>Nombre ES</th>
                <th className={thCls}>Nombre CA</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={4} className="text-center py-10 text-sm text-[#999]">Cargando...</td></tr>
              ) : items.map((b) => (
                <tr key={b.id} className="border-b border-[#f0ede8] hover:bg-[#faf9f7] transition-colors">
                  <td className="px-6 py-4 text-[11px] text-[#999] font-mono">{b.id}</td>
                  <td className="px-4 py-4 text-sm text-[#1b1b1b]">{b.nombre}</td>
                  <td className="px-4 py-4 text-sm text-[#666]">{b.nombre_ca ?? '—'}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => iniciarEdicion(b)} className="text-[#999] hover:text-[#1b1b1b] transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => eliminar(b.id)} className="text-[#999] hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

const labelCls = 'block text-[10px] uppercase tracking-widest text-[#999] mb-2'
const inputCls = 'w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] focus:outline-none focus:border-[#1b1b1b] transition-colors'
const thCls = 'text-left text-[10px] uppercase tracking-widest text-[#999] px-6 py-4 font-medium first:px-6'
