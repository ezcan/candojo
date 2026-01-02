<script setup lang="ts">
import { isPitcher as checkIsPitcher, splitPitchNames } from '../../utils/player'

const { fetchAllPlayers } = usePlayers()

// 載入前 3 筆球員
const { data: latestPlayers, pending } = useAsyncData('home-player-preview', () => 
  fetchAllPlayers(6)
)

const isPitcher = (p: any) => checkIsPitcher(p)

// 根據球隊背景色
const getTeamColorClass = (team: string) => {
  const map: Record<string, string> = {
    '中信兄弟': 'bg-team-cb text-pawa-brown',
    '統一獅': 'bg-team-ul text-white',
    '富邦悍將': 'bg-team-fg text-white',
    '味全龍': 'bg-team-wd text-white',
    '台鋼雄鷹': 'bg-team-th text-white',
    '樂天桃猿': 'bg-team-lm text-white'
  }
  return map[team] || 'bg-pawa-brown/20 text-pawa-brown'
}

</script>


<template>
  <div class="flex flex-col h-full overflow-hidden">
    <!-- Header: Compact -->
    <div class="flex items-center justify-between mb-3 px-1">
      <div class="flex items-center gap-2">
        <UiIcon name="baseball-alt" size="24" />
        <h3 class="font-black text-pawa-brown text-lg">最新球員 <span class="text-[10px] opacity-20 ml-1 font-bold">LATEST ROSTER</span></h3>
      </div>
      <div class="px-2 py-0.5 rounded-md bg-pawa-brown/5 text-[9px] font-black text-pawa-brown/30 border border-pawa-brown/10 uppercase tracking-widest">
        隨緣更新
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex-1 flex items-center justify-center">
      <div class="animate-pulse flex flex-col items-center gap-1">
         <div class="w-6 h-6 rounded-full border-3 border-pawa-blue/20 border-t-pawa-blue animate-spin"></div>
         <span class="text-[8px] font-black text-pawa-brown/15 italic">LOADING...</span>
      </div>
    </div>

    <!-- Players List: Wide horizontal Row Layout (Scrollable on Mobile) -->
    <div v-else-if="latestPlayers && latestPlayers.length" class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 lg:gap-y-1 min-h-0 py-1">
      <div 
        v-for="p in latestPlayers" 
        :key="p.name"
        class="flex items-center border-b border-pawa-brown/5 pb-2.5 pt-1 group/item overflow-x-auto no-scrollbar"
      >
        <!-- Inner scrollable wrapper to ensure content doesn't shrink -->
        <div class="flex items-center justify-between gap-6 min-w-max px-2 w-full">
          <!-- Left: Identity (Team & Name) -->
          <div class="flex items-center gap-4 flex-shrink-0">
             <PlayersTeamBadge :team="p.team" :no="p.no" size="md" />
             <PlayersNameCapsule :player="p" size="md" />
          </div>

          <!-- Right: Stats (Stacked Table Style) -->
          <div class="flex items-center gap-x-2.5">
            <!-- Batters -->
            <div v-if="!isPitcher(p)" class="flex items-center gap-x-2.5">
               <!-- 彈道 -->
               <div class="flex flex-col items-center">
                  <span class="text-[8px] font-black text-pawa-brown/30 mb-0.5 uppercase tracking-tighter">彈道</span>
                  <span class="text-[14px] font-black text-pawa-brown leading-none h-6 flex items-center">{{ p.traj || '1' }}</span>
               </div>
               <!-- Grades -->
               <div v-for="s in [
                 { k: 'con', l: '巧打' }, { k: 'pow', l: '力量' }, { k: 'spd', l: '速度' }, 
                 { k: 'arm', l: '臂力' }, { k: 'fld', l: '守備' }, { k: 'err', l: '捕球' }
               ]" :key="s.k" class="flex flex-col items-center">
                  <span class="text-[8px] font-black text-pawa-brown/30 mb-0.5 uppercase tracking-tighter whitespace-nowrap">{{ s.l }}</span>
                  <PlayersStatBadge :value="p[s.k]" size="md" />
               </div>
            </div>

            <!-- Pitchers -->
            <div v-else class="flex items-center gap-x-3">
               <!-- 球速 -->
               <div class="flex flex-col items-center">
                  <span class="text-[8px] font-black text-pawa-brown/30 mb-0.5 uppercase tracking-tighter">球速</span>
                  <span class="text-[12px] font-black text-pawa-red leading-none h-6 flex items-center">{{ p.velo || '-' }}</span>
               </div>
               <!-- Grades -->
               <div v-for="s in [{ k: 'ctl', l: '控球' }, { k: 'sta', l: '體力' }]" :key="s.k" 
                    class="flex flex-col items-center">
                  <span class="text-[8px] font-black text-pawa-brown/30 mb-0.5 uppercase tracking-tighter">{{ s.l }}</span>
                  <PlayersStatBadge :value="p[s.k]" size="md" />
               </div>

               <!-- 變化球 -->
               <div class="flex flex-col items-start min-w-[80px]">
                  <span class="text-[8px] font-black text-pawa-blue/40 uppercase tracking-tighter mb-0.5">變化球</span>
                  <div class="flex items-center gap-1 h-6">
                    <div 
                      v-for="ball in splitPitchNames(p.balls)" 
                      :key="ball"
                      class="shrink-0 px-1 py-0.5 rounded bg-pawa-blue/5 border border-pawa-blue/10 text-[9px] font-black text-pawa-blue"
                    >
                      {{ ball }}
                    </div>
                    <span v-if="!p.balls" class="text-[10px] font-black text-pawa-black/10">無</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- Empty State -->
    <div v-else class="flex-1 flex flex-col items-center justify-center text-center opacity-20 grayscale py-4">
      <span class="text-4xl mb-1">🔭</span>
      <p class="text-[9px] font-black uppercase tracking-widest">No data</p>
    </div>

    <!-- Footer: Static -->
    <div class="mt-auto pt-2 border-t border-pawa-brown/5 flex justify-between items-center px-1">
      <span class="text-[9px] font-black text-pawa-brown/20 uppercase tracking-tight italic">Roster Preview</span>
      <NuxtLink to="/players" class="text-[9px] font-black text-pawa-blue hover:underline cursor-pointer">
        完整名單 »
      </NuxtLink>
    </div>
  </div>
</template>



