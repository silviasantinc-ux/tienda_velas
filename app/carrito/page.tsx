'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useCarrito } from '@/lib/carrito-store'

export default function PaginaCarrito() {
  const { items, quitar, actualizarCantidad, total, vaciar } = useCarrito()
  const envioGratis = total() >= 50

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <p className="font-['EB_Garamond'] text-5xl italic text-[#1b1b1b] mb-4">Tu carrito está vacío</p>
        <p className="text-sm text-[#999] mb-10">Descubre nuestras velas artesanales</p>
        <Link
          href="/tienda"
          className="inline-block bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium px-10 py-4 transition-colors"
        >
          Ir a la tienda
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Cabecera */}
      <Link href="/tienda" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] mb-10 transition-colors w-fit">
        <ArrowLeft className="w-3 h-3" />
        Seguir comprando
      </Link>
      <div className="flex items-end justify-between mb-10">
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">
          Tu carrito <span className="text-[#999] text-2xl">({items.length})</span>
        </h1>
        <button
          onClick={vaciar}
          className="text-[10px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] transition-colors"
        >
          Vaciar carrito
        </button>
      </div>

      {/* Barra envío gratis */}
      {!envioGratis && (
        <div className="bg-[#ece9e4] px-5 py-4 mb-8 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-widest text-[#666]">
            Añade <strong className="text-[#1b1b1b]">{(50 - total()).toFixed(2)} €</strong> más para obtener envío gratuito
          </p>
          <div className="w-32 h-1 bg-[#d0cdc8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#dcbcbc] transition-all duration-500"
              style={{ width: `${Math.min(100, (total() / 50) * 100)}%` }}
            />
          </div>
        </div>
      )}
      {envioGratis && (
        <div className="bg-[#ece9e4] px-5 py-4 mb-8">
          <p className="text-[11px] uppercase tracking-widest text-[#7d5d24]">
            ¡Enhorabuena! Tu pedido tiene envío gratuito
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 divide-y divide-[#e0ddd8]">
          {items.map(({ producto, cantidad }) => (
            <div key={producto.id} className="py-7 flex gap-6">
              <Link href={`/producto/${producto.id}`} className="relative w-28 h-28 bg-[#ece9e4] flex-shrink-0 overflow-hidden">
                <Image
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="112px"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] mb-1">{producto.categoria}</p>
                <Link href={`/producto/${producto.id}`}>
                  <h3 className="font-['EB_Garamond'] text-lg italic text-[#1b1b1b] hover:text-[#7d5d24] transition-colors mb-1">
                    {producto.nombre}
                  </h3>
                </Link>
                {producto.notas_aromaticas && (
                  <p className="text-[10px] text-[#999] mb-3">
                    {producto.notas_aromaticas.join(' · ')}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => actualizarCantidad(producto.id, cantidad - 1)}
                    className="w-8 h-8 border border-[#e0ddd8] hover:border-[#1b1b1b] flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm text-[#1b1b1b] w-5 text-center font-medium">{cantidad}</span>
                  <button
                    onClick={() => actualizarCantidad(producto.id, cantidad + 1)}
                    className="w-8 h-8 border border-[#e0ddd8] hover:border-[#1b1b1b] flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between flex-shrink-0">
                <button
                  onClick={() => quitar(producto.id)}
                  className="text-[#ccc] hover:text-[#1b1b1b] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#1b1b1b]">
                    {(producto.precio * cantidad).toFixed(2)} €
                  </p>
                  {cantidad > 1 && (
                    <p className="text-[10px] text-[#999]">{producto.precio.toFixed(2)} € / ud.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen pedido */}
        <div className="h-fit">
          <div className="bg-[#ece9e4] p-8">
            <p className="font-['EB_Garamond'] text-2xl italic text-[#1b1b1b] mb-6">Resumen del pedido</p>

            <div className="space-y-3 mb-5">
              {items.map(({ producto, cantidad }) => (
                <div key={producto.id} className="flex justify-between text-sm text-[#666]">
                  <span className="truncate mr-2">{producto.nombre} × {cantidad}</span>
                  <span className="flex-shrink-0">{(producto.precio * cantidad).toFixed(2)} €</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#d0cdc8] py-4 space-y-2">
              <div className="flex justify-between text-sm text-[#666]">
                <span className="text-[11px] uppercase tracking-widest">Subtotal</span>
                <span>{total().toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm text-[#666]">
                <span className="text-[11px] uppercase tracking-widest">Envío</span>
                <span className={envioGratis ? 'text-[#7d5d24]' : ''}>
                  {envioGratis ? 'Gratuito' : '4.95 €'}
                </span>
              </div>
            </div>

            <div className="border-t border-[#d0cdc8] pt-4 mb-8">
              <div className="flex justify-between text-[#1b1b1b]">
                <span className="text-[11px] uppercase tracking-widest font-medium">Total</span>
                <span className="font-medium text-lg">
                  {(total() + (envioGratis ? 0 : 4.95)).toFixed(2)} €
                </span>
              </div>
            </div>

            <button className="w-full bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors mb-3">
              Proceder al pago
            </button>
            <Link
              href="/tienda"
              className="block w-full text-center border border-[#d0cdc8] hover:border-[#1b1b1b] text-[#666] hover:text-[#1b1b1b] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors"
            >
              Seguir comprando
            </Link>

            <div className="mt-6 space-y-2">
              {[
                'Pago 100% seguro con SSL',
                'Devolución gratuita en 30 días',
              ].map((g) => (
                <p key={g} className="text-[10px] text-[#999] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0" />
                  {g}
                </p>
              ))}
            </div>
          </div>

          {/* Campo código descuento */}
          <div className="mt-4 border border-[#e0ddd8] p-5">
            <p className="text-[10px] uppercase tracking-widest text-[#999] mb-3">Código de descuento</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="LLAMA10"
                className="flex-1 bg-white border border-[#e0ddd8] px-3 py-2.5 text-sm text-[#1b1b1b] placeholder-[#ccc] outline-none focus:border-[#1b1b1b] transition-colors"
              />
              <button className="border border-[#1b1b1b] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-[#f6f4f1] text-[10px] uppercase tracking-widest px-4 py-2.5 transition-colors">
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
