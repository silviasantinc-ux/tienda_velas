import type { Metadata } from 'next'

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  title: 'Información de envíos — llum & glow',
  description: 'Envío gratuito a partir de 60€ en la península. Tarifas orientativas, plazos de entrega y zonas de envío de llum & glow.',
  alternates: { canonical: `${BASE}/envios` },
  openGraph: {
    title: 'Información de envíos — llum & glow',
    description: 'Envío gratuito desde 60€. Entrega en 2-5 días laborables.',
    url: `${BASE}/envios`,
  },
}

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta el envío?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El envío a la península tiene un coste orientativo de entre 4,90€ y 7€. Los pedidos a partir de 60€ tienen envío gratuito.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tarda en llegar mi pedido?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La entrega suele tardar entre 2 y 5 días laborables. Al confirmar tu pedido te informamos del plazo exacto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Envíais a las Islas Baleares?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, enviamos a las Islas Baleares con un coste orientativo de entre 6€ y 9€.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Envíais a Canarias, Ceuta o Melilla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, aunque el coste varía. Escríbenos a info@llumandglow.com y te informamos.',
      },
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      {children}
    </>
  )
}
