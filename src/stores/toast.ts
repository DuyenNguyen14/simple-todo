import { getUnixTime } from 'date-fns'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// ----------------------

export type ToastType = 'success' | 'info' | 'error'
export type Toast = {
  id: number
  type: ToastType
  message: string
}
// ----------------------

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  function addToast(message: string, type?: ToastType) {
    const id = getUnixTime(new Date())
    toasts.value.push({ id, message, type: type || 'info' })

    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return { toasts, addToast, removeToast }
})
