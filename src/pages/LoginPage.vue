<script setup lang="ts">
import { PATH } from '@/constants/path'
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-1">
      <h1 class="text-[28px] font-semibold text-slate-700">Log in</h1>
      <p class="text-sm font-medium text-slate-400">Sign in if you already have an account</p>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <input type="email" class="input" placeholder="Email" />
        <input type="password" class="input" placeholder="Password" />
      </div>
      <button class="btn btn-neutral w-full">Sign in</button>
    </div>

    <div class="flex flex-col gap-1">
      <RouterLink to="#" class="link text-sm">Forgot your password?</RouterLink>
      <p class="text-sm">
        Don't have an account?
        <RouterLink :to="PATH.SIGNUP" class="link">Sign up for free</RouterLink>
      </p>
    </div>
  </div>
</template>
