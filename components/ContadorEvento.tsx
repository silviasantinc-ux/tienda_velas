'use client'

import { useState, useEffect } from 'react'

const TARGET = new Date('2026-05-03T00:00:00')

function calcularTiempo() {
  const ahora = new Date()
  const diff = TARGET.getTime() - ahora.getTime()
  if (diff <= 0) return null
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { dias, horas, minutos }
}

export default function ContadorEvento() {
  const [tiempo, setTiempo] = useState(calcularTiempo())

  useEffect(() => {
    const id = setInterval(() => setTiempo(calcularTiempo()), 60000)
    return () => clearInterval(id)
  }, [])

  if (!tiempo) return null

  return (
    <div className="py-8 text-center text-[#f6f4f1]">
      <p className="font-['EB_Garamond'] text-3xl md:text-4xl italic mb-1">
        Ofertas especiales
      </p>
      <p className="text-[10px] uppercase tracking-[0.4em] text-[#dcbcbc] mb-5">
        Día de la madre · 3 de mayo
      </p>
      <div className="flex items-center justify-center gap-8 md:gap-14">
        {[
          { valor: tiempo.dias, label: 'días' },
          { valor: tiempo.horas, label: 'horas' },
          { valor: tiempo.minutos, label: 'minutos' },
        ].map(({ valor, label }, i) => (
          <div key={label} className="flex items-center gap-8 md:gap-14">
            {i > 0 && <span className="text-[#7d5d24] text-xl">·</span>}
            <div className="text-center">
              <p className="font-['EB_Garamond'] text-5xl md:text-6xl italic leading-none">
                {String(valor).padStart(2, '0')}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#dcbcbc] mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
