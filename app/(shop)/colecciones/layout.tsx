import type { Metadata } from 'next'

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  title: 'Colecciones de velas artesanales — llum & glow',
  description: 'Explora las colecciones de velas artesanales llum & glow: Otoño, Postre, Bebidas, Hogar y Eventos. Elaboradas a mano con cera de soja natural.',
  alternates: { canonical: `${BASE}/colecciones` },
  openGraph: {
    title: 'Colecciones — llum & glow',
    description: 'Velas artesanales de soja organizadas por colección. Encuentra tu aroma.',
    url: `${BASE}/colecciones`,
    images: [{ url: `${BASE}/todas_las_velas.jpg`, alt: 'Colecciones de velas artesanales llum & glow' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
