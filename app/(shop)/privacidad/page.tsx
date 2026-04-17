'use client'

import { useIdioma } from '@/lib/idioma-store'

export default function PaginaPrivacidad() {
  const { idioma } = useIdioma()
  const ca = idioma === 'ca'

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">
          {ca ? 'Informació legal' : 'Información legal'}
        </p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">
          {ca ? 'Política de privacitat' : 'Política de privacidad'}
        </h1>
        <p className="text-sm text-[#767676] mt-3">
          {ca ? 'Última actualització: abril 2026 · Pendent de revisió legal' : 'Última actualización: abril 2026 · Pendiente de revisión legal'}
        </p>
      </div>

      <div className="space-y-10 text-sm text-[#666] leading-relaxed">

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Responsable del tractament' : 'Responsable del tratamiento'}
          </h2>
          <p>{ca ? 'Denominació social:' : 'Denominación social:'} <strong>Llum & Glow</strong></p>
          <p className="mt-2">{ca ? 'Correu electrònic:' : 'Correo electrónico:'} <a href="mailto:info@llumandglow.com" className="text-[#1b1b1b] underline">info@llumandglow.com</a></p>
          <p className="mt-2 text-[#aaa] text-xs">{ca ? '(CIF i adreça fiscal pendents d\'actualitzar)' : '(CIF y dirección fiscal pendientes de actualizar)'}</p>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Dades que recollim' : 'Datos que recogemos'}
          </h2>
          <ul className="space-y-2">
            {(ca ? [
              'Nom i cognoms, per gestionar la teva comanda.',
              'Adreça de correu electrònic, per enviar confirmacions i comunicacions.',
              'Adreça de lliurament, per processar l\'enviament.',
              'Dades de pagament, gestionades de forma segura per la passarel·la de pagament (no emmagatzemem dades de targetes).',
            ] : [
              'Nombre y apellidos, para gestionar tu pedido.',
              'Dirección de correo electrónico, para enviar confirmaciones y comunicaciones.',
              'Dirección de entrega, para procesar el envío.',
              'Datos de pago, gestionados de forma segura por la pasarela de pago (no almacenamos datos de tarjetas).',
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
            {ca ? 'Finalitat del tractament' : 'Finalidad del tratamiento'}
          </h2>
          <p>{ca
            ? 'Les teves dades s\'utilitzen exclusivament per gestionar les comandes, processar els pagaments, gestionar les devolucions i, si ho has acceptat, enviar comunicacions comercials sobre els nostres productes.'
            : 'Tus datos se utilizan exclusivamente para gestionar los pedidos, procesar los pagos, gestionar las devoluciones y, si lo has aceptado, enviar comunicaciones comerciales sobre nuestros productos.'}</p>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Els teus drets' : 'Tus derechos'}
          </h2>
          <p className="mb-3">{ca
            ? 'Tens dret a accedir, rectificar, suprimir, limitar el tractament i portar les teves dades. Per exercir-los, posa\'t en contacte amb nosaltres:'
            : 'Tienes derecho a acceder, rectificar, suprimir, limitar el tratamiento y portar tus datos. Para ejercerlos, contáctanos:'}</p>
          <a href="mailto:info@llumandglow.com" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors">
            info@llumandglow.com
          </a>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Conservació de les dades' : 'Conservación de los datos'}
          </h2>
          <p>{ca
            ? 'Les teves dades es conserven durant el temps necessari per complir les obligacions legals i mentre existeixi una relació comercial. En cap cas es cedeixen a tercers amb fins comercials.'
            : 'Tus datos se conservan durante el tiempo necesario para cumplir las obligaciones legales y mientras exista una relación comercial. En ningún caso se ceden a terceros con fines comerciales.'}</p>
        </div>

      </div>
    </div>
  )
}
