'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Producto, ProductoImagen, ProductoVariante } from '@/types'
import { ArrowLeft, Upload, X, GripVertical, Plus } from 'lucide-react'

type Props = {
  modo: 'nuevo' | 'editar'
  productoInicial?: Producto
}

type Categoria = { id: string; nombre: string; nombre_ca: string }
type Badge = { id: string; nombre: string; nombre_ca: string }
type MediaItem = { id?: string; url: string; tipo: 'imagen' | 'video'; orden: number }
type VarianteForm = { id?: string; nombre: string; nombre_ca: string; stock: string }

const MAX_IMAGENES = 6

export default function ProductoForm({ modo, productoInicial }: Props) {
  const router = useRouter()
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [badges, setBadges] = useState<Badge[]>([])
  const [galeria, setGaleria] = useState<MediaItem[]>([])
  const [subiendo, setSubiendo] = useState(false)
  const [variantes, setVariantes] = useState<VarianteForm[]>([])
  const [variantesListas, setVariantesListas] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.from('categorias').select('*').order('nombre').then(({ data }) => setCategorias(data ?? []))
    supabase.from('badges').select('*').order('nombre').then(({ data }) => setBadges(data ?? []))

    if (modo === 'nuevo') setVariantesListas(true)

    if (modo === 'editar' && productoInicial) {
      supabase
        .from('producto_imagenes')
        .select('*')
        .eq('producto_id', productoInicial.id)
        .order('orden')
        .then(({ data }) => {
          if (data && data.length > 0) {
            setGaleria(data as MediaItem[])
          } else {
            // Producto existente sin galería: inicializar desde campos legacy
            const items: MediaItem[] = []
            if (productoInicial.imagen_url) items.push({ url: productoInicial.imagen_url, tipo: 'imagen', orden: 0 })
            if (productoInicial.video_url) items.push({ url: productoInicial.video_url, tipo: 'video', orden: items.length })
            setGaleria(items)
          }
        })

      supabase
        .from('producto_variantes')
        .select('*')
        .eq('producto_id', productoInicial.id)
        .order('orden')
        .then(({ data }) => {
          if (data && data.length > 0) {
            const lista = (data as ProductoVariante[]).map((v) => ({
              id: v.id,
              nombre: v.nombre,
              nombre_ca: v.nombre_ca ?? '',
              stock: v.stock.toString(),
            }))
            setVariantes(lista)
            const suma = lista.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0)
            setForm((f) => ({ ...f, stock: suma.toString() }))
          }
          setVariantesListas(true)
        })
    }
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
    categoria: productoInicial?.categoria ?? '',
    stock: productoInicial?.stock?.toString() ?? '',
    badge: productoInicial?.badge ?? '',
    peso_gr: productoInicial?.peso_gr?.toString() ?? '',
    alto_cm: productoInicial?.alto_cm?.toString() ?? '',
    ancho_cm: productoInicial?.ancho_cm?.toString() ?? '',
    notas_aromaticas: productoInicial?.notas_aromaticas?.join(', ') ?? '',
    notas_aromaticas_ca: productoInicial?.notas_aromaticas_ca?.join(', ') ?? '',
  })

  const set = (campo: string, valor: string) => setForm((f) => ({ ...f, [campo]: valor }))

  useEffect(() => {
    if (!variantesListas || variantes.length === 0) return
    const suma = variantes.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0)
    setForm((f) => ({ ...f, stock: suma.toString() }))
  }, [variantes, variantesListas])

  const subirArchivo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: 'imagen' | 'video'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (tipo === 'imagen' && galeria.filter((m) => m.tipo === 'imagen').length >= MAX_IMAGENES) {
      setError(`Máximo ${MAX_IMAGENES} imágenes por producto`)
      return
    }
    if (tipo === 'video' && galeria.some((m) => m.tipo === 'video')) {
      setError('Solo se permite un vídeo por producto')
      return
    }

    setSubiendo(true)
    setError(null)
    const ext = file.name.split('.').pop()
    const nombre = `${Date.now()}.${ext}`
    const { error: err } = await supabase.storage.from('productos').upload(nombre, file, { upsert: true })
    if (err) { setError('Error al subir archivo: ' + err.message); setSubiendo(false); return }
    const { data } = supabase.storage.from('productos').getPublicUrl(nombre)
    setGaleria((prev) => [...prev, { url: data.publicUrl, tipo, orden: prev.length }])
    setSubiendo(false)
    e.target.value = ''
  }

  const eliminarMedia = (idx: number) => {
    setGaleria((prev) => prev.filter((_, i) => i !== idx).map((m, i) => ({ ...m, orden: i })))
  }

  const moverArriba = (idx: number) => {
    if (idx === 0) return
    setGaleria((prev) => {
      const next = [...prev]
      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
      return next.map((m, i) => ({ ...m, orden: i }))
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setGuardando(true)

    const catObj = categorias.find((c) => c.nombre === form.categoria)
    const primeraImagen = galeria.find((m) => m.tipo === 'imagen')
    const video = galeria.find((m) => m.tipo === 'video')

    const payload = {
      id: form.id.trim(),
      nombre: form.nombre.trim(),
      nombre_ca: form.nombre_ca.trim() || null,
      descripcion: form.descripcion.trim(),
      descripcion_ca: form.descripcion_ca.trim() || null,
      detalle: form.detalle.trim() || null,
      detalle_ca: form.detalle_ca.trim() || null,
      precio: parseFloat(form.precio),
      imagen_url: primeraImagen?.url ?? '',
      video_url: video?.url ?? null,
      categoria: form.categoria,
      categoria_ca: catObj?.nombre_ca ?? null,
      stock: parseInt(form.stock),
      badge: form.badge || null,
      peso_gr: form.peso_gr ? parseInt(form.peso_gr) : null,
      alto_cm: form.alto_cm ? parseFloat(form.alto_cm) : null,
      ancho_cm: form.ancho_cm ? parseFloat(form.ancho_cm) : null,
      notas_aromaticas: form.notas_aromaticas ? form.notas_aromaticas.split(',').map((s) => s.trim()).filter(Boolean) : null,
      notas_aromaticas_ca: form.notas_aromaticas_ca ? form.notas_aromaticas_ca.split(',').map((s) => s.trim()).filter(Boolean) : null,
    }

    try {
      const productoId = payload.id

      if (modo === 'nuevo') {
        const { error: err } = await supabase.from('productos').insert(payload)
        if (err) throw err
      } else {
        const { error: err } = await supabase.from('productos').update(payload).eq('id', productoId)
        if (err) throw err
      }

      // Reemplazar galería
      await supabase.from('producto_imagenes').delete().eq('producto_id', productoId)
      if (galeria.length > 0) {
        const rows = galeria.map((m) => ({ producto_id: productoId, url: m.url, tipo: m.tipo, orden: m.orden }))
        const { error: errGal } = await supabase.from('producto_imagenes').insert(rows)
        if (errGal) throw errGal
      }

      // Reemplazar variantes
      await supabase.from('producto_variantes').delete().eq('producto_id', productoId)
      const variantesValidas = variantes.filter((v) => v.nombre.trim())
      if (variantesValidas.length > 0) {
        const rows = variantesValidas.map((v, i) => ({
          producto_id: productoId,
          nombre: v.nombre.trim(),
          nombre_ca: v.nombre_ca.trim() || null,
          stock: parseInt(v.stock) || 0,
          precio_extra: null,
          orden: i,
        }))
        const { error: errVar } = await supabase.from('producto_variantes').insert(rows)
        if (errVar) throw errVar
      }

      router.push('/admin')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setGuardando(false)
    }
  }

  const imagenes = galeria.filter((m) => m.tipo === 'imagen')
  const tieneVideo = galeria.some((m) => m.tipo === 'video')

  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      <header className="bg-white border-b border-[#e0ddd8] px-8 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-[#767676] hover:text-[#1b1b1b] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">
          {modo === 'nuevo' ? 'Nuevo producto' : 'Editar producto'}
        </span>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre (ES)" required>
              <input type="text" value={form.nombre} onChange={(e) => {
                set('nombre', e.target.value)
                if (modo === 'nuevo') {
                  const id = e.target.value.toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9\s-]/g, '').trim()
                    .replace(/\s+/g, '-')
                  set('id', id || String(Date.now()))
                }
              }} required className={inputCls} />
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
                rows={5} placeholder="Texto completo que aparece en la página de detalle..."
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
            {(() => {
              const conVariantes = variantesListas && variantes.length > 0
              return (
                <Field label={conVariantes ? 'Stock (suma variantes)' : 'Stock'} required={!conVariantes}>
                  <input
                    type="number" min="0" value={form.stock}
                    onChange={(e) => set('stock', e.target.value)}
                    required={!conVariantes}
                    readOnly={conVariantes}
                    title={conVariantes ? 'Se calcula automáticamente sumando el stock de cada variante' : undefined}
                    className={inputCls + (conVariantes ? ' bg-[#f6f4f1] text-[#767676] cursor-not-allowed' : '')}
                  />
                </Field>
              )
            })()}
            <Field label="Categoría" required>
              <select value={form.categoria} onChange={(e) => set('categoria', e.target.value)}
                required className={inputCls}>
                <option value="">— Seleccionar —</option>
                {categorias.map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
              </select>
            </Field>
            <Field label="Etiqueta">
              <select value={form.badge} onChange={(e) => set('badge', e.target.value)}
                className={inputCls}>
                <option value="">— Sin etiqueta —</option>
                {badges.map((b) => <option key={b.id} value={b.id}>{b.nombre}</option>)}
              </select>
            </Field>
          </div>

          {/* Galería */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[10px] uppercase tracking-widest text-[#767676]">
                Galería — fotos ({imagenes.length}/{MAX_IMAGENES}) · vídeo ({tieneVideo ? '1/1' : '0/1'})
              </label>
              <div className="flex gap-2">
                <input ref={fileRef} type="file" accept="image/*" onChange={(e) => subirArchivo(e, 'imagen')} className="hidden" />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={subiendo || imagenes.length >= MAX_IMAGENES}
                  className="flex items-center gap-1.5 border border-[#e0ddd8] bg-white px-3 py-2 text-[10px] uppercase tracking-widest text-[#666] hover:border-[#1b1b1b] hover:text-[#1b1b1b] transition-colors disabled:opacity-40">
                  <Upload className="w-3 h-3" />
                  {subiendo ? 'Subiendo...' : 'Añadir foto'}
                </button>
                <input ref={videoRef} type="file" accept="video/*" onChange={(e) => subirArchivo(e, 'video')} className="hidden" />
                <button type="button" onClick={() => videoRef.current?.click()} disabled={subiendo || tieneVideo}
                  className="flex items-center gap-1.5 border border-[#e0ddd8] bg-white px-3 py-2 text-[10px] uppercase tracking-widest text-[#666] hover:border-[#1b1b1b] hover:text-[#1b1b1b] transition-colors disabled:opacity-40">
                  <Upload className="w-3 h-3" />
                  {tieneVideo ? 'Vídeo añadido' : 'Añadir vídeo'}
                </button>
              </div>
            </div>

            {galeria.length === 0 ? (
              <div className="border border-dashed border-[#e0ddd8] bg-white h-24 flex items-center justify-center">
                <p className="text-[11px] text-[#ccc] uppercase tracking-widest">Sin imágenes</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {galeria.map((item, idx) => (
                  <div key={idx} className="relative group w-24 h-24 border border-[#e0ddd8] bg-[#f6f4f1] overflow-hidden">
                    {item.tipo === 'video' ? (
                      <video src={item.url} className="w-full h-full object-cover" muted />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                    )}
                    {idx === 0 && item.tipo === 'imagen' && (
                      <span className="absolute bottom-1 left-1 bg-[#1b1b1b] text-[#f6f4f1] text-[8px] px-1.5 py-0.5 uppercase tracking-widest">
                        Portada
                      </span>
                    )}
                    {item.tipo === 'video' && (
                      <span className="absolute bottom-1 left-1 bg-[#7d5d24] text-[#f6f4f1] text-[8px] px-1.5 py-0.5 uppercase tracking-widest">
                        Vídeo
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {idx > 0 && (
                        <button type="button" onClick={() => moverArriba(idx)}
                          className="bg-white/90 p-1 hover:bg-white transition-colors" title="Mover antes">
                          <GripVertical className="w-3 h-3 text-[#1b1b1b]" />
                        </button>
                      )}
                      <button type="button" onClick={() => eliminarMedia(idx)}
                        className="bg-white/90 p-1 hover:bg-white transition-colors" title="Eliminar">
                        <X className="w-3 h-3 text-[#b97979]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-[10px] text-[#ccc] mt-2">La primera foto es la portada. Pasa el ratón sobre una imagen para reordenar o eliminar.</p>
          </div>

          {/* Variantes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[10px] uppercase tracking-widest text-[#767676]">
                Variantes — modelos, colores, aromas… ({variantes.length})
              </label>
              <button
                type="button"
                onClick={() => setVariantes((prev) => [...prev, { nombre: '', nombre_ca: '', stock: '0' }])}
                className="flex items-center gap-1.5 border border-[#e0ddd8] bg-white px-3 py-2 text-[10px] uppercase tracking-widest text-[#666] hover:border-[#1b1b1b] hover:text-[#1b1b1b] transition-colors"
              >
                <Plus className="w-3 h-3" />
                Añadir variante
              </button>
            </div>
            {variantes.length === 0 ? (
              <div className="border border-dashed border-[#e0ddd8] bg-white h-14 flex items-center justify-center">
                <p className="text-[11px] text-[#ccc] uppercase tracking-widest">Sin variantes — producto único</p>
              </div>
            ) : (
              <div className="space-y-2">
                {variantes.map((v, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={v.nombre}
                      onChange={(e) => setVariantes((prev) => prev.map((x, i) => i === idx ? { ...x, nombre: e.target.value } : x))}
                      placeholder="Nombre ES (ej: Rosa palo)"
                      className={inputCls + ' flex-1'}
                    />
                    <input
                      type="text"
                      value={v.nombre_ca}
                      onChange={(e) => setVariantes((prev) => prev.map((x, i) => i === idx ? { ...x, nombre_ca: e.target.value } : x))}
                      placeholder="Nom CA (ex: Rosa pàl·lid)"
                      className={inputCls + ' flex-1'}
                    />
                    <div className="w-28 flex-shrink-0">
                      <input
                        type="number"
                        min="0"
                        value={v.stock}
                        onChange={(e) => setVariantes((prev) => prev.map((x, i) => i === idx ? { ...x, stock: e.target.value } : x))}
                        placeholder="Stock"
                        className={inputCls}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setVariantes((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-[#ccc] hover:text-[#b97979] transition-colors flex-shrink-0 p-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {variantes.length > 0 && (
              <p className="text-[10px] text-[#ccc] mt-2">Si hay variantes, el stock del producto base se ignora y se usa el stock de cada variante.</p>
            )}
          </div>

          {/* Medidas y peso */}
          <div className="grid grid-cols-4 gap-4">
            <Field label="Peso (gr)">
              <input type="number" min="0" value={form.peso_gr}
                onChange={(e) => set('peso_gr', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Alto (cm)">
              <input type="number" step="0.1" min="0" value={form.alto_cm}
                onChange={(e) => set('alto_cm', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Ancho (cm)">
              <input type="number" step="0.1" min="0" value={form.ancho_cm}
                onChange={(e) => set('ancho_cm', e.target.value)} className={inputCls} />
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
              className="text-[10px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] transition-colors">
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
      <label className="block text-[10px] uppercase tracking-widest text-[#767676] mb-2">
        {label}{required && <span className="text-[#7d5d24] ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors'
