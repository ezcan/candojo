// centralized player logic and styling utilities

export interface StatGrade {
    label: string
    color: string
}

/**
 * Get S-G grade label and color based on value
 */
export const getStatGrade = (val: any): StatGrade => {
    const v = parseInt(val) || 0
    if (v >= 90) return { label: 'S', color: '#A855F7' } // Purple
    if (v >= 80) return { label: 'A', color: '#EC4899' } // Pink
    if (v >= 70) return { label: 'B', color: '#EF4444' } // Red
    if (v >= 60) return { label: 'C', color: '#F97316' } // Orange
    if (v >= 50) return { label: 'D', color: '#EAB308' } // Yellow
    if (v >= 40) return { label: 'E', color: '#22C55E' } // Green
    if (v >= 20) return { label: 'F', color: '#3B82F6' } // Blue
    return { label: 'G', color: '#94A3B8' } // Gray
}

/**
 * Determine if a player is a pitcher
 */
export const isPitcher = (p: any): boolean => {
    if (!p) return false
    const target = `${p.pos}${p.type}`.toUpperCase()
    return target.includes('投手') || target.includes('PITCHER') || target.includes(' P ') || p.type === 'P'
}

/**
 * Get color theme based on position/type
 */
export const getPosColor = (p: any): string => {
    if (isPitcher(p)) return '#FF4D4D' // pawa.red
    const pos = (p.pos || '').toUpperCase()
    if (pos.includes('捕') || pos.includes(' C ')) return '#4C97FF' // pawa.blue

    // Infield: Includes specific positions and general IF markers
    if (
        pos.includes('內') || pos.includes('IF') || pos.includes('INF') ||
        pos.includes('一') || pos.includes('二') || pos.includes('三') || pos.includes('游') ||
        pos.includes('1B') || pos.includes('2B') || pos.includes('3B') || pos.includes('SS')
    ) {
        return '#FFBF00' // pawa.yellow
    }

    // Outfield
    if (pos.includes('外') || pos.includes('OF')) return '#59C059' // pawa.green

    return '#1E293B' // pawa.brown
}

export const batterStats = [
    { key: 'con', short: '巧' },
    { key: 'pow', short: '力' },
    { key: 'spd', short: '走' },
    { key: 'arm', short: '肩' },
    { key: 'fld', short: '守' },
    { key: 'err', short: '捕' }
]

export const pitcherStats = [
    { key: 'ctl', label: '控球' },
    { key: 'sta', label: '體力' }
]

/**
 * Get team-specific background and text colors
 */
export const getTeamStyle = (team: string): { backgroundColor: string, color: string } => {
    const map: Record<string, { backgroundColor: string, color: string }> = {
        '中信兄弟': { backgroundColor: '#FACC15', color: '#1E293B' },
        '統一獅': { backgroundColor: '#F97316', color: '#FFFFFF' },
        '富邦悍將': { backgroundColor: '#2563EB', color: '#FFFFFF' },
        '味全龍': { backgroundColor: '#DC2626', color: '#FFFFFF' },
        '台鋼雄鷹': { backgroundColor: '#0F766E', color: '#FFFFFF' },
        '樂天桃猿': { backgroundColor: '#7F1D1D', color: '#FFFFFF' }
    }
    const result = map[team]
    return result || { backgroundColor: '#e2e8f0', color: '#64748b' }
}

/**
 * Split pitch string into structured data
 */
export const parsePitches = (ballsStr: string): Record<string, string> => {
    if (!ballsStr) return {}
    const res: Record<string, string> = {}
    const segments = ballsStr.split(/[,,|/、\s]+/).filter(b => b.trim())
    segments.forEach(seg => {
        // Matches "PitchName:Level" or "PitchName Level"
        const match = seg.match(/^(.+?)[:\s]*(\d+)$/)
        if (match && match[1] && match[2]) {
            res[match[1]] = match[2]
        } else {
            res[seg] = '-'
        }
    })
    return res
}

/**
 * Simple split for pitch names without levels (for preview)
 */
export const splitPitchNames = (ballsStr: string): string[] => {
    if (!ballsStr) return []
    return ballsStr.split(/[,,|/、\s]+/).filter(b => b.trim())
}
