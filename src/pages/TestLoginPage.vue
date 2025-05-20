<template>
  <button class="btn btn-primary" @click="handleLogin">login</button>
</template>

<script setup lang="ts">
import useTestAuthStore from '@/stores/test-auth'

const store = useTestAuthStore()

const handleLogin = async () => {
  console.log('handleLogin')
  await store.login()
}
</script>
