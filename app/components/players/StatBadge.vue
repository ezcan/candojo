<script setup lang="ts">
import { getStatGrade } from '~/utils/player'

const props = defineProps<{
  value: any
  size?: 'sm' | 'md'
}>()

const grade = computed(() => getStatGrade(props.value))

const sizeClasses = computed(() => {
  if (props.size === 'sm') return 'w-5 h-5 text-[10px]'
  return 'w-6 h-6 text-[12px]'
})
</script>

<template>
  <div 
    :class="[sizeClasses, 'rounded shadow-sm flex items-center justify-center font-black transition-transform group-hover:scale-110']"
    :style="{ color: grade.color }"
  >
    {{ grade.label }}
  </div>
</template>
