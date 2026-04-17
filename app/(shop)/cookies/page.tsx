'use client'

import Link from 'next/link'
import { useIdioma } from '@/lib/idioma-store'

export default function PaginaCookies() {
  const { idioma } = useIdioma()
  const ca = idioma === 'ca'

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">
          {ca ? 'Informació legal' : 'Información legal'}
        </p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">
          {ca ? 'Política de cookies' : 'Política de cookies'}
        </h1>
        <p className="text-sm text-[#767676] mt-3">
          {ca ? 'Última actualització: abril 2026 · Pendent de revisió legal' : 'Última actualización: abril 2026 · Pendiente de revisión legal'}
        </p>
      </div>

      <div className="space-y-10 text-sm text-[#666] leading-relaxed">

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Què són les cookies?' : '¿Qué son las cookies?'}
          </h2>
          <p>
            {ca
              ? 'Les cookies són petits arxius de text que els llocs web guarden al teu dispositiu quan els visites. S\'utilitzen per recordar les teves preferències i millorar la teva experiència de navegació.'
              : 'Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo cuando los visitas. Se utilizan para recordar tus preferencias y mejorar tu experiencia de navegación.'}
          </p>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Cookies que utilitzem' : 'Cookies que utilizamos'}
          </h2>
          <div className="space-y-6">
            <div>
              <p className="font-medium text-[#1b1b1b] mb-2">
                {ca ? 'Cookies estrictament necessàries' : 'Cookies estrictamente necesarias'}
              </p>
              <p>
                {ca
                  ? 'Imprescindibles per al funcionament del lloc web. Inclouen la gestió de la sessió d\'usuari (autenticació) i les preferències d\'idioma. No es poden desactivar.'
                  : 'Imprescindibles para el funcionamiento del sitio web. Incluyen la gestión de la sesión de usuario (autenticación) y las preferencias de idioma. No pueden desactivarse.'}
              </p>
              <ul className="mt-3 space-y-2 pl-4">
                <li className="flex gap-2"><span className="text-[#dcbcbc]">·</span> <span><strong>llum-idioma</strong> — {ca ? 'Desa la preferència d\'idioma (ES/CA).' : 'Guarda la preferencia de idioma (ES/CA).'}</span></li>
                <li className="flex gap-2"><span className="text-[#dcbcbc]">·</span> <span><strong>llum-carrito</strong> — {ca ? 'Desa els articles de la teva cistella.' : 'Guarda los artículos de tu carrito.'}</span></li>
                <li className="flex gap-2"><span className="text-[#dcbcbc]">·</span> <span><strong>sb-*</strong> — {ca ? 'Sessió d\'autenticació de Supabase (només usuaris registrats).' : 'Sesión de autenticación de Supabase (solo usuarios registrados).'}</span></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-[#1b1b1b] mb-2">
                {ca ? 'Cookies analítiques' : 'Cookies analíticas'}
              </p>
              <p>
                {ca
                  ? 'Actualment no utilitzem cap eina d\'analítica ni de seguiment de tercers.'
                  : 'Actualmente no utilizamos ninguna herramienta de analítica ni de seguimiento de terceros.'}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Com gestionar les cookies' : 'Cómo gestionar las cookies'}
          </h2>
          <p>
            {ca
              ? 'Pots configurar el teu navegador per bloquejar o eliminar les cookies. Tingues en compte que desactivar les cookies necessàries pot afectar el funcionament del lloc web (per exemple, el carret de la compra no es recordarà entre sessions).'
              : 'Puedes configurar tu navegador para bloquear o eliminar las cookies. Ten en cuenta que desactivar las cookies necesarias puede afectar al funcionamiento del sitio web (por ejemplo, el carrito de la compra no se recordará entre sesiones).'}
          </p>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Contacte' : 'Contacto'}
          </h2>
          <p>
            {ca
              ? 'Si tens alguna pregunta sobre la nostra política de cookies, posa\'t en contacte amb nosaltres:'
              : 'Si tienes alguna pregunta sobre nuestra política de cookies, contáctanos:'}
          </p>
          <a href="mailto:info@llumandglow.com" className="inline-block mt-3 text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors">
            info@llumandglow.com
          </a>
        </div>

      </div>
    </div>
  )
}
