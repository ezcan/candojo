<script setup lang="ts">
// 1. 定義響應式變數
const kanjiSearchQuery = ref('');

// 2. 定義清理後的搜尋字串
const cleanedQuery = computed(() => {
  return kanjiSearchQuery.value.trim();
});

// 3. 搜尋邏輯 (保持原有邏輯)
const kanjiSearchResults = computed(() => {
  const query = cleanedQuery.value;
  if (!query) return [];
  
  const uniqueChars = Array.from(new Set(query.split('')));
  
  return uniqueChars.map(target => {
    const pageGroups: Record<number, { prefix: string; coords: { row: number; col: number }[] }> = {};
    
    KANJI_WORDS_2021.forEach((content) => {
      if (content.includes(target)) {
        let searchIndex = 0;
        while ((searchIndex = content.indexOf(target, searchIndex)) !== -1) {
          const idx = searchIndex;
          const page = Math.floor(idx / 60) + 1;
          const row = (Math.floor(idx / 12) % 5) + 1;
          const col = (idx % 12) + 1;

          if (!pageGroups[page]) {
            pageGroups[page] = { prefix: content[0], coords: [] };
          }
          pageGroups[page].coords.push({ row, col });
          searchIndex++;
        }
      }
    });
    
    const sortedPages = Object.entries(pageGroups)
      .map(([page, data]) => ({ page: parseInt(page), ...data }))
      .sort((a, b) => a.page - b.page);

    return {
      target,
      pages: sortedPages,
      totalCount: sortedPages.reduce((acc, p) => acc + p.coords.length, 0)
    };
  });
});

useHead({
  title: '漢字查詢 - CANDOJO',
  meta: [
    { name: 'description', content: '搜尋實況野球遊戲中的漢字位置，精確定位 Page、Row 與 Col。' }
  ]
})
</script>

<template>
  <div class="max-w-5xl mx-auto py-8 lg:py-12 px-4">
    <!-- Hero Header -->
    <div class="text-center space-y-2 mb-10 animate-pop">
      <h1 class="text-4xl font-black text-pawa-brown">漢字查詢</h1>
      <p class="text-pawa-brown/30 font-bold uppercase tracking-widest text-sm">Game Kanji Finder</p>
    </div>

    <!-- Search Input Section -->
    <div class="max-w-2xl mx-auto mb-12">
      <UiBlockTile theme="blue" :interactive="false">
        <div class="p-6 md:p-8">
          <div class="flex items-center gap-3 mb-6">
            <span class="text-3xl">🔍</span>
            <div class="text-left">
              <h2 class="text-xl font-black text-pawa-brown">位置快速搜尋</h2>
              <p class="text-xs font-bold text-pawa-brown/60">輸入漢字，為你從 2021 版字庫中精確定位</p>
            </div>
          </div>

          <div class="relative group">
            <input
              v-model="kanjiSearchQuery"
              type="text"
              placeholder="輸入想要查找的漢字..."
              class="w-full px-6 py-5 rounded-2xl border-[4px] border-pawa-blue/20 font-black text-xl md:text-2xl focus:border-pawa-blue outline-none transition-all shadow-inner text-pawa-brown bg-white/90 pr-16"
            />
            <div class="absolute right-6 top-1/2 -translate-y-1/2 text-pawa-brown/20 group-focus-within:text-pawa-brown transition-colors">
               <kbd class="hidden sm:inline-block px-2 py-1 bg-white border-2 border-pawa-brown/5 rounded-lg text-xs font-black">ENTER</kbd>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-4 text-[10px] font-black text-pawa-brown/50 uppercase tracking-wider">
            <span class="inline-flex items-center gap-1.5 px-2 py-1 bg-white/20 rounded-md">
              <span class="w-1.5 h-1.5 rounded-full bg-pawa-blue animate-pulse"></span>
              2021 VERSION
            </span>
            <span class="opacity-30">|</span>
            <span class="flex items-center gap-1 font-bold">
              TIP: 一次可輸入多個字（如「林威助」）
            </span>
          </div>
        </div>
      </UiBlockTile>
    </div>

    <!-- Empty/Guide State -->
    <div v-if="!cleanedQuery" class="text-center py-20 bg-pawa-creamInner rounded-3xl border-2 border-dashed border-pawa-brown/5">
      <div class="text-8xl mb-6 transform hover:rotate-6 transition-transform duration-300 inline-block">📖</div>
      <h3 class="text-2xl font-black text-pawa-brown/40">想找哪個位置？</h3>
      <p class="mt-2 text-sm font-bold text-pawa-brown/30 max-w-xs mx-auto">
        在上方輸入框輸入漢字，我們就會為你定位出 Page、Row 與 Col。
      </p>
    </div>

    <!-- Results Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UiBlockTile
        v-for="result in kanjiSearchResults"
        :key="result.target"
        theme="cream"
        :interactive="false"
      >
        <div class="p-5 h-full flex flex-col">
          <!-- Character Header (Compact) -->
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 bg-pawa-brown text-white rounded-xl flex items-center justify-center text-2xl font-black shadow-blockSm"
              >
                {{ result.target }}
              </div>
              <div class="text-left">
                <h3 class="font-black text-pawa-brown text-base leading-none mb-1">{{ result.totalCount > 0 ? '查詢結果' : '無此漢字' }}</h3>
                <p class="text-[10px] font-bold text-pawa-brown/40 uppercase tracking-wider">Game Database v2021</p>
              </div>
            </div>
            <div v-if="result.totalCount > 0" class="flex flex-col items-end">
              <span class="text-[10px] font-black text-pawa-brown/30 uppercase">Found AT</span>
              <span class="text-xs font-black text-pawa-blueBg bg-pawa-blue/10 px-2 py-0.5 rounded-lg">{{ result.totalCount }} Locations</span>
            </div>
          </div>

          <!-- Phonetic Results (The core focus) -->
          <div v-if="result.pages.length" class="space-y-2 flex-1 overflow-y-auto max-h-[280px] pr-1 custom-scrollbar">
            <div
              v-for="pData in result.pages"
              :key="pData.page"
              class="flex items-center bg-white/50 rounded-xl border-2 border-pawa-brown/5 overflow-hidden transition-all hover:border-pawa-blue/20"
            >
              <!-- 50-On Category Badge (Dominant) -->
              <div class="w-12 self-stretch flex items-center justify-center bg-pawa-blue text-white font-black text-lg shadow-inner">
                {{ pData.prefix }}
              </div>

              <!-- Page & Coordinates -->
              <div class="flex-1 p-2 px-3 flex items-center gap-3">
                <div class="shrink-0 flex flex-col items-center justify-center border-r border-pawa-brown/5 pr-3">
                  <span class="text-[9px] font-black text-pawa-brown/30 uppercase leading-none mb-0.5">Page</span>
                  <span class="text-sm font-black text-pawa-blue">{{ pData.page }}</span>
                </div>

                <div class="flex flex-wrap gap-1.5 flex-1">
                  <div
                    v-for="(coord, cIdx) in pData.coords"
                    :key="cIdx"
                    class="pawa-coord-pill-compact"
                  >
                    {{ coord.row }}-{{ coord.col }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Not Found -->
          <div
            v-else
            class="flex-1 flex flex-col items-center justify-center py-8 bg-pawa-brown/5 rounded-2xl border-2 border-dashed border-pawa-brown/10"
          >
            <div class="text-4xl mb-2 grayscale opacity-30">🫥</div>
            <p class="font-black text-pawa-brown/40 text-sm">此漢字暫無位置資訊</p>
          </div>
          
          <div class="mt-4 pt-3 border-t border-pawa-brown/5 flex justify-end">
            <span class="text-[8px] font-black text-pawa-brown/20 uppercase tracking-[0.2em] italic">Candojo Verified Data</span>
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

.pawa-coord-pill-compact {
  @apply inline-flex items-center px-1.5 py-0.5 rounded-md
         bg-white border border-pawa-brown/10
         text-pawa-brown/80 text-[11px] font-black 
         shadow-sm;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.05);
  border-radius: 10px;
}
</style>