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
  const { idioma, t } = useIdioma()
  const tp = t.personaliza
  const agregar = useCarrito((s) => s.agregar)
  const { visible, mensaje, mostrar } = useToast()

  const [producto, setProducto] = useState<Producto | null>(null)
  const [colores, setColores] = useState<Color[]>([])
  const [aromas, setAromas] = useState<Aroma[]>([])
  const [colorId, setColorId] = useState('')
  const [aromaId, setAromaId] = useState('')
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

  const colorSel = colores.find((c) => c.id === colorId) ?? null
  const aromaSel = aromas.find((a) => a.id === aromaId) ?? null
  const listo = colorSel !== null && aromaSel !== null && (producto?.precio ?? 0) > 0

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

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <Link
        href={`/producto/${producto.id}`}
        className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] mb-10 transition-colors w-fit"
      >
        <ArrowLeft className="w-3 h-3" />
        {idioma === 'ca' ? 'Tornar al producte' : 'Volver al producto'}
      </Link>

      {/* Cabecera de la página */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">{tp.personalizado}</p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">{tp.titulo}</h1>
      </div>

      {/* Referencia del producto — pequeña, solo orientativa */}
      <div className="flex items-center gap-4 bg-white border border-[#e0ddd8] p-4 mb-10">
        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-[#ece9e4]">
          <Image src={producto.imagen_url} alt={nombreProd} fill className="object-cover" sizes="64px" />
        </div>
        <div>
          <p className="font-['EB_Garamond'] italic text-lg text-[#1b1b1b]">{nombreProd}</p>
          <p className="text-sm text-[#767676]">{producto.precio.toFixed(2).replace('.', ',')} €</p>
        </div>
      </div>

      {/* Formulario de personalización */}
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#767676] mb-2">
            {tp.color} <span className="text-[#b97979]">*</span>
          </label>
          <select
            value={colorId}
            onChange={(e) => setColorId(e.target.value)}
            className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] focus:outline-none focus:border-[#1b1b1b] transition-colors appearance-none cursor-pointer"
          >
            <option value="">{tp.seleccionaColor}</option>
            {colores.map((c) => (
              <option key={c.id} value={c.id}>
                {idioma === 'ca' ? (c.nombre_ca ?? c.nombre) : c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#767676] mb-2">
            {tp.aroma} <span className="text-[#b97979]">*</span>
          </label>
          <select
            value={aromaId}
            onChange={(e) => setAromaId(e.target.value)}
            className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] focus:outline-none focus:border-[#1b1b1b] transition-colors appearance-none cursor-pointer"
          >
            <option value="">{tp.seleccionaAroma}</option>
            {aromas.map((a) => (
              <option key={a.id} value={a.id}>
                {idioma === 'ca' ? (a.nombre_ca ?? a.nombre) : a.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <div className="flex items-center border border-[#e0ddd8]">
            <button
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              className="px-4 py-4 hover:bg-[#ece9e4] transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-4 text-sm font-medium min-w-[2rem] text-center">{cantidad}</span>
            <button
              onClick={() => setCantidad(cantidad + 1)}
              className="px-4 py-4 hover:bg-[#ece9e4] transition-colors"
            >
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

        {producto.precio <= 0 && (
          <p className="text-[10px] text-[#b97979] mt-3">
            {idioma === 'ca' ? 'Aquest producte no té preu assignat.' : 'Este producto no tiene precio asignado.'}
          </p>
        )}
        {!listo && producto.precio > 0 && (colorId || aromaId) && (
          <p className="text-[10px] text-[#b97979]">{tp.obligatorio}</p>
        )}
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
