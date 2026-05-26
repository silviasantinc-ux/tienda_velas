'use client'

import { useIdioma } from '@/lib/idioma-store'

export default function ProximamenteBanner() {
  const { t } = useIdioma()
  return (
    <div className="w-full bg-[#f0ebe3] border-b border-[#ddd8d0] py-2.5 px-4 text-center">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#7d5d24]">
        {t.proximamente.banner}
      </p>
    </div>
  )
}
