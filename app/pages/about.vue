<template>
  <div class="max-w-5xl mx-auto py-8 lg:py-12 px-4">
    <!-- Hero Header -->
    <div class="text-center space-y-2 mb-10 animate-pop">
      <h1 class="text-4xl font-black text-pawa-brown">關於我</h1>
      <p class="text-pawa-brown/30 font-bold uppercase tracking-widest text-sm">About CANDOJO</p>
    </div>

    <!-- Bento Grid Layout -->
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[200px] sm:auto-rows-[220px]">
      
      <!-- Card 1: Identity (2x2) -->
      <UiBlockTile 
        theme="cream" 
        class="col-span-2 row-span-2"
        center
      >
        <div class="space-y-4 px-6">
          <div class="flex flex-col items-center gap-2 mb-2">
            <img src="/brand/ezcan.png" alt="EZCAN" class="w-24 h-24 rounded-full" />
            <h2 class="text-3xl font-black text-pawa-brown">I'm EZCAN</h2>
          </div>
          <p class="text-lg sm:text-xl font-bold text-pawa-brown/80 leading-relaxed">
            一個教育圈的小小工程師。<br />
            富邦悍將球迷一枚，<br />
            偶爾用實況野球，<br />
            把喜歡的球員整理成自己看得順眼的樣子。
          </p>
        </div>
      </UiBlockTile>

      <!-- Card 2: Vision (1x1) -->
      <UiBlockTile theme="blue" center class="group">
        <div class="space-y-2 transition-colors duration-300">
          <span class="text-3xl block">⚾</span>
          <h2 class="text-xl font-black text-pawa-brown group-hover:text-white transition-colors">網站初衷</h2>
          <p class="text-xs font-bold text-pawa-brown/70 group-hover:text-white/80 leading-relaxed px-4 transition-colors">
            為了查資料方便，<br />將球員資料整理成我<br />喜歡且願意用的樣子。
          </p>
        </div>
      </UiBlockTile>

      <!-- Card 3: Frequency (1x1) -->
      <UiBlockTile theme="red" center class="group">
        <div class="space-y-2 transition-colors duration-300">
          <span class="text-3xl block">🌱</span>
          <h2 class="text-xl font-black text-pawa-brown group-hover:text-white transition-colors">更新頻率</h2>
          <p class="text-xs font-bold text-pawa-brown/70 group-hover:text-white/80 leading-relaxed px-4 transition-colors">
            取決於工作、生活，<br />還有懶癌發作程度。
          </p>
        </div>
      </UiBlockTile>

      <!-- Card 4: Content (1x1) -->
      <UiBlockTile theme="green" center class="group">
        <div class="space-y-2 transition-colors duration-300">
          <span class="text-3xl block">🧠</span>
          <h2 class="text-xl font-black text-pawa-brown group-hover:text-white transition-colors">學習筆記</h2>
          <p class="text-xs font-bold text-pawa-brown/70 group-hover:text-white/80 leading-relaxed px-4 transition-colors">
            除了野球，也會放一些<br />資教筆記與 AI 協作<br />的小工具實驗。
          </p>
        </div>
      </UiBlockTile>

      <!-- Card 5: Coffee (2x1) -->
      <UiBlockTile 
        theme="yellow" 
        class="col-span-2 group"
        center
      >
        <div class="flex flex-col sm:flex-row items-center gap-6 px-8 transition-colors duration-300">
          <span class="text-5xl">☕</span>
          <div class="text-center sm:text-left space-y-1">
            <p class="text-lg font-black text-pawa-brown group-hover:text-white transition-colors">
              如果網站對你有幫助，歡迎請我喝杯咖啡
            </p>
            <p class="text-xs font-bold text-pawa-brown/40 group-hover:text-white/50 italic transition-colors">
              不請也沒關係。真的，沒關係。
            </p>
          </div>
          <button class="shrink-0 px-6 py-2 bg-pawa-brown/10 group-hover:bg-white text-pawa-brown/40 group-hover:text-pawa-yellow font-black rounded-xl shadow-blockSm cursor-not-allowed text-xs transition-all">
            Coming Soon
          </button>
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