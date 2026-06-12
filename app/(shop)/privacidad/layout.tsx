import type { Metadata } from 'next'

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  title: 'Política de privacidad — llum & glow',
  description: 'Política de privacidad de llum & glow. Cómo tratamos y protegemos tus datos personales conforme al RGPD.',
  alternates: { canonical: `${BASE}/privacidad` },
  robots: { index: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
