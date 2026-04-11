'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

type ToastProps = {
  mensaje: string
  visible: boolean
}

export default function Toast({ mensaje, visible }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#1b1b1b] text-[#f6f4f1] px-6 py-4 text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Check className="w-4 h-4 text-[#dcbcbc]" />
      {mensaje}
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
