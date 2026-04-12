import { MetadataRoute } from 'next'
import { productosMock } from '@/lib/productos-mock'

const BASE = 'https://tiendavelas.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const productos = productosMock.map((p) => ({
    url: `${BASE}/producto/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/tienda`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/resenas`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/nosotros`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...productos,
  ]
}
