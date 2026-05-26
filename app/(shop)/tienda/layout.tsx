import type { Metadata } from 'next'

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  title: 'Tienda de velas artesanales — llum & glow',
  description: 'Descubre nuestra colección de velas artesanales elaboradas con cera de soja natural, mechas de algodón y fragancias únicas. Categorías: Otoño, Postre, Bebidas, Hogar y Eventos.',
  openGraph: {
    title: 'Tienda de velas artesanales — llum & glow',
    description: 'Velas elaboradas a mano con cera de soja natural y fragancias únicas.',
    url: `${BASE}/tienda`,
    images: [{ url: `${BASE}/todas_las_velas.jpg`, alt: 'Colección de velas artesanales llum & glow' }],
  },
  alternates: {
    canonical: `${BASE}/tienda`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}