interface Props {
  height?: number
  variant?: 'dark' | 'light'
}

export default function LogoLlumGlow({ height = 52, variant = 'dark' }: Props) {
  const coral = '#e07040'
  const coralDark = '#c85a28'
  const sub = variant === 'light' ? '#f0c8a8' : '#c07040'

  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* SVG: llama + texto cursivo */}
      <svg
        viewBox="0 0 320 80"
        height={height}
        width={height * 4}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="llum & glow"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="lg-flame-outer" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%"  stopColor="#e07040" />
            <stop offset="60%" stopColor="#f09030" />
            <stop offset="100%" stopColor="#fdd060" />
          </linearGradient>
          <linearGradient id="lg-flame-inner" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%"  stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fff8e0" />
          </linearGradient>
          <linearGradient id="lg-text" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={coralDark} />
            <stop offset="50%"  stopColor={coral} />
            <stop offset="100%" stopColor={coralDark} />
          </linearGradient>
        </defs>

        {/* Llama */}
        <ellipse cx="160" cy="12" rx="10" ry="12" fill="#fdd060" opacity="0.18" />
        <path d="M160,28 C154,18 152,8 160,0 C168,8 166,18 160,28Z" fill="url(#lg-flame-outer)" />
        <path d="M160,26 C155,17 154,9 160,2 C166,9 165,17 160,26Z" fill="url(#lg-flame-inner)" opacity="0.9" />
        <ellipse cx="160" cy="6" rx="2.5" ry="3" fill="white" opacity="0.95" />

        {/* Texto principal con & en Garamond */}
        <text
          x="160" y="72"
          textAnchor="middle"
          fontFamily="'Dancing Script', cursive"
          fontWeight="700"
          fontSize="54"
          fill="url(#lg-text)"
        >
          llum{' '}
          <tspan
            fontFamily="'EB Garamond', Georgia, serif"
            fontStyle="italic"
            fontWeight="400"
            fontSize="46"
            dy="2"
          >&amp;</tspan>
          <tspan dy="-2"> glow</tspan>
        </text>
      </svg>

      {/* Subtítulo como HTML — siempre legible */}
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
        }}
      >
        <span style={{ display: 'inline-block', width: 20, height: 1, background: sub, opacity: 0.7 }} />
        handcrafted candles
        <span style={{ display: 'inline-block', width: 20, height: 1, background: sub, opacity: 0.7 }} />
      </p>
    </div>
  )
}
