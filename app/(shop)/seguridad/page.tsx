'use client'

import { useIdioma } from '@/lib/idioma-store'

export default function PaginaSeguridad() {
  const { idioma } = useIdioma()
  const ca = idioma === 'ca'

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7d5d24] mb-3">
          {ca ? 'Informació legal' : 'Información legal'}
        </p>
        <h1 className="font-['EB_Garamond'] text-4xl italic text-[#1b1b1b]">
          {ca ? 'Seguretat i ús del producte' : 'Seguridad y uso del producto'}
        </h1>
        <p className="text-sm text-[#767676] mt-3">
          {ca
            ? 'Última actualització: abril 2026 · Pendent de revisió legal'
            : 'Última actualización: abril 2026 · Pendiente de revisión legal'}
        </p>
      </div>

      <div className="space-y-10 text-sm text-[#666] leading-relaxed">

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Identificació del producte' : 'Identificación del producto'}
          </h2>
          <ul className="space-y-2">
            {(ca ? [
              'Tipus de producte: espelma aromàtica artesanal',
              'Composició principal: cera de soja, fragàncies i colorants conformes a la normativa UE',
              'Mecha: cotó natural sense metalls pesants',
              'Fabricant: Llum & Glow · info@llumandglow.com',
            ] : [
              'Tipo de producto: vela aromática artesanal',
              'Composición principal: cera de soja, fragancias y colorantes conformes a la normativa UE',
              'Mecha: algodón natural sin metales pesados',
              'Fabricante: Llum & Glow · info@llumandglow.com',
            ]).map((l, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0 mt-2" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Pictogrames de perill (CLP/GHS)' : 'Pictogramas de peligro (CLP/GHS)'}
          </h2>
          <p className="mb-4">
            {ca
              ? 'Les fragàncies utilitzades poden contenir components classificats segons el Reglament CLP. Els pictogrames aplicables són:'
              : 'Las fragancias utilizadas pueden contener componentes clasificados según el Reglamento CLP. Los pictogramas aplicables son:'}
          </p>
          <ul className="space-y-2">
            {(ca ? [
              'GHS07 · Irritant: pot causar irritació cutània o ocular lleu en cas de contacte directe amb la fragància concentrada',
              'GHS08 · Perill per a la salut: algunes fragàncies poden causar reacció al·lèrgica cutània en persones sensibles',
              'GHS09 · Perill per al medi ambient: alguns components de fragàncies poden ser nocius per als organismes aquàtics',
            ] : [
              'GHS07 · Irritante: puede causar irritación cutánea u ocular leve en caso de contacto directo con la fragancia concentrada',
              'GHS08 · Peligro para la salud: algunas fragancias pueden causar reacción alérgica cutánea en personas sensibles',
              'GHS09 · Peligro para el medio ambiente: algunos componentes de fragancias pueden ser nocivos para los organismos acuáticos',
            ]).map((l, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0 mt-2" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Instruccions d\'ús segur' : 'Instrucciones de uso seguro'}
          </h2>
          <ul className="space-y-2">
            {(ca ? [
              'Retalla la mecha a 5 mm abans de cada ús per evitar flames excessives i fum.',
              'No deixis mai una espelma encesa sense vigilància.',
              'Mantén fora de l\'abast de nens i animals domèstics.',
              'Col·loca sobre una superfície plana, estable i resistent a la calor.',
              'Mantén allunyat de materials inflamables, corrents d\'aire i fonts de calor.',
              'No encenguis si queda menys d\'1 cm de cera al fons del recipient.',
              'No moguis l\'espelma mentre estigui encesa o la cera encara estigui líquida.',
              'Apaga l\'espelma si la flama és massa alta o parpelleja repetidament.',
              'Temps màxim de combustió recomanat: 3-4 hores per sessió.',
            ] : [
              'Recorta la mecha a 5 mm antes de cada uso para evitar llamas excesivas y humo.',
              'Nunca dejes una vela encendida sin vigilancia.',
              'Mantén fuera del alcance de niños y animales domésticos.',
              'Coloca sobre una superficie plana, estable y resistente al calor.',
              'Mantén alejado de materiales inflamables, corrientes de aire y fuentes de calor.',
              'No enciendas si queda menos de 1 cm de cera en el fondo del recipiente.',
              'No muevas la vela mientras esté encendida o la cera aún esté líquida.',
              'Apaga la vela si la llama es demasiado alta o parpadea repetidamente.',
              'Tiempo máximo de combustión recomendado: 3-4 horas por sesión.',
            ]).map((l, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0 mt-2" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Primers auxilis' : 'Primeros auxilios'}
          </h2>
          <ul className="space-y-2">
            {(ca ? [
              'Contacte amb la pell: renta amb aigua i sabó. Si apareix irritació persistent, consulta un metge.',
              'Contacte amb els ulls: renta amb abundant aigua durant 15 minuts. Si la irritació persisteix, consulta un especialista.',
              'Ingestió: no indueixis el vòmit. Consulta un metge o truca al Centre d\'Informació Toxicològica (900 713 130).',
              'Inhalació de fum excessiu: ventila la zona i respira aire fresc. Si apareixen símptomes, consulta un metge.',
            ] : [
              'Contacto con la piel: lava con agua y jabón. Si aparece irritación persistente, consulta a un médico.',
              'Contacto con los ojos: lava con abundante agua durante 15 minutos. Si la irritación persiste, consulta a un especialista.',
              'Ingestión: no induzcas el vómito. Consulta a un médico o llama al Instituto Nacional de Toxicología (91 562 04 20).',
              'Inhalación de humo excesivo: ventila la zona y respira aire fresco. Si aparecen síntomas, consulta a un médico.',
            ]).map((l, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0 mt-2" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Emmagatzematge i eliminació' : 'Almacenamiento y eliminación'}
          </h2>
          <ul className="space-y-2">
            {(ca ? [
              'Emmagatzema en lloc fresc i sec, allunyat de la llum solar directa i fonts de calor.',
              'No exposis a temperatures superiors a 30 °C per evitar la deformació de la cera.',
              'Un cop acabada l\'espelma, neteja el recipient amb aigua calenta per reutilitzar-lo.',
              'Elimina les restes de cera i la mecha com a residu sòlid urbà (RSU). No aboquis cera líquida per la pica.',
            ] : [
              'Almacena en lugar fresco y seco, alejado de la luz solar directa y fuentes de calor.',
              'No expongas a temperaturas superiores a 30 °C para evitar la deformación de la cera.',
              'Una vez acabada la vela, limpia el recipiente con agua caliente para reutilizarlo.',
              'Elimina los restos de cera y la mecha como residuo sólido urbano (RSU). No viertas cera líquida por el desagüe.',
            ]).map((l, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0 mt-2" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[#e0ddd8] pt-8">
          <h2 className="text-[11px] uppercase tracking-widest text-[#1b1b1b] font-medium mb-4">
            {ca ? 'Normativa aplicable' : 'Normativa aplicable'}
          </h2>
          <ul className="space-y-2">
            {(ca ? [
              'Reglament (CE) nº 1272/2008 (CLP) sobre classificació, etiquetatge i envasat de substàncies i mescles.',
              'Reglament (CE) nº 1907/2006 (REACH) relatiu al registre, avaluació, autorització i restricció de substàncies químiques.',
              'Norma EN 15494 sobre etiquetes de seguretat per a espelmes.',
              'Directiva 2011/65/UE (RoHS) sobre restricció de substàncies perilloses.',
            ] : [
              'Reglamento (CE) nº 1272/2008 (CLP) sobre clasificación, etiquetado y envasado de sustancias y mezclas.',
              'Reglamento (CE) nº 1907/2006 (REACH) relativo al registro, evaluación, autorización y restricción de sustancias químicas.',
              'Norma EN 15494 sobre etiquetas de seguridad para velas.',
              'Directiva 2011/65/UE (RoHS) sobre restricción de sustancias peligrosas.',
            ]).map((l, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-1 h-1 rounded-full bg-[#dcbcbc] flex-shrink-0 mt-2" />
                {l}
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="mt-14 pt-8 border-t border-[#e0ddd8]">
        <p className="text-sm text-[#666] mb-4">
          {ca
            ? 'Tens alguna pregunta sobre la seguretat dels nostres productes?'
            : '¿Tienes alguna pregunta sobre la seguridad de nuestros productos?'}
        </p>
        <a
          href="mailto:info@llumandglow.com"
          className="text-[11px] uppercase tracking-widest text-[#1b1b1b] border-b border-[#1b1b1b] pb-0.5 hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors"
        >
          info@llumandglow.com
        </a>
      </div>
    </div>
  )
}
