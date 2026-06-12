'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { verificarAdmin } from '@/lib/admin-auth'
import { ArrowLeft, Plus, Pencil, Trash2, Check, X, Eye, EyeOff } from 'lucide-react'
import { Aroma } from '@/types'

type FormState = { id: string; nombre: string; nombre_ca: string; activo: boolean; orden: string }
const formVacio: FormState = { id: '', nombre: '', nombre_ca: '', activo: true, orden: '0' }

export default function AdminAromas() {
  const [items, setItems] = useState<Aroma[]>([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState<Aroma | null>(null)
  const [nuevo, setNuevo] = useState(false)
  const [form, setForm] = useState<FormState>(formVacio)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    verificarAdmin().then((ok) => { if (!ok) router.replace('/admin/login'); else cargar() })
  }, [])

  const cargar = async () => {
    setCargando(true)
    const { data } = await supabase.from('aromas').select('*').order('orden').order('nombre')
    setItems(data ?? [])
    setCargando(false)
  }

  const guardar = async () => {
    setError(null)
    if (!form.nombre.trim()) { setError('El nombre es obligatorio'); return }
    const payload = {
      nombre: form.nombre.trim(),
      nombre_ca: form.nombre_ca.trim() || null,
      activo: form.activo,
      orden: parseInt(form.orden) || 0,
    }
    if (nuevo) {
      const { error: err } = await supabase.from('aromas').insert(payload)
      if (err) { setError(err.message); return }
    } else {
      const { error: err } = await supabase.from('aromas').update(payload).eq('id', form.id)
      if (err) { setError(err.message); return }
    }
    setNuevo(false); setEditando(null); setForm(formVacio); cargar()
  }

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar este aroma?')) return
    await supabase.from('aromas').delete().eq('id', id)
    cargar()
  }

  const toggleActivo = async (a: Aroma) => {
    await supabase.from('aromas').update({ activo: !a.activo }).eq('id', a.id)
    setItems((prev) => prev.map((x) => x.id === a.id ? { ...x, activo: !a.activo } : x))
  }

  const iniciarEdicion = (a: Aroma) => {
    setEditando(a); setNuevo(false)
    setForm({ id: a.id, nombre: a.nombre, nombre_ca: a.nombre_ca ?? '', activo: a.activo, orden: a.orden.toString() })
    setError(null)
  }
  const iniciarNuevo = () => { setNuevo(true); setEditando(null); setForm(formVacio); setError(null) }
  const cancelar = () => { setNuevo(false); setEditando(null); setForm(formVacio); setError(null) }

  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      <header className="bg-white border-b border-[#e0ddd8] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-[#767676] hover:text-[#1b1b1b] transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
          <span className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">Aromas para personalización</span>
        </div>
        <button onClick={iniciarNuevo}
          className="flex items-center gap-2 bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium px-5 py-3 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Nuevo aroma
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-10 space-y-6">
        {(nuevo || editando) && (
          <div className="bg-white border border-[#e0ddd8] p-6 space-y-4">
            <h2 className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">
              {nuevo ? 'Nuevo aroma' : 'Editar aroma'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Nombre ES <span className="text-[#7d5d24]">*</span></label>
                <input value={form.nombre} onChange={(e) => setForm(f => ({ ...f, nombre: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Nombre CA</label>
                <input value={form.nombre_ca} onChange={(e) => setForm(f => ({ ...f, nombre_ca: e.target.value }))} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Orden</label>
                <input type="number" min="0" value={form.orden} onChange={(e) => setForm(f => ({ ...f, orden: e.target.value }))} className={inputCls} />
              </div>
              <div className="flex items-end pb-1">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setForm(f => ({ ...f, activo: !f.activo }))}
                    className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${form.activo ? 'bg-[#7d5d24]' : 'bg-[#d0cdc8]'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${form.activo ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <span className="text-[11px] uppercase tracking-widest text-[#666]">{form.activo ? 'Visible' : 'Oculto'}</span>
                </div>
              </div>
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div className="flex gap-3">
              <button onClick={guardar} className="flex items-center gap-1.5 bg-[#1b1b1b] text-[#f6f4f1] text-[10px] uppercase tracking-widest px-4 py-2.5 hover:bg-[#333] transition-colors">
                <Check className="w-3.5 h-3.5" /> Guardar
              </button>
              <button onClick={cancelar} className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] transition-colors">
                <X className="w-3.5 h-3.5" /> Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="bg-white border border-[#e0ddd8]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e0ddd8]">
                <th className={thCls}>Nombre ES</th>
                <th className={thCls}>Nombre CA</th>
                <th className={thCls}>Orden</th>
                <th className={thCls}>Estado</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={5} className="text-center py-10 text-sm text-[#767676]">Cargando...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-sm text-[#767676]">Sin aromas. Añade el primero.</td></tr>
              ) : items.map((a) => (
                <tr key={a.id} className="border-b border-[#f0ede8] hover:bg-[#faf9f7] transition-colors">
                  <td className="px-6 py-3 text-sm text-[#1b1b1b]">{a.nombre}</td>
                  <td className="px-4 py-3 text-sm text-[#666]">{a.nombre_ca ?? '—'}</td>
                  <td className="px-4 py-3 text-sm text-[#666]">{a.orden}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActivo(a)} title={a.activo ? 'Desactivar' : 'Activar'}
                      className={a.activo ? 'text-[#7d5d24] hover:text-[#ccc] transition-colors' : 'text-[#ccc] hover:text-[#7d5d24] transition-colors'}>
                      {a.activo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => iniciarEdicion(a)} className="text-[#767676] hover:text-[#1b1b1b] transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => eliminar(a.id)} className="text-[#767676] hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
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

const labelCls = 'block text-[10px] uppercase tracking-widest text-[#767676] mb-2'
const inputCls = 'w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] focus:outline-none focus:border-[#1b1b1b] transition-colors'
const thCls = 'text-left text-[10px] uppercase tracking-widest text-[#767676] px-6 py-4 font-medium'
