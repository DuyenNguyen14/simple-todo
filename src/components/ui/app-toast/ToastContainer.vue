<template>
  <div id="toast-container" class="fixed top-4 right-2 z-50">
    <transition-group name="toast" tag="div" class="flex flex-col gap-2">
      <AppToast v-for="toast in toasts" :key="toast.id" :toast="toast" />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import AppToast from './AppToast.vue'
import { storeToRefs } from 'pinia'

const store = useToastStore()
const { toasts } = storeToRefs(store)
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
}
</style>
