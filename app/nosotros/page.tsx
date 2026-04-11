import Image from 'next/image'
import Link from 'next/link'

export default function PaginaNosotros() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-96 flex items-end overflow-hidden bg-[#1b1b1b]">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Byredo_1996_scented_candle.jpg"
          alt="Taller Llum & Glow"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-14 text-[#f6f4f1]">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#dcbcbc] mb-4">Nuestra historia</p>
          <h1 className="font-serif text-5xl md:text-7xl italic leading-tight">
            Dos personas, muchas velas<br />y muchas risas por el camino
          </h1>
        </div>
      </section>

      {/* Historia — Capítulo 1 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-serif text-2xl md:text-3xl italic text-[#7d5d24] mb-10 leading-relaxed">
          "Todo empezó con una tarde de domingo, una olla prestada y la certeza de que algo olía muy bien."
        </p>

        <div className="space-y-6 text-sm text-[#555] leading-[1.9]">
          <p>
            En casa siempre había velas. Para cenar, para leer, para no hacer nada en particular. El olor a cera era algo tan normal como el olor a café por las mañanas.
          </p>
          <p>
            Un día, buscando una vela con un aroma concreto —algo entre naranja y madera, cálido pero fresco— no encontramos nada que convenciera del todo. Así que decidimos hacerla nosotras. Ese mismo fin de semana ya estábamos en la cocina, con cera de soja, un termómetro de cocina y muchas ganas de experimentar.
          </p>
        </div>
      </section>

      {/* Imagen intermedia */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-72 md:h-auto min-h-[400px] bg-[#ece9e4]">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/01/Scented_candle_candlelight.jpg"
            alt="La primera vela"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="bg-[#ece9e4] flex items-center px-10 md:px-16 py-14">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-5">2025</p>
            <p className="font-serif text-3xl italic text-[#1b1b1b] leading-snug mb-6">
              "La primera olía a quemado. La segunda, regular. La tercera ya era bastante buena. La cuarta la regalamos."
            </p>
            <p className="text-sm text-[#666] leading-relaxed">
              Así funciona aprender algo nuevo: con paciencia, con humor y sin tomarse demasiado en serio los primeros intentos.
            </p>
          </div>
        </div>
      </section>

      {/* Historia — Capítulo 2 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="space-y-6 text-sm text-[#555] leading-[1.9]">
          <p>
            Los fines de semana se convirtieron en talleres improvisados. Probábamos fragancias, ajustábamos proporciones, llenábamos la cocina de olores mezclados. Todo quedaba apuntado en un cuaderno.
          </p>
          <p>
            Las velas que iban saliendo bien las regalábamos: a vecinas, a amigas, a la familia. La respuesta siempre era la misma — "¿Dónde las compráis?" — y nos mirábamos y nos reíamos.
          </p>
          <p>
            Si a tanta gente le gustaban, quizás valía la pena intentarlo de verdad. Sin grandes planes, con la misma actitud con la que todo había empezado: <em>probamos y vemos qué pasa.</em>
          </p>
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="bg-[#1b1b1b] text-[#f6f4f1] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#dcbcbc] mb-10 text-center">El camino</p>
          <div className="space-y-0">
            {[
              {
                año: '2025',
                titulo: 'La primera vela',
                texto: 'Una tarde de domingo, una olla y muchas ganas. La primera olía a quemado. La cuarta ya se podía regalar.',
              },
              {
                año: 'Principios de 2026',
                titulo: 'Llum & Glow nace',
                texto: 'De los regalos a los primeros pedidos. Montamos la tienda y empezamos a enviar velas.',
              },
              {
                año: 'Hoy',
                titulo: 'Creciendo despacio',
                texto: 'Cada vela sigue elaborada a mano, con los mismos ingredientes y el mismo cuidado que la primera.',
              },
            ].map(({ año, titulo, texto }, i) => (
              <div key={año} className="flex gap-8 pb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#dcbcbc] mt-1 flex-shrink-0" />
                  {i < 2 && <div className="w-px flex-1 bg-[#333] mt-2" />}
                </div>
                <div className="pb-2">
                  <p className="text-[10px] uppercase tracking-widest text-[#dcbcbc] mb-1">{año}</p>
                  <p className="font-serif text-xl italic text-[#f6f4f1] mb-2">{titulo}</p>
                  <p className="text-sm text-[#a0a0a0] leading-relaxed">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia — Capítulo 3 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="space-y-6 text-sm text-[#555] leading-[1.9]">
          <p>
            Seguimos trabajando con el mismo espíritu de aquel primer domingo. Todavía discutimos sobre fragancias —entre los aromas cálidos y especiados y los florales y frescos— y todavía nos reímos mucho mientras trabajamos.
          </p>
          <p>
            Cada vela se sigue haciendo a mano, con los mismos ingredientes desde el principio: cera de soja, mecha de algodón y fragancias que huelen de verdad. Sin atajos.
          </p>
          <p>
            Llum & Glow es eso: un pequeño equipo al que le gusta lo que hace y quiere que te guste a ti también.
          </p>
        </div>

        <blockquote className="border-l-2 border-[#dcbcbc] pl-6 mt-12">
          <p className="font-serif text-xl italic text-[#1b1b1b] leading-relaxed mb-3">
            "Una vela no cambia el mundo, pero sí puede cambiar cómo se siente una habitación. Y eso, para nosotras, es suficiente."
          </p>
          <cite className="text-[10px] uppercase tracking-widest text-[#7d5d24] not-italic">— Llum & Glow</cite>
        </blockquote>
      </section>

      {/* Valores */}
      <section className="bg-[#ece9e4] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">Lo que nos guía</p>
            <h2 className="font-serif text-4xl italic text-[#1b1b1b]">Nuestros valores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                titulo: 'Artesanía sin prisa',
                texto: 'Cada vela se elabora a mano, con el tiempo que requiere. No tenemos máquinas ni líneas de producción. Tenemos manos y dedicación.',
              },
              {
                titulo: 'Ingredientes puros',
                texto: 'Cera de soja sostenible, mechas de algodón sin metales pesados, fragancias libres de ftalatos. Lo que entra en nuestras velas es lo que pondrías en tu hogar.',
              },
              {
                titulo: 'Hecho con cariño',
                texto: 'Detrás de cada vela hay una conversación, un experimento que salió bien, y las ganas de que cuando la enciendas en casa, algo cambie un poco para mejor.',
              },
            ].map(({ titulo, texto }) => (
              <div key={titulo} className="border-t-2 border-[#dcbcbc] pt-6">
                <h3 className="font-serif text-2xl italic text-[#1b1b1b] mb-4">{titulo}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA final */}
      <section className="bg-[#1b1b1b] text-[#f6f4f1] py-20 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#dcbcbc] mb-4">Hecho con cariño, para tu hogar</p>
        <h2 className="font-serif text-4xl md:text-5xl italic mb-4 max-w-xl mx-auto leading-tight">
          Una vela de Llum & Glow en cada rincón
        </h2>
        <p className="text-[#a0a0a0] text-sm mb-10 max-w-sm mx-auto">
          Elaboradas a mano, con ingredientes naturales y muchas ganas de que te gusten.
        </p>
        <Link
          href="/tienda"
          className="inline-block border border-[#f6f4f1] hover:bg-[#f6f4f1] hover:text-[#1b1b1b] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium px-10 py-4 transition-all duration-300"
        >
          Ver la colección
        </Link>
      </section>

    </div>
  )
}
