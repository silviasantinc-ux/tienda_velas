'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import LogoLlumGlow from './LogoLlumGlow'
import { useIdioma } from '@/lib/idioma-store'
import { supabase } from '@/lib/supabase'

type Categoria = { id: string; nombre: string; nombre_ca: string | null }

export default function FooterClient() {
  const { idioma, t } = useIdioma()
  const tf = t.footer
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    supabase
      .from('categorias')
      .select('id, nombre, nombre_ca')
      .order('nombre')
      .then(({ data }) => setCategorias((data as Categoria[]) ?? []))
  }, [])

  return (
    <footer className="bg-[#1b1b1b] text-[#f6f4f1] pt-16 pb-8 mt-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {/* Marca */}
          <div className="md:col-span-2 flex flex-col items-center text-center">
            <div className="mb-4"><LogoLlumGlow height={56} variant="light" /></div>
            <p className="text-sm text-[#a0a0a0] leading-relaxed max-w-sm">
              {tf.descripcion}
            </p>
          </div>

          {/* Ayuda */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#666] mb-5">{tf.seccionAyuda}</p>
            <ul className="space-y-3 text-sm text-[#a0a0a0]">
              <li><Link href="/envios" className="hover:text-[#dcbcbc] transition-colors">{tf.envios}</Link></li>
              <li><a href="mailto:info@llumandglow.com" className="hover:text-[#dcbcbc] transition-colors">info@llumandglow.com</a></li>
            </ul>
          </div>
        </div>

        {/* Aviso producción artesanal */}
        <p className="text-[11px] text-[#888] text-center leading-relaxed mb-6 max-w-2xl mx-auto">
          {tf.produccionArtesanal}
        </p>

        {/* Bottom bar */}
        <div className="border-t border-[#2e2e2e] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-[#888]">{tf.derechos}</p>
          <div className="flex gap-6 text-[11px] text-[#888]">
            <Link href="/privacidad" className="hover:text-[#a0a0a0] transition-colors">{tf.privacidad}</Link>
            <Link href="/terminos" className="hover:text-[#a0a0a0] transition-colors">{tf.terminos}</Link>
            <Link href="/cookies" className="hover:text-[#a0a0a0] transition-colors">{tf.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
