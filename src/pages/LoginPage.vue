<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-1">
      <h1 class="text-[28px] font-semibold text-slate-700">Log in</h1>
      <p class="text-sm font-medium text-slate-400">Sign in if you already have an account</p>
    </div>

    <form @submit.prevent="handleLogin">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <TextField
            name="email"
            placeholder="Email"
            type="email"
            :value="values.email"
            :error="errors.email"
          />
          <TextField
            name="password"
            placeholder="Password"
            type="password"
            :value="values.password"
            :error="errors.password"
          />
        </div>
        <LoadingButton :loading="signingIn" :disabled="signingIn">Log in</LoadingButton>
      </div>
    </form>

    <div class="flex flex-col gap-1">
      <RouterLink to="#" class="link text-sm">Forgot your password?</RouterLink>
      <p class="text-sm">
        Don't have an account?
        <RouterLink :to="PATH.AUTH.SIGNUP" class="link">Sign up for free</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingButton from '@/components/ui/LoadingButton.vue'
import TextField from '@/components/ui/TextField.vue'
import { PATH } from '@/constants/path'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()
const { addToast } = useToastStore()
const { login } = useAuthStore()

const signingIn = ref(false)

const schema = z.object({
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ message: 'Password is required' }),
})
export type LoginForm = z.infer<typeof schema>
const validationSchema = toTypedSchema(schema)
const { handleSubmit, values, errors } = useForm<LoginForm>({ validationSchema })

const handleLogin = handleSubmit(async () => {
  signingIn.value = true

  const res = await login({
    email: values.email,
    password: values.password,
  })
  if (res?.error) addToast(res.error.message, 'error')
  else router.push(PATH.HOME)

  signingIn.value = false
})
</script>
