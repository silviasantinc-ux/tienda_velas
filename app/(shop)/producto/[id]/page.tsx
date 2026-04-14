'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Producto } from '@/types'
import { useCarrito } from '@/lib/carrito-store'
import { useIdioma } from '@/lib/idioma-store'
import Toast, { useToast } from '@/components/Toast'
import TarjetaProducto from '@/components/TarjetaProducto'

export default function PaginaProducto() {
  const { id } = useParams()
  const [producto, setProducto] = useState<Producto | null>(null)
  const [relacionados, setRelacionados] = useState<Producto[]>([])
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
        supabase.from('productos').select('*')
          .eq('categoria', data.categoria).neq('id', id).limit(4)
          .then(({ data: rel }) => setRelacionados((rel as Producto[]) ?? []))
      }
      setCargando(false)
    })
  }, [id])

  if (cargando) return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <p className="text-sm text-[#999]">Cargando...</p>
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
  const categoria = idioma === 'ca' ? (producto.categoria_ca ?? producto.categoria) : producto.categoria
  const notas = idioma === 'ca' ? (producto.notas_aromaticas_ca ?? producto.notas_aromaticas) : producto.notas_aromaticas

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i++) agregar(producto)
    mostrar(idioma === 'ca' ? `${nombre} afegit a la cistella` : `${nombre} añadido al carrito`)
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 pt-2 pb-4">
        <Link href="/tienda" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] mb-4 transition-colors w-fit">
          <ArrowLeft className="w-3 h-3" />
          {tp.volver}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="relative aspect-square overflow-hidden bg-[#ece9e4]">
            {producto.video_url ? (
              <video
                src={producto.video_url}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image src={producto.imagen_url} alt={nombre} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            )}
            {producto.badge && (
              <span className="absolute top-4 left-4 bg-[#f6f4f1] text-[#1b1b1b] text-[10px] uppercase tracking-widest font-medium px-3 py-1.5">
                {tp.badges[producto.badge]}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center py-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">{categoria}</p>
            <h1 className="font-['EB_Garamond'] text-5xl italic text-[#1b1b1b] mb-3 leading-tight">{nombre}</h1>
            <p className="text-2xl text-[#1b1b1b] font-medium mb-6">{producto.precio.toFixed(2)} €</p>
            <p className="text-sm text-[#666] leading-relaxed mb-8 max-w-sm">{descripcion}</p>

            {notas && (
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-widest text-[#999] mb-3">{tp.notasAromaticas}</p>
                <div className="flex flex-wrap gap-2">
                  {notas.map((nota) => (
                    <span key={nota} className="border border-[#e0ddd8] text-[11px] text-[#666] px-3 py-1.5 uppercase tracking-widest">{nota}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-[#e0ddd8] pt-6 mb-8 grid grid-cols-2 gap-4">
              {producto.duracion_horas && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">{tp.duracion}</p>
                  <p className="text-sm text-[#1b1b1b]">{producto.duracion_horas} {tp.horas}</p>
                </div>
              )}
              {producto.peso_gr && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">{tp.peso}</p>
                  <p className="text-sm text-[#1b1b1b]">{producto.peso_gr}g</p>
                </div>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">{tp.material}</p>
                <p className="text-sm text-[#1b1b1b]">{tp.ceraSoja}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">{tp.mecha}</p>
                <p className="text-sm text-[#1b1b1b]">{tp.algodon}</p>
              </div>
            </div>

            <div className="relative group mb-6 w-fit">
              <p className="text-[11px] text-[#999] leading-relaxed cursor-default border-b border-dotted border-[#ccc]">
                {tp.normativaUE}
              </p>
              <div className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-[#e0ddd8] shadow-md px-4 py-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
                <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] mb-1.5">{tp.normativaUETooltipTitulo}</p>
                <p className="text-[11px] text-[#666] leading-relaxed">
                  {tp.normativaUETooltipTexto}
                </p>
              </div>
            </div>

            {producto.stock <= 3 && producto.stock > 0 && (
              <p className="text-[10px] uppercase tracking-widest text-[#b97979] mb-4">
                {tp.ultimasUnidades} {producto.stock} {tp.unidades}
              </p>
            )}

            <div className="flex gap-3">
              <div className="flex items-center border border-[#e0ddd8]">
                <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-4 py-4 hover:bg-[#ece9e4] transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-4 text-sm font-medium min-w-[2rem] text-center">{cantidad}</span>
                <button onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))} className="px-4 py-4 hover:bg-[#ece9e4] transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={handleAgregar}
                disabled={producto.stock === 0}
                className="flex-1 bg-[#1b1b1b] hover:bg-[#333] disabled:bg-[#e0ddd8] disabled:text-[#999] disabled:cursor-not-allowed text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors"
              >
                {producto.stock === 0 ? tp.agotado : tp.añadir}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e0ddd8]">
              <p className="text-[11px] text-[#999] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0" />
                {tp.envioGratis}
              </p>
            </div>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-[#e0ddd8]">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">{tp.mismaColecion}</p>
            <h2 className="font-['EB_Garamond'] text-3xl italic text-[#1b1b1b]">{tp.teGustar}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {relacionados.map((p) => <TarjetaProducto key={p.id} producto={p} />)}
          </div>
        </section>
      )}

      <Toast visible={visible} mensaje={mensaje} />
    </div>
  )
}
