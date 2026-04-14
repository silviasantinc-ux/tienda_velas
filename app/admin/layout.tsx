import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Solo visible en desktop */}
      <div className="hidden md:block min-h-screen bg-[#f6f4f1]">
        {children}
      </div>
      <div className="md:hidden min-h-screen flex items-center justify-center bg-[#f6f4f1] px-6">
        <p className="text-center text-sm text-[#999] font-['EB_Garamond'] italic text-xl">
          El panel de administración solo está disponible en escritorio.
        </p>
      </div>
    </>
  )
}
