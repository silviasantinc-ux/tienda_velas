import type { Metadata } from 'next'

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  title: 'Términos y condiciones — llum & glow',
  description: 'Condiciones generales de compra y uso de la tienda online llum & glow.',
  alternates: { canonical: `${BASE}/terminos` },
  robots: { index: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
