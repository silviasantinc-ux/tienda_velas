'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { useIdioma } from '@/lib/idioma-store'
import TarjetaProducto from '@/components/TarjetaProducto'
import { Producto } from '@/types'

type Categoria = { id: string; nombre: string; nombre_ca: string }

function TiendaContenido() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const catParam = searchParams.get('cat')
  const qParam = searchParams.get('q')
  const { idioma, t } = useIdioma()
  const tt = t.tienda

  const [todosProductos, setTodosProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaES, setCategoriaES] = useState<string>('')
  const [orden, setOrden] = useState('alfabetico')
  const [busqueda, setBusqueda] = useState(qParam || '')
  const [productosConVariantes, setProductosConVariantes] = useState<Set<string>>(new Set())
  const [cargando, setCargando] = useState(true)
  const sinonimosRef = useRef<{ termino: string; busca: string }[]>([])

  const norm = (s: string) => (s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  const ld = (a: string, b: string) => {
    const d = Array.from({length: a.length+1}, (_,i) => Array.from({length: b.length+1}, (_,j) => i===0?j:j===0?i:0))
    for (let i=1;i<=a.length;i++) for (let j=1;j<=b.length;j++) d[i][j]=a[i-1]===b[j-1]?d[i-1][j-1]:1+Math.min(d[i-1][j],d[i][j-1],d[i-1][j-1])
    return d[a.length][b.length]
  }

  useEffect(() => {
    Promise.all([
      supabase.from('productos').select('*').eq('activo', true),
      supabase.from('categorias').select('*').eq('activo', true).order('nombre'),
      supabase.from('producto_variantes').select('producto_id'),
      supabase.from('sinonimos').select('termino, busca').eq('activo', true),
    ]).then(([{ data: prods }, { data: cats }, { data: vars }, { data: sins }]) => {
      const productosLista = (prods as Producto[]) ?? []
      setTodosProductos(productosLista)
      sinonimosRef.current = (sins as { termino: string; busca: string }[]) ?? []
      const lista = (cats as Categoria[]) ?? []
      setCategorias(lista)
      const ids = new Set((vars ?? []).map((v: { producto_id: string }) => v.producto_id))
      setProductosConVariantes(ids)
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

  useEffect(() => {
    setBusqueda(qParam || '')
  }, [qParam])

  const productos = (() => {
    let lista = [...todosProductos]

    if (categoriaES) {
      lista = lista.filter((p) => p.categoria === categoriaES)
    }

    if (busqueda.trim()) {
      const q = norm(busqueda.trim())
      const sin = sinonimosRef.current.find((s) => { const st = norm(s.termino); return st.startsWith(q) || q.startsWith(st) || (q.length >= 4 && ld(q, st) <= 1) })
      const termBusqueda = sin ? norm(sin.busca) : q
      const distinto = termBusqueda !== q
      lista = lista.filter((p) => {
        const campos = [p.nombre, p.nombre_ca ?? '', p.descripcion ?? '', p.descripcion_ca ?? '', p.categoria ?? '']
        return campos.some((c) => norm(c).includes(termBusqueda) || (distinto && norm(c).includes(q)))
      })
    }

    if (orden === 'alfabetico') lista.sort((a, b) => {
      const na = idioma === 'ca' ? (a.nombre_ca ?? a.nombre) : a.nombre
      const nb = idioma === 'ca' ? (b.nombre_ca ?? b.nombre) : b.nombre
      return na.localeCompare(nb, idioma)
    })
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
              onClick={() => { router.replace('/tienda'); setOrden('alfabetico') }}
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
                onClick={() => { router.replace(`/tienda?cat=${encodeURIComponent(catLabel(c))}`); setOrden('alfabetico') }}
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
            onChange={(e) => {
              const val = e.target.value
              if (!val) router.replace('/tienda')
              else router.replace(`/tienda?cat=${encodeURIComponent(val)}`)
              setOrden('alfabetico')
            }}
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

      {/* Conteo */}
      <p className="text-[11px] uppercase tracking-widest text-[#767676] mb-8">
        {productos.length} {productos.length === 1 ? tt.producto : tt.productos}
      </p>

      {/* Grid */}
      {cargando ? (
        <p className="text-sm text-[#767676] text-center py-20">{idioma === 'ca' ? 'Carregant...' : 'Cargando...'}</p>
      ) : productos.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-['EB_Garamond'] text-2xl italic text-[#1b1b1b] mb-3">{idioma === 'ca' ? 'Sense resultats' : 'Sin resultados'}</p>
          <p className="text-sm text-[#767676]">{idioma === 'ca' ? 'Prova amb altres paraules o explora tota la col·lecció.' : 'Prueba con otras palabras o explora toda la colección.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {productos.map((p) => (
            <TarjetaProducto key={p.id} producto={p} tieneVariantes={productosConVariantes.has(p.id)} />
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
