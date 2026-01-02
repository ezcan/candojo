// app/composables/usePlayers.ts
export const usePlayers = () => {
    const apiURL = 'https://script.google.com/macros/s/AKfycbzBxjMvt6k2QzHx_iSiuETUoOdYRDsZBgEBfRbPikmDI_mXjSYfrDeBj22kCl_5oHdu3w/exec'
    const CACHE_KEY = 'candojo_players_cache_v1'
    const CACHE_TTL = 3600 * 1000 // 1 hour in ms

    const fetchAllPlayers = async (limit?: number) => {
        // 1. Check client-side cache
        if (import.meta.client) {
            const cached = localStorage.getItem(CACHE_KEY)
            if (cached) {
                try {
                    const { data, timestamp } = JSON.parse(cached)
                    const isExpired = Date.now() - timestamp > CACHE_TTL
                    if (!isExpired) {
                        return limit ? data.slice(0, limit) : data
                    }
                } catch (e) {
                    localStorage.removeItem(CACHE_KEY)
                }
            }
        }

        try {
            const data = await $fetch<any[]>(apiURL)
            // 2. 轉換並標準化資料
            const normalized = data.map((p, index) => ({
                uid: p.UID || p.uid || `player-${index}`,
                name: p.Name || p.name,
                team: p.Team || p.team,
                no: p.No || p.no,
                pos: p.Pos || p.pos,
                type: p.Type || p.type,
                hand: p.Hand || p.hand || '',
                // 打者屬性
                traj: p.Traj || p.彈道 || p.traj,
                con: p.Con || p.巧打 || p.con,
                pow: p.Pow || p.力量 || p.pow,
                spd: p.Spd || p.Run || p.走力 || p.spd,
                arm: p.Arm || p.肩力 || p.arm,
                fld: p.Fld || p.守力 || p.fld,
                err: p.Err || p.Speed || p.速度 || p.捕球 || p.err,
                // 投手屬性
                velo: p.Velo || p.球速 || p.最快球速 || p.velo,
                ctl: p.Ctl || p.Ctrl || p.控球 || p.ctl || p.CTL,
                sta: p.Sta || p.Stm || p.Stam || p.體力 || p.sta || p.STA,
                balls: p.Pitchs || p.Balls || p.變化球種 || p.balls || p.BALLS,
                // 技能類 (確保為陣列)
                blueSkills: Array.isArray(p.Blue_skills) ? p.Blue_skills : (p.Blue_skills ? p.Blue_skills.split(/[,,|/、\s]+/).filter((s: string) => s.trim()) : []),
                redSkills: Array.isArray(p.Red_skills) ? p.Red_skills : (p.Red_skills ? p.Red_skills.split(/[,,|/、\s]+/).filter((s: string) => s.trim()) : []),
                greenSkills: Array.isArray(p.Green_skills) ? p.Green_skills : (p.Green_skills ? p.Green_skills.split(/[,,|/、\s]+/).filter((s: string) => s.trim()) : []),
                hybridSkills: Array.isArray(p.Hybrid_skills) ? p.Hybrid_skills : (p.Hybrid_skills ? p.Hybrid_skills.split(/[,,|/、\s]+/).filter((s: string) => s.trim()) : [])
            })).reverse() // 取最新的

            // 3. Store in cache
            if (import.meta.client) {
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data: normalized,
                    timestamp: Date.now()
                }))
            }

            return limit ? normalized.slice(0, limit) : normalized
        } catch (e) {
            console.error('Fetch error:', e)
            return []
        }
    }

    return { fetchAllPlayers }
}