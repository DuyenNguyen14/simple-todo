<template>
  <div class="bg-amber-50 h-screen w-screen flex justify-center py-20">
    <div class="flex flex-col items-center gap-16 my-10">
      <div class="flex gap-2 items-center">
        <CursorArrowRippleIcon class="h-8 w-8" />
        <h1 class="text-2xl font-semibold text-slate-700">My App</h1>
      </div>

      <div class="w-[400px] rounded-[20px] bg-neutral-100 px-11 py-12 shadow-m">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CursorArrowRippleIcon } from '@heroicons/vue/24/outline'
import { RouterView } from 'vue-router'
</script>
