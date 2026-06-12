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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
