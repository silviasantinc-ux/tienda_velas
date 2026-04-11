'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { productosMock } from '@/lib/productos-mock'
import TarjetaProducto from '@/components/TarjetaProducto'

const CATEGORIAS = ['Todos', 'Otoño', 'Postre', 'Bebidas', 'Hogar', 'Eventos']
const ORDENAR = [
  { label: 'Destacados', value: 'destacados' },
  { label: 'Precio: menor a mayor', value: 'precio-asc' },
  { label: 'Precio: mayor a menor', value: 'precio-desc' },
  { label: 'Más nuevos', value: 'nuevos' },
]

function TiendaContenido() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat')
  const qParam = searchParams.get('q')

  const [categoria, setCategoria] = useState(catParam || 'Todos')
  const [orden, setOrden] = useState('destacados')
  const [busqueda, setBusqueda] = useState(qParam || '')

  const productos = useMemo(() => {
    let lista = [...productosMock]

    if (categoria !== 'Todos') {
      lista = lista.filter((p) => p.categoria === categoria)
    }

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      lista = lista.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q) ||
          p.notas_aromaticas?.some((n) => n.toLowerCase().includes(q))
      )
    }

    if (orden === 'precio-asc') lista.sort((a, b) => a.precio - b.precio)
    if (orden === 'precio-desc') lista.sort((a, b) => b.precio - a.precio)
    if (orden === 'nuevos') lista.sort((a) => (a.badge === 'nuevo' ? -1 : 1))

    return lista
  }, [categoria, orden, busqueda])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Cabecera */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">Catálogo</p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">Todas las velas</h1>
      </div>

      {/* Barra de filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e0ddd8] pb-6 mb-10">
        {/* Categorías */}
        <div className="flex flex-wrap gap-3">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`text-[10px] uppercase tracking-widest px-4 py-2 border transition-colors ${
                categoria === cat
                  ? 'bg-[#1b1b1b] text-[#f6f4f1] border-[#1b1b1b]'
                  : 'border-[#e0ddd8] text-[#666] hover:border-[#1b1b1b] hover:text-[#1b1b1b]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Búsqueda + Ordenar */}
        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="bg-white border border-[#e0ddd8] px-4 py-2 text-sm text-[#1b1b1b] placeholder-[#aaa] outline-none focus:border-[#1b1b1b] transition-colors flex-1 md:w-40 md:flex-none"
          />
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="bg-white border border-[#e0ddd8] px-4 py-2 text-[11px] uppercase tracking-widest text-[#666] outline-none focus:border-[#1b1b1b] transition-colors cursor-pointer flex-1 md:flex-none"
          >
            {ORDENAR.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Conteo */}
      <p className="text-[11px] uppercase tracking-widest text-[#999] mb-8">
        {productos.length} {productos.length === 1 ? 'producto' : 'productos'}
      </p>

      {/* Grid */}
      {productos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {productos.map((p) => (
            <TarjetaProducto key={p.id} producto={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="font-['EB_Garamond'] text-2xl italic text-[#1b1b1b] mb-3">
            No encontramos resultados
          </p>
          <p className="text-sm text-[#999]">Prueba con otro término o categoría</p>
          <button
            onClick={() => { setCategoria('Todos'); setBusqueda('') }}
            className="mt-6 text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors"
          >
            Ver todos los productos
          </button>
        </div>
      )}
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
