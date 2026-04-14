'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { verificarAdmin } from '@/lib/admin-auth'
import { Producto } from '@/types'
import ProductoForm from '../../_components/ProductoForm'

export default function EditarProducto() {
  const [producto, setProducto] = useState<Producto | null>(null)
  const [cargando, setCargando] = useState(true)
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    verificarAdmin().then((esAdmin) => {
      if (!esAdmin) { router.replace('/admin/login'); return }
      supabase.from('productos').select('*').eq('id', id).single().then(({ data: p }) => {
        if (p) setProducto(p as Producto)
        setCargando(false)
      })
    })
  }, [id])

  if (cargando) return (
    <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center">
      <p className="text-sm text-[#999]">Cargando...</p>
    </div>
  )

  if (!producto) return (
    <div className="min-h-screen bg-[#f6f4f1] flex items-center justify-center">
      <p className="text-sm text-[#999]">Producto no encontrado.</p>
    </div>
  )

  return <ProductoForm modo="editar" productoInicial={producto} />
}
