'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useIdioma } from '@/lib/idioma-store'

type ToastProps = {
  mensaje: string
  visible: boolean
}

export default function Toast({ mensaje, visible }: ToastProps) {
  const { idioma } = useIdioma()
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-[#1b1b1b] text-[#f6f4f1] px-6 py-4 text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Check className="w-4 h-4 text-[#dcbcbc]" />
      <span>{mensaje}</span>
      <Link
        href="/carrito"
        className="border-l border-[#444] pl-4 text-[#dcbcbc] hover:text-white transition-colors whitespace-nowrap"
      >
        {idioma === 'ca' ? 'Veure cistella →' : 'Ver carrito →'}
      </Link>
    </div>
  )
}

export function useToast() {
  const [visible, setVisible] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const mostrar = (msg: string) => {
    setMensaje(msg)
    setVisible(true)
  }

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(t)
  }, [visible])

  return { visible, mensaje, mostrar }
}
