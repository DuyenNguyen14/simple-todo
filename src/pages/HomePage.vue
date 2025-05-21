<template>
  <div class="bg-slate-100 h-screen w-screen">
    <button class="btn btn-neutral" @click="handleLogout">logout</button>
  </div>
</template>

<script setup lang="ts">
import { PATH } from '@/constants/path'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { addToast } = useToastStore()
const router = useRouter()

const handleLogout = async () => {
  const res = await authStore.logout()
  if (res?.error) addToast(res.error.message, 'error')
  else router.push(PATH.AUTH.LOGIN)
}
</script>
