import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { nombre, email, direccion, lineas, total, idioma } = await req.json()

  if (!nombre || !email || !direccion || !lineas?.length) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  const esCA = idioma === 'ca'
  const asunto = esCA ? 'Nova comanda — llum & glow' : 'Nuevo pedido — llum & glow'

  const htmlLineas = lineas
    .map((l: string) => `<tr><td style="padding:4px 0;font-size:14px;color:#333;">${l}</td></tr>`)
    .join('')

  const html = `
    <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1b1b1b;">
      <div style="background:#f5e6c8;padding:24px 32px;border-bottom:2px solid #e8d4a0;">
        <h1 style="margin:0;font-size:22px;font-style:italic;color:#7d5d24;">llum &amp; glow</h1>
        <p style="margin:4px 0 0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#a07030;">
          ${esCA ? 'Nova comanda' : 'Nuevo pedido'}
        </p>
      </div>
      <div style="padding:28px 32px;background:#fff;">
        <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:2px;color:#767676;margin:0 0 8px;">
          ${esCA ? "Dades d'enviament" : 'Datos de envío'}
        </h2>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
          ${nombre}<br/>${email}<br/>${direccion}
        </p>
        <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:2px;color:#767676;margin:0 0 8px;">
          ${esCA ? 'Articles' : 'Artículos'}
        </h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${htmlLineas}
        </table>
        <div style="border-top:1px solid #e0ddd8;padding-top:16px;display:flex;justify-content:space-between;">
          <span style="font-size:13px;text-transform:uppercase;letter-spacing:2px;color:#767676;">
            ${esCA ? 'Total estimat' : 'Total estimado'}
          </span>
          <strong style="font-size:16px;">${total} €</strong>
        </div>
        <p style="margin:16px 0 0;font-size:12px;color:#999;">
          ${esCA ? "L'enviament es calcularà en confirmar la comanda." : 'El envío se calculará al confirmar el pedido.'}
        </p>
      </div>
      <div style="padding:16px 32px;background:#f6f4f1;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">
        llum &amp; glow · info@llumandglow.com
      </div>
    </div>
  `

  const { error } = await resend.emails.send({
    from: 'llum & glow <pedidos@llumandglow.com>',
    to: 'info@llumandglow.com',
    subject: asunto,
    html,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
