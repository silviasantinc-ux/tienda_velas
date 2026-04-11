import Link from 'next/link'
import Image from 'next/image'
import { productosMock, colecciones } from '@/lib/productos-mock'
import TarjetaProducto from '@/components/TarjetaProducto'

const destacados = productosMock.filter((p) => p.badge === 'mas-vendido').slice(0, 4)
const nuevos = productosMock.filter((p) => p.badge === 'nuevo').slice(0, 4)

export default function Home() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[92vh] min-h-[540px] flex items-center justify-center overflow-hidden bg-[#1b1b1b]">
        {/* Ilustración SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c8903a" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c8903a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#dcbcbc" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#dcbcbc" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="flameGrad" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#fff8e1" />
              <stop offset="40%" stopColor="#ffb74d" />
              <stop offset="100%" stopColor="#e65100" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="flameGrad2" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#fff8e1" />
              <stop offset="40%" stopColor="#ffcc80" />
              <stop offset="100%" stopColor="#e65100" stopOpacity="0" />
            </radialGradient>
            <filter id="blur1">
              <feGaussianBlur stdDeviation="18" />
            </filter>
            <filter id="blur2">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Halos de luz */}
          <ellipse cx="580" cy="420" rx="180" ry="160" fill="url(#glow1)" filter="url(#blur1)" />
          <ellipse cx="860" cy="380" rx="140" ry="130" fill="url(#glow1)" filter="url(#blur1)" />
          <ellipse cx="1050" cy="470" rx="110" ry="100" fill="url(#glow2)" filter="url(#blur1)" />

          {/* ── VELA IZQUIERDA (grande) ── */}
          {/* cuerpo */}
          <rect x="540" y="320" width="80" height="240" rx="4" fill="#2e2a24" />
          <rect x="540" y="320" width="80" height="240" rx="4" fill="none" stroke="#7d5d24" strokeWidth="1" strokeOpacity="0.4" />
          {/* líneas de textura */}
          <line x1="555" y1="370" x2="555" y2="540" stroke="#7d5d24" strokeWidth="0.5" strokeOpacity="0.25" />
          <line x1="575" y1="360" x2="575" y2="545" stroke="#7d5d24" strokeWidth="0.5" strokeOpacity="0.25" />
          <line x1="595" y1="365" x2="595" y2="543" stroke="#7d5d24" strokeWidth="0.5" strokeOpacity="0.25" />
          {/* tapa */}
          <ellipse cx="580" cy="320" rx="40" ry="8" fill="#3a3228" stroke="#7d5d24" strokeWidth="0.8" strokeOpacity="0.5" />
          {/* mecha */}
          <line x1="580" y1="320" x2="578" y2="300" stroke="#555" strokeWidth="2" strokeLinecap="round" />
          {/* llama */}
          <ellipse cx="578" cy="288" rx="14" ry="22" fill="url(#flameGrad)" filter="url(#blur2)" opacity="0.9" />
          <path d="M578,302 C572,292 570,280 578,268 C586,280 586,292 578,302Z" fill="#fff8e1" opacity="0.95" />
          <path d="M578,300 C574,292 573,283 578,274 C583,283 583,292 578,300Z" fill="white" opacity="0.7" />
          {/* platillo */}
          <ellipse cx="580" cy="558" rx="55" ry="10" fill="#2a2520" stroke="#7d5d24" strokeWidth="0.8" strokeOpacity="0.4" />

          {/* ── VELA CENTRAL (mediana) ── */}
          <rect x="820" y="280" width="70" height="200" rx="4" fill="#2e2a24" />
          <rect x="820" y="280" width="70" height="200" rx="4" fill="none" stroke="#dcbcbc" strokeWidth="1" strokeOpacity="0.35" />
          <line x1="833" y1="325" x2="833" y2="465" stroke="#dcbcbc" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="850" y1="318" x2="850" y2="468" stroke="#dcbcbc" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="867" y1="322" x2="867" y2="467" stroke="#dcbcbc" strokeWidth="0.5" strokeOpacity="0.2" />
          <ellipse cx="855" cy="280" rx="35" ry="7" fill="#3a3228" stroke="#dcbcbc" strokeWidth="0.8" strokeOpacity="0.45" />
          <line x1="855" y1="280" x2="853" y2="263" stroke="#555" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="853" cy="252" rx="12" ry="19" fill="url(#flameGrad2)" filter="url(#blur2)" opacity="0.85" />
          <path d="M853,264 C848,255 846,244 853,234 C860,244 860,255 853,264Z" fill="#fff8e1" opacity="0.95" />
          <path d="M853,263 C850,255 849,247 853,239 C857,247 857,255 853,263Z" fill="white" opacity="0.65" />
          <ellipse cx="855" cy="479" rx="48" ry="9" fill="#2a2520" stroke="#dcbcbc" strokeWidth="0.8" strokeOpacity="0.35" />

          {/* ── VELA DERECHA (pequeña) ── */}
          <rect x="1010" y="360" width="56" height="160" rx="4" fill="#2e2a24" />
          <rect x="1010" y="360" width="56" height="160" rx="4" fill="none" stroke="#7d5d24" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="1021" y1="395" x2="1021" y2="508" stroke="#7d5d24" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="1038" y1="390" x2="1038" y2="510" stroke="#7d5d24" strokeWidth="0.5" strokeOpacity="0.2" />
          <ellipse cx="1038" cy="360" rx="28" ry="6" fill="#3a3228" stroke="#7d5d24" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="1038" y1="360" x2="1036" y2="346" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="1036" cy="337" rx="10" ry="16" fill="url(#flameGrad)" filter="url(#blur2)" opacity="0.8" />
          <path d="M1036,348 C1032,341 1030,332 1036,323 C1042,332 1042,341 1036,348Z" fill="#fff8e1" opacity="0.9" />
          <path d="M1036,347 C1033,341 1032,334 1036,327 C1040,334 1040,341 1036,347Z" fill="white" opacity="0.6" />
          <ellipse cx="1038" cy="519" rx="38" ry="7" fill="#2a2520" stroke="#7d5d24" strokeWidth="0.8" strokeOpacity="0.3" />

          {/* ── RAMAS BOTÁNICAS IZQUIERDA ── */}
          <g opacity="0.5" stroke="#7d5d24" strokeWidth="1" fill="none">
            <path d="M200,600 Q280,520 360,480" strokeWidth="1.5" />
            <path d="M260,555 Q240,510 270,480" />
            <path d="M310,530 Q290,490 315,465" />
            <path d="M340,510 Q340,475 360,455" />
            {/* hojas */}
            <ellipse cx="270" cy="479" rx="12" ry="7" transform="rotate(-30 270 479)" fill="#7d5d24" fillOpacity="0.3" />
            <ellipse cx="316" cy="464" rx="11" ry="6" transform="rotate(-20 316 464)" fill="#7d5d24" fillOpacity="0.3" />
            <ellipse cx="361" cy="454" rx="10" ry="6" transform="rotate(-10 361 454)" fill="#7d5d24" fillOpacity="0.25" />
            <ellipse cx="225" cy="570" rx="13" ry="7" transform="rotate(40 225 570)" fill="#7d5d24" fillOpacity="0.25" />
          </g>

          {/* ── RAMAS BOTÁNICAS DERECHA ── */}
          <g opacity="0.45" stroke="#dcbcbc" strokeWidth="1" fill="none">
            <path d="M1280,580 Q1200,510 1140,480" strokeWidth="1.5" />
            <path d="M1220,545 Q1230,505 1205,478" />
            <path d="M1175,522 Q1180,488 1160,464" />
            <ellipse cx="1204" cy="477" rx="11" ry="6" transform="rotate(25 1204 477)" fill="#dcbcbc" fillOpacity="0.25" />
            <ellipse cx="1159" cy="463" rx="10" ry="6" transform="rotate(15 1159 463)" fill="#dcbcbc" fillOpacity="0.25" />
            <ellipse cx="1260" cy="560" rx="13" ry="7" transform="rotate(-40 1260 560)" fill="#dcbcbc" fillOpacity="0.2" />
          </g>

          {/* Destellos pequeños */}
          <circle cx="450" cy="250" r="1.5" fill="#dcbcbc" opacity="0.6" />
          <circle cx="700" cy="180" r="1" fill="#7d5d24" opacity="0.5" />
          <circle cx="1100" cy="220" r="1.5" fill="#dcbcbc" opacity="0.55" />
          <circle cx="1200" cy="350" r="1" fill="#7d5d24" opacity="0.4" />
          <circle cx="380" cy="400" r="1" fill="#dcbcbc" opacity="0.4" />
          <circle cx="920" cy="160" r="1.5" fill="#dcbcbc" opacity="0.5" />

          {/* Línea de suelo sutil */}
          <line x1="300" y1="560" x2="1150" y2="560" stroke="#7d5d24" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>

        <div className="relative z-10 text-center text-[#f6f4f1] px-6 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#dcbcbc] mb-6">
            Colección 2025
          </p>
          <h1 className="font-['EB_Garamond'] text-6xl md:text-7xl italic leading-tight mb-6">
            El arte de la luz artesanal
          </h1>
          <p className="text-[#ccc] text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Velas elaboradas a mano con cera de soja natural y fragancias únicas.
            Diseñadas para transformar cada instante en una experiencia sensorial.
          </p>
          <Link
            href="/tienda"
            className="inline-block border border-[#f6f4f1] hover:bg-[#f6f4f1] hover:text-[#1b1b1b] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium px-10 py-4 transition-all duration-300"
          >
            Descubrir la colección
          </Link>
        </div>
      </section>

      {/* ── COLECCIONES ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">Explorar</p>
          <h2 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">Nuestras colecciones</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {colecciones.map((col) => (
            <Link
              key={col.id}
              href={`/tienda?cat=${col.categoria}`}
              className="group relative h-72 overflow-hidden bg-[#ece9e4]"
            >
              <Image
                src={col.imagen_url}
                alt={col.nombre}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-[#f6f4f1]">
                <p className="font-['EB_Garamond'] text-2xl italic mb-1">{col.nombre}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#dcbcbc]">{col.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── MÁS VENDIDOS ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">Los favoritos</p>
            <h2 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">Más vendidos</h2>
          </div>
          <Link href="/tienda" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors hidden md:block">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {destacados.map((p) => (
            <TarjetaProducto key={p.id} producto={p} />
          ))}
        </div>
      </section>

      {/* ── BANNER CENTRAL ───────────────────────────────── */}
      <section className="my-16 bg-[#ece9e4] py-20 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-4">Nuestra promesa</p>
        <h2 className="font-['EB_Garamond'] text-4xl md:text-5xl italic text-[#1b1b1b] max-w-2xl mx-auto leading-tight mb-12">
          Ingredientes puros, aromas que perduran
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20">
          {[
            { valor: '100%', etiqueta: 'Cera de soja natural' },
            { valor: '+40h', etiqueta: 'Duración garantizada' },
            { valor: '0%', etiqueta: 'Parafina y tóxicos' },
            { valor: 'ES', etiqueta: 'Elaboradas en España' },
          ].map(({ valor, etiqueta }) => (
            <div key={etiqueta} className="text-center">
              <p className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b] mb-1">{valor}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#7d5d24]">{etiqueta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NUEVAS INCORPORACIONES ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-2">Recién llegadas</p>
            <h2 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">Nuevas incorporaciones</h2>
          </div>
          <Link href="/tienda" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors hidden md:block">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {nuevos.map((p) => (
            <TarjetaProducto key={p.id} producto={p} />
          ))}
        </div>
      </section>

      {/* ── HISTORIA DE MARCA ────────────────────────────── */}
      <section className="my-16 grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-80 md:h-auto min-h-[400px] bg-[#ece9e4]">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/01/Scented_candle_candlelight.jpg"
            alt="Taller artesanal SQVGlow"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="bg-[#1b1b1b] text-[#f6f4f1] flex items-center justify-center px-10 md:px-16 py-16">
          <div className="max-w-sm">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#dcbcbc] mb-5">Nuestra historia</p>
            <h2 className="font-serif text-4xl italic leading-tight mb-6">
              Una madre, una hija y una cocina en Murcia
            </h2>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-5">
              Carmen siempre olió a canela y lavanda. Cuando Sofía, su hija, no encontró ninguna vela que oliera a los domingos de su infancia, le preguntó: <em>"¿Y si las hacemos nosotras?"</em>
            </p>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-8">
              Así nació SQVGlow en 2020. Con una olla vieja, cera de soja y más fracasos que éxitos al principio. Hoy cada vela sigue siendo un trozo de esa historia.
            </p>
            <Link
              href="/nosotros"
              className="text-[11px] uppercase tracking-widest text-[#f6f4f1] border-b border-[#f6f4f1] pb-0.5 hover:text-[#dcbcbc] hover:border-[#dcbcbc] transition-colors"
            >
              Leer la historia completa
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">Opiniones verificadas</p>
            <h2 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">Lo que dicen nuestras clientas</h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} className="w-4 h-4 text-[#7d5d24]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-[11px] text-[#999] uppercase tracking-widest ml-2">4.9 · 9 reseñas</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              titulo: 'La mejor vela que he comprado nunca',
              texto: 'Llevaba tiempo buscando una vela de lavanda que no oliera a limpiador de baño y por fin la encontré. El aroma es suave, profundo, completamente natural. La enciendo cuando llego del trabajo y en diez minutos el salón huele de maravilla.',
              nombre: 'María José T.',
              ciudad: 'Madrid',
              producto: 'Lavanda & Bergamota',
              estrellas: 5,
            },
            {
              titulo: 'Pedí tres y ya he repetido dos veces',
              texto: 'Empecé comprando una para probar. Al día siguiente ya había pedido dos más para regalar. La de vainilla y sándalo es adictiva — cálida, envolvente, sin resultar empalagosa. Todo el mundo que viene a casa pregunta de dónde es.',
              nombre: 'Lucía F.',
              ciudad: 'Valencia',
              producto: 'Vainilla & Sándalo',
              estrellas: 5,
            },
            {
              titulo: 'Una obra de arte olfativa',
              texto: 'El oud es profundo pero no pesado, la rosa negra le da un punto floral muy elegante. La enciendo por la tarde cuando leo y convierte cualquier momento en algo especial. Vale cada céntimo.',
              nombre: 'Raquel M.',
              ciudad: 'Barcelona',
              producto: 'Oud & Rosa Negra',
              estrellas: 5,
            },
          ].map(({ titulo, texto, nombre, ciudad, producto, estrellas }) => (
            <div key={nombre} className="border border-[#e0ddd8] p-8 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: estrellas }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#7d5d24]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-['EB_Garamond'] text-xl italic text-[#1b1b1b] mb-3">{titulo}</p>
              <p className="text-sm text-[#666] leading-relaxed mb-6 flex-1">{texto}</p>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#7d5d24] mb-3">
                  Sobre: {producto}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[#dcbcbc]" />
                  <div>
                    <p className="text-[11px] font-medium text-[#1b1b1b] uppercase tracking-widest">{nombre}</p>
                    <p className="text-[10px] text-[#999] uppercase tracking-widest">{ciudad} · Compra verificada</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/resenas" className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors">
            Ver las 9 reseñas
          </Link>
        </div>
      </section>

    </div>
  )
}
