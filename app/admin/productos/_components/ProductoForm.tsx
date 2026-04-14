'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Producto } from '@/types'
import { ArrowLeft } from 'lucide-react'

type Props = {
  modo: 'nuevo' | 'editar'
  productoInicial?: Producto
}

type Categoria = { id: string; nombre: string; nombre_ca: string }
type Badge = { id: string; nombre: string; nombre_ca: string }

export default function ProductoForm({ modo, productoInicial }: Props) {
  const router = useRouter()
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [badges, setBadges] = useState<Badge[]>([])

  useEffect(() => {
    supabase.from('categorias').select('*').order('nombre').then(({ data }) => setCategorias(data ?? []))
    supabase.from('badges').select('*').order('nombre').then(({ data }) => setBadges(data ?? []))
  }, [])

  const [form, setForm] = useState({
    id: productoInicial?.id ?? '',
    nombre: productoInicial?.nombre ?? '',
    nombre_ca: productoInicial?.nombre_ca ?? '',
    descripcion: productoInicial?.descripcion ?? '',
    descripcion_ca: productoInicial?.descripcion_ca ?? '',
    detalle: productoInicial?.detalle ?? '',
    detalle_ca: productoInicial?.detalle_ca ?? '',
    precio: productoInicial?.precio?.toString() ?? '',
    imagen_url: productoInicial?.imagen_url ?? '',
    video_url: productoInicial?.video_url ?? '',
    categoria: productoInicial?.categoria ?? '',
    stock: productoInicial?.stock?.toString() ?? '',
    badge: productoInicial?.badge ?? '',
    duracion_horas: productoInicial?.duracion_horas?.toString() ?? '',
    peso_gr: productoInicial?.peso_gr?.toString() ?? '',
    notas_aromaticas: productoInicial?.notas_aromaticas?.join(', ') ?? '',
    notas_aromaticas_ca: productoInicial?.notas_aromaticas_ca?.join(', ') ?? '',
  })

  const set = (campo: string, valor: string) => setForm((f) => ({ ...f, [campo]: valor }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setGuardando(true)

    const catObj = categorias.find((c) => c.nombre === form.categoria)

    const payload = {
      id: form.id.trim(),
      nombre: form.nombre.trim(),
      nombre_ca: form.nombre_ca.trim() || null,
      descripcion: form.descripcion.trim(),
      descripcion_ca: form.descripcion_ca.trim() || null,
      detalle: form.detalle.trim() || null,
      detalle_ca: form.detalle_ca.trim() || null,
      precio: parseFloat(form.precio),
      imagen_url: form.imagen_url.trim(),
      video_url: form.video_url.trim() || null,
      categoria: form.categoria,
      categoria_ca: catObj?.nombre_ca ?? null,
      stock: parseInt(form.stock),
      badge: form.badge || null,
      duracion_horas: form.duracion_horas ? parseInt(form.duracion_horas) : null,
      peso_gr: form.peso_gr ? parseInt(form.peso_gr) : null,
      notas_aromaticas: form.notas_aromaticas ? form.notas_aromaticas.split(',').map((s) => s.trim()).filter(Boolean) : null,
      notas_aromaticas_ca: form.notas_aromaticas_ca ? form.notas_aromaticas_ca.split(',').map((s) => s.trim()).filter(Boolean) : null,
    }

    try {
      if (modo === 'nuevo') {
        const { error: err } = await supabase.from('productos').insert(payload)
        if (err) throw err
      } else {
        const { error: err } = await supabase.from('productos').update(payload).eq('id', payload.id)
        if (err) throw err
      }
      router.push('/admin')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      <header className="bg-white border-b border-[#e0ddd8] px-8 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-[#999] hover:text-[#1b1b1b] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">
          {modo === 'nuevo' ? 'Nuevo producto' : 'Editar producto'}
        </span>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {modo === 'nuevo' && (
            <Field label="ID (único, sin espacios)" required>
              <input type="text" value={form.id} onChange={(e) => set('id', e.target.value)}
                required placeholder="ej: vela-rosa" className={inputCls} />
            </Field>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre (ES)" required>
              <input type="text" value={form.nombre} onChange={(e) => set('nombre', e.target.value)}
                required className={inputCls} />
            </Field>
            <Field label="Nombre (CA)">
              <input type="text" value={form.nombre_ca} onChange={(e) => set('nombre_ca', e.target.value)}
                className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Descripción corta (ES)" required>
              <textarea value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)}
                required rows={3} className={inputCls + ' resize-none'} />
            </Field>
            <Field label="Descripción corta (CA)">
              <textarea value={form.descripcion_ca} onChange={(e) => set('descripcion_ca', e.target.value)}
                rows={3} className={inputCls + ' resize-none'} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Texto detallado (ES)">
              <textarea value={form.detalle} onChange={(e) => set('detalle', e.target.value)}
                rows={5} placeholder="Texto completo que aparece en la página de detalle del producto..."
                className={inputCls + ' resize-none'} />
            </Field>
            <Field label="Texto detallado (CA)">
              <textarea value={form.detalle_ca} onChange={(e) => set('detalle_ca', e.target.value)}
                rows={5} className={inputCls + ' resize-none'} />
            </Field>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Field label="Precio (€)" required>
              <input type="number" step="0.01" min="0" value={form.precio}
                onChange={(e) => set('precio', e.target.value)} required className={inputCls} />
            </Field>
            <Field label="Stock" required>
              <input type="number" min="0" value={form.stock}
                onChange={(e) => set('stock', e.target.value)} required className={inputCls} />
            </Field>
            <Field label="Categoría" required>
              <select value={form.categoria} onChange={(e) => set('categoria', e.target.value)}
                required className={inputCls}>
                <option value="">— Seleccionar —</option>
                {categorias.map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
              </select>
            </Field>
            <Field label="Badge">
              <select value={form.badge} onChange={(e) => set('badge', e.target.value)}
                className={inputCls}>
                <option value="">— Ninguno —</option>
                {badges.map((b) => <option key={b.id} value={b.id}>{b.nombre}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="URL imagen" required>
              <input type="text" value={form.imagen_url} onChange={(e) => set('imagen_url', e.target.value)}
                required placeholder="/imagen.jpg o https://..." className={inputCls} />
            </Field>
            <Field label="URL vídeo (opcional)">
              <input type="text" value={form.video_url} onChange={(e) => set('video_url', e.target.value)}
                placeholder="/video.mp4" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Duración (horas)">
              <input type="number" min="0" value={form.duracion_horas}
                onChange={(e) => set('duracion_horas', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Peso (gramos)">
              <input type="number" min="0" value={form.peso_gr}
                onChange={(e) => set('peso_gr', e.target.value)} className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Notas aromáticas ES (separadas por coma)">
              <input type="text" value={form.notas_aromaticas}
                onChange={(e) => set('notas_aromaticas', e.target.value)}
                placeholder="Lavanda, Bergamota, Almizcle" className={inputCls} />
            </Field>
            <Field label="Notas aromáticas CA">
              <input type="text" value={form.notas_aromaticas_ca}
                onChange={(e) => set('notas_aromaticas_ca', e.target.value)}
                placeholder="Lavanda, Bergamota, Almesc blanc" className={inputCls} />
            </Field>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={guardando}
              className="bg-[#1b1b1b] hover:bg-[#333] disabled:opacity-50 text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium px-8 py-4 transition-colors">
              {guardando ? 'Guardando...' : (modo === 'nuevo' ? 'Crear producto' : 'Guardar cambios')}
            </button>
            <Link href="/admin"
              className="text-[10px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] transition-colors">
              Cancelar
            </Link>
          </div>

        </form>
      </main>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">
        {label}{required && <span className="text-[#7d5d24] ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors'
