<template>
  <div
    class="relative p-2 pl-3 rounded-md bg-white shadow-md min-w-[200px] max-w-[300px] flex items-center justify-between gap-2 overflow-hidden"
  >
    <div
      class="absolute top-0 left-0 w-1 h-full opacity-70"
      :class="styleMapping.indicatorColor"
    ></div>
    <div class="flex gap-2 items-start">
      <component :is="styleMapping.icon" class="w-5 h-5 mt-0.5" :class="styleMapping.iconColor" />
      <span class="font-semibold text-neutral-600">{{ toast.message }}</span>
    </div>

    <button class="btn btn-ghost btn-circle btn-xs" @click="removeToast(toast.id)">
      <XMarkIcon class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useToastStore, type Toast } from '@/stores/toast'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const { removeToast } = useToastStore()
const { toast } = defineProps<{ toast: Toast }>()

const toastStyles = {
  success: {
    icon: CheckCircleIcon,
    iconColor: 'text-green-500',
    indicatorColor: 'bg-green-500',
  },
  info: {
    icon: ExclamationCircleIcon,
    iconColor: 'text-blue-500',
    indicatorColor: 'bg-blue-500',
  },
  error: {
    icon: XCircleIcon,
    iconColor: 'text-red-500',
    indicatorColor: 'bg-red-500',
  },
}
const styleMapping = computed(() => toastStyles[toast.type] || toastStyles.info)
</script>
