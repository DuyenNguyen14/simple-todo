import { defineStore } from 'pinia'
import { ref } from 'vue'

export type User = {
  id: string
  name: string
  email: string
}

const useTestAuthStore = defineStore('test-auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)

  const login = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    isAuthenticated.value = true
    user.value = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    }
  }

  return { isAuthenticated, user, login }
})

export default useTestAuthStore
