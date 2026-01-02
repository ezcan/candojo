<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 10)

const navItems = [
  { to: '/', label: '首頁', icon: '🏠', theme: 'blue' },
  { to: '/players', label: '球員資料', icon: 'baseball-alt', theme: 'blue', isSvg: true },
  { to: '/kanji', label: '漢字查詢', icon: 'analytics-magnifying-glass', theme: 'blue', isSvg: true },
  { to: '/notes', label: '學習筆記', icon: '🧠', theme: 'red' },
  { to: '/tools', label: 'AI工具', icon: 'tool-box', theme: 'yellow', isSvg: true },
  { to: '/about', label: '關於我', icon: 'info', theme: 'green', isSvg: true },
]
</script>

<template>
  <header 
    class="w-full px-4 transition-all duration-300 ease-pop"
    :class="[
      isHome 
        ? 'pt-10 pb-8 sm:pt-16 sm:pb-12 lg:pt-8 lg:pb-4' 
        : 'pt-3 sticky top-0 z-50 py-3'
    ]"
  >
    <!-- Container -->
    <div 
      class="mx-auto transition-all duration-500"
      :class="isHome ? 'max-w-xl text-center' : 'max-w-5xl'"
    >
      <!-- Brand & Desktop Nav Container -->
      <div 
        class="transition-all duration-500"
        :class="[
          isHome 
            ? 'bg-transparent border-none shadow-none p-0' 
            : 'pawa-card p-3 !rounded-2xl border-pawa-brown/10',
          !isHome && isScrolled ? 'bg-white/95 backdrop-blur-md shadow-blockSm' : 'bg-transparent border-transparent shadow-none'
        ]"
      >
        <div 
          class="flex transition-all duration-500"
          :class="isHome ? 'flex-col items-center gap-3 sm:gap-4 lg:gap-2' : 'items-center justify-between'"
        >
          <!-- Logo & Title Group -->
          <NuxtLink 
            to="/" 
            class="flex items-center group transition-all"
            :class="isHome ? 'flex-col' : 'gap-2 sm:gap-3 active:scale-95'"
          >
            <!-- Logo Icon (No frame on home) -->
            <div 
              class="transition-all duration-500 logo-idle-float"
              :class="isHome 
                ? 'p-0 mb-4 sm:mb-6 lg:mb-4 scale-125 sm:scale-150' 
                : [
                  'p-1.5 rounded-xl sm:rounded-2xl border-2 border-pawa-brown/5 shadow-sm group-hover:rotate-3',
                  isScrolled ? 'bg-white' : 'bg-white/50'
                ]"
            >
              <img src="/brand/logo.png" alt="CANDOJO" :class="isHome ? 'h-20 sm:h-24' : 'h-6'" class="w-auto" />
            </div>

            <!-- Text branding -->
            <div :class="isHome ? 'text-center' : 'flex flex-col select-none text-left'">
              <HomeTypingTagline v-if="isHome" />
              <span v-else class="text-xs font-black text-pawa-brown tracking-tighter opacity-40 uppercase italic">Candojo.com</span>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation (Hidden on Home) -->
          <nav 
            v-if="!isHome"
            class="hidden sm:flex items-center gap-1 lg:gap-2"
          >
            <NuxtLink 
              v-for="item in navItems"
              :key="item.to"
              :to="item.to" 
              class="px-3 py-2 lg:px-4 rounded-xl text-xs lg:text-sm font-black transition-all flex items-center gap-1.5 lg:gap-2 active:scale-95 whitespace-nowrap"
              :class="route.path === item.to 
                ? [`bg-pawa-${item.theme}Dark text-white`, `shadow-active-${item.theme}`]
                : 'text-pawa-brown/60 hover:bg-pawa-brown/5 hover:text-pawa-brown'"
            >
              <UiIcon v-if="item.isSvg" :name="item.icon" size="14" />
              <span v-else class="text-xs">{{ item.icon }}</span>
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>

    <!-- Mobile Sticky Footer Navigation (Only on Subpages) -->
    <div 
      v-if="!isHome"
      class="fixed bottom-6 left-0 right-0 z-50 px-4 sm:hidden pointer-events-none"
    >
      <nav class="pawa-card max-w-[340px] mx-auto bg-white/95 backdrop-blur-md border-pawa-brown/10 shadow-block p-1 !rounded-full flex items-center justify-around pointer-events-auto">
        <NuxtLink 
          v-for="item in navItems"
          :key="item.to"
          :to="item.to" 
          class="flex-1 flex flex-col items-center py-2 px-1 rounded-full transition-all active:scale-90"
          :class="route.path === item.to 
            ? `bg-pawa-${item.theme}Dark text-white` 
            : 'text-pawa-brown/50'"
        >
          <UiIcon v-if="item.isSvg" :name="item.icon" size="20" class="mb-0.5" />
          <span v-else class="text-lg mb-0.5">{{ item.icon }}</span>
          <span class="text-[9px] font-black tracking-tighter">{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.shadow-active-blue { box-shadow: 0 4px 0 0 #2B66D6; }
.shadow-active-red { box-shadow: 0 4px 0 0 #CC3D3D; }
.shadow-active-green { box-shadow: 0 4px 0 0 #388038; }
.shadow-active-yellow { box-shadow: 0 4px 0 0 #CC9900; }

.ease-pop {
  transition-timing-function: cubic-bezier(.2, 1.3, .3, 1);
}


/* Persistent Logo Float */
.logo-idle-float {
  animation: idleFloat 4s ease-in-out infinite;
}

@keyframes idleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
