<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  colorClass?: string
  to?: string
  theme: string // 'blue', 'red', 'yellow', 'green', 'cream'
  center?: boolean
  interactive?: boolean
}>(), {
  center: false,
  interactive: true
})

const themeShadows: Record<string, string> = {
  blue: '#2B66D6',
  red: '#CC3D3D',
  green: '#388038',
  yellow: '#CC9900',
  cream: 'rgba(0,0,0,0.22)'
}
</script>

<template>
  <NuxtLink
    v-if="to"
    v-bind="$attrs"
    :to="to"
    class="pawa-card group relative h-full flex flex-col p-[3px] transition-all duration-300 cursor-pointer"
    :class="[
      interactive ? `hover:border-pawa-${theme}Dark hover:-translate-y-2 interactive-tile` : `border-pawa-${theme}`,
      colorClass
    ]"
    :style="interactive ? { '--hover-shadow': themeShadows[theme] } : {}"
  >
    <div 
      class="pawa-inner transition-all duration-300" 
      :class="[
        `bg-pawa-${theme}Inner`,
        center ? 'justify-center items-center text-center' : '',
        interactive ? `hover:bg-pawa-${theme} hover:text-white inner-interaction` : ''
      ]"
    >
      <slot />
    </div>
  </NuxtLink>

  <div
    v-else
    v-bind="$attrs"
    class="pawa-card group relative h-full flex flex-col p-[3px] transition-all duration-300 cursor-default"
    :class="[
      interactive ? `hover:border-pawa-${theme}Dark hover:-translate-y-2 interactive-tile` : `border-pawa-${theme}`,
      colorClass
    ]"
    :style="interactive ? { '--hover-shadow': themeShadows[theme] } : {}"
  >
    <div 
      class="pawa-inner transition-all duration-300" 
      :class="[
        `bg-pawa-${theme}Inner`,
        center ? 'justify-center items-center text-center' : '',
        interactive ? `hover:bg-pawa-${theme} hover:text-white inner-interaction` : ''
      ]"
    >
      <slot />
    </div>
  </div>
</template>




<style scoped>
.interactive-tile:hover {
  box-shadow: 0 12px 0 var(--hover-shadow), inset 0 1px 0 rgba(255,255,255,.55) !important;
}

.inner-interaction:hover::after {
  border-color: rgba(255, 255, 255, 0.8) !important;
}
</style>