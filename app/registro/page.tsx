'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PaginaRegistro() {
  const [modo, setModo] = useState<'login' | 'registro'>('login')

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">

        {/* Cabecera */}
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#7d5d24] mb-3">
            {modo === 'login' ? 'Bienvenida de nuevo' : 'Crea tu cuenta'}
          </p>
          <h1 className="font-serif text-4xl italic text-[#1b1b1b]">
            {modo === 'login' ? 'Accede a tu cuenta' : 'Únete a llum & glow'}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e0ddd8] mb-8">
          <button
            onClick={() => setModo('login')}
            className={`flex-1 pb-3 text-[11px] uppercase tracking-widest font-medium transition-colors ${
              modo === 'login'
                ? 'text-[#1b1b1b] border-b-2 border-[#1b1b1b] -mb-px'
                : 'text-[#999] hover:text-[#1b1b1b]'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setModo('registro')}
            className={`flex-1 pb-3 text-[11px] uppercase tracking-widest font-medium transition-colors ${
              modo === 'registro'
                ? 'text-[#1b1b1b] border-b-2 border-[#1b1b1b] -mb-px'
                : 'text-[#999] hover:text-[#1b1b1b]'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">

          {modo === 'registro' && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="hola@ejemplo.com"
              className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
            />
          </div>

          {modo === 'registro' && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">
                Repetir contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors"
              />
            </div>
          )}

          {modo === 'login' && (
            <div className="text-right">
              <button type="button" className="text-[11px] text-[#999] hover:text-[#1b1b1b] transition-colors uppercase tracking-widest">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[11px] uppercase tracking-widest font-medium py-4 transition-colors mt-2"
          >
            {modo === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>

          {modo === 'registro' && (
            <p className="text-[10px] text-[#aaa] text-center leading-relaxed">
              Al registrarte aceptas nuestra{' '}
              <span className="underline cursor-pointer hover:text-[#1b1b1b] transition-colors">política de privacidad</span>
            </p>
          )}
        </form>

        {/* Separador */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-[#e0ddd8]" />
          <span className="text-[10px] uppercase tracking-widest text-[#ccc]">o</span>
          <div className="flex-1 h-px bg-[#e0ddd8]" />
        </div>

        {/* Cambio de modo */}
        <p className="text-center text-sm text-[#999]">
          {modo === 'login' ? '¿Aún no tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}
            className="text-[#1b1b1b] border-b border-[#1b1b1b] hover:text-[#7d5d24] hover:border-[#7d5d24] transition-colors"
          >
            {modo === 'login' ? 'Regístrate' : 'Entra aquí'}
          </button>
        </p>

        {/* Volver a tienda */}
        <div className="text-center mt-8">
          <Link
            href="/tienda"
            className="text-[10px] uppercase tracking-widest text-[#ccc] hover:text-[#999] transition-colors"
          >
            ← volver a la tienda
          </Link>
        </div>

      </div>
    </div>
  )
}
