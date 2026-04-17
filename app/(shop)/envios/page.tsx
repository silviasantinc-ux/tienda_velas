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

      <div className="border-t border-[#e0ddd8] pt-10">
        <p className="text-sm text-[#666] leading-relaxed mb-8">
          {ca
            ? 'Estem treballant per oferir-te la millor experiència d\'enviament. Pròximament trobaràs aquí tota la informació sobre terminis, tarifes i seguiment de comandes.'
            : 'Estamos trabajando para ofrecerte la mejor experiencia de envío. Próximamente encontrarás aquí toda la información sobre plazos, tarifas y seguimiento de pedidos.'}
        </p>
        <p className="text-sm text-[#666] mb-4">
          {ca
            ? 'Per a qualsevol consulta sobre la teva comanda, contacta\'ns a:'
            : 'Para cualquier consulta sobre tu pedido, contáctanos en:'}
        </p>
        <a
          href="mailto:info@llumandglow.com"
          className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors"
        >
          info@llumandglow.com
        </a>
      </div>
    </div>
  )
}
