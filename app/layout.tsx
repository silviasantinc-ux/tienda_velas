import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnuncioBar from "@/components/AnuncioBar";
import FooterClient from "@/components/FooterClient";

const BASE = 'https://www.llumandglow.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'llum & glow — velas artesanales',
    template: '%s | llum & glow',
  },
  description: 'Velas artesanales elaboradas a mano con cera de soja natural, mechas de algodón y fragancias únicas. Descubre la colección llum & glow.',
  keywords: ['velas artesanales', 'velas de soja', 'velas perfumadas', 'regalo', 'llum and glow', 'velas barcelona'],
  authors: [{ name: 'llum & glow' }],
  creator: 'llum & glow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: BASE,
    siteName: 'llum & glow',
    title: 'llum & glow — velas artesanales',
    description: 'Velas elaboradas a mano con cera de soja natural y fragancias únicas para transformar tu hogar.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'llum & glow — velas artesanales',
    description: 'Velas elaboradas a mano con cera de soja natural y fragancias únicas.',
  },
  alternates: {
    canonical: BASE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const jsonLdOrganizacion = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'llum & glow',
  url: BASE,
  description: 'Velas artesanales elaboradas a mano con cera de soja natural, mechas de algodón y fragancias únicas.',
  email: 'hola@llumglow.com',
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#f6f4f1] text-[#1b1b1b]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganizacion) }}
        />
        <AnuncioBar />
        <Navbar />
        <main className="flex-1">{children}</main>

        <FooterClient />
      </body>
    </html>
  );
}
