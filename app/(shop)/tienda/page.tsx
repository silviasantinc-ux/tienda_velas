'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { useIdioma } from '@/lib/idioma-store'
import TarjetaProducto from '@/components/TarjetaProducto'
import { Producto } from '@/types'

type Categoria = { id: string; nombre: string; nombre_ca: string }

function TiendaContenido() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat')
  const qParam = searchParams.get('q')
  const { idioma, t } = useIdioma()
  const tt = t.tienda

  const [todosProductos, setTodosProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaES, setCategoriaES] = useState<string>('')
  const [orden, setOrden] = useState('destacados')
  const [busqueda, setBusqueda] = useState(qParam || '')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('productos').select('*'),
      supabase.from('categorias').select('*').order('nombre'),
    ]).then(([{ data: prods }, { data: cats }]) => {
      setTodosProductos((prods as Producto[]) ?? [])
      const lista = (cats as Categoria[]) ?? []
      setCategorias(lista)
      if (catParam) {
        // catParam puede llegar en ES o CA
        const match = lista.find(
          (c) => c.nombre === catParam || c.nombre_ca === catParam
        )
        setCategoriaES(match?.nombre ?? '')
      }
      setCargando(false)
    })
  }, [])

  useEffect(() => {
    if (!catParam) { setCategoriaES(''); return }
    const match = categorias.find(
      (c) => c.nombre === catParam || c.nombre_ca === catParam
    )
    setCategoriaES(match?.nombre ?? '')
  }, [catParam])

  const productos = (() => {
    let lista = [...todosProductos]

    if (categoriaES) {
      lista = lista.filter((p) => p.categoria === categoriaES)
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
  })()

  const todoLabel = idioma === 'ca' ? 'Tots' : 'Todos'

  const catLabel = (c: Categoria) =>
    idioma === 'ca' ? (c.nombre_ca || c.nombre) : c.nombre

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Cabecera */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">{tt.catalogo}</p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">{tt.todasLasVelas}</h1>
      </div>

      {/* Barra de filtros */}
      <div className="border-b border-[#e0ddd8] pb-6 mb-10">
        {/* Categorías — botones en desktop */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setCategoriaES('')}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-widest border transition-colors ${
                categoriaES === ''
                  ? 'bg-[#1b1b1b] text-[#f6f4f1] border-[#1b1b1b]'
                  : 'bg-white text-[#666] border-[#e0ddd8] hover:border-[#1b1b1b] hover:text-[#1b1b1b]'
              }`}
            >
              {todoLabel}
            </button>
            {categorias.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoriaES(c.nombre)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-widest border transition-colors ${
                  categoriaES === c.nombre
                    ? 'bg-[#1b1b1b] text-[#f6f4f1] border-[#1b1b1b]'
                    : 'bg-white text-[#666] border-[#e0ddd8] hover:border-[#1b1b1b] hover:text-[#1b1b1b]'
                }`}
              >
                {catLabel(c)}
              </button>
            ))}
          </div>
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="bg-white border border-[#e0ddd8] px-4 py-2 text-[11px] uppercase tracking-widest text-[#666] outline-none focus:border-[#1b1b1b] transition-colors cursor-pointer"
          >
            {tt.ordenar.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Móvil: dos selects */}
        <div className="flex md:hidden flex-row items-center gap-3">
          <select
            value={categoriaES}
            onChange={(e) => setCategoriaES(e.target.value)}
            className="flex-1 bg-white border border-[#e0ddd8] px-4 py-2 text-[11px] uppercase tracking-widest text-[#666] outline-none focus:border-[#1b1b1b] transition-colors cursor-pointer"
          >
            <option value="">{todoLabel}</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.nombre}>{catLabel(c)}</option>
            ))}
          </select>
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
      </div>

      {/* Buscador */}
      <div className="mb-6 -mt-4">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder={tt.buscarPlaceholder}
          className="w-full md:w-72 border border-[#e0ddd8] bg-white px-4 py-2.5 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
        />
      </div>

      {/* Conteo */}
      <p className="text-[11px] uppercase tracking-widest text-[#999] mb-8">
        {productos.length} {productos.length === 1 ? tt.producto : tt.productos}
      </p>

      {/* Grid */}
      {cargando ? (
        <p className="text-sm text-[#999] text-center py-20">Cargando...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {productos.map((p) => (
            <TarjetaProducto key={p.id} producto={p} />
          ))}
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
