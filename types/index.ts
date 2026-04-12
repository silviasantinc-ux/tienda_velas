export type Producto = {
  id: string
  nombre: string
  nombre_ca?: string
  descripcion: string
  descripcion_ca?: string
  precio: number
  imagen_url: string
  categoria: string
  categoria_ca?: string
  stock: number
  creado_en: string
  badge?: 'nuevo' | 'mas-vendido' | 'edicion-limitada'
  duracion_horas?: number
  peso_gr?: number
  notas_aromaticas?: string[]
  notas_aromaticas_ca?: string[]
}

export type ItemCarrito = {
  producto: Producto
  cantidad: number
}

export type Coleccion = {
  id: string
  nombre: string
  nombre_ca?: string
  descripcion: string
  descripcion_ca?: string
  imagen_url: string
  categoria: string
  categoria_ca?: string
}
