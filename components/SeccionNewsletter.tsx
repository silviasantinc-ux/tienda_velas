'use client'

import { useState } from 'react'
import { useIdioma } from '@/lib/idioma-store'

export default function SeccionNewsletter() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const t = useIdioma((s) => s.t)
  const n = t.newsletter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setEnviado(true); setEmail('') }
  }

  return (
    <section className="bg-[#dcbcbc] py-20 px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-4">{n.label}</p>
      <h2 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b] mb-4">{n.titulo}</h2>
      <p className="text-sm text-[#5a3a2a] mb-8 max-w-md mx-auto">{n.texto}</p>

      {enviado ? (
        <p className="font-['EB_Garamond'] text-xl italic text-[#1b1b1b]">{n.gracias}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={n.placeholder}
            required
            className="flex-1 bg-white border-0 px-5 py-4 text-sm text-[#1b1b1b] placeholder-[#aaa] outline-none focus:ring-1 focus:ring-[#1b1b1b]"
          />
          <button type="submit" className="bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium px-8 py-4 transition-colors whitespace-nowrap">
            {n.boton}
          </button>
        </form>
      )}
      <p className="text-[10px] text-[#7a5040] mt-4 uppercase tracking-widest">{n.sinSpam}</p>
    </section>
  )
}
