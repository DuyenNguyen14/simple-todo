<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-1">
      <h2 class="text-2xl font-semibold text-slate-600">Sign up</h2>
      <span class="text-sm text-slate-400">Create an account and start using My App</span>
    </div>

    <!-- signup form -->
    <form @submit.prevent="handleSignup">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <input
            type="text"
            class="input"
            placeholder="Name"
            id="name"
            name="name"
            v-model="name"
          />
          <input
            type="email"
            class="input"
            placeholder="Email"
            id="email"
            name="email"
            v-model="email"
          />
          <input
            type="password"
            class="input"
            placeholder="Password"
            id="password"
            name="password"
            v-model="password"
          />
        </div>
        <button type="submit" class="btn btn-neutral">Sign up</button>
      </div>
    </form>

    <span class="text-sm text-slate-700"
      >Already have an account? <RouterLink :to="PATH.LOGIN" class="link">Log in</RouterLink></span
    >
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/apis/supabase'
import { PATH } from '@/constants/path'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')

const handleSignup = async () => {
  // console.log('signup', { name: name.value, email: email.value, password: password.value })
  try {
    const {} = await supabase.auth.signUp({
      email: '',
      password: '',
      options: {
        data: {
          name: '',
        },
      },
    })
  } catch (error) {
    console.error(error)
  }
}
</script>
