import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Opiniones y reseñas — llum & glow',
  description: 'Lee las opiniones verificadas de nuestras clientas. Valoración media de 4,9 sobre 5 en más de 9 reseñas. Velas artesanales llum & glow.',
  openGraph: {
    title: 'Opiniones y reseñas — llum & glow',
    description: '9 reseñas verificadas. Valoración media 4,9/5.',
    url: 'https://www.llumandglow.com/resenas',
  },
  alternates: {
    canonical: 'https://www.llumandglow.com/resenas',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
