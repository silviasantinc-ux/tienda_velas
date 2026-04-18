'use client'

import { useState, useEffect } from 'react'
import { useIdioma } from '@/lib/idioma-store'
import traducciones from '@/lib/i18n'

const SANT_JORDI = new Date('2026-04-24T00:00:00')
const DIA_MADRE  = new Date('2026-05-04T00:00:00')

function getEvento() {
  const ahora = new Date()
  if (ahora < SANT_JORDI) return { target: SANT_JORDI, key: 'santJordi' as const }
  if (ahora < DIA_MADRE)  return { target: DIA_MADRE,  key: 'mare' as const }
  return null
}

function calcularTiempo(target: Date) {
  const diff = target.getTime() - new Date().getTime()
  if (diff <= 0) return null
  const dias    = Math.floor(diff / (1000 * 60 * 60 * 24))
  const horas   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { dias, horas, minutos }
}

export default function ContadorEvento() {
  const idioma = useIdioma((s) => s.idioma)
  const tc = traducciones[idioma].contador
  const [evento, setEvento] = useState(getEvento)
  const [tiempo, setTiempo] = useState(() => evento ? calcularTiempo(evento.target) : null)

  useEffect(() => {
    const tick = () => {
      const ev = getEvento()
      setEvento(ev)
      setTiempo(ev ? calcularTiempo(ev.target) : null)
    }
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [])

  if (!evento || !tiempo) return null

  const etiqueta = evento.key === 'santJordi' ? tc.eventoSantJordi : tc.evento

  return (
    <div className="py-2 text-center text-[#f6f4f1]">
      <p className="font-['EB_Garamond'] text-2xl md:text-3xl italic mb-1.5">
        {etiqueta}
      </p>
      <div className="flex items-center justify-center gap-5 md:gap-14">
        {[
          { valor: tiempo.dias, label: tc.dias },
          { valor: tiempo.horas, label: tc.horas },
          { valor: tiempo.minutos, label: tc.minutos },
        ].map(({ valor, label }, i) => (
          <div key={label} className="flex items-center gap-8 md:gap-14">
            {i > 0 && <span className="text-[#7d5d24] text-lg">·</span>}
            <div className="text-center">
              <p className="font-['EB_Garamond'] text-3xl md:text-4xl italic leading-none">
                {String(valor).padStart(2, '0')}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-[#dcbcbc] mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
