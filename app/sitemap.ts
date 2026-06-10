import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const BASE = 'https://www.llumandglow.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: productos } = await supabase
    .from('productos')
    .select('id, creado_en')
    .eq('activo', true)

  const productoUrls: MetadataRoute.Sitemap = (productos ?? []).map((p) => ({
    url: `${BASE}/producto/${p.id}`,
    lastModified: new Date(p.creado_en),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/tienda`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/colecciones`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: `${BASE}/nosotros`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/envios`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/seguridad`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/privacidad`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/terminos`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...productoUrls,
  ]
}