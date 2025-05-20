<template>
  <div id="toast-container" class="fixed top-4 right-2 z-50">
    <transition-group name="toast" tag="div" class="flex flex-col-reverse gap-2">
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

.toast-leave-active {
  transition: all 0.4s ease-in-out;
  position: absolute;
  width: 100%;
  right: 0;
  top: 0;
}

.toast-move {
  transition: transform 0.4s ease-in-out;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
