'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useIdioma } from '@/lib/idioma-store'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const { idioma } = useIdioma()
  const ca = idioma === 'ca'

  useEffect(() => {
    if (!localStorage.getItem('llum-cookies')) setVisible(true)
  }, [])

  const aceptar = () => {
    localStorage.setItem('llum-cookies', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1b1b1b] text-[#f6f4f1] px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
      <p className="text-[11px] text-[#767676] leading-relaxed flex-1">
        {ca
          ? 'Utilitzem cookies pròpies per recordar el teu idioma i el contingut del carret. No utilitzem cookies de tercers ni de seguiment.'
          : 'Utilizamos cookies propias para recordar tu idioma y el contenido del carrito. No utilizamos cookies de terceros ni de seguimiento.'}
        {' '}
        <Link href="/cookies" className="text-[#dcbcbc] hover:text-white transition-colors underline underline-offset-2">
          {ca ? 'Més informació' : 'Más información'}
        </Link>
      </p>
      <button
        onClick={aceptar}
        className="flex-shrink-0 bg-[#f6f4f1] text-[#1b1b1b] text-[10px] uppercase tracking-widest font-medium px-6 py-3 hover:bg-white transition-colors"
      >
        {ca ? 'Acceptar' : 'Aceptar'}
      </button>
    </div>
  )
}
