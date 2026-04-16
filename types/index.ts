export type Producto = {
  id: string
  nombre: string
  nombre_ca?: string
  descripcion: string
  descripcion_ca?: string
  precio: number
  imagen_url: string
  video_url?: string
  categoria: string
  categoria_ca?: string
  stock: number
  creado_en: string
  badge?: string
  detalle?: string
  detalle_ca?: string
  duracion_horas?: number
  peso_gr?: number
  alto_cm?: number
  ancho_cm?: number
  notas_aromaticas?: string[]
  notas_aromaticas_ca?: string[]
}

export type ProductoVariante = {
  id: string
  producto_id: string
  nombre: string
  nombre_ca?: string
  stock: number
  precio_extra: number | null
  orden: number
}

export type ItemCarrito = {
  producto: Producto
  cantidad: number
  variante?: ProductoVariante
}

export type ProductoImagen = {
  id: string
  producto_id: string
  url: string
  tipo: 'imagen' | 'video'
  orden: number
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
