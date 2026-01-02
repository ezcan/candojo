<script setup lang="ts">
// 獲取所有筆記
const { data: notes } = await useAsyncData('notes-list', () => 
  queryCollection('content').all()
)

useHead({
  title: '學習筆記 - CANDOJO',
  meta: [
    { name: 'description', content: '分享資教心得、技術筆記與 AI 實驗。' }
  ]
})
</script>

<template>
  <div class="max-w-5xl mx-auto py-8 lg:py-12 px-4">
    <!-- Section Header -->
    <div class="text-center space-y-2 mb-10 animate-pop">
      <h1 class="text-4xl font-black text-pawa-brown">學習筆記</h1>
      <p class="text-pawa-brown/30 font-bold uppercase tracking-widest text-sm">Learning Notes & Experiments</p>
    </div>

    <!-- Debug Info -->
    <div class="text-center mb-4 text-[10px] text-pawa-brown/20 italic">
      Found {{ notes?.length || 0 }} notes
    </div>

    <!-- Notes Grid -->
    <div v-if="notes && notes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <UiBlockTile
        v-for="note in notes"
        :key="note.path"
        :to="note.path"
        :theme="note.theme || 'red'"
        class="group"
      >
        <div class="p-6 h-full flex flex-col items-start text-left transition-colors duration-300">
          <!-- Meta -->
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2 py-0.5 bg-pawa-brown/10 group-hover:bg-white/20 rounded text-[10px] font-black uppercase text-pawa-brown/60 group-hover:text-white transition-colors">
              {{ note.category || 'Note' }}
            </span>
            <span class="text-[10px] font-bold text-pawa-brown/40 group-hover:text-white/50 transition-colors">{{ note.date }}</span>
          </div>

          <!-- Title -->
          <h2 class="text-xl font-black text-pawa-brown group-hover:text-white mb-2 line-clamp-2 leading-tight transition-colors">
            {{ note.title }}
          </h2>

          <!-- Description -->
          <p class="text-xs font-bold text-pawa-brown/50 group-hover:text-white/70 line-clamp-3 mb-6 transition-colors">
            {{ note.description }}
          </p>

          <!-- Footer/Icon -->
          <div class="mt-auto flex items-center justify-between w-full">
            <span class="text-3xl grayscale-[0.5] group-hover:grayscale-0 transition-all">
              {{ note.image || '📝' }}
            </span>
            <div class="text-[10px] font-black underline decoration-2 underline-offset-4 text-pawa-brown/30 group-hover:text-white/70 italic transition-all">
              READ MORE →
            </div>
          </div>
        </div>
      </UiBlockTile>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20 bg-pawa-cream rounded-3xl border-2 border-dashed border-pawa-brown/10">
      <span class="text-6xl block mb-4">📭</span>
      <h3 class="text-xl font-black text-pawa-brown/40">目前還沒有任何筆記...</h3>
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
