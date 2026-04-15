'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useIdioma } from '@/lib/idioma-store'
import { supabase } from '@/lib/supabase'

export default function PaginaRegistro() {
  const [modo, setModo] = useState<'login' | 'registro'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [repetir, setRepetir] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState(false)
  const [modoReset, setModoReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetEnviado, setResetEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const { t, idioma } = useIdioma()
  const tr = t.registro
  const router = useRouter()

  const handleReset = async () => {
    if (!resetEmail) return
    setEnviando(true)
    await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setEnviando(false)
    setResetEnviado(true)
  }

  const cambiarModo = (m: 'login' | 'registro') => {
    setModo(m)
    setError(null)
    setExito(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setExito(false)

    if (modo === 'registro' && password !== repetir) {
      setError(tr.errorContrasenas)
      return
    }

    setCargando(true)
    try {
      if (modo === 'registro') {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { nombre } },
        })
        if (err) {
          setError(err.message.includes('already') ? tr.errorEmailUsado : tr.errorGeneral)
        } else {
          setExito(true)
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) {
          setError(tr.errorCredenciales)
        } else {
          router.push('/')
        }
      }
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">

        {/* Cabecera */}
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#7d5d24] mb-3">
            {modo === 'login' ? tr.bienvenida : tr.creaCuenta}
          </p>
          <h1 className="font-serif text-4xl italic text-[#1b1b1b]">
            {modo === 'login' ? tr.accede : tr.unete}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e0ddd8] mb-8">
          <button
            onClick={() => cambiarModo('login')}
            className={`flex-1 pb-3 text-[11px] uppercase tracking-widest font-medium transition-colors ${
              modo === 'login'
                ? 'text-[#1b1b1b] border-b-2 border-[#1b1b1b] -mb-px'
                : 'text-[#999] hover:text-[#1b1b1b]'
            }`}
          >
            {tr.tabEntrar}
          </button>
          <button
            onClick={() => cambiarModo('registro')}
            className={`flex-1 pb-3 text-[11px] uppercase tracking-widest font-medium transition-colors ${
              modo === 'registro'
                ? 'text-[#1b1b1b] border-b-2 border-[#1b1b1b] -mb-px'
                : 'text-[#999] hover:text-[#1b1b1b]'
            }`}
          >
            {tr.tabRegistro}
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {modo === 'registro' && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">
                {tr.nombre}
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder={tr.placeholderNombre}
                required
                className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">
              {tr.correo}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tr.placeholderCorreo}
              required
              className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">
              {tr.contrasena}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
            />
          </div>

          {modo === 'registro' && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">
                {tr.repetirContrasena}
              </label>
              <input
                type="password"
                value={repetir}
                onChange={(e) => setRepetir(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
              />
            </div>
          )}

          {modo === 'login' && !modoReset && (
            <div className="text-right">
              <button type="button" onClick={() => setModoReset(true)}
                className="text-[11px] text-[#999] hover:text-[#1b1b1b] transition-colors uppercase tracking-widest underline underline-offset-4">
                {tr.olvidaste}
              </button>
            </div>
          )}

          {modoReset && (
            <div className="border border-[#e0ddd8] p-4 space-y-4">
              {!resetEnviado ? (
                <>
                  <p className="text-[11px] text-[#999] leading-relaxed">
                    {idioma === 'ca'
                      ? 'Introdueix el teu correu i t\'enviarem un enllaç per restablir la contrasenya.'
                      : 'Introduce tu email y te enviaremos un enlace para restablecer la contraseña.'}
                  </p>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder={tr.placeholderCorreo}
                    className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
                  />
                  <div className="flex gap-3">
                    <button type="button" onClick={handleReset}
                      disabled={enviando || !resetEmail}
                      className="flex-1 bg-[#1b1b1b] hover:bg-[#333] disabled:opacity-40 text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium py-3 transition-colors">
                      {enviando ? '...' : (idioma === 'ca' ? 'Enviar' : 'Enviar')}
                    </button>
                    <button type="button" onClick={() => setModoReset(false)}
                      className="text-[10px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] transition-colors px-3">
                      ✕
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-[11px] text-[#7d5d24] leading-relaxed">
                  {idioma === 'ca'
                    ? 'Revisa el teu correu (i la carpeta de spam).'
                    : 'Revisa tu email (y la carpeta de spam).'}
                </p>
              )}
            </div>
          )}

          {error && (
            <p className="text-xs text-red-600 text-center leading-relaxed">{error}</p>
          )}
          {exito && (
            <p className="text-xs text-[#7d5d24] text-center leading-relaxed">{tr.exitoRegistro}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-[#1b1b1b] hover:bg-[#333] disabled:opacity-50 text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors mt-2"
          >
            {cargando ? tr.cargando : (modo === 'login' ? tr.botonEntrar : tr.botonCrear)}
          </button>

          {modo === 'registro' && (
            <p className="text-[10px] text-[#aaa] text-center leading-relaxed">
              {tr.politica}{' '}
              <span className="underline cursor-pointer hover:text-[#1b1b1b] transition-colors">{tr.politicaLink}</span>
            </p>
          )}
        </form>

        {/* Separador */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-[#e0ddd8]" />
          <span className="text-[10px] uppercase tracking-widest text-[#ccc]">{tr.o}</span>
          <div className="flex-1 h-px bg-[#e0ddd8]" />
        </div>

        {/* Cambio de modo */}
        <p className="text-center text-sm text-[#999]">
          {modo === 'login' ? tr.noTienesCuenta : tr.yaTienesCuenta}{' '}
          <button
            onClick={() => cambiarModo(modo === 'login' ? 'registro' : 'login')}
            className="text-[#1b1b1b] border-b border-[#1b1b1b] hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors"
          >
            {modo === 'login' ? tr.registrate : tr.entraAqui}
          </button>
        </p>

        {/* Volver a tienda */}
        <div className="text-center mt-8">
          <Link
            href="/tienda"
            className="text-[10px] uppercase tracking-widest text-[#ccc] hover:text-[#999] transition-colors"
          >
            {tr.volverTienda}
          </Link>
        </div>

      </div>
    </div>
  )
}
