'use client'

import Link from 'next/link'
import { ShoppingBag, Search, X, User } from 'lucide-react'
import { useCarrito } from '@/lib/carrito-store'
import { useIdioma } from '@/lib/idioma-store'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CarritoDropdown from './CarritoDropdown'
import LogoLlumGlow from './LogoLlumGlow'

export default function Navbar() {
  const totalItems = useCarrito((s) => s.totalItems())
  const { idioma, setIdioma, t } = useIdioma()
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [busquedaAbierta, setBusquedaAbierta] = useState(false)
  const [termino, setTermino] = useState('')
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const carritoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (carritoRef.current && !carritoRef.current.contains(e.target as Node)) {
        setCarritoAbierto(false)
      }
    }
    if (carritoAbierto) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [carritoAbierto])
  const router = useRouter()

  const abrirCarrito = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setCarritoAbierto(true)
  }
  const cerrarCarrito = () => {
    closeTimer.current = setTimeout(() => setCarritoAbierto(false), 180)
  }

  const abrirBusqueda = () => setBusquedaAbierta(true)
  const cerrarBusqueda = () => {
    setBusquedaAbierta(false)
    setTermino('')
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
        className={idioma === 'es' ? 'text-[#1b1b1b]' : 'text-[#bbb] hover:text-[#999] transition-colors'}
      >ES</button>
      <span className="text-[#e0ddd8]">|</span>
      <button
        onClick={() => setIdioma('ca')}
        className={idioma === 'ca' ? 'text-[#1b1b1b]' : 'text-[#bbb] hover:text-[#999] transition-colors'}
      >CA</button>
    </div>
  )

  const carritoIcono = (
    <div ref={carritoRef} className="relative" onMouseEnter={abrirCarrito} onMouseLeave={cerrarCarrito}>
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
      {carritoAbierto && <CarritoDropdown />}
    </div>
  )

  return (
    <nav className="bg-[#f6f4f1] border-b border-[#e0ddd8] sticky top-0 z-50">

      {/* ── Desktop ── */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 py-2 items-center justify-between min-h-[88px]">
        <div className="flex items-center gap-8 text-[11px] uppercase tracking-widest font-medium">
          <Link href="/tienda" className="text-[#1b1b1b] hover:text-[#7d5d24] transition-colors">{t.nav.tienda}</Link>
          <Link href="/nosotros" className="text-[#1b1b1b] hover:text-[#7d5d24] transition-colors">{t.nav.elOrigen}</Link>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="llum & glow — inicio">
          <LogoLlumGlow height={72} />
        </Link>

        <div className="flex items-center gap-5 text-[#1b1b1b]">
          {selectorIdioma}
          <button onClick={abrirBusqueda} className="hover:text-[#7d5d24] transition-colors"><Search className="w-5 h-5" /></button>
          <Link href="/registro" className="hover:text-[#7d5d24] transition-colors"><User className="w-5 h-5" /></Link>
          {carritoIcono}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">
            <Link href="/tienda" className="hover:text-[#7d5d24] transition-colors">{t.nav.tienda}</Link>
            <Link href="/nosotros" className="hover:text-[#7d5d24] transition-colors">{t.nav.elOrigen}</Link>
          </div>
          <div className="flex items-center gap-4 text-[#1b1b1b]">
            {selectorIdioma}
            <button onClick={abrirBusqueda} className="hover:text-[#7d5d24] transition-colors"><Search className="w-5 h-5" /></button>
            <Link href="/registro" className="hover:text-[#7d5d24] transition-colors"><User className="w-5 h-5" /></Link>
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
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#999] flex-shrink-0" />
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
              className="text-[#999] hover:text-[#1b1b1b] transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
