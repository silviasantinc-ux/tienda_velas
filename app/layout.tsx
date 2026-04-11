import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnuncioBar from "@/components/AnuncioBar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SQVGlow — Velas Artesanales",
  description: "Velas artesanales elaboradas con cera de soja natural, mechas de algodón y fragancias únicas para transformar tu hogar.",
};

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
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#f6f4f1] text-[#1b1b1b]">
        <AnuncioBar />
        <Navbar />
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-[#1b1b1b] text-[#f6f4f1] pt-16 pb-8 mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
              {/* Marca */}
              <div className="md:col-span-2">
                <p className="font-['EB_Garamond'] text-3xl italic mb-4">SQVGlow</p>
                <p className="text-sm text-[#a0a0a0] leading-relaxed max-w-xs">
                  Cada vela es elaborada a mano en nuestro taller en España usando exclusivamente cera de soja, mechas de algodón y fragancias de grado cosmético.
                </p>
                <div className="flex gap-4 mt-6">
                  {['Instagram', 'TikTok', 'Pinterest'].map((red) => (
                    <span key={red} className="text-[10px] uppercase tracking-widest text-[#666] hover:text-[#dcbcbc] cursor-pointer transition-colors">
                      {red}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navegación */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#666] mb-5">Tienda</p>
                <ul className="space-y-3 text-sm text-[#a0a0a0]">
                  <li><Link href="/tienda" className="hover:text-[#dcbcbc] transition-colors">Todas las velas</Link></li>
                  <li><Link href="/tienda?cat=Otoño" className="hover:text-[#dcbcbc] transition-colors">Otoño</Link></li>
                  <li><Link href="/tienda?cat=Postre" className="hover:text-[#dcbcbc] transition-colors">Postre</Link></li>
                  <li><Link href="/tienda?cat=Bebidas" className="hover:text-[#dcbcbc] transition-colors">Bebidas</Link></li>
                  <li><Link href="/tienda?cat=Hogar" className="hover:text-[#dcbcbc] transition-colors">Hogar</Link></li>
                  <li><Link href="/tienda?cat=Eventos" className="hover:text-[#dcbcbc] transition-colors">Eventos</Link></li>
                  <li><Link href="/nosotros" className="hover:text-[#dcbcbc] transition-colors">Nuestra historia</Link></li>
                  <li><Link href="/resenas" className="hover:text-[#dcbcbc] transition-colors">Reseñas</Link></li>
                </ul>
              </div>

              {/* Ayuda */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#666] mb-5">Ayuda</p>
                <ul className="space-y-3 text-sm text-[#a0a0a0]">
                  <li><span className="hover:text-[#dcbcbc] cursor-pointer transition-colors">Envíos y devoluciones</span></li>
                  <li><span className="hover:text-[#dcbcbc] cursor-pointer transition-colors">Cuidado de la vela</span></li>
                  <li><span className="hover:text-[#dcbcbc] cursor-pointer transition-colors">Preguntas frecuentes</span></li>
                  <li><a href="mailto:hola@sqvglow.com" className="hover:text-[#dcbcbc] transition-colors">hola@sqvglow.com</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#2e2e2e] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-[11px] text-[#555]">© 2025 SQVGlow. Todos los derechos reservados.</p>
              <div className="flex gap-6 text-[11px] text-[#555]">
                <span className="hover:text-[#a0a0a0] cursor-pointer transition-colors">Política de privacidad</span>
                <span className="hover:text-[#a0a0a0] cursor-pointer transition-colors">Términos y condiciones</span>
                <span className="hover:text-[#a0a0a0] cursor-pointer transition-colors">Cookies</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
