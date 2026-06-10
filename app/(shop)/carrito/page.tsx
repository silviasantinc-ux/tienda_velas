'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useCarrito, carritoKey } from '@/lib/carrito-store'
import { useIdioma } from '@/lib/idioma-store'

export default function PaginaCarrito() {
  const { items, quitar, actualizarCantidad, total, vaciar } = useCarrito()
  const { idioma, t } = useIdioma()
  const tc = t.carrito
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [direccion, setDireccion] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(false)

  const todosConPrecio = items.every(({ producto, variante }) => {
    const precioUd = producto.precio + (variante?.precio_extra ?? 0)
    return precioUd > 0
  })
  const datosCompletos = nombre.trim().length > 0 && email.trim().length > 0 && direccion.trim().length > 0 && todosConPrecio

  const enviarPedido = async () => {
    if (!datosCompletos || enviando) return
    setEnviando(true)
    setErrorEnvio(false)
    const lineas = items.map(({ producto, cantidad, variante }) => {
      const nombreProd = idioma === 'ca' ? (producto.nombre_ca ?? producto.nombre) : producto.nombre
      const nombreVar = variante ? ` · ${idioma === 'ca' ? (variante.nombre_ca ?? variante.nombre) : variante.nombre}` : ''
      const precioUd = producto.precio + (variante?.precio_extra ?? 0)
      const precioTotal = (precioUd * cantidad).toFixed(2).replace('.', ',')
      return `${nombreProd}${nombreVar} × ${cantidad} — ${precioTotal} €`
    })
    const totalStr = total().toFixed(2).replace('.', ',')

    const res = await fetch('/api/pedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), direccion: direccion.trim(), lineas, total: totalStr, idioma }),
    })

    setEnviando(false)
    if (res.ok) {
      setEnviado(true)
      vaciar()
    } else {
      setErrorEnvio(true)
    }
  }

  if (enviado) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <p className="font-['EB_Garamond'] text-5xl italic text-[#1b1b1b] mb-4">{tc.pedidoEnviado}</p>
        <p className="text-sm text-[#767676] mb-10">{tc.pedidoEnviadoSub}</p>
        <Link
          href="/tienda"
          className="inline-block bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium px-10 py-4 transition-colors"
        >
          {tc.irTienda}
        </Link>
      </div>
    )
  }

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


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 divide-y divide-[#e0ddd8]">
          {items.map(({ producto, cantidad, variante }) => {
            const nombre = idioma === 'ca' ? (producto.nombre_ca ?? producto.nombre) : producto.nombre
            const categoria = idioma === 'ca' ? (producto.categoria_ca ?? producto.categoria) : producto.categoria
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
                <Link href="/envios" className="text-[11px] text-[#7d5d24] hover:underline underline-offset-2">
                  {tc.verInfoEnvio}
                </Link>
              </div>
            </div>

            <div className="border-t border-[#d0cdc8] pt-4 mb-6">
              <div className="flex justify-between text-[#1b1b1b]">
                <span className="text-[11px] uppercase tracking-widest font-medium">{tc.total}</span>
                <span className="font-medium text-lg">
                  {total().toFixed(2)} €
                </span>
              </div>
            </div>

            {/* Datos de envío */}
            <div className="mb-6 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-[#767676]">{tc.datosPedido}</p>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#767676] mb-1">
                  {tc.nombreCompleto} <span className="text-[#b97979]">*</span>
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={tc.placeholderNombre}
                  className="w-full border border-[#d0cdc8] bg-white px-3 py-2.5 text-sm text-[#1b1b1b] placeholder-[#bbb] focus:outline-none focus:border-[#1b1b1b] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#767676] mb-1">
                  {tc.emailLabel} <span className="text-[#b97979]">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tc.placeholderEmail}
                  className="w-full border border-[#d0cdc8] bg-white px-3 py-2.5 text-sm text-[#1b1b1b] placeholder-[#bbb] focus:outline-none focus:border-[#1b1b1b] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#767676] mb-1">
                  {tc.direccionCompleta} <span className="text-[#b97979]">*</span>
                </label>
                <textarea
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder={tc.placeholderDireccion}
                  rows={2}
                  className="w-full border border-[#d0cdc8] bg-white px-3 py-2.5 text-sm text-[#1b1b1b] placeholder-[#bbb] focus:outline-none focus:border-[#1b1b1b] transition-colors resize-none"
                />
              </div>
              {!datosCompletos && (nombre || direccion) && (
                <p className="text-[10px] text-[#b97979]">{tc.camposObligatorios}</p>
              )}
            </div>

            {!todosConPrecio && (
              <p className="text-[11px] text-[#b97979] text-center mb-3">
                {idioma === 'ca'
                  ? 'Hi ha articles sense preu. Elimina\'ls per poder enviar la comanda.'
                  : 'Hay artículos sin precio. Elimínalos para poder enviar el pedido.'}
              </p>
            )}
            {errorEnvio && (
              <p className="text-[11px] text-[#b97979] text-center mb-3">{tc.errorEnvio}</p>
            )}
            <button
              onClick={enviarPedido}
              disabled={!datosCompletos || enviando}
              className="w-full bg-[#1b1b1b] hover:bg-[#333] disabled:bg-[#e0ddd8] disabled:text-[#a0a0a0] disabled:cursor-not-allowed text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 mb-3 transition-colors"
            >
              {enviando ? tc.enviando : tc.generarPedido}
            </button>
            <Link
              href="/tienda"
              className="block w-full text-center border border-[#d0cdc8] hover:border-[#1b1b1b] text-[#666] hover:text-[#1b1b1b] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors"
            >
              {tc.seguirComprando}
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
