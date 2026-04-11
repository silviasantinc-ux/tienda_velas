export type Producto = {
  id: string
  nombre: string
  descripcion: string
  precio: number
  imagen_url: string
  categoria: string
  stock: number
  creado_en: string
  badge?: 'nuevo' | 'mas-vendido' | 'edicion-limitada'
  duracion_horas?: number
  peso_gr?: number
  notas_aromaticas?: string[]
}

export type ItemCarrito = {
  producto: Producto
  cantidad: number
}

export type Coleccion = {
  id: string
  nombre: string
  descripcion: string
  imagen_url: string
  categoria: string
}
