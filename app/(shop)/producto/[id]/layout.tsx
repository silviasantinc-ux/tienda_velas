import type { Metadata } from 'next'
import { productosMock } from '@/lib/productos-mock'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const p = productosMock.find((x) => x.id === id)

  if (!p) {
    return { title: 'Producto no encontrado — llum & glow' }
  }

  const titulo = `${p.nombre} — vela artesanal | llum & glow`
  const descripcion = p.descripcion

  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      url: `https://www.llumandglow.com/producto/${p.id}`,
      images: [{ url: p.imagen_url, alt: p.nombre }],
      type: 'website',
    },
    alternates: {
      canonical: `https://tiendavelas.vercel.app/producto/${p.id}`,
    },
  }
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const p = productosMock.find((x) => x.id === id)

  const jsonLd = p
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.nombre,
        description: p.descripcion,
        image: p.imagen_url,
        brand: { '@type': 'Brand', name: 'llum & glow' },
        offers: {
          '@type': 'Offer',
          price: p.precio,
          priceCurrency: 'EUR',
          availability:
            p.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          url: `https://www.llumandglow.com/producto/${p.id}`,
        },
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
