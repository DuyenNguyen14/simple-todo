import { supabase } from '@/apis/supabase'
import type { LoginForm } from '@/pages/LoginPage.vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AuthUser = {
  id: string
  email: string
  name: string
  accessToken: string
}

export const useAuthStore = defineStore('auth', () => {
  const isInitialized = ref(true)
  const isAuthenticated = ref(false)
  const user = ref<AuthUser | null>(null)

  const login = async (loginForm: LoginForm) => {
    const { data, error } = await supabase.auth.signInWithPassword(loginForm)
    if (error) return { error }
    if (data) {
      isAuthenticated.value = true
      isInitialized.value = false
      const { id, email = '', user_metadata } = data.user
      user.value = {
        id,
        email,
        name: user_metadata.name,
        accessToken: data.session.access_token,
      }
    }
  }

  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error || !data.session) {
      isAuthenticated.value = false
      isInitialized.value = false
      user.value = null
      return { error }
    }

    isAuthenticated.value = true
    isInitialized.value = false
    const { id, email = '', user_metadata } = data.session.user
    user.value = {
      id,
      email,
      name: user_metadata.name,
      accessToken: data.session.access_token,
    }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) return { error }

    isAuthenticated.value = false
    user.value = null
  }

  return { isInitialized, isAuthenticated, user, login, fetchSession, logout }
})
