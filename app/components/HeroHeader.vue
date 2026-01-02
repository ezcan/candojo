<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  theme?: string
}>()
</script>

<template>
  <div class="text-center space-y-2 mb-8 sm:mb-12 animate-pop px-4 pt-8">
    <h1 class="text-3xl sm:text-5xl font-black text-pawa-brown leading-tight">{{ title }}</h1>
    <p class="text-pawa-brown/30 font-bold uppercase tracking-widest text-xs sm:text-sm">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.animate-pop {
  animation: pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
