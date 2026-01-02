<script setup lang="ts">
useHead({
  title: '小工具 - CANDOJO',
  meta: [
    { name: 'description', content: 'CANDOJO 的實用小工具集，包含抽籤工具、名稱生成等功能。' }
  ]
})

const tools = [
  {
    title: '抽籤工具',
    description: '快速決定誰是那個幸運兒',
    icon: '🎲',
    to: '/tools/lucky-draw',
    theme: 'yellow'
  },
  {
    title: '更多工具',
    description: '敬請期待...',
    icon: '✨',
    to: '',
    theme: 'cream',
    interactive: false
  }
]
</script>

<template>
  <div class="max-w-5xl mx-auto py-8 lg:py-12 px-4">
    <!-- Header -->
    <div class="text-center space-y-2 mb-10 animate-pop">
      <h1 class="text-4xl font-black text-pawa-brown">小工具集</h1>
      <p class="text-pawa-brown/30 font-bold uppercase tracking-widest text-sm">Utils & Fun Tools</p>
    </div>

    <!-- Tools Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-[160px]">
      <UiBlockTile
        v-for="tool in tools"
        :key="tool.title"
        :to="tool.to"
        :theme="tool.theme"
        :interactive="tool.interactive !== false"
        center
      >
        <div class="flex items-center gap-6 px-4 group-hover:text-white transition-colors duration-300">
          <span class="text-5xl shrink-0">{{ tool.icon }}</span>
          <div class="text-left">
            <h2 class="text-xl font-black text-pawa-brown group-hover:text-white mb-1 transition-colors">{{ tool.title }}</h2>
            <p class="text-xs font-bold text-pawa-brown/40 group-hover:text-white/70 transition-colors">{{ tool.description }}</p>
          </div>
        </div>
      </UiBlockTile>
    </div>
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
