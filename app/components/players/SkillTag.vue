<script setup lang="ts">
const props = defineProps<{
  label: string
  type: 'blue' | 'red' | 'green' | 'hybrid'
}>()

const colorClass = computed(() => {
  const map = {
    blue: 'bg-[#3B82F6]',
    red: 'bg-[#EF4444]',
    green: 'bg-[#10B981]',
    hybrid: 'bg-[#A855F7]'
  }
  return map[props.type]
})
</script>

<template>
  <span 
    :class="[colorClass, 'px-2 py-0.5 rounded-md text-[10px] font-extrabold text-white shadow-sm whitespace-nowrap']"
  >
    {{ label }}
  </span>
</template>
