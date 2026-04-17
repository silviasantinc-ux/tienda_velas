'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { verificarAdmin } from '@/lib/admin-auth'
import { ArrowLeft, Plus, Pencil, Trash2, Check, X, Upload } from 'lucide-react'

type Categoria = {
  id: string
  nombre: string
  nombre_ca: string
  descripcion: string
  descripcion_ca: string
  imagen_url: string
}

type FormState = {
  id: string
  nombre: string
  nombre_ca: string
  descripcion: string
  descripcion_ca: string
  imagen_url: string
}

const formVacio: FormState = { id: '', nombre: '', nombre_ca: '', descripcion: '', descripcion_ca: '', imagen_url: '' }

export default function AdminCategorias() {
  const [items, setItems] = useState<Categoria[]>([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState<Categoria | null>(null)
  const [nuevo, setNuevo] = useState(false)
  const [form, setForm] = useState<FormState>(formVacio)
  const [error, setError] = useState<string | null>(null)
  const [subiendo, setSubiendo] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    verificarAdmin().then((ok) => { if (!ok) router.replace('/admin/login'); else cargar() })
  }, [])

  const cargar = async () => {
    setCargando(true)
    const { data } = await supabase.from('categorias').select('*').order('nombre')
    setItems(data ?? [])
    setCargando(false)
  }

  const subirImagen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSubiendo(true)
    const ext = file.name.split('.').pop()
    const nombre = `cat-${Date.now()}.${ext}`
    const { error: err } = await supabase.storage.from('productos').upload(nombre, file, { upsert: true })
    if (err) { setError('Error al subir imagen: ' + err.message); setSubiendo(false); return }
    const { data } = supabase.storage.from('productos').getPublicUrl(nombre)
    setForm((f) => ({ ...f, imagen_url: data.publicUrl }))
    setSubiendo(false)
    e.target.value = ''
  }

  const guardar = async () => {
    setError(null)
    if (!form.nombre.trim()) { setError('El nombre es obligatorio'); return }
    if (nuevo && !form.id.trim()) { setError('El ID es obligatorio'); return }

    const payload = {
      nombre: form.nombre.trim(),
      nombre_ca: form.nombre_ca.trim() || null,
      descripcion: form.descripcion.trim() || null,
      descripcion_ca: form.descripcion_ca.trim() || null,
      imagen_url: form.imagen_url || null,
    }

    if (nuevo) {
      const { error: err } = await supabase.from('categorias').insert({ id: form.id.trim(), ...payload })
      if (err) { setError(err.message); return }
    } else {
      const { error: err } = await supabase.from('categorias').update(payload).eq('id', form.id)
      if (err) { setError(err.message); return }
    }
    setNuevo(false); setEditando(null); setForm(formVacio)
    cargar()
  }

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar esta categoría?')) return
    await supabase.from('categorias').delete().eq('id', id)
    cargar()
  }

  const iniciarEdicion = (c: Categoria) => {
    setEditando(c); setNuevo(false)
    setForm({ id: c.id, nombre: c.nombre, nombre_ca: c.nombre_ca ?? '', descripcion: c.descripcion ?? '', descripcion_ca: c.descripcion_ca ?? '', imagen_url: c.imagen_url ?? '' })
    setError(null)
  }
  const iniciarNuevo = () => { setNuevo(true); setEditando(null); setForm(formVacio); setError(null) }
  const cancelar = () => { setNuevo(false); setEditando(null); setForm(formVacio); setError(null) }

  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      <header className="bg-white border-b border-[#e0ddd8] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-[#767676] hover:text-[#1b1b1b] transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
          <span className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">Categorías</span>
        </div>
        <button onClick={iniciarNuevo}
          className="flex items-center gap-2 bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium px-5 py-3 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Nueva categoría
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-10 space-y-6">
        {(nuevo || editando) && (
          <div className="bg-white border border-[#e0ddd8] p-6 space-y-4">
            <h2 className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">
              {nuevo ? 'Nueva categoría' : 'Editar categoría'}
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {nuevo && (
                <div>
                  <label className={labelCls}>ID <span className="text-[#7d5d24]">*</span></label>
                  <input value={form.id} onChange={(e) => setForm(f => ({ ...f, id: e.target.value }))}
                    placeholder="ej: flores" className={inputCls} />
                </div>
              )}
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
                <label className={labelCls}>Descripción ES</label>
                <input value={form.descripcion} onChange={(e) => setForm(f => ({ ...f, descripcion: e.target.value }))}
                  placeholder="Fragancias cálidas inspiradas en…" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Descripció CA</label>
                <input value={form.descripcion_ca} onChange={(e) => setForm(f => ({ ...f, descripcion_ca: e.target.value }))} className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Imagen de colección</label>
              <div className="flex items-center gap-4">
                {form.imagen_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.imagen_url} alt="" className="w-20 h-20 object-cover border border-[#e0ddd8]" />
                )}
                <input ref={fileRef} type="file" accept="image/*" onChange={subirImagen} className="hidden" />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={subiendo}
                  className="flex items-center gap-1.5 border border-[#e0ddd8] bg-white px-4 py-2.5 text-[10px] uppercase tracking-widest text-[#666] hover:border-[#1b1b1b] hover:text-[#1b1b1b] transition-colors disabled:opacity-40">
                  <Upload className="w-3 h-3" />
                  {subiendo ? 'Subiendo…' : form.imagen_url ? 'Cambiar imagen' : 'Subir imagen'}
                </button>
                {form.imagen_url && (
                  <button type="button" onClick={() => setForm(f => ({ ...f, imagen_url: '' }))}
                    className="text-[#ccc] hover:text-[#b97979] transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
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
                <th className={thCls}>Imagen</th>
                <th className={thCls}>Nombre ES</th>
                <th className={thCls}>Nombre CA</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={4} className="text-center py-10 text-sm text-[#767676]">Cargando...</td></tr>
              ) : items.map((c) => (
                <tr key={c.id} className="border-b border-[#f0ede8] hover:bg-[#faf9f7] transition-colors">
                  <td className="px-6 py-3">
                    {c.imagen_url
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={c.imagen_url} alt="" className="w-12 h-12 object-cover border border-[#e0ddd8]" />
                      : <div className="w-12 h-12 bg-[#f0ede8] border border-[#e0ddd8] flex items-center justify-center">
                          <span className="text-[8px] text-[#ccc] uppercase tracking-widest">Sin img</span>
                        </div>
                    }
                  </td>
                  <td className="px-4 py-3 text-sm text-[#1b1b1b]">{c.nombre}</td>
                  <td className="px-4 py-3 text-sm text-[#666]">{c.nombre_ca ?? '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => iniciarEdicion(c)} className="text-[#767676] hover:text-[#1b1b1b] transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => eliminar(c.id)} className="text-[#767676] hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
