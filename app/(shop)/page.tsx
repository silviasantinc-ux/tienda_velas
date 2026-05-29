'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import TarjetaProducto from '@/components/TarjetaProducto'
import { useIdioma } from '@/lib/idioma-store'
import ContadorEvento from '@/components/ContadorEvento'
import { supabase } from '@/lib/supabase'
import { Producto } from '@/types'

export default function Home() {
  const { t } = useIdioma()
  const th = t.home
  const videoRef = useRef<HTMLVideoElement>(null)
  const [destacados, setDestacados] = useState<Producto[]>([])
  const [nuevos, setNuevos] = useState<Producto[]>([])
  const [productosConVariantes, setProductosConVariantes] = useState<Set<string>>(new Set())

  useEffect(() => {
    Promise.all([
      supabase.from('productos').select('*').eq('activo', true),
      supabase.from('badges').select('id, nombre'),
      supabase.from('producto_variantes').select('producto_id'),
    ]).then(([{ data: prods }, { data: bdgs }, { data: vars }]) => {
      const todos = (prods as Producto[]) ?? []
      const badges = (bdgs ?? []) as { id: string; nombre: string }[]
      const idMasVendido = badges.find((b) => b.nombre.toLowerCase().includes('vendido'))?.id
      const idNuevo = badges.find((b) => b.nombre.toLowerCase().includes('nuevo') || b.nombre.toLowerCase().includes('nou'))?.id
      const alfa = (a: Producto, b: Producto) => a.nombre.localeCompare(b.nombre, 'es')
      setDestacados(todos.filter((p) => p.badge === idMasVendido).sort(alfa).slice(0, 2))
      setNuevos(todos.filter((p) => p.badge === idNuevo).sort(alfa).slice(0, 2))
      setProductosConVariantes(new Set((vars ?? []).map((v: { producto_id: string }) => v.producto_id)))
    })
  }, [])

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] mt-6 flex flex-col bg-[#1b1b1b]">
        {new Date() < new Date('2026-04-24T00:00:00') ? (
          <>
            <Image
              src="/sant_jordi_02.jpg"
              alt="Sant Jordi"
              fill
              className="object-cover opacity-85"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3d0a0a]/60 via-[#7d1a2a]/20 to-transparent" />
          </>
        ) : new Date() < new Date('2026-05-04T00:00:00') ? (
          <>
            <video
              ref={videoRef}
              src="https://sesuurpjtjcegcqupetq.supabase.co/storage/v1/object/public/productos/dia_de_la_madre.mp4"
              autoPlay loop muted playsInline
              onCanPlay={() => { if (videoRef.current) videoRef.current.playbackRate = 0.5 }}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-[#1b1b1b]/10" />
          </>
        ) : (
          <>
            <Image
              src="/todas_las_velas.jpg"
              alt="Llum & Glow"
              fill
              className="object-cover opacity-85"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/60 via-transparent to-transparent" />
          </>
        )}

        {/* Contador — arriba del hero */}
        <div className="relative z-10 bg-[#1b1b1b]/50 backdrop-blur-sm">
          <ContadorEvento />
        </div>

        {/* Texto hero — ocupa el espacio restante, centrado */}
        <div className="relative z-10 flex-1 flex items-center justify-center text-center text-[#f6f4f1] px-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-['EB_Garamond'] text-4xl md:text-6xl italic leading-tight mb-4 md:whitespace-nowrap">
              {th.heroTitulo}
            </h1>
            <p className="text-[#f6f4f1] text-sm leading-relaxed mb-6 max-w-md mx-auto">
              {th.heroTexto}
            </p>
            <Link
              href="/colecciones"
              className="inline-block bg-[#f6f4f1] text-[#1b1b1b] hover:bg-[#dcbcbc] text-[11px] uppercase tracking-widest font-medium px-12 py-4 transition-all duration-300"
            >
              {th.descubrir}
            </Link>
          </div>
        </div>

        {/* Chevron scroll */}
        <button
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-[#f6f4f1] drop-shadow-lg cursor-pointer"
          aria-label="Scroll down"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* ── MÁS VENDIDOS + NUEVAS ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Más vendidos */}
          <div>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">{th.losFavoritos}</p>
                <h2 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">{th.masVendidos}</h2>
              </div>
              <Link href="/tienda" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors hidden md:block">
                {th.verTodos}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
              {destacados.slice(0, 2).map((p) => (
                <TarjetaProducto key={p.id} producto={p} tieneVariantes={productosConVariantes.has(p.id)} />
              ))}
            </div>
          </div>

          {/* Nuevas incorporaciones */}
          <div>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">{th.recienLlegadas}</p>
                <h2 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">{th.nuevasIncorporaciones}</h2>
              </div>
              <Link href="/tienda" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors hidden md:block">
                {th.verTodas}
          </Link>
        </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
              {nuevos.slice(0, 2).map((p) => (
                <TarjetaProducto key={p.id} producto={p} tieneVariantes={productosConVariantes.has(p.id)} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── BANNER CENTRAL ───────────────────────────────── */}
      <section className="mt-2 mb-16 bg-[#ece9e4] py-14 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-4">{th.nuestraPromesa}</p>
        <h2 className="font-['EB_Garamond'] text-4xl md:text-5xl italic text-[#1b1b1b] max-w-2xl mx-auto leading-tight mb-12">
          {th.ingredientesPuros}
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20">
          {th.stats.map(({ valor, etiqueta }) => (
            <div key={etiqueta} className="text-center">
              <p className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b] mb-1">{valor}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#7d5d24]">{etiqueta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HISTORIA DE MARCA ────────────────────────────── */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-80 md:h-auto min-h-[400px] bg-[#ece9e4]">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/01/Scented_candle_candlelight.jpg"
            alt="Taller artesanal llum & glow"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="bg-[#1b1b1b] text-[#f6f4f1] flex items-center justify-center px-10 md:px-16 py-16">
          <div className="max-w-sm">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#dcbcbc] mb-5">{th.elOrigen}</p>
            <h2 className="font-serif text-4xl italic leading-tight mb-6">
              {th.historiaSubtitulo}
            </h2>
            <p className="text-[#767676] text-sm leading-relaxed mb-5">
              {th.historiaPar1}
            </p>
            <p className="text-[#767676] text-sm leading-relaxed mb-8">
              {th.historiaPar2}
            </p>
            <Link
              href="/nosotros"
              className="text-[11px] uppercase tracking-widest text-[#f6f4f1] border-b border-[#f6f4f1] pb-0.5 hover:text-[#dcbcbc] hover:border-[#dcbcbc] transition-colors"
            >
              {th.leerHistoria}
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">{th.opinionesVerificadas}</p>
            <h2 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">{th.loQueDicen}</h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} className="w-4 h-4 text-[#7d5d24]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[11px] text-[#767676] uppercase tracking-widest ml-2">4.9 · 9 {t.resenas.resenas}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {th.testimonios.map(({ titulo, texto, nombre, ciudad, producto }) => (
            <div key={nombre} className="border border-[#e0ddd8] p-8 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#7d5d24]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-['EB_Garamond'] text-xl italic text-[#1b1b1b] mb-3">{titulo}</p>
              <p className="text-sm text-[#666] leading-relaxed mb-6 flex-1">{texto}</p>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#7d5d24] mb-3">
                  {th.sobre}: {producto}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[#dcbcbc]" />
                  <div>
                    <p className="text-[11px] font-medium text-[#1b1b1b] uppercase tracking-widest">{nombre}</p>
                    <p className="text-[10px] text-[#767676] uppercase tracking-widest">{ciudad} · {th.compraVerificada}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/resenas" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors">
            {th.verResenas}
          </Link>
        </div>
      </section>

    </div>
  )
}
