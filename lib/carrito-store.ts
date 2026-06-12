'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ItemCarrito, Producto, ProductoVariante } from '@/types'

export const carritoKey = (productoId: string, varianteId?: string, colorId?: string, aromaId?: string) =>
  [productoId, varianteId, colorId && `c:${colorId}`, aromaId && `a:${aromaId}`].filter(Boolean).join('::')

type CarritoStore = {
  items: ItemCarrito[]
  agregar: (producto: Producto, variante?: ProductoVariante, color?: { id: string; nombre: string; nombre_ca?: string }, aroma?: { id: string; nombre: string; nombre_ca?: string }) => void
  quitar: (key: string) => void
  actualizarCantidad: (key: string, cantidad: number) => void
  vaciar: () => void
  total: () => number
  totalItems: () => number
}

export const useCarrito = create<CarritoStore>()(
  persist(
    (set, get) => ({
      items: [],

      agregar: (producto, variante, color, aroma) => {
        const items = get().items
        const key = carritoKey(producto.id, variante?.id, color?.id, aroma?.id)
        const existente = items.find((i) => carritoKey(i.producto.id, i.variante?.id, i.color?.id, i.aroma?.id) === key)
        if (existente) {
          set({
            items: items.map((i) =>
              carritoKey(i.producto.id, i.variante?.id, i.color?.id, i.aroma?.id) === key
                ? { ...i, cantidad: i.cantidad + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { producto, cantidad: 1, variante, color, aroma }] })
        }
      },

      quitar: (key) => {
        set({ items: get().items.filter((i) => carritoKey(i.producto.id, i.variante?.id, i.color?.id, i.aroma?.id) !== key) })
      },

      actualizarCantidad: (key, cantidad) => {
        if (cantidad <= 0) {
          get().quitar(key)
          return
        }
        set({
          items: get().items.map((i) =>
            carritoKey(i.producto.id, i.variante?.id, i.color?.id, i.aroma?.id) === key ? { ...i, cantidad } : i
          ),
        })
      },

      vaciar: () => set({ items: [] }),

      total: () =>
        get().items.reduce((acc, i) => {
          const precioExtra = i.variante?.precio_extra ?? 0
          return acc + (i.producto.precio + precioExtra) * i.cantidad
        }, 0),

      totalItems: () =>
        get().items.reduce((acc, i) => acc + i.cantidad, 0),
    }),
    { name: 'carrito-tienda-velas' }
  )
)
