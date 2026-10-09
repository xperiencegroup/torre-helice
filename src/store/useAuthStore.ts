import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import { track, TRACK } from '../config/trackIds'
import { setAnalyticsUser } from '../lib/analytics'

type AuthState = {
  session: Session | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  initAuthListener: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      set({ loading: false, error: error.message })
      track(TRACK.auth.error)
      return false
    }
    set({ session: data.session, isAuthenticated: true, loading: false })

    const userId = data.session?.user.id
    if (userId) {
      setAnalyticsUser(userId, data.session?.user.email ?? null)
      track(TRACK.auth.success, { user_id: userId })
    }

    return true
  },

  logout: async () => {
    track(TRACK.auth.logout)
    setAnalyticsUser(null, null)
    await supabase.auth.signOut()
    set({ session: null, isAuthenticated: false })
  },

  initAuthListener: () => {
    supabase.auth.getSession().then(({ data }) => {
      set({ session: data.session, isAuthenticated: !!data.session })
      if (data.session?.user.id) {
        setAnalyticsUser(data.session.user.id, data.session.user.email ?? null)
      }
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, isAuthenticated: !!session })
      if (session?.user.id) {
        setAnalyticsUser(session.user.id, session.user.email ?? null)
      }
    })
  },
}))
