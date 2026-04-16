'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Producto } from '@/types'
import { useCarrito } from '@/lib/carrito-store'
import { useIdioma } from '@/lib/idioma-store'
import Toast, { useToast } from '@/components/Toast'

const BADGE_LABELS_ES: Record<string, string> = {
  'nuevo': 'Nuevo',
  'mas-vendido': 'Más vendido',
  'edicion-limitada': 'Ed. Limitada',
}
const BADGE_LABELS_CA: Record<string, string> = {
  'nuevo': 'Nou',
  'mas-vendido': 'Més venut',
  'edicion-limitada': 'Ed. Limitada',
}

export default function TarjetaProducto({ producto, tieneVariantes = false }: { producto: Producto; tieneVariantes?: boolean }) {
  const agregar = useCarrito((s) => s.agregar)
  const { visible, mensaje, mostrar } = useToast()
  const { idioma, t } = useIdioma()
  const router = useRouter()

  const nombre = idioma === 'ca' ? (producto.nombre_ca ?? producto.nombre) : producto.nombre
  const categoria = idioma === 'ca' ? (producto.categoria_ca ?? producto.categoria) : producto.categoria
  const badges = idioma === 'ca' ? BADGE_LABELS_CA : BADGE_LABELS_ES

  return (
    <div className="group cursor-pointer">
      {/* Imagen */}
      <Link href={`/producto/${producto.id}`} className="block relative aspect-square overflow-hidden bg-[#ece9e4] mb-3">
        <Image
          src={producto.imagen_url}
          alt={nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {producto.badge && (
          <span className="absolute top-3 left-3 bg-[#f6f4f1] text-[#1b1b1b] text-[10px] uppercase tracking-widest font-medium px-2.5 py-1">
            {badges[producto.badge]}
          </span>
        )}
        {producto.stock === 0 && (
          <span className="absolute top-3 left-3 bg-[#1b1b1b] text-white text-[10px] uppercase tracking-widest font-medium px-2.5 py-1">
            {t.tarjeta.agotado}
          </span>
        )}

        {/* Botón (siempre visible en móvil, hover en desktop) */}
        <div className="absolute bottom-0 left-0 right-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.preventDefault()
              if (tieneVariantes) {
                router.push(`/producto/${producto.id}`)
              } else if (producto.stock > 0) {
                agregar(producto)
                mostrar(t.tarjeta.añadido)
              }
            }}
            disabled={!tieneVariantes && producto.stock === 0}
            className="w-full bg-[#1b1b1b] hover:bg-[#333] disabled:bg-[#999] text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium py-3.5 transition-colors"
          >
            {producto.stock === 0 && !tieneVariantes ? t.tarjeta.agotado : tieneVariantes ? t.tarjeta.elegirModelo : t.tarjeta.añadir}
          </button>
        </div>
      </Link>

      {/* Info */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] mb-1">{categoria}</p>
        <Link href={`/producto/${producto.id}`}>
          <h3 className="font-['EB_Garamond'] text-[15px] text-[#1b1b1b] hover:text-[#7d5d24] transition-colors leading-snug mb-1">
            {nombre}
          </h3>
        </Link>
        <p className="text-sm text-[#1b1b1b] font-medium">{producto.precio.toFixed(2)} €</p>
        {producto.stock <= 3 && producto.stock > 0 && (
          <p className="text-[10px] text-[#b97979] uppercase tracking-widest mt-1">{t.tarjeta.ultimasUnidades}</p>
        )}
      </div>

      <Toast visible={visible} mensaje={mensaje} />
    </div>
  )
}
