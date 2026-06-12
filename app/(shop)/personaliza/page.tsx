'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useCarrito } from '@/lib/carrito-store'
import { useIdioma } from '@/lib/idioma-store'
import { Producto, Color, Aroma } from '@/types'
import Toast, { useToast } from '@/components/Toast'

function PersonalizaInner() {
  const searchParams = useSearchParams()
  const productoId = searchParams.get('producto')
  const router = useRouter()
  const { idioma, t } = useIdioma()
  const tp = t.personaliza
  const agregar = useCarrito((s) => s.agregar)
  const { visible, mensaje, mostrar } = useToast()

  const [producto, setProducto] = useState<Producto | null>(null)
  const [colores, setColores] = useState<Color[]>([])
  const [aromas, setAromas] = useState<Aroma[]>([])
  const [colorSel, setColorSel] = useState<Color | null>(null)
  const [aromaSel, setAromaSel] = useState<Aroma | null>(null)
  const [cantidad, setCantidad] = useState(1)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!productoId) { setCargando(false); return }
    Promise.all([
      supabase.from('productos').select('*').eq('id', productoId).single(),
      supabase.from('colores').select('*').eq('activo', true).order('orden').order('nombre'),
      supabase.from('aromas').select('*').eq('activo', true).order('orden').order('nombre'),
    ]).then(([{ data: p }, { data: c }, { data: a }]) => {
      if (p) setProducto(p as Producto)
      setColores((c as Color[]) ?? [])
      setAromas((a as Aroma[]) ?? [])
      setCargando(false)
    })
  }, [productoId])

  const handleAñadir = () => {
    if (!producto || !colorSel || !aromaSel) return
    for (let i = 0; i < cantidad; i++) {
      agregar(
        producto,
        undefined,
        { id: colorSel.id, nombre: colorSel.nombre, nombre_ca: colorSel.nombre_ca ?? undefined },
        { id: aromaSel.id, nombre: aromaSel.nombre, nombre_ca: aromaSel.nombre_ca ?? undefined }
      )
    }
    const nombreProd = idioma === 'ca' ? (producto.nombre_ca ?? producto.nombre) : producto.nombre
    const nombreColor = idioma === 'ca' ? (colorSel.nombre_ca ?? colorSel.nombre) : colorSel.nombre
    const nombreAroma = idioma === 'ca' ? (aromaSel.nombre_ca ?? aromaSel.nombre) : aromaSel.nombre
    mostrar(idioma === 'ca'
      ? `${nombreProd} · ${nombreColor} · ${nombreAroma} afegit a la cistella`
      : `${nombreProd} · ${nombreColor} · ${nombreAroma} añadido al carrito`)
  }

  if (cargando) return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-sm text-[#767676]">Cargando...</p>
    </div>
  )

  if (!producto || !productoId) return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-['EB_Garamond'] text-3xl italic text-[#1b1b1b] mb-6">Producto no encontrado</p>
      <Link href="/tienda" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5">
        Volver a la tienda
      </Link>
    </div>
  )

  const nombreProd = idioma === 'ca' ? (producto.nombre_ca ?? producto.nombre) : producto.nombre
  const categoriaProd = idioma === 'ca' ? (producto.categoria_ca ?? producto.categoria) : producto.categoria
  const listo = colorSel !== null && aromaSel !== null

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link href={`/producto/${producto.id}`} className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] mb-10 transition-colors w-fit">
        <ArrowLeft className="w-3 h-3" />
        {idioma === 'ca' ? 'Tornar al producte' : 'Volver al producto'}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Imagen del producto base */}
        <div className="relative aspect-square overflow-hidden bg-[#ece9e4] max-w-md">
          <Image
            src={producto.imagen_url}
            alt={nombreProd}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Configurador */}
        <div className="flex flex-col justify-start py-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">{categoriaProd}</p>
          <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b] mb-1 leading-tight">{nombreProd}</h1>
          <p className="font-['EB_Garamond'] text-xl italic text-[#767676] mb-6">{tp.titulo}</p>
          <p className="text-2xl text-[#1b1b1b] font-medium mb-8">{producto.precio.toFixed(2)} €</p>

          {/* Selector de color */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-3">
              {tp.color}{colorSel ? ` · ${idioma === 'ca' ? (colorSel.nombre_ca ?? colorSel.nombre) : colorSel.nombre}` : ''}
            </p>
            {colores.length === 0 ? (
              <p className="text-sm text-[#ccc]">{idioma === 'ca' ? 'Sense colors disponibles' : 'Sin colores disponibles'}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {colores.map((c) => {
                  const nombre = idioma === 'ca' ? (c.nombre_ca ?? c.nombre) : c.nombre
                  return (
                    <button
                      key={c.id}
                      onClick={() => setColorSel(c)}
                      className={`px-4 py-2.5 text-[11px] uppercase tracking-widest transition-colors border ${
                        colorSel?.id === c.id
                          ? 'bg-[#1b1b1b] text-[#f6f4f1] border-[#1b1b1b]'
                          : 'border-[#e0ddd8] text-[#666] hover:border-[#1b1b1b] hover:text-[#1b1b1b]'
                      }`}
                    >
                      {nombre}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Selector de aroma */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-3">
              {tp.aroma}{aromaSel ? ` · ${idioma === 'ca' ? (aromaSel.nombre_ca ?? aromaSel.nombre) : aromaSel.nombre}` : ''}
            </p>
            {aromas.length === 0 ? (
              <p className="text-sm text-[#ccc]">{idioma === 'ca' ? 'Sense aromes disponibles' : 'Sin aromas disponibles'}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {aromas.map((a) => {
                  const nombre = idioma === 'ca' ? (a.nombre_ca ?? a.nombre) : a.nombre
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAromaSel(a)}
                      className={`px-4 py-2.5 text-[11px] uppercase tracking-widest transition-colors border ${
                        aromaSel?.id === a.id
                          ? 'bg-[#1b1b1b] text-[#f6f4f1] border-[#1b1b1b]'
                          : 'border-[#e0ddd8] text-[#666] hover:border-[#1b1b1b] hover:text-[#1b1b1b]'
                      }`}
                    >
                      {nombre}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Cantidad y botón */}
          <div className="flex gap-3">
            <div className="flex items-center border border-[#e0ddd8]">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-4 py-4 hover:bg-[#ece9e4] transition-colors">
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-4 text-sm font-medium min-w-[2rem] text-center">{cantidad}</span>
              <button onClick={() => setCantidad(cantidad + 1)} className="px-4 py-4 hover:bg-[#ece9e4] transition-colors">
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={handleAñadir}
              disabled={!listo}
              className="flex-1 bg-[#1b1b1b] hover:bg-[#333] disabled:bg-[#e0ddd8] disabled:text-[#767676] disabled:cursor-not-allowed text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors"
            >
              {tp.añadir}
            </button>
          </div>

          {!listo && (
            <p className="text-[10px] text-[#b97979] mt-3">{tp.obligatorio}</p>
          )}
        </div>
      </div>

      <Toast visible={visible} mensaje={mensaje} />
    </div>
  )
}

export default function PaginaPersonaliza() {
  return (
    <Suspense>
      <PersonalizaInner />
    </Suspense>
  )
}
