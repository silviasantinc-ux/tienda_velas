import type { Metadata } from 'next'

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  title: 'El origen — llum & glow | Taller artesanal en el área de Barcelona',
  description: 'Conoce la historia de llum & glow: un taller artesanal en el área de Barcelona que elabora velas a mano con cera de soja, algodón y mucho cuidado.',
  openGraph: {
    title: 'El origen — llum & glow',
    description: 'La historia detrás de cada vela artesanal llum & glow, elaboradas a mano en el área de Barcelona.',
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