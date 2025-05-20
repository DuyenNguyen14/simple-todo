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
          <TextField name="name" placeholder="Name" :value="values.name" :error="errors.name" />
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            :value="values.email"
            :error="errors.email"
          />
          <TextField
            name="password"
            required
            type="password"
            placeholder="Password"
            :error="errors.password"
            :value="values.password"
          />
        </div>
        <LoadingButton :loading="signingUp" :disabled="signingUp">Sign up</LoadingButton>
      </div>
    </form>

    <span class="text-sm text-slate-700"
      >Already have an account?
      <RouterLink :to="PATH.AUTH.LOGIN" class="link">Log in</RouterLink></span
    >
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/apis/supabase'
import LoadingButton from '@/components/ui/LoadingButton.vue'
import TextField from '@/components/ui/TextField.vue'
import { PATH } from '@/constants/path'
import { useToastStore } from '@/stores/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()
const { addToast } = useToastStore()
const signingUp = ref(false)

const schema = z.object({
  name: z.string({ message: 'Name is required' }),
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
})
type SignupForm = z.infer<typeof schema> // extract Typescript type of schema
const validationSchema = toTypedSchema(schema) // use toTypedSchema to transform Zod's schema to Yup's schema so that vee-validate can understand

const { handleSubmit, errors, values } = useForm<SignupForm>({
  validationSchema,
  validateOnMount: false,
})

const handleSignup = handleSubmit(async (form) => {
  signingUp.value = true

  try {
    const { name, email, password } = form
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })
    if (error) addToast(error.message, 'error')
    else {
      addToast('Sign up successful! Log in to continue.', 'success')
      router.push(PATH.AUTH.LOGIN)
    }
  } catch (error) {
    console.error(error)
  }

  signingUp.value = false
})
</script>
