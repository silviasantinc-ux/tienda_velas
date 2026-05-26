import { MetadataRoute } from 'next'

const BASE = 'https://www.llumandglow.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/carrito', '/registro', '/admin'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
