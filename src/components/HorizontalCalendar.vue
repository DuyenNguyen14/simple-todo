<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { add, eachDayOfInterval, endOfMonth, startOfMonth, sub, format, isSameDay } from 'date-fns'
import { computed, onMounted, ref } from 'vue'

const currentDate = ref(new Date())
const selectedDate = ref(new Date())

const isDateSelected = computed(() => (date: Date) => isSameDay(date, selectedDate.value))

const daysInMonth = computed(() =>
  eachDayOfInterval({
    start: startOfMonth(currentDate.value),
    end: endOfMonth(currentDate.value),
  }),
)

const handleMonthChange = (dir: 'prev' | 'next') => {
  if (dir === 'prev') {
    currentDate.value = sub(currentDate.value, { months: 1 })
  } else {
    currentDate.value = add(currentDate.value, { months: 1 })
  }
}

const handleDateSelect = (date: Date) => {
  selectedDate.value = date
}

onMounted(() => {
  const selectedItem = document.querySelector('.calendar-item.active')
  if (selectedItem) {
    selectedItem.scrollIntoView({ behavior: 'instant' })
  }
})
</script>

<template>
  <div class="w-full" role="calendar" aria-label="Calendar">
    <!-- month toggler -->
    <div class="flex w-full justify-between">
      <button
        class="btn btn-ghost btn-circle"
        aria-label="Previous month"
        @click="handleMonthChange('prev')"
      >
        <ChevronLeftIcon class="h-5 w-5" />
      </button>
      <h3 class="text-lg font-semibold text-stone-600">
        {{ format(currentDate, 'MMMM') }} {{ format(currentDate, 'yyyy') }}
      </h3>
      <button
        class="btn btn-ghost btn-circle"
        aria-label="Next month"
        @click="handleMonthChange('next')"
      >
        <ChevronRightIcon class="h-5 w-5" />
      </button>
    </div>

    <div class="mt-2 pb-1">
      <div class="flex gap-3 relative overflow-x-auto">
        <!-- date item -->
        <div
          class="flex flex-col items-center gap-2 border border-stone-300 rounded-lg p-2 min-w-[60px] cursor-pointer text-stone-500 transition-all duration-200 hover:bg-stone-400/20"
          :class="{ 'text-stone-800 calendar-item active': isDateSelected(day) }"
          v-for="day in daysInMonth"
          :key="day.toISOString()"
          @click="handleDateSelect(day)"
        >
          <p class="text-xs font-semibold">
            {{ format(day, 'EEE').toUpperCase() }}
          </p>
          <p class="text-lg/normal font-semibold">{{ format(day, 'd') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-overlay {
  position: relative;
}
.calendar-overlay::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: red;
  content: '';
}
.calendar-overlay::after {
  position: absolute;
  background: yellow;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.calendar-item.active {
  background-color: #e6d9cb;
}
</style>
