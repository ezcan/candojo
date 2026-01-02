<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <footer 
    class="mt-auto border-t border-pawa-brown/5 bg-white/30 backdrop-blur-sm overflow-hidden"
    :class="isHome ? 'py-4 sm:py-8 lg:py-3' : 'py-12'"
  >

    <div class="max-w-4xl mx-auto flex flex-col items-center gap-6">
      <!-- Community Links -->
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        <a 
          href="https://forum.gamer.com.tw/B.php?bsn=51" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-pawa-brown/60 hover:text-pawa-blue transition-colors group"
        >
          <div class="p-2 bg-white rounded-xl shadow-sm border border-pawa-brown/5 group-hover:-rotate-3 transition-transform">
            <span class="text-xl">🐲</span>
          </div>
          <span class="text-sm font-black">巴哈姆特</span>
        </a>

        <a 
          href="https://line.me/ti/g2/fULcSG0XtTQYGUBTwya_XbLx3wZmPjJB84ZJsg?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-pawa-brown/60 hover:text-[#06C755] transition-colors group"
        >
          <div class="p-2 bg-white rounded-xl shadow-sm border border-pawa-brown/5 group-hover:rotate-3 transition-transform">
            <span class="text-xl">💬</span>
          </div>
          <span class="text-sm font-black">LINE 社群</span>
        </a>

        <a 
          href="https://www.facebook.com/gaming/ezcansnote" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-pawa-brown/60 hover:text-[#1877F2] transition-colors group"
        >
          <div class="p-2 bg-white rounded-xl shadow-sm border border-pawa-brown/5 group-hover:-rotate-3 transition-transform">
            <span class="text-xl">📘</span>
          </div>
          <span class="text-sm font-black">粉絲專頁</span>
        </a>
      </div>


      <!-- Copyright & Info -->
      <div class="text-center">
        <p class="text-[12px] font-bold text-pawa-brown/30 tracking-widest uppercase mb-1">
          Digital Toolbox for Baseball Fans ⚾️
        </p>
        <p class="text-[10px] font-bold text-pawa-brown/20 tracking-tighter uppercase">
          &copy; 2026 CANDOJO. All Rights Reserved. Not affiliated with Konami Digital Entertainment.
        </p>
      </div>
    </div>
  </footer>
</template>
