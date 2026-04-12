import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Idioma } from './i18n'
import traducciones from './i18n'

type IdiomaStore = {
  idioma: Idioma
  setIdioma: (i: Idioma) => void
  t: typeof traducciones['es']
}

export const useIdioma = create<IdiomaStore>()(
  persist(
    (set, get) => ({
      idioma: 'es',
      t: traducciones['es'],
      setIdioma: (idioma) => set({ idioma, t: traducciones[idioma] }),
    }),
    { name: 'llum-idioma' }
  )
)
