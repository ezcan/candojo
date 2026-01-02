<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen paper-bg flex items-center justify-center p-6 font-sans">
    <div class="relative max-w-lg w-full">
      <!-- Floating Decorative Elements -->
      <div class="absolute -top-12 -left-8 text-4xl animate-bounce opacity-20">⚾️</div>
      <div class="absolute -bottom-8 -right-4 text-4xl animate-pulse opacity-10">🧢</div>

      <div class="bg-white/90 backdrop-blur-md rounded-[3rem] shadow-block border-4 border-pawa-blue p-8 md:p-12 text-center transition-all hover:scale-[1.01]">
        <!-- Cute Character Area -->
        <div class="relative mb-8 flex justify-center">
          <div class="w-32 h-32 rounded-full bg-pawa-blue/10 flex items-center justify-center text-8xl transition-all hover:rotate-12 cursor-default grayscale-[0.2]">
            🥺
          </div>
          <!-- Little speech bubble -->
          <div class="absolute top-0 right-1/4 bg-pawa-blue text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm animate-bounce">
             WHERE?
          </div>
        </div>

        <!-- 404 Message -->
        <div class="space-y-2 mb-8">
          <h1 class="text-7xl font-black text-pawa-blue italic tracking-tighter drop-shadow-sm">404</h1>
          <h2 class="text-2xl font-black text-pawa-brown">迷路了呢...</h2>
          <p class="text-xs font-bold text-pawa-brown/40 leading-relaxed max-w-[240px] mx-auto">
            看來你跑到了字庫邊界外的地方，球員們也找不到你了！
          </p>
        </div>

        <!-- Back Home Link -->
        <NuxtLink 
          to="/"
          class="inline-block w-full rounded-2xl bg-pawa-blue text-white font-black py-4 px-8 shadow-blockBlue hover:translate-y-1 hover:shadow-none transition-all duration-200"
        >
          <div class="flex items-center justify-center gap-2">
            <span class="text-xl">🏠</span>
            <span>回到首頁</span>
          </div>
        </NuxtLink>

        <!-- Technical Detail Footer (Subtle) -->
        <div class="mt-8 opacity-20 hover:opacity-100 transition-opacity">
           <span class="text-[8px] font-mono text-pawa-brown uppercase tracking-widest">
             {{ error?.message || 'Unexpected Route Error' }}
           </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-block {
  box-shadow: 0 10px 0 0 rgba(7, 102, 255, 0.1);
}

.shadow-blockBlue {
  box-shadow: 0 6px 0 0 #0052cc;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s infinite ease-in-out;
}
</style>
