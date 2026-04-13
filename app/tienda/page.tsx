'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { productosMock } from '@/lib/productos-mock'
import { useIdioma } from '@/lib/idioma-store'
import TarjetaProducto from '@/components/TarjetaProducto'

function TiendaContenido() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat')
  const qParam = searchParams.get('q')
  const { idioma, t } = useIdioma()
  const tt = t.tienda

  // Mapeo de categorías CA → ES para filtrar el mock (que usa ES internamente)
  const catMap: Record<string, string> = {
    Tardor: 'Otoño', Postres: 'Postre', Begudes: 'Bebidas', Llar: 'Hogar', Esdeveniments: 'Eventos',
  }
  const resolveCategoria = (cat: string) => catMap[cat] ?? cat

  const [categoria, setCategoria] = useState(catParam || tt.categorias[0])
  const [orden, setOrden] = useState('destacados')
  const [busqueda, setBusqueda] = useState(qParam || '')

  useEffect(() => {
    setCategoria(catParam || tt.categorias[0])
  }, [catParam])

  const productos = useMemo(() => {
    let lista = [...productosMock]
    const catES = resolveCategoria(categoria)

    if (catES !== 'Todos' && catES !== 'Tots') {
      lista = lista.filter((p) => p.categoria === catES)
    }

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      lista = lista.filter((p) => {
        const nombre = idioma === 'ca' ? (p.nombre_ca ?? p.nombre) : p.nombre
        const notas = idioma === 'ca' ? (p.notas_aromaticas_ca ?? p.notas_aromaticas) : p.notas_aromaticas
        const cat = idioma === 'ca' ? (p.categoria_ca ?? p.categoria) : p.categoria
        return (
          nombre.toLowerCase().includes(q) ||
          cat.toLowerCase().includes(q) ||
          notas?.some((n) => n.toLowerCase().includes(q))
        )
      })
    }

    if (orden === 'precio-asc') lista.sort((a, b) => a.precio - b.precio)
    if (orden === 'precio-desc') lista.sort((a, b) => b.precio - a.precio)
    if (orden === 'nuevos') lista.sort((a) => (a.badge === 'nuevo' ? -1 : 1))

    return lista
  }, [categoria, orden, busqueda, idioma])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Cabecera */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">{tt.catalogo}</p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">{tt.todasLasVelas}</h1>
      </div>

      {/* Barra de filtros */}
      <div className="flex flex-row items-center gap-3 border-b border-[#e0ddd8] pb-6 mb-10">
        {/* Categorías */}
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="flex-1 bg-white border border-[#e0ddd8] px-4 py-2 text-[11px] uppercase tracking-widest text-[#666] outline-none focus:border-[#1b1b1b] transition-colors cursor-pointer"
        >
          {tt.categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Ordenar */}
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="flex-1 bg-white border border-[#e0ddd8] px-4 py-2 text-[11px] uppercase tracking-widest text-[#666] outline-none focus:border-[#1b1b1b] transition-colors cursor-pointer"
        >
          {tt.ordenar.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Conteo */}
      <p className="text-[11px] uppercase tracking-widest text-[#999] mb-8">
        {productos.length} {productos.length === 1 ? tt.producto : tt.productos}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {productos.map((p) => (
          <TarjetaProducto key={p.id} producto={p} />
        ))}
      </div>
    </div>
  )
}

export default function PaginaTienda() {
  return (
    <Suspense>
      <TiendaContenido />
    </Suspense>
  )
}
