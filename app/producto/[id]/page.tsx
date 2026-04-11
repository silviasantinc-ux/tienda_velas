'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { productosMock } from '@/lib/productos-mock'
import { useCarrito } from '@/lib/carrito-store'
import Toast, { useToast } from '@/components/Toast'
import TarjetaProducto from '@/components/TarjetaProducto'

const BADGE_LABELS: Record<string, string> = {
  'nuevo': 'Nuevo',
  'mas-vendido': 'Más vendido',
  'edicion-limitada': 'Edición Limitada',
}

export default function PaginaProducto() {
  const { id } = useParams()
  const producto = productosMock.find((p) => p.id === id)
  const agregar = useCarrito((s) => s.agregar)
  const { visible, mensaje, mostrar } = useToast()
  const [cantidad, setCantidad] = useState(1)

  const relacionados = productosMock
    .filter((p) => p.id !== id && p.categoria === producto?.categoria)
    .slice(0, 4)

  if (!producto) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="font-['EB_Garamond'] text-3xl italic text-[#1b1b1b] mb-6">Producto no encontrado</p>
        <Link href="/tienda" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5">
          Volver a la tienda
        </Link>
      </div>
    )
  }

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i++) agregar(producto)
    mostrar(`${producto.nombre} añadido al carrito`)
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <Link href="/tienda" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] mb-10 transition-colors w-fit">
          <ArrowLeft className="w-3 h-3" />
          Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Imagen */}
          <div className="relative aspect-square overflow-hidden bg-[#ece9e4]">
            <Image
              src={producto.imagen_url}
              alt={producto.nombre}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {producto.badge && (
              <span className="absolute top-4 left-4 bg-[#f6f4f1] text-[#1b1b1b] text-[10px] uppercase tracking-widest font-medium px-3 py-1.5">
                {BADGE_LABELS[producto.badge]}
              </span>
            )}
          </div>

          {/* Detalles */}
          <div className="flex flex-col justify-center py-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">
              {producto.categoria}
            </p>
            <h1 className="font-['EB_Garamond'] text-5xl italic text-[#1b1b1b] mb-3 leading-tight">
              {producto.nombre}
            </h1>
            <p className="text-2xl text-[#1b1b1b] font-medium mb-6">
              {producto.precio.toFixed(2)} €
            </p>
            <p className="text-sm text-[#666] leading-relaxed mb-8 max-w-sm">
              {producto.descripcion}
            </p>

            {/* Notas aromáticas */}
            {producto.notas_aromaticas && (
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-widest text-[#999] mb-3">Notas aromáticas</p>
                <div className="flex flex-wrap gap-2">
                  {producto.notas_aromaticas.map((nota) => (
                    <span key={nota} className="border border-[#e0ddd8] text-[11px] text-[#666] px-3 py-1.5 uppercase tracking-widest">
                      {nota}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Detalles técnicos */}
            <div className="border-t border-[#e0ddd8] pt-6 mb-8 grid grid-cols-2 gap-4">
              {producto.duracion_horas && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">Duración</p>
                  <p className="text-sm text-[#1b1b1b]">{producto.duracion_horas} horas</p>
                </div>
              )}
              {producto.peso_gr && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">Peso</p>
                  <p className="text-sm text-[#1b1b1b]">{producto.peso_gr}g</p>
                </div>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">Material</p>
                <p className="text-sm text-[#1b1b1b]">Cera de soja</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#999] mb-1">Mecha</p>
                <p className="text-sm text-[#1b1b1b]">Algodón 100%</p>
              </div>
            </div>

            {/* Stock warning */}
            {producto.stock <= 3 && producto.stock > 0 && (
              <p className="text-[10px] uppercase tracking-widest text-[#b97979] mb-4">
                Últimas {producto.stock} unidades
              </p>
            )}

            {/* Cantidad + botón */}
            <div className="flex gap-3">
              <div className="flex items-center border border-[#e0ddd8]">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="px-4 py-4 hover:bg-[#ece9e4] transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-4 text-sm font-medium min-w-[2rem] text-center">{cantidad}</span>
                <button
                  onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                  className="px-4 py-4 hover:bg-[#ece9e4] transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleAgregar}
                disabled={producto.stock === 0}
                className="flex-1 bg-[#1b1b1b] hover:bg-[#333] disabled:bg-[#e0ddd8] disabled:text-[#999] disabled:cursor-not-allowed text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors"
              >
                {producto.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
              </button>
            </div>

            {/* Garantías */}
            <div className="mt-8 pt-6 border-t border-[#e0ddd8] grid grid-cols-1 gap-2">
              {[
                'Envío gratuito en pedidos +50 €',
              ].map((g) => (
                <p key={g} className="text-[11px] text-[#999] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0" />
                  {g}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-[#e0ddd8]">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">De la misma colección</p>
            <h2 className="font-['EB_Garamond'] text-3xl italic text-[#1b1b1b]">También te puede gustar</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {relacionados.map((p) => (
              <TarjetaProducto key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}

      <Toast visible={visible} mensaje={mensaje} />
    </div>
  )
}
