import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'

const BASE = 'https://www.llumandglow.com'

function supabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const { data: p } = await supabaseServer()
    .from('productos')
    .select('nombre, descripcion, imagen_url')
    .eq('id', id)
    .single()

  if (!p) return { title: 'Producto no encontrado — llum & glow' }

  const titulo = `${p.nombre} — vela artesanal | llum & glow`
  return {
    title: titulo,
    description: p.descripcion,
    openGraph: {
      title: titulo,
      description: p.descripcion,
      url: `${BASE}/producto/${id}`,
      images: [{ url: p.imagen_url, alt: p.nombre }],
      type: 'website',
    },
    alternates: {
      canonical: `${BASE}/producto/${id}`,
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
  const { data: p } = await supabaseServer()
    .from('productos')
    .select('nombre, descripcion, imagen_url, precio, stock')
    .eq('id', id)
    .single()

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
          url: `${BASE}/producto/${id}`,
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '4.90',
              currency: 'EUR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'ES',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 2,
                maxValue: 4,
                unitCode: 'DAY',
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 2,
                maxValue: 5,
                unitCode: 'DAY',
              },
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'ES',
            returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
          },
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