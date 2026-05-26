import type { Metadata } from 'next'

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  title: 'El origen — llum & glow | Nuestra historia',
  description: 'Somos dos personas que empezamos haciendo velas un domingo por la tarde. Conoce la historia de llum & glow: artesanía hecha con cera de soja, algodón y muchas ganas.',
  openGraph: {
    title: 'El origen — llum & glow',
    description: 'La historia detrás de cada vela artesanal llum & glow.',
    url: `${BASE}/nosotros`,
    images: [{ url: `${BASE}/todas_las_velas.jpg`, alt: 'llum & glow velas artesanales' }],
  },
  alternates: {
    canonical: `${BASE}/nosotros`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}