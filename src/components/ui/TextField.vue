<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      class="text-sm font-semibold"
      :class="{
        'after:content-[\'*\']': required,
        'text-red-500 after:text-red-500': error,
        'text-slate-600 after:text-slate-600': !error,
      }"
      >{{ label }}</label
    >
    <input
      :type="type"
      :name="name"
      :id="id"
      class="input"
      :class="{ 'input-error': error }"
      :placeholder="placeholder"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
    />
    <span
      v-if="error"
      class="text-xs"
      :class="{ 'text-red-500': error, 'text-slate-400': !error }"
      >{{ error }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'

type TextFieldProps = {
  name: string
  label?: string
  type?: HTMLInputElement['type']
  id?: string
  value?: string
  error?: string
  required?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<TextFieldProps>(), {
  type: 'text',
})
const name = toRef(props, 'name')
const {
  value: inputValue,
  handleChange,
  handleBlur,
} = useField(name, undefined, { initialValue: props.value })
</script>
