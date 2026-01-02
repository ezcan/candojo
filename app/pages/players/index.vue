<script setup lang="ts">
import { usePlayers } from '~/composables/usePlayers'

const { fetchAllPlayers } = usePlayers()
const { data: allPlayers, pending } = useAsyncData('players-all', () => fetchAllPlayers())

// Filter States matching original snippet
const filterType = ref('全部')
const selectedTeam = ref('全部')
const searchQuery = ref('')

const filterOptions = [
  { label: '全部', value: '全部' },
  { label: '野手', value: '野手' },
  { label: '投手', value: '投手' }
]

const teams = [
  '中信兄弟', '統一獅', '富邦悍將', '味全龍', '台鋼雄鷹', '樂天桃猿'
]

const isPlayerPitcher = (p: any) => {
  const target = `${p.pos}${p.type}`.toUpperCase()
  return target.includes('投手') || target.includes('PITCHER') || target.includes(' P ') || p.type === 'P'
}

const filteredPlayers = computed(() => {
  if (!allPlayers.value) return []
  
  return allPlayers.value.filter(p => {
    // 1. Type Filter
    const pitcher = isPlayerPitcher(p)
    const matchesType = filterType.value === '全部' || 
                       (filterType.value === '投手' && pitcher) ||
                       (filterType.value === '野手' && !pitcher)
    
    // 2. Team Filter
    const matchesTeam = selectedTeam.value === '全部' || p.team === selectedTeam.value
    
    // 3. Search Query
    const query = searchQuery.value.toLowerCase()
    const matchesSearch = !query || 
                         p.name.toLowerCase().includes(query) || 
                         p.no.toString().includes(query)
    
    return matchesType && matchesTeam && matchesSearch
  })
})

const getFilterActiveClass = (val: string) => {
  if (val === '投手') return 'bg-pawa-red text-white shadow-sm'
  if (val === '野手') return 'bg-pawa-blue text-white shadow-sm'
  return 'bg-pawa-brown text-white shadow-sm'
}
</script>

<template>
  <div class="min-h-screen bg-pawa-cream">
    <HeroHeader 
      title="球員資料庫" 
      subtitle="ROSTER DATABASE"
      theme="blue"
    />

    <div class="max-w-7xl mx-auto py-12 px-4">
      <!-- Unified Filter Row matching original snippet -->
      <div class="bg-white p-4 md:p-6 rounded-[2rem] border-4 border-pawa-brown/10 mb-12 flex flex-col md:flex-row gap-4 items-center shadow-sm">
        <div class="flex w-full md:w-auto gap-1.5 p-1 bg-gray-100 rounded-2xl flex-wrap md:flex-nowrap">
          <button 
            v-for="opt in filterOptions" 
            :key="opt.value" 
            @click="filterType = opt.value" 
            class="flex-1 md:flex-none min-w-[72px] px-6 py-2.5 rounded-xl font-black transition-all text-sm whitespace-nowrap" 
            :class="filterType === opt.value ? getFilterActiveClass(opt.value) : 'hover:bg-gray-200 text-pawa-brown/40'"
          >
            {{ opt.label }}
          </button>
        </div>
        
        <div class="w-full md:w-56">
          <select 
            v-model="selectedTeam" 
            class="w-full px-5 py-3 rounded-xl border-4 border-pawa-brown/10 font-black text-pawa-brown focus:border-pawa-blue outline-none bg-white cursor-pointer appearance-none transition-colors"
          >
            <option value="全部">所有球隊 (ALL)</option>
            <option v-for="t in teams" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>

        <div class="w-full md:flex-grow relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜尋球員姓名、背號..." 
            class="w-full px-5 py-3 rounded-xl border-4 border-pawa-brown/10 font-black text-pawa-brown focus:border-pawa-blue outline-none shadow-inner placeholder:text-pawa-brown/20 transition-colors"
          >
          <span class="absolute right-5 top-1/2 -translate-y-1/2 text-xl opacity-10">🔍</span>
        </div>
      </div>

      <!-- Result Area -->
      <div v-if="pending" class="flex flex-col items-center py-24 opacity-30">
        <div class="w-12 h-12 border-4 border-pawa-brown/10 border-t-pawa-blue rounded-full animate-spin mb-4"></div>
        <p class="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Personnel Data...</p>
      </div>

      <div v-else-if="filteredPlayers.length">
        <TransitionGroup 
          name="list" 
          tag="div" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <PlayersPlayerDetailCard
            v-for="p in filteredPlayers"
            :key="p.uid"
            :player="p"
          />
        </TransitionGroup>
      </div>

      <div v-else class="py-32 text-center opacity-40">
        <div class="text-4xl mb-4">📡</div>
        <p class="text-lg font-black text-pawa-brown">查無匹配資料</p>
        <p class="text-xs font-bold uppercase tracking-widest mt-1">No matching active records found</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Select Arrow */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231E293B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-position: right 1.25rem center;
  background-repeat: no-repeat;
  background-size: 1.25em;
}

/* List Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.list-leave-active {
  position: absolute;
  width: calc(33.333% - 21px); /* Based on grid-cols-3 gap-8 */
}

@media (max-width: 1024px) {
  .list-leave-active {
    width: calc(50% - 16px);
  }
}
@media (max-width: 768px) {
  .list-leave-active {
    width: 100%;
  }
}
</style>
