'use client'

import Link from 'next/link'
import { useIdioma } from '@/lib/idioma-store'

export default function PaginaEnvios() {
  const { idioma } = useIdioma()
  const ca = idioma === 'ca'

  const secciones = ca ? [
    {
      titulo: 'Terminis d\'enviament',
      contenido: [
        'Les comandes es preparen i s\'envien en un termini de 2 a 4 dies hàbils des de la confirmació del pagament.',
        'Un cop enviada la comanda, el temps de lliurament estimat és de 2 a 5 dies hàbils per a la Península Ibèrica.',
        'Per a les Illes Balears i Canàries, el termini és de 4 a 7 dies hàbils.',
        'T\'enviarem un correu electrònic amb el número de seguiment quan la teva comanda surti del nostre taller.',
      ],
    },
    {
      titulo: 'Tarifes d\'enviament',
      contenido: [
        'Enviament estàndard: 4,90 €',
        'Enviament gratuït en comandes iguals o superiors a 50 €.',
        'Illes Balears i Canàries: 7,90 €',
        'Portugal: 6,90 €',
        'Resta d\'Europa: 12,00 €',
      ],
    },
    {
      titulo: 'Política de devolucions',
      contenido: [
        'Acceptem devolucions dins dels 14 dies naturals posteriors a la recepció de la comanda.',
        'El producte ha d\'estar en perfecte estat, sense usar i amb el seu embalatge original.',
        'Per iniciar una devolució, posa\'t en contacte amb nosaltres a info@llumandglow.com indicant el número de comanda i el motiu.',
        'Un cop rebem i verifiquem el producte, et realitzarem el reemborsament en un termini de 5 a 10 dies hàbils al mètode de pagament original.',
        'Les despeses d\'enviament de tornada corren a càrrec del client, excepte en cas de producte defectuós o error en la comanda.',
      ],
    },
    {
      titulo: 'Productes defectuosos o incorrectes',
      contenido: [
        'Si has rebut un producte defectuós o diferent al que vas demanar, posa\'t en contacte amb nosaltres en un termini de 48 hores des de la recepció.',
        'T\'enviarem un producte de substitució sense cost addicional o et realitzarem el reemborsament complet, segons la teva preferència.',
      ],
    },
  ] : [
    {
      titulo: 'Plazos de envío',
      contenido: [
        'Los pedidos se preparan y envían en un plazo de 2 a 4 días hábiles desde la confirmación del pago.',
        'Una vez enviado el pedido, el tiempo de entrega estimado es de 2 a 5 días hábiles para la Península Ibérica.',
        'Para las Islas Baleares y Canarias, el plazo es de 4 a 7 días hábiles.',
        'Te enviaremos un correo electrónico con el número de seguimiento cuando tu pedido salga de nuestro taller.',
      ],
    },
    {
      titulo: 'Tarifas de envío',
      contenido: [
        'Envío estándar: 4,90 €',
        'Envío gratuito en pedidos iguales o superiores a 50 €.',
        'Islas Baleares y Canarias: 7,90 €',
        'Portugal: 6,90 €',
        'Resto de Europa: 12,00 €',
      ],
    },
    {
      titulo: 'Política de devoluciones',
      contenido: [
        'Aceptamos devoluciones dentro de los 14 días naturales posteriores a la recepción del pedido.',
        'El producto debe estar en perfecto estado, sin usar y con su embalaje original.',
        'Para iniciar una devolución, contáctanos en info@llumandglow.com indicando el número de pedido y el motivo.',
        'Una vez recibido y verificado el producto, realizaremos el reembolso en un plazo de 5 a 10 días hábiles al método de pago original.',
        'Los gastos de envío de vuelta corren a cargo del cliente, excepto en caso de producto defectuoso o error en el pedido.',
      ],
    },
    {
      titulo: 'Productos defectuosos o incorrectos',
      contenido: [
        'Si has recibido un producto defectuoso o diferente al que pediste, contáctanos en un plazo de 48 horas desde la recepción.',
        'Te enviaremos un producto de sustitución sin coste adicional o realizaremos el reembolso completo, según tu preferencia.',
      ],
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">
          {ca ? 'Informació' : 'Información'}
        </p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">
          {ca ? 'Enviaments i devolucions' : 'Envíos y devoluciones'}
        </h1>
      </div>

      <div className="space-y-10">
        {secciones.map((s) => (
          <div key={s.titulo} className="border-t border-[#e0ddd8] pt-8">
            <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-5">{s.titulo}</h2>
            <ul className="space-y-3">
              {s.contenido.map((linea, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#666] leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0 mt-2" />
                  {linea}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 pt-8 border-t border-[#e0ddd8]">
        <p className="text-sm text-[#666] mb-4">
          {ca
            ? 'Tens alguna pregunta sobre la teva comanda?'
            : '¿Tienes alguna pregunta sobre tu pedido?'}
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
