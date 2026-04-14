'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verificarAdmin } from '@/lib/admin-auth'
import ProductoForm from '../_components/ProductoForm'

export default function NuevoProducto() {
  const router = useRouter()

  useEffect(() => {
    verificarAdmin().then((esAdmin) => {
      if (!esAdmin) router.replace('/admin/login')
    })
  }, [])

  return <ProductoForm modo="nuevo" />
}
