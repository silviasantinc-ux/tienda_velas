'use client'

import { useIdioma } from '@/lib/idioma-store'

export default function ProximamenteBanner() {
  const { t } = useIdioma()
  return (
    <div className="w-full bg-[#f5e6c8] border-b border-[#e8d4a0] py-3 px-4 text-center">
      <p className="font-['EB_Garamond'] italic text-[15px] text-[#7d5d24]">
        {t.proximamente.banner}
      </p>
    </div>
  )
}
