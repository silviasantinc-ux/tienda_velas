'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { verificarAdmin } from '@/lib/admin-auth'
import { ArrowLeft, UserPlus } from 'lucide-react'

type Usuario = {
  id: string
  email: string
  created_at: string
  user_metadata: { nombre?: string; role?: string }
}

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [cargando, setCargando] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [rol, setRol] = useState('cliente')
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    verificarAdmin().then((esAdmin) => {
      if (!esAdmin) router.replace('/admin/login')
      else cargarUsuarios()
    })
  }, [])

  const cargarUsuarios = async () => {
    setCargando(true)
    const res = await fetch('/api/admin/usuarios')
    const data = await res.json()
    setUsuarios(Array.isArray(data) ? data.sort((a: Usuario, b: Usuario) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ) : [])
    setCargando(false)
  }

  const handleAltaUsuario = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje(null)
    setGuardando(true)
    try {
      const res = await fetch('/api/admin/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nombre, rol }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMensaje({ tipo: 'ok', texto: `Usuario ${email} creado correctamente.` })
      setEmail('')
      setPassword('')
      setNombre('')
      setRol('cliente')
      setMostrarForm(false)
      cargarUsuarios()
    } catch (err: unknown) {
      setMensaje({ tipo: 'error', texto: err instanceof Error ? err.message : 'Error al crear usuario' })
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f4f1]">
      <header className="bg-white border-b border-[#e0ddd8] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-[#999] hover:text-[#1b1b1b] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-[11px] uppercase tracking-widest font-medium text-[#1b1b1b]">
            Usuarios registrados
          </span>
        </div>
        <button
          onClick={() => { setMostrarForm(!mostrarForm); setMensaje(null) }}
          className="flex items-center gap-2 bg-[#1b1b1b] hover:bg-[#333] text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium px-5 py-3 transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Nuevo usuario
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-10 space-y-8">

        {/* Formulario alta */}
        {mostrarForm && (
          <div className="bg-white border border-[#e0ddd8] p-8">
            <h2 className="font-['EB_Garamond'] text-2xl italic text-[#1b1b1b] mb-6">Dar de alta usuario</h2>
            <form onSubmit={handleAltaUsuario} className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">Nombre</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                  className={inputCls} placeholder="Nombre completo" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">Email <span className="text-[#7d5d24]">*</span></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  required className={inputCls} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">Contraseña <span className="text-[#7d5d24]">*</span></label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  required minLength={6} className={inputCls} placeholder="Mínimo 6 caracteres" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#999] mb-2">Rol <span className="text-[#7d5d24]">*</span></label>
                <select value={rol} onChange={(e) => setRol(e.target.value)} className={inputCls}>
                  <option value="cliente">Cliente</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="col-span-3 flex items-center gap-4 pt-2">
                <button type="submit" disabled={guardando}
                  className="bg-[#1b1b1b] hover:bg-[#333] disabled:opacity-50 text-[#f6f4f1] text-[10px] uppercase tracking-widest font-medium px-6 py-3 transition-colors">
                  {guardando ? 'Creando...' : 'Crear usuario'}
                </button>
                <button type="button" onClick={() => setMostrarForm(false)}
                  className="text-[10px] uppercase tracking-widest text-[#999] hover:text-[#1b1b1b] transition-colors">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {mensaje && (
          <p className={`text-sm px-4 py-3 border ${mensaje.tipo === 'ok' ? 'text-[#7d5d24] border-[#dcbcbc] bg-[#fdf8f3]' : 'text-red-600 border-red-200 bg-red-50'}`}>
            {mensaje.texto}
          </p>
        )}

        {/* Lista */}
        <div className="bg-white border border-[#e0ddd8]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e0ddd8]">
                <th className="text-left text-[10px] uppercase tracking-widest text-[#999] px-6 py-4 font-medium">Nombre</th>
                <th className="text-left text-[10px] uppercase tracking-widest text-[#999] px-4 py-4 font-medium">Email</th>
                <th className="text-left text-[10px] uppercase tracking-widest text-[#999] px-4 py-4 font-medium">Rol</th>
                <th className="text-left text-[10px] uppercase tracking-widest text-[#999] px-4 py-4 font-medium">Registro</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={3} className="text-center py-12 text-sm text-[#999]">Cargando...</td></tr>
              ) : usuarios.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-12 text-sm text-[#999]">No hay usuarios aún.</td></tr>
              ) : usuarios.map((u) => (
                <tr key={u.id} className="border-b border-[#f0ede8] hover:bg-[#faf9f7] transition-colors">
                  <td className="px-6 py-4 text-sm text-[#1b1b1b]">{u.user_metadata?.nombre ?? '—'}</td>
                  <td className="px-4 py-4 text-sm text-[#666]">{u.email}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 ${
                      u.user_metadata?.role === 'admin'
                        ? 'bg-[#1b1b1b] text-[#f6f4f1]'
                        : 'bg-[#f0ede8] text-[#666]'
                    }`}>
                      {u.user_metadata?.role === 'admin' ? 'Admin' : 'Cliente'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#999]">
                    {new Date(u.created_at).toLocaleDateString('es-ES')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  )
}

const inputCls = 'w-full border border-[#e0ddd8] bg-white px-4 py-3 text-sm text-[#1b1b1b] placeholder-[#ccc] focus:outline-none focus:border-[#1b1b1b] transition-colors'
