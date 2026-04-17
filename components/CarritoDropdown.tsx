'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react'
import { useCarrito, carritoKey } from '@/lib/carrito-store'
import { useIdioma } from '@/lib/idioma-store'
import { useState } from 'react'

export default function CarritoDropdown() {
  const { items, quitar, actualizarCantidad, total } = useCarrito()
  const t = useIdioma((s) => s.t)
  const { idioma } = useIdioma()
  const envioGratis = total() >= 50
  const [hover, setHover] = useState<'ver' | 'pago' | null>(null)
  const cd = t.carritoDropdown

  const totalArticulos = items.reduce((a, i) => a + i.cantidad, 0)

  return (
    <div className="absolute right-0 top-full w-80 bg-[#f6f4f1] border border-[#e0ddd8] shadow-xl z-50">
      {/* Cabecera */}
      <div className="px-5 py-4 border-b border-[#e0ddd8] flex items-center justify-between">
        <p className="font-['EB_Garamond'] text-lg italic text-[#1b1b1b]">{cd.titulo}</p>
        {items.length > 0 && (
          <p className="text-[10px] uppercase tracking-widest text-[#767676]">
            {totalArticulos} {totalArticulos !== 1 ? cd.articulos : cd.articulo}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <ShoppingBag className="w-8 h-8 text-[#d0cdc8] mx-auto mb-3" />
          <p className="text-sm text-[#767676] mb-5">{cd.vacio}</p>
          <Link
            href="/tienda"
            className="inline-block border border-[#1b1b1b] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-[#f6f4f1] text-[10px] uppercase tracking-widest px-6 py-3 transition-colors"
          >
            {cd.irTienda}
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
                {cd.faltan} <strong className="text-[#1b1b1b]">{(50 - total()).toFixed(2)} €</strong> {cd.paraEnvio}
              </p>
            </div>
          )}
          {envioGratis && (
            <div className="px-5 py-2.5 bg-[#ece9e4]">
              <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] text-center">{cd.envioIncluido}</p>
            </div>
          )}

          {/* Lista de items */}
          <div className="divide-y divide-[#e0ddd8] max-h-64 overflow-y-auto">
            {items.map(({ producto, cantidad, variante }) => {
              const nombre = idioma === 'ca' ? (producto.nombre_ca ?? producto.nombre) : producto.nombre
              const key = carritoKey(producto.id, variante?.id)
              const precioUd = producto.precio + (variante?.precio_extra ?? 0)
              return (
                <div key={key} className="px-5 py-4 flex gap-3">
                  <Link href={`/producto/${producto.id}`} className="relative w-16 h-16 bg-[#ece9e4] flex-shrink-0 overflow-hidden">
                    <Image src={producto.imagen_url} alt={nombre} fill className="object-cover" sizes="64px" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/producto/${producto.id}`}>
                      <p className="font-['EB_Garamond'] italic text-sm text-[#1b1b1b] hover:text-[#7d5d24] transition-colors leading-tight truncate">
                        {nombre}
                      </p>
                    </Link>
                    {variante && (
                      <p className="text-[10px] text-[#7d5d24] mt-0.5 truncate">
                        {idioma === 'ca' ? (variante.nombre_ca ?? variante.nombre) : variante.nombre}
                      </p>
                    )}
                    <p className="text-[10px] text-[#767676] mt-0.5">{cantidad} × {precioUd.toFixed(2)} €</p>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0 gap-2">
                    <button onClick={() => quitar(key)} className="text-[#ccc] hover:text-[#b97979] transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-[#e0ddd8]">
                      <button onClick={() => actualizarCantidad(key, cantidad - 1)} className="px-1.5 py-1 hover:bg-[#ece9e4] transition-colors">
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 text-xs font-medium text-[#1b1b1b] min-w-[1.25rem] text-center">{cantidad}</span>
                      <button onClick={() => actualizarCantidad(key, cantidad + 1)} className="px-1.5 py-1 hover:bg-[#ece9e4] transition-colors">
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <p className="text-xs font-medium text-[#1b1b1b]">{(precioUd * cantidad).toFixed(2)} €</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-[#e0ddd8]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] uppercase tracking-widest text-[#666]">{cd.total}</span>
              <span className="font-medium text-[#1b1b1b]">{(total() + (envioGratis ? 0 : 4.95)).toFixed(2)} €</span>
            </div>
            <Link
              href="/carrito"
              onMouseEnter={() => setHover('ver')}
              onMouseLeave={() => setHover(null)}
              className={`block w-full text-center text-[11px] uppercase tracking-widest font-medium py-3.5 transition-colors mb-2 ${
                hover === 'pago' ? 'bg-[#f6f4f1] text-[#767676] border border-[#e0ddd8]' : 'bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1]'
              }`}
            >
              {cd.verCarrito}
            </Link>
            <button
              onMouseEnter={() => setHover('pago')}
              onMouseLeave={() => setHover(null)}
              className={`w-full text-[11px] uppercase tracking-widest font-medium py-3.5 transition-colors ${
                hover === 'ver' ? 'border border-[#e0ddd8] text-[#bbb]' : 'border border-[#1b1b1b] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-[#f6f4f1]'
              }`}
            >
              {cd.procederPago}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
