import { MetadataRoute } from 'next'

const BASE = 'https://tiendavelas.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/carrito', '/registro'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
