'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingBag } from 'lucide-react'
import { useCarrito } from '@/lib/carrito-store'

export default function CarritoDropdown() {
  const { items, quitar, total } = useCarrito()
  const envioGratis = total() >= 50

  return (
    <div className="absolute right-0 top-full mt-3 w-80 bg-[#f6f4f1] border border-[#e0ddd8] shadow-xl z-50">
      {/* Cabecera */}
      <div className="px-5 py-4 border-b border-[#e0ddd8] flex items-center justify-between">
        <p className="font-['EB_Garamond'] text-lg italic text-[#1b1b1b]">Tu carrito</p>
        {items.length > 0 && (
          <p className="text-[10px] uppercase tracking-widest text-[#999]">
            {items.reduce((a, i) => a + i.cantidad, 0)} artículo{items.reduce((a, i) => a + i.cantidad, 0) !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <ShoppingBag className="w-8 h-8 text-[#d0cdc8] mx-auto mb-3" />
          <p className="text-sm text-[#999] mb-5">Tu carrito está vacío</p>
          <Link
            href="/tienda"
            className="inline-block border border-[#1b1b1b] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-[#f6f4f1] text-[10px] uppercase tracking-widest px-6 py-3 transition-colors"
          >
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <>
          {/* Barra envío gratis */}
          {!envioGratis && (
            <div className="px-5 py-2.5 bg-[#ece9e4] flex items-center gap-3">
              <div className="flex-1 h-0.5 bg-[#d0cdc8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#dcbcbc] transition-all duration-500"
                  style={{ width: `${Math.min(100, (total() / 50) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-[#666] whitespace-nowrap flex-shrink-0">
                Faltan <strong className="text-[#1b1b1b]">{(50 - total()).toFixed(2)} €</strong>
              </p>
            </div>
          )}
          {envioGratis && (
            <div className="px-5 py-2.5 bg-[#ece9e4]">
              <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] text-center">
                Envío gratuito incluido
              </p>
            </div>
          )}

          {/* Lista de items */}
          <div className="divide-y divide-[#e0ddd8] max-h-64 overflow-y-auto">
            {items.map(({ producto, cantidad }) => (
              <div key={producto.id} className="px-5 py-4 flex gap-3">
                <Link href={`/producto/${producto.id}`} className="relative w-16 h-16 bg-[#ece9e4] flex-shrink-0 overflow-hidden">
                  <Image
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/producto/${producto.id}`}>
                    <p className="font-['EB_Garamond'] italic text-sm text-[#1b1b1b] hover:text-[#7d5d24] transition-colors leading-tight truncate">
                      {producto.nombre}
                    </p>
                  </Link>
                  <p className="text-[10px] text-[#999] mt-0.5">
                    {cantidad} × {producto.precio.toFixed(2)} €
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button
                    onClick={() => quitar(producto.id)}
                    className="text-[#ccc] hover:text-[#1b1b1b] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-sm font-medium text-[#1b1b1b]">
                    {(producto.precio * cantidad).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-[#e0ddd8]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] uppercase tracking-widest text-[#666]">Total</span>
              <span className="font-medium text-[#1b1b1b]">
                {(total() + (envioGratis ? 0 : 4.95)).toFixed(2)} €
              </span>
            </div>
            <Link
              href="/carrito"
              className="block w-full text-center bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-3.5 transition-colors mb-2"
            >
              Ver carrito
            </Link>
            <button className="w-full border border-[#1b1b1b] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-3.5 transition-colors">
              Proceder al pago
            </button>
          </div>
        </>
      )}
    </div>
  )
}
