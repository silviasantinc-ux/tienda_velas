'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useIdioma } from '@/lib/idioma-store'
import { supabase } from '@/lib/supabase'

type CategoriaColeccion = {
  id: string
  nombre: string
  nombre_ca: string | null
  descripcion: string | null
  descripcion_ca: string | null
  imagen_url: string | null
}

export default function ColeccionesPage() {
  const { idioma, t } = useIdioma()
  const th = t.home
  const [colecciones, setColecciones] = useState<CategoriaColeccion[]>([])

  useEffect(() => {
    supabase
      .from('categorias')
      .select('id, nombre, nombre_ca, descripcion, descripcion_ca, imagen_url')
      .not('imagen_url', 'is', null)
      .order('nombre')
      .then(({ data }) => setColecciones((data as CategoriaColeccion[]) ?? []))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
      <div className="text-center mb-10">
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">{th.nuestrasColecciones}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Tarjeta estática: todos los productos */}
        <Link
          href="/tienda"
          className="group relative h-72 overflow-hidden bg-[#2e2a24]"
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 288" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <radialGradient id="cg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#c8903a" stopOpacity="0.4" /><stop offset="100%" stopColor="#c8903a" stopOpacity="0" /></radialGradient>
              <radialGradient id="cg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#dcbcbc" stopOpacity="0.25" /><stop offset="100%" stopColor="#dcbcbc" stopOpacity="0" /></radialGradient>
              <radialGradient id="cf1" cx="50%" cy="80%" r="60%"><stop offset="0%" stopColor="#fff8e1" /><stop offset="40%" stopColor="#ffb74d" /><stop offset="100%" stopColor="#e65100" stopOpacity="0" /></radialGradient>
              <radialGradient id="cf2" cx="50%" cy="80%" r="60%"><stop offset="0%" stopColor="#fff8e1" /><stop offset="40%" stopColor="#ffcc80" /><stop offset="100%" stopColor="#e65100" stopOpacity="0" /></radialGradient>
              <filter id="cb1"><feGaussianBlur stdDeviation="14" /></filter>
              <filter id="cb2"><feGaussianBlur stdDeviation="6" /></filter>
            </defs>
            <ellipse cx="160" cy="150" rx="90" ry="80" fill="url(#cg1)" filter="url(#cb1)" />
            <ellipse cx="260" cy="130" rx="70" ry="65" fill="url(#cg2)" filter="url(#cb1)" />
            <rect x="130" y="100" width="44" height="120" rx="3" fill="#1e1a15" stroke="#7d5d24" strokeWidth="0.8" strokeOpacity="0.5" />
            <line x1="152" y1="100" x2="151" y2="88" stroke="#6b5020" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="151" cy="80" rx="8" ry="13" fill="url(#cf1)" filter="url(#cb2)" opacity="0.9" />
            <path d="M151,90 C147,83 146,75 151,67 C156,75 156,83 151,90Z" fill="#fff8e1" opacity="0.95" />
            <ellipse cx="152" cy="219" rx="30" ry="6" fill="#1a1612" stroke="#7d5d24" strokeWidth="0.6" strokeOpacity="0.4" />
            <rect x="228" y="85" width="36" height="96" rx="3" fill="#1e1a15" stroke="#dcbcbc" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="246" y1="85" x2="245" y2="75" stroke="#6b5020" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="245" cy="68" rx="7" ry="11" fill="url(#cf2)" filter="url(#cb2)" opacity="0.85" />
            <path d="M245,76 C242,70 241,63 245,56 C249,63 249,70 245,76Z" fill="#fff8e1" opacity="0.95" />
            <ellipse cx="246" cy="180" rx="24" ry="5" fill="#1a1612" stroke="#dcbcbc" strokeWidth="0.6" strokeOpacity="0.3" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/75 to-transparent group-hover:from-[#1b1b1b]/85 transition-all duration-500" />
          <div className="absolute bottom-6 left-6 text-[#f6f4f1]">
            <p className="font-['EB_Garamond'] text-2xl italic">{th.todosLosProductos}</p>
          </div>
        </Link>

        {colecciones.map((col) => {
          const nombre = idioma === 'ca' ? (col.nombre_ca ?? col.nombre) : col.nombre
          const descripcion = idioma === 'ca' ? (col.descripcion_ca ?? col.descripcion) : col.descripcion
          const catLink = idioma === 'ca' ? (col.nombre_ca ?? col.nombre) : col.nombre
          return (
            <Link
              key={col.id}
              href={`/tienda?cat=${catLink}`}
              className="group relative h-72 overflow-hidden bg-[#ece9e4]"
            >
              {col.imagen_url && (
                <Image
                  src={col.imagen_url}
                  alt={nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-[#f6f4f1]">
                <p className="font-['EB_Garamond'] text-2xl italic mb-1">{nombre}</p>
                {descripcion && (
                  <p className="text-[10px] uppercase tracking-widest text-[#dcbcbc]">{descripcion}</p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
