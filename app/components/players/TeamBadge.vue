<script setup lang="ts">
import { getTeamStyle } from '~/utils/player'

const props = defineProps<{
  team: string
  no: string | number
  size?: 'sm' | 'md'
}>()

const teamStyle = computed(() => getTeamStyle(props.team))

const sizeClasses = computed(() => {
  if (props.size === 'sm') return 'w-6 h-6'
  return 'w-10 h-10'
})

const jerseyStyles = computed(() => ({
  '--team-bg': teamStyle.value.backgroundColor,
  '--team-text': '#FFFFFF'
}))

const shortTeamName = computed(() => props.team.substring(0, 2))
</script>

<template>
  <div 
    class="flex-shrink-0 flex flex-col items-center justify-center relative" 
    :class="sizeClasses"
    :style="jerseyStyles"
  >
    <div class="relative w-full h-full pawa-jersey-wrapper">
      <!-- Main Jersey Body -->
      <div class="absolute inset-0 pawa-jersey-body">
         <!-- Inner content: Label & No -->
         <div class="flex flex-col items-center justify-center h-full pt-1">
            <span 
              v-if="size !== 'sm'"
              class="text-[7px] font-black leading-none mb-0.5 opacity-80 uppercase"
              style="color: var(--team-text)"
            >
              {{ shortTeamName }}
            </span>
            <span 
              class="font-black leading-none"
              :class="size === 'sm' ? 'text-[9px]' : 'text-base'"
              style="color: var(--team-text)"
            >
              {{ no }}
            </span>
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pawa-jersey-wrapper {
  filter: drop-shadow(0 2px 0 rgba(0,0,0,0.2));
}

.pawa-jersey-body {
  background-color: var(--team-bg);
  border-radius: 4px;
}

/* Add Sleeves using pseudo-elements */
.pawa-jersey-body::before,
.pawa-jersey-body::after {
  content: '';
  position: absolute;
  top: 10%;
  width: 32%;
  height: 48%;
  background-color: var(--team-bg);
  z-index: -1;
}

.pawa-jersey-body::before {
  right: 90%;
  border-radius: 2px 0 0 2px;
  transform: skewY(-15deg);
}

.pawa-jersey-body::after {
  left: 90%;
  border-radius: 0 2px 2px 0;
  transform: skewY(15deg);
}
</style>
