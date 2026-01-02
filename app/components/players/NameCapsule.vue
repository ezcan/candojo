<script setup lang="ts">
import { getPosColor } from '~/utils/player'

const props = defineProps<{
  player: any
  size?: 'sm' | 'md'
}>()

const color = computed(() => getPosColor(props.player))

const sizeClasses = computed(() => {
  if (props.size === 'sm') return 'px-3 py-1 text-[11px] shadow-blockSm'
  return 'px-5 py-2 text-sm shadow-blockSm'
})
</script>

<template>
  <div 
    :class="[
      sizeClasses, 
      'relative flex-shrink-0 rounded-xl font-black transition-all'
    ]"
    :style="{ backgroundColor: color, color: 'white' }"
  >
    <!-- Inset dashed border -->
    <div 
      class="absolute inset-[2px] rounded-[10px] border border-dashed border-white/50 pointer-events-none"
    ></div>
    
    <span class="relative z-10">{{ player.name }}</span>
  </div>
</template>

<style scoped>
.shadow-blockSm {
  box-shadow: 0 4px 0 rgba(0,0,0,0.1);
}
</style>
