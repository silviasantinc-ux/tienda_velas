'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Search, X, User, Home } from 'lucide-react'
import { useCarrito } from '@/lib/carrito-store'
import { useIdioma } from '@/lib/idioma-store'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Producto } from '@/types'
import CarritoDropdown from './CarritoDropdown'
import LogoLlumGlow from './LogoLlumGlow'

export default function Navbar() {
  const totalItems = useCarrito((s) => s.totalItems())
  const { idioma, setIdioma, t } = useIdioma()
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [busquedaAbierta, setBusquedaAbierta] = useState(false)
  const [usuarioMenuAbierto, setUsuarioMenuAbierto] = useState(false)
  const [termino, setTermino] = useState('')
  const [usuario, setUsuario] = useState<string | null>(null)
  const [sugerencias, setSugerencias] = useState<Producto[]>([])
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const userTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const productosRef = useRef<Producto[]>([])
  const sinonimosRef = useRef<{ termino: string; busca: string }[]>([])
  const router = useRouter()

  const norm = (s: string) => (s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const nombre = data.user?.user_metadata?.nombre as string | undefined
      setUsuario(data.user ? (nombre ?? data.user.email ?? '') : null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      const nombre = session?.user?.user_metadata?.nombre as string | undefined
      setUsuario(session?.user ? (nombre ?? session.user.email ?? '') : null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const abrirCarrito = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setCarritoAbierto(true)
  }
  const cerrarCarrito = () => {
    closeTimer.current = setTimeout(() => setCarritoAbierto(false), 180)
  }

  // Cargar productos y sinónimos cuando se abre la búsqueda (una sola vez)
  useEffect(() => {
    if (!busquedaAbierta || productosRef.current.length > 0) return
    Promise.all([
      supabase.from('productos').select('*').eq('activo', true),
      supabase.from('sinonimos').select('termino, busca').eq('activo', true),
    ]).then(([{ data: prods, error: e1 }, { data: sins, error: e2 }]) => {
      productosRef.current = (prods as Producto[]) ?? []
      sinonimosRef.current = (sins as { termino: string; busca: string }[]) ?? []
      console.log('[search] productos:', productosRef.current.length, 'sinonimos:', sinonimosRef.current, 'errors:', e1, e2)
    })
  }, [busquedaAbierta])

  // Búsqueda con debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (termino.trim().length < 2) { setSugerencias([]); return }
    debounceRef.current = setTimeout(() => {
      const q = norm(termino.trim())
      const sin = sinonimosRef.current.find((s) => norm(s.termino) === q)
      const termBusqueda = sin ? norm(sin.busca) : q
      const distinto = termBusqueda !== q
      console.log('[search] q:', q, '| sinonimo:', sin, '| termBusqueda:', termBusqueda)
      const resultados = productosRef.current.filter((p) => {
        const campos = [p.nombre, p.nombre_ca ?? '', p.descripcion ?? '', p.descripcion_ca ?? '', p.categoria ?? '']
        return campos.some((c) => norm(c).includes(termBusqueda) || (distinto && norm(c).includes(q)))
      })
      console.log('[search] resultados:', resultados.map(p => p.nombre))
      setSugerencias(resultados.slice(0, 6))
    }, 250)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [termino])

  const abrirBusqueda = () => setBusquedaAbierta(true)
  const cerrarBusqueda = () => {
    setBusquedaAbierta(false)
    setTermino('')
    setSugerencias([])
  }
  const buscar = () => {
    if (termino.trim()) router.push(`/tienda?q=${encodeURIComponent(termino.trim())}`)
    else router.push('/tienda')
    cerrarBusqueda()
  }

  const selectorIdioma = (
    <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-medium">
      <button
        onClick={() => setIdioma('es')}
        className={idioma === 'es' ? 'text-[#1b1b1b]' : 'text-[#bbb] hover:text-[#767676] transition-colors'}
      >ES</button>
      <span className="text-[#e0ddd8]">|</span>
      <button
        onClick={() => setIdioma('ca')}
        className={idioma === 'ca' ? 'text-[#1b1b1b]' : 'text-[#bbb] hover:text-[#767676] transition-colors'}
      >CA</button>
    </div>
  )

  const carritoIcono = (
    <div className="relative" onMouseEnter={abrirCarrito} onMouseLeave={cerrarCarrito}>
      {/* Desktop: Link que navega al carrito */}
      <Link href="/carrito" className="relative hidden md:block hover:text-[#7d5d24] transition-colors">
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#dcbcbc] text-[#1b1b1b] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </Link>
      {/* Móvil: botón que abre/cierra el dropdown */}
      <button
        onClick={() => setCarritoAbierto(!carritoAbierto)}
        className="relative md:hidden hover:text-[#7d5d24] transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#dcbcbc] text-[#1b1b1b] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>
      {carritoAbierto && (
        <>
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setCarritoAbierto(false)} />
          <div className="relative z-50"><CarritoDropdown /></div>
        </>
      )}
    </div>
  )

  return (
    <nav className="bg-[#f6f4f1] border-b border-[#e0ddd8] sticky top-0 z-50">

      {/* ── Desktop ── */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 py-2 items-center justify-between min-h-[104px]">
        <div className="flex items-center gap-8 text-[11px] uppercase tracking-widest font-medium">
          <Link href="/" className="text-[#1b1b1b] hover:text-[#7d5d24] transition-colors" aria-label="Inicio"><Home className="w-4 h-4" /></Link>
          <Link href="/tienda" className="text-[#1b1b1b] hover:text-[#7d5d24] transition-colors">{t.nav.tienda}</Link>
          <Link href="/nosotros" className="text-[#1b1b1b] hover:text-[#7d5d24] transition-colors">{t.nav.elOrigen}</Link>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="llum & glow — inicio">
          <LogoLlumGlow height={72} />
        </Link>

        <div className="flex items-center gap-5 text-[#1b1b1b]">
          {selectorIdioma}
          <button onClick={abrirBusqueda} className="hover:text-[#7d5d24] transition-colors"><Search className="w-5 h-5" /></button>
          {usuario && (
            <div className="relative"
              onMouseEnter={() => { if (userTimer.current) clearTimeout(userTimer.current); setUsuarioMenuAbierto(true) }}
              onMouseLeave={() => { userTimer.current = setTimeout(() => setUsuarioMenuAbierto(false), 180) }}
            >
              <button className="relative hover:text-[#7d5d24] transition-colors flex items-center gap-1.5">
                <User className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-widest text-[#7d5d24] max-w-[140px] truncate hidden md:inline">
                  {usuario.split(' ')[0]}
                </span>
              </button>
              {usuarioMenuAbierto && (
                <div className="absolute right-0 top-full w-48 bg-[#f6f4f1] border border-[#e0ddd8] shadow-xl z-50 py-3">
                  <p className="px-4 pb-2 text-[10px] uppercase tracking-widest text-[#7d5d24] border-b border-[#e0ddd8] mb-2 truncate">{usuario}</p>
                  <button onClick={() => { supabase.auth.signOut(); setUsuarioMenuAbierto(false) }}
                    className="w-full text-left px-4 py-2 text-[11px] uppercase tracking-widest text-[#666] hover:text-[#b97979] transition-colors">
                    {idioma === 'ca' ? 'Tancar sessió' : 'Cerrar sesión'}
                  </button>
                </div>
              )}
            </div>
          )}
          {carritoIcono}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">
            <Link href="/" className="hover:text-[#7d5d24] transition-colors" aria-label="Inicio"><Home className="w-4 h-4" /></Link>
            <Link href="/tienda" className="hover:text-[#7d5d24] transition-colors">{t.nav.tienda}</Link>
            <Link href="/nosotros" className="hover:text-[#7d5d24] transition-colors">{t.nav.elOrigen}</Link>
          </div>
          <div className="flex items-center gap-4 text-[#1b1b1b]">
            {selectorIdioma}
            <button onClick={abrirBusqueda} className="hover:text-[#7d5d24] transition-colors"><Search className="w-5 h-5" /></button>
            {usuario && (
              <div className="relative">
                <button onClick={() => setUsuarioMenuAbierto(!usuarioMenuAbierto)} className="relative hover:text-[#7d5d24] transition-colors">
                  <User className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#7d5d24]" />
                </button>
                {usuarioMenuAbierto && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUsuarioMenuAbierto(false)} />
                    <div className="absolute right-0 top-full w-48 bg-[#f6f4f1] border border-[#e0ddd8] shadow-xl z-50 py-3">
                      <p className="px-4 pb-2 text-[10px] uppercase tracking-widest text-[#7d5d24] border-b border-[#e0ddd8] mb-2 truncate">{usuario}</p>
                      <button onClick={() => { supabase.auth.signOut(); setUsuarioMenuAbierto(false) }}
                        className="w-full text-left px-4 py-2 text-[11px] uppercase tracking-widest text-[#666] hover:text-[#b97979] transition-colors">
                        {idioma === 'ca' ? 'Tancar sessió' : 'Cerrar sesión'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {carritoIcono}
          </div>
        </div>
        <div className="flex justify-center pb-3">
          <Link href="/" aria-label="llum & glow — inicio">
            <LogoLlumGlow height={56} />
          </Link>
        </div>
      </div>

      {/* ── Barra de búsqueda desplegable ── */}
      {busquedaAbierta && (
        <div className="border-t border-[#e0ddd8] bg-[#f6f4f1] px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-[#767676] flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') buscar(); if (e.key === 'Escape') cerrarBusqueda() }}
                onBlur={() => { blurTimer.current = setTimeout(() => cerrarBusqueda(), 200) }}
                placeholder={t.nav.buscarPlaceholder}
                className="flex-1 bg-transparent text-sm text-[#1b1b1b] placeholder-[#aaa] outline-none"
              />
              <button
                onMouseDown={() => { if (blurTimer.current) clearTimeout(blurTimer.current) }}
                onClick={buscar}
                className="text-[10px] uppercase tracking-widest text-[#7d5d24] font-medium hover:text-[#1b1b1b] transition-colors flex-shrink-0"
              >
                {t.nav.buscar}
              </button>
              <button
                onMouseDown={() => { if (blurTimer.current) clearTimeout(blurTimer.current) }}
                onClick={cerrarBusqueda}
                className="text-[#767676] hover:text-[#1b1b1b] transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sugerencias autocomplete */}
            {sugerencias.length > 0 && (
              <div className="mt-2 border border-[#e0ddd8] bg-white shadow-lg">
                {sugerencias.map((p) => {
                  const nombre = idioma === 'ca' ? (p.nombre_ca ?? p.nombre) : p.nombre
                  return (
                    <Link
                      key={p.id}
                      href={`/producto/${p.id}`}
                      onMouseDown={() => { if (blurTimer.current) clearTimeout(blurTimer.current) }}
                      onClick={cerrarBusqueda}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#f6f4f1] transition-colors border-b border-[#f0ede8] last:border-0"
                    >
                      <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden bg-[#ece9e4]">
                        <Image src={p.imagen_url} alt={nombre} fill className="object-cover" sizes="40px" />
                      </div>
                      <p className="flex-1 text-sm text-[#1b1b1b] truncate">{nombre}</p>
                      <p className="text-sm text-[#7d5d24] flex-shrink-0 font-medium">
                        {p.precio.toFixed(2).replace('.', ',')} €
                      </p>
                    </Link>
                  )
                })}
                <button
                  onMouseDown={() => { if (blurTimer.current) clearTimeout(blurTimer.current) }}
                  onClick={buscar}
                  className="w-full py-2.5 text-[10px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] transition-colors border-t border-[#e0ddd8]"
                >
                  {idioma === 'ca' ? 'Veure tots els resultats →' : 'Ver todos los resultados →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
