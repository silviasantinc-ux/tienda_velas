'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useIdioma } from '@/lib/idioma-store'

export default function CookieBanner() {
  const t = useIdioma((s) => s.t)
  const cb = t.cookieBanner
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookies-aceptadas')) setVisible(true)
  }, [])

  const aceptar = () => {
    localStorage.setItem('cookies-aceptadas', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1b1b1b] text-[#f6f4f1] px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
      <div className="text-xs text-[#a0a0a0] leading-relaxed max-w-2xl">
        <p>{cb.texto1}</p>
        <p>{cb.texto2}{' '}<Link href="/cookies" className="underline hover:text-[#dcbcbc] transition-colors">{cb.verPolitica}</Link></p>
      </div>
      <button
        onClick={aceptar}
        className="flex-shrink-0 border border-[#f6f4f1] text-[10px] uppercase tracking-widest px-5 py-2.5 hover:bg-[#f6f4f1] hover:text-[#1b1b1b] transition-colors"
      >
        {cb.aceptar}
      </button>
    </div>
  )
}
