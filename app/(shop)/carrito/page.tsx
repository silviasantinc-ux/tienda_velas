'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useCarrito, carritoKey } from '@/lib/carrito-store'
import { useIdioma } from '@/lib/idioma-store'

export default function PaginaCarrito() {
  const { items, quitar, actualizarCantidad, total, vaciar } = useCarrito()
  const { idioma, t } = useIdioma()
  const tc = t.carrito
  const envioGratis = total() >= 50

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <p className="font-['EB_Garamond'] text-5xl italic text-[#1b1b1b] mb-4">{tc.vacio}</p>
        <p className="text-sm text-[#767676] mb-10">{tc.vacioSub}</p>
        <Link
          href="/tienda"
          className="inline-block bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium px-10 py-4 transition-colors"
        >
          {tc.irTienda}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Cabecera */}
      <Link href="/tienda" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] mb-10 transition-colors w-fit">
        <ArrowLeft className="w-3 h-3" />
        {tc.seguirComprando}
      </Link>
      <div className="flex items-end justify-between mb-10">
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">
          {tc.titulo} <span className="text-[#767676] text-2xl">({items.length})</span>
        </h1>
        <button
          onClick={vaciar}
          className="text-[10px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] transition-colors"
        >
          {tc.vaciar}
        </button>
      </div>

      {/* Barra envío gratis */}
      {!envioGratis && (
        <div className="bg-[#ece9e4] px-5 py-4 mb-8 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-widest text-[#666]">
            {tc.añade} <strong className="text-[#1b1b1b]">{(50 - total()).toFixed(2)} €</strong> {tc.masParaEnvio}
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
            {tc.enhorabuena}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 divide-y divide-[#e0ddd8]">
          {items.map(({ producto, cantidad, variante }) => {
            const nombre = idioma === 'ca' ? (producto.nombre_ca ?? producto.nombre) : producto.nombre
            const categoria = idioma === 'ca' ? (producto.categoria_ca ?? producto.categoria) : producto.categoria
            const notas = idioma === 'ca' ? (producto.notas_aromaticas_ca ?? producto.notas_aromaticas) : producto.notas_aromaticas
            const key = carritoKey(producto.id, variante?.id)
            const precioUd = producto.precio + (variante?.precio_extra ?? 0)
            return (
              <div key={key} className="py-7 flex gap-6">
                <Link href={`/producto/${producto.id}`} className="relative w-28 h-28 bg-[#ece9e4] flex-shrink-0 overflow-hidden">
                  <Image
                    src={producto.imagen_url}
                    alt={nombre}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="112px"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] mb-1">{categoria}</p>
                  <Link href={`/producto/${producto.id}`}>
                    <h3 className="font-['EB_Garamond'] text-lg italic text-[#1b1b1b] hover:text-[#7d5d24] transition-colors mb-1">
                      {nombre}
                    </h3>
                  </Link>
                  {variante && (
                    <p className="text-[10px] text-[#7d5d24] mb-1 uppercase tracking-widest">
                      {idioma === 'ca' ? (variante.nombre_ca ?? variante.nombre) : variante.nombre}
                    </p>
                  )}
                  {notas && (
                    <p className="text-[10px] text-[#767676] mb-3">
                      {notas.join(' · ')}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => actualizarCantidad(key, cantidad - 1)}
                      className="w-8 h-8 border border-[#e0ddd8] hover:border-[#1b1b1b] flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm text-[#1b1b1b] w-5 text-center font-medium">{cantidad}</span>
                    <button
                      onClick={() => actualizarCantidad(key, cantidad + 1)}
                      className="w-8 h-8 border border-[#e0ddd8] hover:border-[#1b1b1b] flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button
                    onClick={() => quitar(key)}
                    className="text-[#ccc] hover:text-[#1b1b1b] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#1b1b1b]">
                      {(precioUd * cantidad).toFixed(2)} €
                    </p>
                    {cantidad > 1 && (
                      <p className="text-[10px] text-[#767676]">{precioUd.toFixed(2)} € {tc.udAbrev}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Resumen pedido */}
        <div className="h-fit">
          <div className="bg-[#ece9e4] p-8">
            <p className="font-['EB_Garamond'] text-2xl italic text-[#1b1b1b] mb-6">{tc.resumen}</p>

            <div className="space-y-3 mb-5">
              {items.map(({ producto, cantidad, variante }) => {
                const nombre = idioma === 'ca' ? (producto.nombre_ca ?? producto.nombre) : producto.nombre
                const key = carritoKey(producto.id, variante?.id)
                const precioUd = producto.precio + (variante?.precio_extra ?? 0)
                return (
                  <div key={key} className="flex justify-between text-sm text-[#666]">
                    <span className="truncate mr-2">
                      {nombre}{variante ? ` · ${idioma === 'ca' ? (variante.nombre_ca ?? variante.nombre) : variante.nombre}` : ''} × {cantidad}
                    </span>
                    <span className="flex-shrink-0">{(precioUd * cantidad).toFixed(2)} €</span>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-[#d0cdc8] py-4 space-y-2">
              <div className="flex justify-between text-sm text-[#666]">
                <span className="text-[11px] uppercase tracking-widest">{tc.subtotal}</span>
                <span>{total().toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm text-[#666]">
                <span className="text-[11px] uppercase tracking-widest">{tc.envio}</span>
                <span className={envioGratis ? 'text-[#7d5d24]' : ''}>
                  {envioGratis ? tc.gratuito : '4.95 €'}
                </span>
              </div>
            </div>

            <div className="border-t border-[#d0cdc8] pt-4 mb-8">
              <div className="flex justify-between text-[#1b1b1b]">
                <span className="text-[11px] uppercase tracking-widest font-medium">{tc.total}</span>
                <span className="font-medium text-lg">
                  {(total() + (envioGratis ? 0 : 4.95)).toFixed(2)} €
                </span>
              </div>
            </div>

            <button className="w-full bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors mb-3">
              {tc.procederPago}
            </button>
            <Link
              href="/tienda"
              className="block w-full text-center border border-[#d0cdc8] hover:border-[#1b1b1b] text-[#666] hover:text-[#1b1b1b] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors"
            >
              {tc.seguirComprando}
            </Link>

            <div className="mt-6 space-y-2">
              {tc.garantias.map((g) => (
                <p key={g} className="text-[10px] text-[#767676] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0" />
                  {g}
                </p>
              ))}
            </div>
          </div>

          {/* Campo código descuento */}
          <div className="mt-4 border border-[#e0ddd8] p-5">
            <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-3">{tc.codigoDescuento}</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="LLAMA10"
                className="flex-1 bg-white border border-[#e0ddd8] px-3 py-2.5 text-sm text-[#1b1b1b] placeholder-[#ccc] outline-none focus:border-[#1b1b1b] transition-colors"
              />
              <button className="border border-[#1b1b1b] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-[#f6f4f1] text-[10px] uppercase tracking-widest px-4 py-2.5 transition-colors">
                {tc.aplicar}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
