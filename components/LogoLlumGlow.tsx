'use client'

import { useIdioma } from '@/lib/idioma-store'

interface Props {
  height?: number
  variant?: 'dark' | 'light'
}

export default function LogoLlumGlow({ height = 52, variant = 'dark' }: Props) {
  const idioma = useIdioma((s) => s.idioma)
  const coral = '#e07040'
  const sub = variant === 'light' ? '#f0c8a8' : '#c07040'

  const flameH = Math.round(height * 0.32)
  const flameW = Math.round(flameH * 0.75)
  const textSize = Math.round(height * 0.62)
  const ampSize = Math.round(height * 0.52)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {/* Llama — solo SVG, sin texto */}
      <svg
        viewBox="150 -1 20 30"
        width={flameW}
        height={flameH}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        <ellipse cx="160" cy="12" rx="10" ry="12" fill="#fdd060" opacity="0.18" />
        <path d="M160,28 C154,18 152,8 160,0 C168,8 166,18 160,28Z" fill="#f09030" />
        <path d="M160,26 C155,17 154,9 160,2 C166,9 165,17 160,26Z" fill="#fdd060" opacity="0.85" />
        <ellipse cx="160" cy="6" rx="2.5" ry="3" fill="white" opacity="0.95" />
      </svg>

      {/* Texto principal como HTML — las fuentes web aquí sí aplican */}
      <p
        aria-label="llum & glow"
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: textSize,
          fontWeight: 700,
          color: coral,
          lineHeight: 1,
          margin: 0,
          padding: 0,
          whiteSpace: 'nowrap',
        }}
      >
        llum{' '}
        <em
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: ampSize,
          }}
        >&amp;</em>
        {' '}glow
      </p>

      {/* Subtítulo */}
      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: sub,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          margin: 0,
        }}
      >
        <span style={{ display: 'inline-block', width: 20, height: 1, background: sub, opacity: 0.7 }} />
        {idioma === 'ca' ? 'espelmes artesanals' : 'velas artesanales'}
        <span style={{ display: 'inline-block', width: 20, height: 1, background: sub, opacity: 0.7 }} />
      </p>
    </div>
  )
}
