<template>
  <!-- <div class="bg-amber-50 h-screen w-screen">
    <div class="container mx-auto pt-[56px] px-[22px] pb-[26px] h-full">
      <div class="flex flex-col justify-between h-full">
        <div class="flex flex-col">
          <h1 class="text-4xl font-bold">Today</h1>
          <HorizontalCalendar />
          <div>tasks list</div>
        </div>
        <div>input</div>
      </div>
    </div>
  </div> -->
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
