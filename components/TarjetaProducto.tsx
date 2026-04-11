'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Producto } from '@/types'
import { useCarrito } from '@/lib/carrito-store'
import Toast, { useToast } from '@/components/Toast'

const BADGE_LABELS: Record<string, string> = {
  'nuevo': 'Nuevo',
  'mas-vendido': 'Más vendido',
  'edicion-limitada': 'Ed. Limitada',
}

export default function TarjetaProducto({ producto }: { producto: Producto }) {
  const agregar = useCarrito((s) => s.agregar)
  const { visible, mensaje, mostrar } = useToast()

  return (
    <div className="group cursor-pointer">
      {/* Imagen */}
      <Link href={`/producto/${producto.id}`} className="block relative aspect-square overflow-hidden bg-[#ece9e4] mb-3">
        <Image
          src={producto.imagen_url}
          alt={producto.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {producto.badge && (
          <span className="absolute top-3 left-3 bg-[#f6f4f1] text-[#1b1b1b] text-[10px] uppercase tracking-widest font-medium px-2.5 py-1">
            {BADGE_LABELS[producto.badge]}
          </span>
        )}
        {producto.stock === 0 && (
          <span className="absolute top-3 left-3 bg-[#1b1b1b] text-white text-[10px] uppercase tracking-widest font-medium px-2.5 py-1">
            Agotado
          </span>
        )}

        {/* Botón hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.preventDefault()
              if (producto.stock > 0) {
                agregar(producto)
                mostrar('Añadido al carrito')
              }
            }}
            disabled={producto.stock === 0}
            className="w-full bg-[#1b1b1b] hover:bg-[#333] disabled:bg-[#999] text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium py-3.5 transition-colors"
          >
            {producto.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
          </button>
        </div>
      </Link>

      {/* Info */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] mb-1">{producto.categoria}</p>
        <Link href={`/producto/${producto.id}`}>
          <h3 className="font-['EB_Garamond'] text-[15px] text-[#1b1b1b] hover:text-[#7d5d24] transition-colors leading-snug mb-1">
            {producto.nombre}
          </h3>
        </Link>
        <p className="text-sm text-[#1b1b1b] font-medium">{producto.precio.toFixed(2)} €</p>
        {producto.stock <= 3 && producto.stock > 0 && (
          <p className="text-[10px] text-[#b97979] uppercase tracking-widest mt-1">Últimas unidades</p>
        )}
      </div>

      <Toast visible={visible} mensaje={mensaje} />
    </div>
  )
}
