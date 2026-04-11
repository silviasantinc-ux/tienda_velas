'use client'

import Link from 'next/link'
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react'
import { useCarrito } from '@/lib/carrito-store'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import CarritoDropdown from './CarritoDropdown'
import LogoLlumGlow from './LogoLlumGlow'

export default function Navbar() {
  const totalItems = useCarrito((s) => s.totalItems())
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [busquedaAbierta, setBusquedaAbierta] = useState(false)
  const [termino, setTermino] = useState('')
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  const abrirCarrito = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setCarritoAbierto(true)
  }
  const cerrarCarrito = () => {
    closeTimer.current = setTimeout(() => setCarritoAbierto(false), 180)
  }

  const abrirBusqueda = () => {
    setMenuAbierto(false)
    setBusquedaAbierta(true)
  }

  const cerrarBusqueda = () => {
    setBusquedaAbierta(false)
    setTermino('')
  }

  const buscar = () => {
    if (termino.trim()) {
      router.push(`/tienda?q=${encodeURIComponent(termino.trim())}`)
    } else {
      router.push('/tienda')
    }
    cerrarBusqueda()
  }

  const carritoIcono = (
    <div
      className="relative"
      onMouseEnter={abrirCarrito}
      onMouseLeave={cerrarCarrito}
    >
      <Link href="/carrito" className="relative block hover:text-[#7d5d24] transition-colors">
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#dcbcbc] text-[#1b1b1b] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </Link>
      {carritoAbierto && <CarritoDropdown />}
    </div>
  )

  return (
    <nav className="bg-[#f6f4f1] border-b border-[#e0ddd8] sticky top-0 z-50">

      {/* ── Desktop ── */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 py-2 items-center justify-between min-h-[88px]">
        <div className="flex items-center gap-8 text-[11px] uppercase tracking-widest font-medium">
          <Link href="/tienda" className="text-[#1b1b1b] hover:text-[#7d5d24] transition-colors">Tienda</Link>
          <Link href="/nosotros" className="text-[#1b1b1b] hover:text-[#7d5d24] transition-colors">El origen</Link>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="llum & glow — inicio">
          <LogoLlumGlow height={72} />
        </Link>

        <div className="flex items-center gap-5 text-[#1b1b1b]">
          <button onClick={abrirBusqueda} className="hover:text-[#7d5d24] transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/registro" className="hover:text-[#7d5d24] transition-colors"><User className="w-5 h-5" /></Link>
          {carritoIcono}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-3">
          <button className="text-[#1b1b1b]" onClick={() => setMenuAbierto(!menuAbierto)}>
            {menuAbierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-5 text-[#1b1b1b]">
            <button onClick={abrirBusqueda} className="hover:text-[#7d5d24] transition-colors">
              <Search className="w-5 h-5" />
            </button>
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') buscar()
                if (e.key === 'Escape') cerrarBusqueda()
              }}
              onBlur={() => {
                blurTimer.current = setTimeout(() => cerrarBusqueda(), 200)
              }}
              placeholder="Buscar velas, aromas..."
              className="flex-1 bg-transparent text-sm text-[#1b1b1b] placeholder-[#aaa] outline-none"
            />
            <button
              onMouseDown={() => { if (blurTimer.current) clearTimeout(blurTimer.current) }}
              onClick={buscar}
              className="text-[10px] uppercase tracking-widest text-[#7d5d24] font-medium hover:text-[#1b1b1b] transition-colors flex-shrink-0"
            >
              Buscar
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

      {/* Menú mobile flotante */}
      {menuAbierto && (
        <>
          {/* Capa de fondo para cerrar al tocar fuera */}
          <div
            className="md:hidden fixed inset-0 z-40"
            onClick={() => setMenuAbierto(false)}
          />
          <div className="md:hidden absolute left-0 right-0 top-[48px] z-50 bg-[#f6f4f1] border-b border-[#e0ddd8] shadow-md px-6 py-5 flex flex-col gap-4">
            {[
              { href: '/tienda', label: 'Tienda' },
              { href: '/nosotros', label: 'El origen' },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuAbierto(false)}
                className="text-[11px] uppercase tracking-widest text-[#1b1b1b] hover:text-[#7d5d24] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </>
      )}
    </nav>
  )
}
