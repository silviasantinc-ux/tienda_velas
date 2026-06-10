'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useIdioma } from '@/lib/idioma-store'

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function WhatsAppButton() {
  const [telefono, setTelefono] = useState<string | null>(null)
  const [abierto, setAbierto] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { idioma } = useIdioma()

  const textos = {
    es: {
      titulo: 'llum & glow',
      subtitulo: 'Normalmente respondemos en minutos',
      bienvenida: '¡Hola! 👋 ¿En qué podemos ayudarte?',
      placeholder: 'Escribe tu mensaje...',
      enviar: 'Enviar por WhatsApp',
    },
    ca: {
      titulo: 'llum & glow',
      subtitulo: 'Normalment responem en minuts',
      bienvenida: 'Hola! 👋 En què et podem ajudar?',
      placeholder: 'Escriu el teu missatge...',
      enviar: 'Enviar per WhatsApp',
    },
  }

  const tx = textos[idioma] ?? textos.es

  useEffect(() => {
    supabase.from('configuracion').select('valor').eq('clave', 'telefono').single()
      .then(({ data }) => { if (data?.valor) setTelefono(data.valor) })
  }, [])

  useEffect(() => {
    if (abierto) setTimeout(() => inputRef.current?.focus(), 100)
  }, [abierto])

  if (!telefono) return null

  const enviar = () => {
    const texto = mensaje.trim() || tx.bienvenida
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer')
    setMensaje('')
    setAbierto(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Ventana chat */}
      {abierto && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e0ddd8] animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#25D366] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <WaIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-tight">{tx.titulo}</p>
              <p className="text-white/80 text-[11px] leading-tight">{tx.subtitulo}</p>
            </div>
            <button
              onClick={() => setAbierto(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Burbuja de bienvenida */}
          <div className="bg-[#f0f0f0] px-4 py-5">
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[90%]">
              <p className="text-sm text-[#1b1b1b] leading-relaxed">{tx.bienvenida}</p>
              <p className="text-[10px] text-[#999] mt-1 text-right">llum & glow</p>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[#e0ddd8] px-3 py-3 flex items-end gap-2 bg-white">
            <textarea
              ref={inputRef}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={tx.placeholder}
              rows={2}
              className="flex-1 resize-none text-sm text-[#1b1b1b] placeholder-[#bbb] focus:outline-none leading-relaxed"
            />
            <button
              onClick={enviar}
              className="flex-shrink-0 w-9 h-9 bg-[#25D366] hover:bg-[#1ebe5a] rounded-full flex items-center justify-center transition-colors"
              aria-label={tx.enviar}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setAbierto((o) => !o)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5a] rounded-full flex items-center justify-center shadow-lg transition-colors"
        aria-label="WhatsApp"
      >
        {abierto ? <X className="w-6 h-6 text-white" /> : <WaIcon />}
      </button>
    </div>
  )
}
