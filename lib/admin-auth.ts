import { supabase } from './supabase'

export async function verificarAdmin(): Promise<boolean> {
  const { data } = await supabase.auth.getSession()
  if (!data.session) return false
  return data.session.user.user_metadata?.role === 'admin'
}
