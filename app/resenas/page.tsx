'use client'

import Link from 'next/link'
import { useIdioma } from '@/lib/idioma-store'

const RESENAS = [
  {
    nombre: 'María José T.',
    ciudad: 'Madrid',
    fecha: 'marzo 2026',
    estrellas: 5,
    producto: 'Lavanda & Bergamota',
    titulo: 'La mejor vela que he comprado nunca',
    texto: 'Llevaba tiempo buscando una vela de lavanda que no oliera a limpiador de baño y por fin la encontré. El aroma es suave, profundo, completamente natural. La enciendo cuando llego del trabajo y en diez minutos el salón huele de maravilla. Ya voy por la tercera y no pienso cambiar. El tiempo de combustión es real, no exagerado — a mí me está durando más de 40 horas. El packaging también es muy bonito para regalar.',
    verificado: true,
    util: 34,
  },
  {
    nombre: 'Lucía F.',
    ciudad: 'Valencia',
    fecha: 'febrero 2026',
    estrellas: 5,
    producto: 'Vainilla & Sándalo',
    titulo: 'Pedí tres y ya he repetido dos veces',
    texto: 'Empecé comprando una para probar. Al día siguiente ya había pedido dos más para regalar. La de vainilla y sándalo es adictiva — cálida, envolvente, sin resultar empalagosa. En casa la ponemos en el comedor cuando hay visitas y todo el mundo pregunta de dónde es. El servicio al cliente también fue perfecto, me escribieron para confirmar el pedido y llegó en dos días.',
    verificado: true,
    util: 28,
  },
  {
    nombre: 'Raquel M.',
    ciudad: 'Barcelona',
    fecha: 'enero 2026',
    estrellas: 5,
    producto: 'Oud & Rosa Negra',
    titulo: 'Una obra de arte olfativa',
    texto: 'Me gasté 38 euros con cierto reparo. Ahora me arrepiento de no haber comprado dos. El oud es profundo pero no pesado, la rosa negra le da un punto floral muy elegante. La enciendo por la tarde cuando leo y convierte cualquier momento en algo especial. La cera es de soja pura, se nota que quema limpio porque no deja casi hollín en el cristal. Vale cada céntimo.',
    verificado: true,
    util: 41,
  },
  {
    nombre: 'Ana Belén G.',
    ciudad: 'Sevilla',
    fecha: 'marzo 2026',
    estrellas: 5,
    producto: 'Canela & Naranja',
    titulo: 'Huele exactamente a Navidad todo el año',
    texto: 'Mi madre siempre tenía velas de canela en casa cuando éramos pequeñas. Ninguna olía como recuerdo que olían las suyas hasta que probé esta. No sé cómo lo han conseguido pero es exactamente ese aroma. La compré en enero pensando que sería demasiado navideña y la sigo usando en marzo porque simplemente hace que el piso huela a hogar. La tengo en la cocina y combina perfecto.',
    verificado: true,
    util: 19,
  },
  {
    nombre: 'Elena P.',
    ciudad: 'Bilbao',
    fecha: 'febrero 2026',
    estrellas: 5,
    producto: 'Rosa & Jazmín',
    titulo: 'La regalé y me pidieron la referencia inmediatamente',
    texto: 'La compré como regalo de cumpleaños para mi amiga que es muy exigente con los aromas. Me escribió esa misma noche para preguntarme la página. El olor es floral pero sofisticado, no recuerda a perfume barato en absoluto. El tarro es bonito y la presentación muy cuidada — no hace falta ni envolver, llega lista para regalar. Ahora la he pedido para mí también.',
    verificado: true,
    util: 22,
  },
  {
    nombre: 'Cristina L.',
    ciudad: 'Zaragoza',
    fecha: 'enero 2026',
    estrellas: 4,
    producto: 'Bruma de Mar',
    titulo: 'Muy buena, aunque al principio me costó apreciarla',
    texto: 'La primera vez que la encendí me pareció demasiado sutil. Le di una segunda oportunidad y ahora entiendo que es exactamente así: discreta, limpia, como brisa que entra por la ventana. No es para quien busca aromas intensos, es para quien quiere que su casa huela a frescura sin que nadie sepa identificar de dónde viene. La tengo en el baño y es perfecta. Le quito una estrella solo porque esperaba algo más potente.',
    verificado: true,
    util: 15,
  },
  {
    nombre: 'Sofía R.',
    ciudad: 'Pamplona',
    fecha: 'diciembre 2024',
    estrellas: 5,
    producto: 'Violeta & Cashmere',
    titulo: 'La más cara pero la que más me ha sorprendido',
    texto: 'Me resistía a gastar 32 euros en una vela. Al final la pedí en las rebajas de diciembre y no me puedo creer que haya tardado tanto. La violeta es delicada, el cashmere le da un fondo suave y cremoso. La tengo en el dormitorio y es lo último que huelo antes de dormir. Dura muchísimo — llevo más de tres semanas encendiéndola a ratos y aguanta perfectamente. Ya he pedido la siguiente.',
    verificado: true,
    util: 38,
  },
  {
    nombre: 'Patricia V.',
    ciudad: 'Málaga',
    fecha: 'febrero 2026',
    estrellas: 5,
    producto: 'Té Verde & Menta',
    titulo: 'Perfecta para la mañana',
    texto: 'La tengo en el escritorio cuando trabajo desde casa. El aroma es fresco, ligero, ayuda a concentrarse sin distraer. Llevo meses sin poder trabajar sin ella. Mi pareja, que nunca había prestado atención a una vela en su vida, me preguntó un día "¿qué es ese olor tan bueno?". Eso lo dice todo. Muy recomendable para quienes busquen algo que no sea dulce ni pesado.',
    verificado: true,
    util: 27,
  },
  {
    nombre: 'Isabel N.',
    ciudad: 'Murcia',
    fecha: 'enero 2026',
    estrellas: 5,
    producto: 'Higo & Musgo',
    titulo: 'Diferente a todo lo que había probado antes',
    texto: 'No sabía qué esperar de una vela de higo y musgo. Compré a ciegas fiándome de las reseñas y acerté. Es un aroma verde, fresco, muy especial — nada convencional. Combina perfectamente con un salón moderno o una habitación con plantas. Me la han preguntado varias personas que han venido a casa. llum & glow tiene un criterio muy bueno para las fragancias, cada combinación tiene sentido y personalidad propia.',
    verificado: true,
    util: 21,
  },
]

function Estrellas({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < n ? 'text-[#7d5d24]' : 'text-[#d0cdc8]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function PaginaResenas() {
  const tr = useIdioma((s) => s.t.resenas)
  const totalResenas = RESENAS.length
  const media = (RESENAS.reduce((a, r) => a + r.estrellas, 0) / totalResenas).toFixed(1)
  const cinco = RESENAS.filter((r) => r.estrellas === 5).length
  const cuatro = RESENAS.filter((r) => r.estrellas === 4).length

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1b1b1b] text-[#f6f4f1] py-20 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#dcbcbc] mb-4">{tr.opinionesVerificadas}</p>
        <h1 className="font-serif text-5xl md:text-6xl italic leading-tight mb-4">
          {tr.loQueDicen}
        </h1>
        <p className="text-[#a0a0a0] text-sm max-w-md mx-auto">
          {tr.subtitulo}
        </p>
      </section>

      {/* Resumen de puntuaciones */}
      <section className="bg-[#ece9e4] py-14 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Nota global */}
          <div className="text-center flex-shrink-0">
            <p className="font-serif text-7xl italic text-[#1b1b1b] leading-none">{media}</p>
            <Estrellas n={5} />
            <p className="text-[10px] uppercase tracking-widest text-[#999] mt-2">
              {tr.sobre} {totalResenas} {tr.resenas}
            </p>
          </div>

          {/* Barras */}
          <div className="flex-1 w-full max-w-sm">
            {[
              { label: tr.estrellas[4], count: cinco, total: totalResenas },
              { label: tr.estrellas[3], count: cuatro, total: totalResenas },
              { label: tr.estrellas[2], count: 0, total: totalResenas },
              { label: tr.estrellas[1], count: 0, total: totalResenas },
              { label: tr.estrellas[0], count: 0, total: totalResenas },
            ].map(({ label, count, total }) => (
              <div key={label} className="flex items-center gap-3 mb-2">
                <p className="text-[10px] uppercase tracking-widest text-[#666] w-24 flex-shrink-0">{label}</p>
                <div className="flex-1 h-1.5 bg-[#d0cdc8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7d5d24] rounded-full"
                    style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#999] w-4 text-right flex-shrink-0">{count}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-5 flex-shrink-0 text-center md:text-left">
            {[
              { valor: '98%', texto: tr.stats[0] },
              { valor: '4.9', texto: tr.stats[1] },
              { valor: '100%', texto: tr.stats[2] },
            ].map(({ valor, texto }) => (
              <div key={texto}>
                <p className="font-serif text-3xl italic text-[#1b1b1b]">{valor}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#999]">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de reseñas */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-0 divide-y divide-[#e0ddd8]">
          {RESENAS.map((r) => (
            <article key={r.nombre} className="py-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Estrellas n={r.estrellas} />
                    {r.verificado && (
                      <span className="text-[9px] uppercase tracking-widest text-[#7d5d24] border border-[#7d5d24] px-2 py-0.5">
                        {tr.compraVerificada}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl italic text-[#1b1b1b]">{r.titulo}</h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] font-medium text-[#1b1b1b] uppercase tracking-widest">{r.nombre}</p>
                  <p className="text-[10px] text-[#999] uppercase tracking-widest">{r.ciudad} · {r.fecha}</p>
                </div>
              </div>

              <p className="text-[10px] uppercase tracking-widest text-[#7d5d24] mb-3">
                {tr.sobreProducto} {r.producto}
              </p>

              <p className="text-sm text-[#555] leading-relaxed mb-4">{r.texto}</p>

              <p className="text-[10px] text-[#bbb] uppercase tracking-widest">
                {r.util} {tr.personasUtil}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ece9e4] py-16 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">{tr.yaEresClienta}</p>
        <h2 className="font-serif text-3xl italic text-[#1b1b1b] mb-4">{tr.cuentanos}</h2>
        <p className="text-sm text-[#666] mb-8 max-w-xs mx-auto">
          {tr.escribenos} <a href="mailto:hola@llumglow.com" className="text-[#1b1b1b] border-b border-[#1b1b1b]">hola@llumglow.com</a> {tr.conTuResena}
        </p>
        <Link
          href="/tienda"
          className="inline-block bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium px-10 py-4 transition-colors"
        >
          {tr.descubrir}
        </Link>
      </section>

    </div>
  )
}
