'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { productosMock } from '@/lib/productos-mock'
import TarjetaProducto from '@/components/TarjetaProducto'
import { useIdioma } from '@/lib/idioma-store'
import ContadorEvento from '@/components/ContadorEvento'

const destacados = productosMock.filter((p) => p.badge === 'mas-vendido').slice(0, 4)
const nuevos = productosMock.filter((p) => p.badge === 'nuevo').slice(0, 4)

export default function Home() {
  const { t } = useIdioma()
  const th = t.home
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] mt-6 flex flex-col overflow-hidden bg-[#1b1b1b]">
        {new Date() < new Date('2026-05-04T00:00:00') ? (
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
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <radialGradient id="glow1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#c8903a" stopOpacity="0.5" /><stop offset="100%" stopColor="#c8903a" stopOpacity="0" /></radialGradient>
              <radialGradient id="glow2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#dcbcbc" stopOpacity="0.35" /><stop offset="100%" stopColor="#dcbcbc" stopOpacity="0" /></radialGradient>
              <radialGradient id="flameGrad" cx="50%" cy="80%" r="60%"><stop offset="0%" stopColor="#fff8e1" /><stop offset="40%" stopColor="#ffb74d" /><stop offset="100%" stopColor="#e65100" stopOpacity="0" /></radialGradient>
              <radialGradient id="flameGrad2" cx="50%" cy="80%" r="60%"><stop offset="0%" stopColor="#fff8e1" /><stop offset="40%" stopColor="#ffcc80" /><stop offset="100%" stopColor="#e65100" stopOpacity="0" /></radialGradient>
              <filter id="blur1"><feGaussianBlur stdDeviation="18" /></filter>
              <filter id="blur2"><feGaussianBlur stdDeviation="8" /></filter>
            </defs>
            <ellipse cx="580" cy="420" rx="180" ry="160" fill="url(#glow1)" filter="url(#blur1)" />
            <ellipse cx="860" cy="380" rx="140" ry="130" fill="url(#glow1)" filter="url(#blur1)" />
            <ellipse cx="1050" cy="470" rx="110" ry="100" fill="url(#glow2)" filter="url(#blur1)" />
            <rect x="540" y="320" width="80" height="240" rx="4" fill="#2e2a24" /><rect x="540" y="320" width="80" height="240" rx="4" fill="none" stroke="#7d5d24" strokeWidth="1" strokeOpacity="0.4" /><line x1="580" y1="320" x2="578" y2="300" stroke="#555" strokeWidth="2" strokeLinecap="round" /><ellipse cx="578" cy="288" rx="14" ry="22" fill="url(#flameGrad)" filter="url(#blur2)" opacity="0.9" /><path d="M578,302 C572,292 570,280 578,268 C586,280 586,292 578,302Z" fill="#fff8e1" opacity="0.95" /><ellipse cx="580" cy="558" rx="55" ry="10" fill="#2a2520" stroke="#7d5d24" strokeWidth="0.8" strokeOpacity="0.4" />
            <rect x="820" y="280" width="70" height="200" rx="4" fill="#2e2a24" /><rect x="820" y="280" width="70" height="200" rx="4" fill="none" stroke="#dcbcbc" strokeWidth="1" strokeOpacity="0.35" /><line x1="855" y1="280" x2="853" y2="263" stroke="#555" strokeWidth="2" strokeLinecap="round" /><ellipse cx="853" cy="252" rx="12" ry="19" fill="url(#flameGrad2)" filter="url(#blur2)" opacity="0.85" /><path d="M853,264 C848,255 846,244 853,234 C860,244 860,255 853,264Z" fill="#fff8e1" opacity="0.95" /><ellipse cx="855" cy="479" rx="48" ry="9" fill="#2a2520" stroke="#dcbcbc" strokeWidth="0.8" strokeOpacity="0.35" />
            <rect x="1010" y="360" width="56" height="160" rx="4" fill="#2e2a24" /><rect x="1010" y="360" width="56" height="160" rx="4" fill="none" stroke="#7d5d24" strokeWidth="1" strokeOpacity="0.3" /><line x1="1038" y1="360" x2="1036" y2="346" stroke="#555" strokeWidth="1.5" strokeLinecap="round" /><ellipse cx="1036" cy="337" rx="10" ry="16" fill="url(#flameGrad)" filter="url(#blur2)" opacity="0.8" /><path d="M1036,348 C1032,341 1030,332 1036,323 C1042,332 1042,341 1036,348Z" fill="#fff8e1" opacity="0.9" /><ellipse cx="1038" cy="519" rx="38" ry="7" fill="#2a2520" stroke="#7d5d24" strokeWidth="0.8" strokeOpacity="0.3" />
            <circle cx="450" cy="250" r="1.5" fill="#dcbcbc" opacity="0.6" /><circle cx="700" cy="180" r="1" fill="#7d5d24" opacity="0.5" /><circle cx="1100" cy="220" r="1.5" fill="#dcbcbc" opacity="0.55" /><circle cx="920" cy="160" r="1.5" fill="#dcbcbc" opacity="0.5" />
          </svg>
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
        <div className="relative z-10 flex justify-center pb-6">
          <div className="animate-bounce text-[#f6f4f1]/60">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
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
                <TarjetaProducto key={p.id} producto={p} />
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
                <TarjetaProducto key={p.id} producto={p} />
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
