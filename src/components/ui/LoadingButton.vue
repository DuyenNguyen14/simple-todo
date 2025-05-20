<template>
  <button class="btn btn-neutral" :class="{ 'btn-disabled': disabled }" v-bind="$attrs">
    <span v-if="loading" class="loading loading-spinner"></span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{ loading?: boolean; disabled?: boolean }>()
</script>
