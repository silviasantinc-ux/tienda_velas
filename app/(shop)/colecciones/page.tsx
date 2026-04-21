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
      .eq('activo', true)
      .not('imagen_url', 'is', null)
      .order('nombre')
      .then(({ data }) => setColecciones((data as CategoriaColeccion[]) ?? []))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 pt-1 pb-16">
      <div className="text-center mb-4">
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">{th.nuestrasColecciones}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Tarjeta estática: todos los productos */}
        <Link
          href="/tienda"
          className="group relative h-72 overflow-hidden bg-[#2e2a24]"
        >
          <Image
            src="/todas_las_velas.jpg"
            alt={th.todosLosProductos}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
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
