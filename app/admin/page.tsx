'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { verificarAdmin } from '@/lib/admin-auth'
import { Producto } from '@/types'
import { Plus, Pencil, Trash2, LogOut, Package, Users, Tag, FolderOpen, Eye, EyeOff, ChevronUp, ChevronDown, Download } from 'lucide-react'

type SortCol = 'nombre' | 'categoria' | 'precio' | 'stock' | 'badge' | 'activo'

export default function AdminPanel() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [eliminando, setEliminando] = useState<string | null>(null)
  const [sortCol, setSortCol] = useState<SortCol>('nombre')
  const [sortAsc, setSortAsc] = useState(true)
  const router = useRouter()

  useEffect(() => {
    verificarAdmin().then((esAdmin) => {
      if (!esAdmin) router.replace('/admin/login')
      else cargarProductos()
    })
  }, [])

  const cargarProductos = async () => {
    setCargando(true)
    const { data } = await supabase
      .from('productos')
      .select('*')
      .order('nombre', { ascending: true })
    setProductos((data as Producto[]) ?? [])
    setCargando(false)
  }

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return
    setEliminando(id)
    await supabase.from('productos').delete().eq('id', id)
    setProductos((prev) => prev.filter((p) => p.id !== id))
    setEliminando(null)
  }

  const toggleActivo = async (p: Producto) => {
    const nuevoValor = !(p as Producto & { activo?: boolean }).activo
    await supabase.from('productos').update({ activo: nuevoValor }).eq('id', p.id)
    setProductos((prev) => prev.map((x) => x.id === p.id ? { ...x, activo: nuevoValor } as Producto : x))
  }

  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const badgeLabel: Record<string, string> = {
    'nuevo': 'Nuevo',
    'mas-vendido': 'Más vendido',
    'edicion-limitada': 'Ed. limitada',
  }

  const ordenar = (col: SortCol) => {
    if (sortCol === col) { setSortAsc((a) => !a); return }
    setSortCol(col)
    setSortAsc(true)
  }

  const productosSorted = [...productos].sort((a, b) => {
    let va: string | number = ''
    let vb: string | number = ''
    if (sortCol === 'nombre')    { va = a.nombre;    vb = b.nombre }
    if (sortCol === 'categoria') { va = a.categoria; vb = b.categoria }
    if (sortCol === 'precio')    { va = a.precio;    vb = b.precio }
    if (sortCol === 'stock')     { va = a.stock;     vb = b.stock }
    if (sortCol === 'badge')     { va = a.badge ?? ''; vb = b.badge ?? '' }
    if (sortCol === 'activo')    { va = (a as Producto & { activo?: boolean }).activo === false ? 0 : 1; vb = (b as Producto & { activo?: boolean }).activo === false ? 0 : 1 }
    if (va < vb) return sortAsc ? -1 : 1
    if (va > vb) return sortAsc ? 1 : -1
    return 0
  })

  const exportarCSV = () => {
    const cabecera = ['Nombre', 'Nombre CA', 'Categoría', 'Categoría CA', 'Precio (€)', 'Stock', 'Etiqueta', 'Peso (g)', 'Alto (cm)', 'Diámetro (cm)', 'Activo']
    const filas = productosSorted.map((p) => [
      p.nombre,
      p.nombre_ca ?? '',
      p.categoria,
      p.categoria_ca ?? '',
      p.precio.toFixed(2),
      p.stock,
      p.badge ?? '',
      (p as Producto & { peso_gr?: number }).peso_gr ?? '',
      (p as Producto & { alto_cm?: number }).alto_cm ?? '',
      (p as Producto & { ancho_cm?: number }).ancho_cm ?? '',
      (p as Producto & { activo?: boolean }).activo === false ? 'No' : 'Sí',
    ])
    const csv = [cabecera, ...filas]
      .map((fila) => fila.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';'))
      .join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `productos_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const Th = ({ col, label, px = 'px-4' }: { col: SortCol; label: string; px?: string }) => (
    <th
      onClick={() => ordenar(col)}
      className={`text-left text-[10px] uppercase tracking-widest text-[#767676] ${px} py-4 font-medium cursor-pointer hover:text-[#1b1b1b] select-none transition-colors`}
    >
      <span className="flex items-center gap-1">
        {label}
        {sortCol === col
          ? sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
          : <ChevronUp className="w-3 h-3 opacity-20" />}
      </span>
    </th>
  )


  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      {/* Header */}
      <header className="bg-white border-b border-[#e0ddd8] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-[#7d5d24]" />
          <span className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">
            llum & glow — Admin
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/admin/categorias" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] transition-colors">
            <FolderOpen className="w-3.5 h-3.5" />
            Categorías
          </Link>
          <Link href="/admin/badges" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] transition-colors">
            <Tag className="w-3.5 h-3.5" />
            Etiquetas
          </Link>
          <Link href="/admin/usuarios" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] transition-colors">
            <Users className="w-3.5 h-3.5" />
            Usuarios
          </Link>
          <Link
            href="/"
            className="text-[10px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] transition-colors"
          >
            Ver tienda
          </Link>
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#767676] hover:text-[#1b1b1b] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Salir
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-['EB_Garamond'] text-3xl italic text-[#1b1b1b]">Productos</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={exportarCSV}
              disabled={productos.length === 0}
              className="flex items-center gap-2 border border-[#e0ddd8] hover:border-[#1b1b1b] text-[#666] hover:text-[#1b1b1b] text-[10px] uppercase tracking-widest font-medium px-5 py-3 transition-colors disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar CSV
            </button>
            <Link
              href="/admin/productos/nuevo"
              className="flex items-center gap-2 bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium px-5 py-3 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Nuevo producto
            </Link>
          </div>
        </div>

        {cargando ? (
          <p className="text-sm text-[#767676] text-center py-20">Cargando...</p>
        ) : (
          <div className="bg-white border border-[#e0ddd8]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e0ddd8]">
                  <Th col="nombre"    label="Producto" px="px-6" />
                  <Th col="categoria" label="Categoría" />
                  <Th col="precio"    label="Precio" />
                  <Th col="stock"     label="Stock" />
                  <Th col="badge"     label="Etiqueta" />
                  <Th col="activo"    label="Estado" />
                  <th className="px-4 py-4" />
                </tr>
              </thead>
              <tbody>
                {productosSorted.map((p) => (
                  <tr key={p.id} className="border-b border-[#f0ede8] hover:bg-[#faf9f7] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={p.imagen_url}
                          alt={p.nombre}
                          className="w-12 h-12 object-cover bg-[#f0ede8] flex-shrink-0"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/Postre_01.jpeg' }}
                        />
                        <div>
                          <p className="text-sm font-medium text-[#1b1b1b]">{p.nombre}</p>
                          {p.nombre_ca && <p className="text-[11px] text-[#767676]">{p.nombre_ca}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#666]">{p.categoria}</td>
                    <td className="px-4 py-4 text-sm text-[#1b1b1b] font-medium">{p.precio.toFixed(2)} €</td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-medium ${p.stock <= 5 ? 'text-red-600' : 'text-[#1b1b1b]'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {p.badge && (
                        <span className="text-[10px] uppercase tracking-widest text-[#7d5d24] bg-[#f6f0e8] px-2 py-1">
                          {badgeLabel[p.badge] ?? p.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleActivo(p)}
                        title={(p as Producto & { activo?: boolean }).activo === false ? 'Activar' : 'Desactivar'}
                        className={(p as Producto & { activo?: boolean }).activo === false ? 'text-[#ccc] hover:text-[#7d5d24] transition-colors' : 'text-[#7d5d24] hover:text-[#ccc] transition-colors'}
                      >
                        {(p as Producto & { activo?: boolean }).activo === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3 justify-end">
                        <Link
                          href={`/admin/productos/${p.id}/editar`}
                          className="text-[#767676] hover:text-[#1b1b1b] transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => eliminar(p.id)}
                          disabled={eliminando === p.id}
                          className="text-[#767676] hover:text-red-600 transition-colors disabled:opacity-40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {productos.length === 0 && (
              <p className="text-sm text-[#767676] text-center py-16">No hay productos aún.</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
