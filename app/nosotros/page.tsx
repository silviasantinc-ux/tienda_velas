import Image from 'next/image'
import Link from 'next/link'
import SeccionNewsletter from '@/components/SeccionNewsletter'

export default function PaginaNosotros() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-96 flex items-end overflow-hidden bg-[#1b1b1b]">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Byredo_1996_scented_candle.jpg"
          alt="Taller SQVGlow"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-14 text-[#f6f4f1]">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#dcbcbc] mb-4">Nuestra historia</p>
          <h1 className="font-serif text-5xl md:text-7xl italic leading-tight">
            Una madre, una hija<br />y una llama que no se apagó
          </h1>
        </div>
      </section>

      {/* Historia — Capítulo 1 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-serif text-2xl md:text-3xl italic text-[#7d5d24] mb-10 leading-relaxed">
          "Hay momentos que huelen a hogar. Y otros que huelen a todo lo que perdiste. Nosotras aprendimos a distinguirlos encendiendo una vela."
        </p>

        <div className="space-y-6 text-sm text-[#555] leading-[1.9]">
          <p>
            Carmen siempre olía a canela y a jabón de lavanda. Lo recuerda su hija Sofía como el primer aroma de su vida, el que la despertaba los domingos, el que le decía que todo estaba bien sin necesidad de palabras.
          </p>
          <p>
            Cuando Sofía tenía doce años, su padre se fue. No de golpe, sino de esa manera lenta y cruel que tienen algunas ausencias: primero las cenas, luego los fines de semana, luego el rastro de su colonia en el baño. Carmen nunca habló mucho de ello. Compraba velas. Llenaba la casa de luz y de aroma, como quien construye una muralla de cosas bonitas contra la tristeza.
          </p>
          <p>
            Sofía creció viendo a su madre encender velas cada noche antes de cenar. Era su ritual, su forma de decir <em>este momento importa</em>. Con los años, Sofía empezó a comprárselas también. Y un día, al no encontrar ninguna que oliera exactamente como los domingos de su infancia, le preguntó a su madre: <strong>"¿Y si las hacemos nosotras?"</strong>
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
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-5">2019</p>
            <p className="font-serif text-3xl italic text-[#1b1b1b] leading-snug mb-6">
              "La primera vela que hicimos olía a quemado. Nos reímos tanto que casi nos caemos de la silla."
            </p>
            <p className="text-sm text-[#666] leading-relaxed">
              La cocina de Carmen, en un piso de Murcia, fue el primer taller. Una olla vieja, cera de soja comprada por internet, y dos mujeres que no sabían muy bien lo que hacían pero que lo hacían juntas. Eso era suficiente.
            </p>
          </div>
        </div>
      </section>

      {/* Historia — Capítulo 2 */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="space-y-6 text-sm text-[#555] leading-[1.9]">
          <p>
            Durante meses, los fines de semana eran de ellas. Sofía llegaba en tren desde Valencia, donde vivía, y pasaban el sábado entero entre aromas, notas y errores. Carmen llevaba un cuaderno donde apuntaba cada mezcla, cada temperatura, cada fallo. Sofía hacía fotos. Regalaban las velas a vecinas, amigas, familiares.
          </p>
          <p>
            Fue Carmen quien dijo, un domingo de enero de 2020, que quizás deberían intentarlo en serio. Tenía cincuenta y tres años, llevaba veinte trabajando de administrativa en una empresa que nunca la había visto bien, y por primera vez en mucho tiempo sentía que algo era suyo de verdad.
          </p>
          <p>
            Sofía dudó. Tenía miedo. Le preocupaba el dinero, el tiempo, el fracaso. Pero sobre todo le preocupaba decepcionar a su madre, que había arriesgado tanto ya en la vida. Entonces Carmen la miró y le dijo algo que Sofía lleva tatuado en algún lugar que no se ve: <em>"Si lo hacemos juntas, ya habrá valido la pena aunque no funcione."</em>
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
                año: '2019',
                titulo: 'La primera llama',
                texto: 'Primera vela hecha en casa. Olía a quemado. La segunda ya olía a lavanda. La tercera era perfecta.',
              },
              {
                año: '2020',
                titulo: 'La decisión',
                texto: 'En plena pandemia, con el mundo parado, Carmen y Sofía deciden que es el momento. SQVGlow nace en una cocina de Murcia.',
              },
              {
                año: '2021',
                titulo: 'La primera venta',
                texto: 'Una desconocida de Instagram compra tres velas. Lloran las dos. Es la mejor señal que han recibido nunca.',
              },
              {
                año: '2022',
                titulo: 'El taller',
                texto: 'Carmen deja su trabajo después de veinte años. Alquilan un pequeño local. Por primera vez, el taller tiene nombre en la puerta.',
              },
              {
                año: '2024',
                titulo: 'Hoy',
                texto: 'Más de 2.000 velas vendidas. Cada una elaborada a mano. Cada una con el mismo amor que la primera.',
              },
            ].map(({ año, titulo, texto }, i) => (
              <div key={año} className="flex gap-8 pb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#dcbcbc] mt-1 flex-shrink-0" />
                  {i < 4 && <div className="w-px flex-1 bg-[#333] mt-2" />}
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
            Hoy Carmen y Sofía trabajan juntas cada día. Se pelean por las fragancias —Carmen prefiere los aromas cálidos y especiados, Sofía los florales y frescos— y se ríen de esas peleas porque en el fondo saben que son las dos caras del mismo carácter.
          </p>
          <p>
            Hay días difíciles. Días en que los pedidos se acumulan y las horas no alcanzan, en que un lote sale mal o llega una devolución que duele. Pero hay algo que ninguna de las dos cambiaría: al final del día, cuando apagan la luz del taller, siempre queda el olor. A cera caliente, a lavanda, a madera. A ellas.
          </p>
          <p>
            Cada vela que sale de SQVGlow lleva algo de esa historia. La historia de dos mujeres que decidieron que nunca es tarde para encender algo nuevo.
          </p>
        </div>

        <blockquote className="border-l-2 border-[#dcbcbc] pl-6 mt-12">
          <p className="font-serif text-xl italic text-[#1b1b1b] leading-relaxed mb-3">
            "Mamá me enseñó que los hogares no huelen a paredes ni a muebles. Huelen a lo que decides encender dentro de ellos."
          </p>
          <cite className="text-[10px] uppercase tracking-widest text-[#7d5d24] not-italic">— Sofía, cofundadora</cite>
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
                titulo: 'Hecho con historia',
                texto: 'Detrás de cada vela hay una conversación entre madre e hija, un experimento fallido que se convirtió en algo mejor, una pequeña victoria celebrada en silencio.',
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

      {/* Las fundadoras */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">Las personas detrás</p>
          <h2 className="font-serif text-4xl italic text-[#1b1b1b]">Carmen y Sofía</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-square bg-[#ece9e4] mb-6 overflow-hidden">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Mahogany_teakwood_scented_candle_%28cropped%29.jpg"
                alt="Carmen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/50 to-transparent" />
              <div className="absolute bottom-5 left-5 text-[#f6f4f1]">
                <p className="font-serif text-2xl italic">Carmen</p>
                <p className="text-[10px] uppercase tracking-widest text-[#dcbcbc]">La madre · Aromas & Alma</p>
              </div>
            </div>
            <p className="text-sm text-[#555] leading-relaxed">
              53 años. Veinte de ellos en un trabajo que nunca fue suyo. Sabe cuándo una fragancia está equilibrada con solo olerla tres segundos. Le gusta la canela, el ámbar y los lunes tranquilos. Dice que emprender a su edad fue lo más valiente y lo más tonto que ha hecho. Y que lo volvería a hacer.
            </p>
          </div>
          <div>
            <div className="relative aspect-square bg-[#ece9e4] mb-6 overflow-hidden">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Scented_candle.jpg"
                alt="Sofía"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b]/50 to-transparent" />
              <div className="absolute bottom-5 left-5 text-[#f6f4f1]">
                <p className="font-serif text-2xl italic">Sofía</p>
                <p className="text-[10px] uppercase tracking-widest text-[#dcbcbc]">La hija · Diseño & Esencia</p>
              </div>
            </div>
            <p className="text-sm text-[#555] leading-relaxed">
              28 años. Diseñadora de día, aprendiz de aromatóloga los fines de semana. Prefiere las notas florales y frescas, aunque reconoce que la vela de canela de su madre es la mejor que han hecho nunca. Le da miedo el fracaso, pero más le daría no haberlo intentado con ella.
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#1b1b1b] text-[#f6f4f1] py-20 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#dcbcbc] mb-4">Lleva un poco de esta historia a tu hogar</p>
        <h2 className="font-serif text-4xl md:text-5xl italic mb-4 max-w-xl mx-auto leading-tight">
          Cada vela guarda una llama que no se apaga
        </h2>
        <p className="text-[#a0a0a0] text-sm mb-10 max-w-sm mx-auto">
          Porque detrás de cada aroma hay dos mujeres que decidieron que nunca es tarde para encender algo nuevo.
        </p>
        <Link
          href="/tienda"
          className="inline-block border border-[#f6f4f1] hover:bg-[#f6f4f1] hover:text-[#1b1b1b] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium px-10 py-4 transition-all duration-300"
        >
          Ver la colección
        </Link>
      </section>

      <SeccionNewsletter />
    </div>
  )
}
