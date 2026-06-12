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
  peso_gr?: number
  alto_cm?: number
  ancho_cm?: number
  personalizable?: boolean
  tipologia?: string
}

export type Color = {
  id: string
  nombre: string
  nombre_ca?: string
  activo: boolean
  orden: number
}

export type Aroma = {
  id: string
  nombre: string
  nombre_ca?: string
  activo: boolean
  orden: number
}

export type ProductoVariante = {
  id: string
  producto_id: string
  nombre: string
  nombre_ca?: string
  stock: number
  precio_extra: number | null
  orden: number
  imagen_id?: string | null
}

export type ItemCarrito = {
  producto: Producto
  cantidad: number
  variante?: ProductoVariante
  color?: { id: string; nombre: string; nombre_ca?: string }
  aroma?: { id: string; nombre: string; nombre_ca?: string }
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
