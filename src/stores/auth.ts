import { supabase } from '@/apis/supabase'
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

  const fetchSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      if (data.session) {
        console.log('data.session >> ', data.session)
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
    } catch (error) {
      console.error('GET USER ERROR >> ', error)
    }
  }

  return { isInitialized, isAuthenticated, user, fetchSession }
})
