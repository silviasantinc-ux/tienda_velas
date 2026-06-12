import type { Metadata } from 'next'

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  title: 'Política de cookies — llum & glow',
  description: 'Información sobre el uso de cookies en la tienda online llum & glow.',
  alternates: { canonical: `${BASE}/cookies` },
  robots: { index: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
