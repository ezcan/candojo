<script setup lang="ts">
import { isPitcher as checkIsPitcher, parsePitches, batterStats, pitcherStats } from '../../utils/player'

const props = defineProps<{
  player: any
}>()

const expanded = ref(false)
const toggleExpand = () => {
  expanded.value = !expanded.value
}

const isPitcher = computed(() => checkIsPitcher(props.player))
</script>

<template>
  <div 
    class="pawa-card p-4 sm:p-5 flex flex-col transition-all cursor-pointer group"
    :class="{ 'ring-2 ring-pawa-blue/20': expanded }"
    @click="toggleExpand"
  >
    <!-- Header Row -->
    <div class="flex items-center gap-3 mb-4">
      <PlayersTeamBadge :team="player.team" :no="player.no" />
      <PlayersNameCapsule :player="player" />
      <div class="flex flex-col ml-auto text-right leading-none">
        <span class="text-[10px] font-black text-pawa-brown/40 uppercase tracking-widest">{{ player.pos || player.type }}</span>
        <span class="text-[10px] font-black text-pawa-brown/20 uppercase mt-1">{{ player.hand }}</span>
      </div>
    </div>

    <!-- Stats Table Area -->
    <div class="mt-1 overflow-x-auto no-scrollbar">
      <table v-if="!isPitcher" class="summary-table w-full table-fixed min-w-[280px]">
        <thead>
          <tr class="border-b border-pawa-brown/5">
            <th class="py-1 text-[8px] sm:text-[10px] font-black text-pawa-brown/30 text-center">彈道</th>
            <th v-for="s in batterStats" :key="s.key" class="py-1 text-[8px] sm:text-[10px] font-black text-pawa-brown/30 text-center">
              {{ s.short }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2 text-center">
              <span class="text-sm font-black text-pawa-blue">{{ player.traj }}</span>
            </td>
            <td v-for="s in batterStats" :key="s.key" class="py-2 text-center">
              <div class="flex justify-center">
                <PlayersStatBadge :value="player[s.key]" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table v-else class="summary-table w-full table-fixed min-w-[280px]">
        <thead>
          <tr class="border-b border-pawa-brown/5">
            <th class="py-1 text-[8px] sm:text-[10px] font-black text-pawa-brown/30 text-center">球速</th>
            <th v-for="s in pitcherStats" :key="s.key" class="py-1 text-[8px] sm:text-[10px] font-black text-pawa-brown/30 text-center">
              {{ s.label }}
            </th>
            <th class="py-1 text-[8px] sm:text-[10px] font-black text-pawa-brown/30 text-center uppercase">Pitches</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2 text-center">
              <div class="flex flex-col items-center">
                <span class="text-sm font-black text-pawa-red">{{ player.velo }}</span>
                <span class="text-[7px] font-bold text-pawa-red/50 uppercase leading-none">km/h</span>
              </div>
            </td>
            <td v-for="s in pitcherStats" :key="s.key" class="py-2 text-center">
              <div class="flex justify-center">
                <PlayersStatBadge :value="player[s.key]" />
              </div>
            </td>
            <td class="py-2 text-center">
              <span class="text-[10px] font-black text-pawa-blue">{{ parsePitches(player.balls) ? Object.keys(parsePitches(player.balls)).length : 0 }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Expandable Content -->
    <Transition name="expand">
      <div v-if="expanded" class="mt-4 pt-4 border-t border-dashed border-pawa-brown/10">
        <!-- Pitcher Arsenal -->
        <div v-if="isPitcher" class="mb-4">
          <p class="text-[9px] font-black text-pawa-blue/40 uppercase tracking-widest mb-2 px-1">Pitch Arsenal</p>
          <div class="flex flex-wrap gap-2">
            <div 
              v-for="(level, pitch) in parsePitches(player.balls)" 
              :key="pitch" 
              class="pitch-pill flex items-center bg-pawa-blue/5 border border-pawa-blue/10 rounded-lg overflow-hidden"
            >
              <span class="pitch-name px-2 py-1 text-[10px] font-black text-pawa-blue">{{ pitch }}</span>
              <span class="pitch-level px-2 py-1 bg-pawa-blue text-white text-[10px] font-black">{{ level }}</span>
            </div>
          </div>
          <div v-if="!player.balls" class="text-[9px] font-black text-pawa-brown/20 italic px-1">No data</div>
        </div>

        <!-- Skills Section -->
        <div>
          <p class="text-[9px] font-black text-pawa-brown/30 uppercase tracking-widest mb-2 px-1">Special Abilities</p>
          <div class="flex flex-wrap gap-1.5 px-1">
            <PlayersSkillTag v-for="s in player.blueSkills" :key="s" :label="s" type="blue" />
            <PlayersSkillTag v-for="s in player.redSkills" :key="s" :label="s" type="red" />
            <PlayersSkillTag v-for="s in player.greenSkills" :key="s" :label="s" type="green" />
            <PlayersSkillTag v-for="s in player.hybridSkills" :key="s" :label="s" type="hybrid" />
          </div>
          <p v-if="!player.blueSkills.length && !player.redSkills.length && !player.greenSkills.length && !player.hybridSkills.length" class="text-[9px] font-black text-pawa-brown/20 italic">No special skills detected</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Expand Animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
  max-height: 500px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
}
</style>
