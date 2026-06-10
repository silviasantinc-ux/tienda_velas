'use client'

import Link from 'next/link'
import { useIdioma } from '@/lib/idioma-store'

export default function PaginaEnvios() {
  const { idioma } = useIdioma()
  const ca = idioma === 'ca'

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">
          {ca ? 'Informació' : 'Información'}
        </p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">
          {ca ? 'Enviaments' : 'Envíos'}
        </h1>
      </div>

      <div className="space-y-10 border-t border-[#e0ddd8] pt-10">

        {/* Envío gratuito */}
        <div>
          <h2 className="text-[10px] uppercase tracking-widest text-[#767676] mb-3">
            {ca ? 'Enviament gratuït' : 'Envío gratuito'}
          </h2>
          <p className="text-sm text-[#666] leading-relaxed">
            {ca
              ? 'Totes les comandes a partir de 60€ tenen enviament gratuït a la península.'
              : 'Todos los pedidos a partir de 60€ tienen envío gratuito a la península.'}
          </p>
        </div>

        {/* Tarifas */}
        <div>
          <h2 className="text-[10px] uppercase tracking-widest text-[#767676] mb-4">
            {ca ? 'Tarifes orientatives' : 'Tarifas orientativas'}
          </h2>
          <div className="divide-y divide-[#f0ede8] text-sm text-[#666]">
            <div className="flex justify-between py-3">
              <span>{ca ? 'Península' : 'Península'}</span>
              <span>{ca ? 'Entre 4,90€ i 7€' : 'Entre 4,90€ y 7€'}</span>
            </div>
            <div className="flex justify-between py-3">
              <span>{ca ? 'Illes Balears' : 'Islas Baleares'}</span>
              <span>{ca ? 'Entre 6€ i 9€' : 'Entre 6€ y 9€'}</span>
            </div>
            <div className="flex justify-between py-3">
              <span>{ca ? 'Canàries, Ceuta, Melilla' : 'Canarias, Ceuta, Melilla'}</span>
              <span>{ca ? 'Consultar' : 'Consultar'}</span>
            </div>
          </div>
          <p className="text-[11px] text-[#999] mt-4 leading-relaxed">
            {ca
              ? "El cost exacte de l'enviament es confirma amb cada comanda en funció del pes i la destinació."
              : 'El coste exacto del envío se confirma con cada pedido en función del peso y el destino.'}
          </p>
        </div>

        {/* Plazos */}
        <div>
          <h2 className="text-[10px] uppercase tracking-widest text-[#767676] mb-3">
            {ca ? 'Terminis' : 'Plazos'}
          </h2>
          <p className="text-sm text-[#666] leading-relaxed">
            {ca
              ? "Elaborem cada espelma de manera artesanal. El temps de preparació varia segons la demanda, i l'entrega sol tardar 2-5 dies laborables. T'informem del termini exacte en confirmar la comanda."
              : 'Elaboramos cada vela de forma artesanal. El tiempo de preparación varía según la demanda, y la entrega suele tardar 2-5 días laborables. Te informamos del plazo exacto al confirmar el pedido.'}
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h2 className="text-[10px] uppercase tracking-widest text-[#767676] mb-3">
            {ca ? 'Consultes' : 'Consultas'}
          </h2>
          <p className="text-sm text-[#666] mb-4">
            {ca
              ? "Per a qualsevol dubte sobre la teva comanda, escriu-nos a:"
              : 'Para cualquier duda sobre tu pedido, escríbenos a:'}
          </p>
          <a
            href="mailto:info@llumandglow.com"
            className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors"
          >
            info@llumandglow.com
          </a>
        </div>

      </div>
    </div>
  )
}
