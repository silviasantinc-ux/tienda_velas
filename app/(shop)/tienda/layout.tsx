import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tienda de velas artesanales — llum & glow',
  description: 'Descubre nuestra colección de velas artesanales elaboradas con cera de soja natural, mechas de algodón y fragancias únicas. Categorías: Otoño, Postre, Bebidas, Hogar y Eventos.',
  openGraph: {
    title: 'Tienda de velas artesanales — llum & glow',
    description: 'Velas elaboradas a mano con cera de soja natural y fragancias únicas.',
    url: 'https://tiendavelas.vercel.app/tienda',
  },
  alternates: {
    canonical: 'https://tiendavelas.vercel.app/tienda',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
