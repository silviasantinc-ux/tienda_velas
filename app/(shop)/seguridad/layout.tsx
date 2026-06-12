import type { Metadata } from 'next'

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  title: 'Seguridad del producto — llum & glow',
  description: 'Instrucciones de uso seguro, pictogramas de peligro y normativa aplicable a las velas artesanales llum & glow.',
  alternates: { canonical: `${BASE}/seguridad` },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
