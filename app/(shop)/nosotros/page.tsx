'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useIdioma } from '@/lib/idioma-store'

export default function PaginaNosotros() {
  const tn = useIdioma((s) => s.t.nosotros)

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-96 flex items-end overflow-hidden bg-[#1b1b1b]">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Byredo_1996_scented_candle.jpg"
          alt="Taller llum & glow"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-14 text-[#f6f4f1]">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#dcbcbc] mb-4">{tn.elOrigen}</p>
          <h1 className="font-serif text-5xl md:text-7xl italic leading-tight whitespace-pre-line">
            {tn.heroTitulo}
          </h1>
        </div>
      </section>

      {/* Historia — Capítulo 1 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-serif text-2xl md:text-3xl italic text-[#7d5d24] mb-10 leading-relaxed">
          {tn.cita1}
        </p>

        <div className="space-y-6 text-sm text-[#555] leading-[1.9]">
          <p>{tn.par1}</p>
          <p>{tn.par2}</p>
        </div>
      </section>

      {/* Imagen intermedia */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-72 md:h-auto min-h-[400px] bg-[#ece9e4]">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/01/Scented_candle_candlelight.jpg"
            alt={tn.altImagen}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="bg-[#ece9e4] flex items-center px-10 md:px-16 py-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-5">2026</p>
            <p className="font-serif text-3xl italic text-[#1b1b1b] leading-snug mb-6">
              {tn.cita2}
            </p>
            <p className="text-sm text-[#666] leading-relaxed">
              {tn.pie2}
            </p>
          </div>
        </div>
      </section>

      {/* Historia — Capítulo 2 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="space-y-6 text-sm text-[#555] leading-[1.9]">
          <p>{tn.par3}</p>
          <p>{tn.par4}</p>
          <p>{tn.par5}<em>{tn.par5em}</em></p>
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="bg-[#1b1b1b] text-[#f6f4f1] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#dcbcbc] mb-10 text-center">{tn.elCamino}</p>
          <div className="space-y-0">
            {tn.timeline.map(({ año, titulo, texto }, i) => (
              <div key={año} className="flex gap-8 pb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#dcbcbc] mt-1 flex-shrink-0" />
                  {i < 2 && <div className="w-px flex-1 bg-[#333] mt-2" />}
                </div>
                <div className="pb-2">
                  <p className="text-[10px] uppercase tracking-widest text-[#dcbcbc] mb-1">{año}</p>
                  <p className="font-serif text-xl italic text-[#f6f4f1] mb-2">{titulo}</p>
                  <p className="text-sm text-[#767676] leading-relaxed">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia — Capítulo 3 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="space-y-6 text-sm text-[#555] leading-[1.9]">
          <p>{tn.par6}</p>
          <p>{tn.par7}</p>
          <p>{tn.par8}</p>
        </div>

        <blockquote className="border-l-2 border-[#dcbcbc] pl-6 mt-12">
          <p className="font-serif text-xl italic text-[#1b1b1b] leading-relaxed mb-3">
            {tn.cita3}
          </p>
          <cite className="text-[10px] uppercase tracking-widest text-[#7d5d24] not-italic">{tn.cita3autor}</cite>
        </blockquote>
      </section>

      {/* Valores */}
      <section className="bg-[#ece9e4] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">{tn.loQueNosGuia}</p>
            <h2 className="font-serif text-4xl italic text-[#1b1b1b]">{tn.nuestrosValores}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {tn.valores.map(({ titulo, texto }) => (
              <div key={titulo} className="border-t-2 border-[#dcbcbc] pt-6">
                <h3 className="font-serif text-2xl italic text-[#1b1b1b] mb-4">{titulo}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#1b1b1b] text-[#f6f4f1] py-20 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#dcbcbc] mb-4">{tn.ctaLabel}</p>
        <h2 className="font-serif text-4xl md:text-5xl italic mb-4 max-w-xl mx-auto leading-tight">
          {tn.ctaTitulo}
        </h2>
        <p className="text-[#767676] text-sm mb-10 max-w-sm mx-auto">
          {tn.ctaTexto}
        </p>
        <Link
          href="/tienda"
          className="inline-block border border-[#f6f4f1] hover:bg-[#f6f4f1] hover:text-[#1b1b1b] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium px-10 py-4 transition-all duration-300"
        >
          {tn.ctaBoton}
        </Link>
      </section>

    </div>
  )
}
