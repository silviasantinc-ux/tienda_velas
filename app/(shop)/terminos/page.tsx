'use client'

import { useIdioma } from '@/lib/idioma-store'

export default function PaginaTerminos() {
  const { idioma } = useIdioma()
  const ca = idioma === 'ca'

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">
          {ca ? 'Informació legal' : 'Información legal'}
        </p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">
          {ca ? 'Termes i condicions' : 'Términos y condiciones'}
        </h1>
        <p className="text-sm text-[#767676] mt-3">
          {ca ? 'Última actualització: abril 2026 · Pendent de revisió legal' : 'Última actualización: abril 2026 · Pendiente de revisión legal'}
        </p>
      </div>

      <div className="space-y-10 text-sm text-[#666] leading-relaxed">

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Informació general' : 'Información general'}
          </h2>
          <p>{ca
            ? 'Aquest lloc web és titularitat de Llum & Glow. L\'ús d\'aquest lloc web implica l\'acceptació plena dels presents termes i condicions.'
            : 'Este sitio web es titularidad de Llum & Glow. El uso de este sitio web implica la aceptación plena de los presentes términos y condiciones.'}</p>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Productes i preus' : 'Productos y precios'}
          </h2>
          <ul className="space-y-2">
            {(ca ? [
              'Tots els preus inclouen IVA i estan expressats en euros.',
              'Ens reservem el dret de modificar els preus en qualsevol moment sense previ avís.',
              'Les imatges dels productes són orientatives i poden variar lleugerament respecte al producte final.',
              'Tots els nostres productes estan elaborats artesanalment, per la qual cosa pot haver-hi petites variacions entre unitats.',
            ] : [
              'Todos los precios incluyen IVA y están expresados en euros.',
              'Nos reservamos el derecho de modificar los precios en cualquier momento sin previo aviso.',
              'Las imágenes de los productos son orientativas y pueden variar ligeramente respecto al producto final.',
              'Todos nuestros productos están elaborados artesanalmente, por lo que puede haber pequeñas variaciones entre unidades.',
            ]).map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Procés de compra' : 'Proceso de compra'}
          </h2>
          <p>{ca
            ? 'La comanda es formalitza en el moment en què reps la confirmació per correu electrònic. Fins a aquest moment, Llum & Glow es reserva el dret de cancel·lar la comanda per causes justificades (error de preu, producte esgotat, etc.), en aquest cas es reemborsarà l\'import íntegre.'
            : 'El pedido se formaliza en el momento en que recibes la confirmación por correo electrónico. Hasta ese momento, Llum & Glow se reserva el derecho a cancelar el pedido por causas justificadas (error de precio, producto agotado, etc.), en cuyo caso se reembolsará el importe íntegro.'}</p>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Propietat intel·lectual' : 'Propiedad intelectual'}
          </h2>
          <p>{ca
            ? 'Tots els continguts d\'aquest lloc web (textos, imatges, logotips, disseny) són propietat de Llum & Glow o dels seus llicenciants i estan protegits per la legislació de propietat intel·lectual. Queda prohibida la seva reproducció sense autorització expressa.'
            : 'Todos los contenidos de este sitio web (textos, imágenes, logotipos, diseño) son propiedad de Llum & Glow o de sus licenciantes y están protegidos por la legislación de propiedad intelectual. Queda prohibida su reproducción sin autorización expresa.'}</p>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Llei aplicable' : 'Ley aplicable'}
          </h2>
          <p>{ca
            ? 'Aquests termes es regeixen per la legislació espanyola. Per a qualsevol controvèrsia, les parts se sotmeten als jutjats i tribunals corresponents.'
            : 'Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales correspondientes.'}</p>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <p className="text-[#767676]">{ca
            ? 'Per a qualsevol consulta:'
            : 'Para cualquier consulta:'}{' '}
            <a href="mailto:info@llumandglow.com" className="text-[#1b1b1b] underline hover:text-[#7d5d24] transition-colors">info@llumandglow.com</a>
          </p>
        </div>

      </div>
    </div>
  )
}
