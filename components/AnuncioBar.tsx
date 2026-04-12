'use client'

import { useIdioma } from '@/lib/idioma-store'

export default function AnuncioBar() {
  const t = useIdioma((s) => s.t)
  return (
    <div className="bg-[#1b1b1b] text-[#f6f4f1] text-center py-2.5 px-4">
      <p className="text-[11px] uppercase tracking-[0.2em] font-medium">{t.anuncio}</p>
    </div>
  )
}
