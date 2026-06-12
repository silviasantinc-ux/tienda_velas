'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Producto, ProductoImagen, ProductoVariante } from '@/types'
import { useCarrito } from '@/lib/carrito-store'
import { useIdioma } from '@/lib/idioma-store'
import Toast, { useToast } from '@/components/Toast'
import TarjetaProducto from '@/components/TarjetaProducto'

export default function PaginaProducto() {
  const { id } = useParams()

  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [producto, setProducto] = useState<Producto | null>(null)
  const [galeria, setGaleria] = useState<ProductoImagen[]>([])
  const [seleccionado, setSeleccionado] = useState(0)
  const [relacionados, setRelacionados] = useState<Producto[]>([])
  const [variantes, setVariantes] = useState<ProductoVariante[]>([])
  const [varianteSeleccionada, setVarianteSeleccionada] = useState<ProductoVariante | null>(null)
  const [cargando, setCargando] = useState(true)
  const agregar = useCarrito((s) => s.agregar)
  const { visible, mensaje, mostrar } = useToast()
  const { idioma, t } = useIdioma()
  const tp = t.producto
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    supabase.from('productos').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        setProducto(data as Producto)
        document.title = data.nombre + ' — Llum & Glow'

        // Cargar galería
        supabase
          .from('producto_imagenes')
          .select('*')
          .eq('producto_id', data.id)
          .order('orden')
          .then(({ data: imgs }) => {
            if (imgs && imgs.length > 0) {
              // Imágenes primero, vídeo al final
              const ordenada = [
                ...(imgs as ProductoImagen[]).filter(m => m.tipo === 'imagen'),
                ...(imgs as ProductoImagen[]).filter(m => m.tipo === 'video'),
              ]
              setGaleria(ordenada)
            } else {
              // Fallback a campos legacy
              const fallback: ProductoImagen[] = []
              if (data.imagen_url) fallback.push({ id: '0', producto_id: data.id, url: data.imagen_url, tipo: 'imagen', orden: 0 })
              if (data.video_url) fallback.push({ id: '1', producto_id: data.id, url: data.video_url, tipo: 'video', orden: fallback.length })
              setGaleria(fallback)
            }
          })

        supabase.from('productos').select('*')
          .eq('categoria', data.categoria).eq('activo', true).neq('id', id).order('nombre').limit(4)
          .then(({ data: rel }) => setRelacionados((rel as Producto[]) ?? []))

        supabase
          .from('producto_variantes')
          .select('*')
          .eq('producto_id', data.id)
          .order('orden')
          .then(({ data: vars }) => {
            if (vars && vars.length > 0) {
              setVariantes(vars as ProductoVariante[])
            }
          })
      }
      setCargando(false)
    })
  }, [id])

  if (cargando) return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <p className="text-sm text-[#767676]">Cargando...</p>
    </div>
  )

  if (!producto) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="font-['EB_Garamond'] text-3xl italic text-[#1b1b1b] mb-6">{tp.noEncontrado}</p>
        <Link href="/tienda" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5">
          {tp.volver}
        </Link>
      </div>
    )
  }

  const nombre = idioma === 'ca' ? (producto.nombre_ca ?? producto.nombre) : producto.nombre
  const descripcion = idioma === 'ca' ? (producto.descripcion_ca ?? producto.descripcion) : producto.descripcion
  const detalle = idioma === 'ca' ? (producto.detalle_ca ?? producto.detalle) : producto.detalle
  const categoria = idioma === 'ca' ? (producto.categoria_ca ?? producto.categoria) : producto.categoria
  const stockActual = varianteSeleccionada ? varianteSeleccionada.stock : (variantes.length === 0 ? producto.stock : 0)
  const precioActual = producto.precio + (varianteSeleccionada?.precio_extra ?? 0)
  const sinPrecio = precioActual <= 0

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i++) agregar(producto, varianteSeleccionada ?? undefined)
    const nombreVar = varianteSeleccionada
      ? (idioma === 'ca' ? (varianteSeleccionada.nombre_ca ?? varianteSeleccionada.nombre) : varianteSeleccionada.nombre)
      : null
    const sufijo = nombreVar ? ` · ${nombreVar}` : ''
    mostrar(idioma === 'ca' ? `${nombre}${sufijo} afegit a la cistella` : `${nombre}${sufijo} añadido al carrito`)
  }

  const mediaActual = galeria[seleccionado]
  const irAnterior = () => setSeleccionado((s) => (s - 1 + galeria.length) % galeria.length)
  const irSiguiente = () => setSeleccionado((s) => (s + 1) % galeria.length)

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 pt-2 pb-4">
        <Link href="/tienda" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] mb-4 transition-colors w-fit">
          <ArrowLeft className="w-3 h-3" />
          {tp.volver}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Columna izquierda: miniaturas (lateral en desktop) + visor */}
          <div className="flex flex-col gap-3 md:self-start md:flex-row-reverse md:items-start">
            {/* Imagen principal */}
            <div className="relative aspect-square md:flex-1 overflow-hidden bg-[#ece9e4]">
              {!mediaActual || mediaActual.tipo === 'imagen' ? (
                <Image
                  src={mediaActual?.url ?? producto.imagen_url}
                  alt={nombre}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
              ) : (
                <video
                  src={mediaActual.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {producto.badge && (
                <span className="absolute top-4 left-4 bg-[#f6f4f1] text-[#1b1b1b] text-[10px] uppercase tracking-widest font-medium px-3 py-1.5">
                  {tp.badges[producto.badge]}
                </span>
              )}
              {galeria.length > 1 && (
                <>
                  <button onClick={irAnterior} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-[#1b1b1b]" />
                  </button>
                  <button onClick={irSiguiente} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 transition-colors">
                    <ChevronRight className="w-4 h-4 text-[#1b1b1b]" />
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas — fila horizontal en móvil, columna vertical en desktop */}
            {galeria.length > 1 && (
              <div className="flex flex-row gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:pb-0 md:w-16 md:flex-shrink-0">
                {galeria.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setSeleccionado(idx)}
                    className={`relative flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-colors ${
                      seleccionado === idx ? 'border-[#1b1b1b]' : 'border-transparent hover:border-[#ccc]'
                    }`}
                  >
                    {item.tipo === 'video' ? (
                      <>
                        <video src={item.url} className="w-full h-full object-cover" muted />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      </>
                    ) : (
                      <Image src={item.url} alt="" fill className="object-cover" sizes="64px" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columna derecha: solo info esencial + CTAs */}
          <div className="flex flex-col justify-center py-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">{categoria}</p>
            <h1 className="font-['EB_Garamond'] text-5xl italic text-[#1b1b1b] mb-3 leading-tight">{nombre}</h1>
            <p className="text-2xl text-[#1b1b1b] font-medium mb-6">{producto.precio.toFixed(2).replace('.', ',')} €</p>
            <p className="text-sm text-[#666] leading-relaxed mb-6">{descripcion}</p>

            {variantes.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-3">
                  {tp.varianteModelo}
                </p>
                <div className="flex flex-wrap gap-2">
                  {variantes.map((v) => {
                    const nombreVariante = idioma === 'ca' ? (v.nombre_ca ?? v.nombre) : v.nombre
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setVarianteSeleccionada(v)
                          setCantidad(1)
                          if (v.imagen_id) {
                            const idx = galeria.findIndex((img) => img.id === v.imagen_id)
                            if (idx !== -1) setSeleccionado(idx)
                          }
                        }}
                        disabled={v.stock === 0}
                        className={`px-4 py-2.5 text-[11px] uppercase tracking-widest transition-colors border ${
                          varianteSeleccionada?.id === v.id
                            ? 'bg-[#1b1b1b] text-[#f6f4f1] border-[#1b1b1b]'
                            : v.stock === 0
                            ? 'border-[#e0ddd8] text-[#ccc] line-through cursor-not-allowed'
                            : 'border-[#e0ddd8] text-[#666] hover:border-[#1b1b1b] hover:text-[#1b1b1b]'
                        }`}
                      >
                        {nombreVariante}
                      </button>
                    )
                  })}
                </div>
                {variantes.length > 0 && !varianteSeleccionada && (
                  <p className="text-[10px] text-[#b97979] mt-2">{tp.varianteSelecciona}</p>
                )}
              </div>
            )}

            {stockActual <= 3 && stockActual > 0 && (
              <p className="text-[10px] uppercase tracking-widest text-[#b97979] mb-4">
                {tp.ultimasUnidades} {stockActual} {tp.unidades}
              </p>
            )}

            <div className="flex gap-3">
              <div className="flex items-center border border-[#e0ddd8]">
                <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-4 py-4 hover:bg-[#ece9e4] transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-4 text-sm font-medium min-w-[2rem] text-center">{cantidad}</span>
                <button onClick={() => setCantidad(Math.min(stockActual, cantidad + 1))} className="px-4 py-4 hover:bg-[#ece9e4] transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={handleAgregar}
                disabled={stockActual === 0 || (variantes.length > 0 && !varianteSeleccionada) || sinPrecio}
                className="flex-1 bg-[#1b1b1b] hover:bg-[#333] disabled:bg-[#e0ddd8] disabled:text-[#767676] disabled:cursor-not-allowed text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors"
              >
                {sinPrecio ? (idioma === 'ca' ? 'Sense preu' : 'Sin precio') : (varianteSeleccionada || variantes.length === 0) && stockActual === 0 ? tp.agotado : tp.añadir}
              </button>
            </div>

            {producto.personalizable && (
              <Link
                href={`/personaliza?producto=${producto.id}`}
                className="mt-3 flex items-center justify-center gap-2 w-full border border-[#7d5d24] text-[#7d5d24] hover:bg-[#7d5d24] hover:text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {t.personaliza.botonProducto}
              </Link>
            )}
          </div>
        </div>

        {/* Sección de detalle — debajo del hero, ancho completo */}
        {(detalle || producto.alto_cm || producto.ancho_cm) && (
          <div className="border-t border-[#e0ddd8] mt-12 pt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {detalle && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-4">{tp.verMas}</p>
                <p className="text-sm text-[#666] leading-relaxed whitespace-pre-line">{detalle}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-4">{tp.material}</p>
              <div className="grid grid-cols-2 gap-4">
                {producto.alto_cm && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-1">{tp.alto}</p>
                    <p className="text-sm text-[#1b1b1b]">{producto.alto_cm} cm</p>
                  </div>
                )}
                {producto.ancho_cm && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-1">{tp.ancho}</p>
                    <p className="text-sm text-[#1b1b1b]">{producto.ancho_cm} cm</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-1">{tp.material}</p>
                  <p className="text-sm text-[#1b1b1b]">{tp.ceraSoja}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-1">{tp.mecha}</p>
                  <p className="text-sm text-[#1b1b1b]">{tp.algodon}</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="relative group w-fit">
                  <Link href="/seguridad" className="text-[11px] text-[#767676] border-b border-dotted border-[#ccc] hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors">
                    {tp.normativaUE}
                  </Link>
                  <div className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-[#e0ddd8] shadow-md px-4 py-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
                    <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] mb-1.5">{tp.normativaUETooltipTitulo}</p>
                    <p className="text-[11px] text-[#666] leading-relaxed">{tp.normativaUETooltipTexto}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!(detalle || producto.alto_cm || producto.ancho_cm) && (
          <div className="border-t border-[#e0ddd8] mt-8 pt-6">
            <div className="relative group w-fit">
              <Link href="/seguridad" className="text-[11px] text-[#767676] border-b border-dotted border-[#ccc] hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors">
                {tp.normativaUE}
              </Link>
              <div className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-[#e0ddd8] shadow-md px-4 py-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
                <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] mb-1.5">{tp.normativaUETooltipTitulo}</p>
                <p className="text-[11px] text-[#666] leading-relaxed">{tp.normativaUETooltipTexto}</p>
              </div>
            </div>
          </div>
        )}
      </div>

<Toast visible={visible} mensaje={mensaje} />
    </div>
  )
}
