export default {
    theme: {
        extend: {
            colors: {
                pawa: {
                    // 主背景：改為乾淨的冷灰色調（Slate），移除粉色感
                    cream: '#F8FAFC',
                    // 內層：純白
                    creamLight: '#FFFFFF',
                    // 次要邊框：Slate 200
                    creamDark: '#E2E8F0',
                    // 靈魂色：深藍灰（Slate 800），比原本的咖啡色更專業且契合 Logo
                    brown: '#1E293B',
                    black: '#333333',
                    black2: '#666666',
                    blue: '#4C97FF',      // Logo 鮮藍色
                    blueInner: '#E0F2FE', // 稍微加深藍 (Sky 100)
                    blueDark: '#2B66D6',  // Hover 專用深藍
                    red: '#FF4D4D',       // 精靈球紅
                    redInner: '#FEE2E2',  // 稍微加深紅 (Red 100)
                    redDark: '#CC3D3D',   // Hover 專用深紅
                    green: '#59C059',     // 生機綠
                    greenInner: '#F0FDF4',
                    greenDark: '#388038', // Hover 專用深綠
                    yellow: '#FFBF00',    // 金幣黃
                    yellowInner: '#FEF9C3', // 稍微加深黃 (Yellow 100)
                    yellowDark: '#CC9900',  // Hover 專用深黃


                },
                team: {
                    'fg': '#2563EB',
                    'ul': '#F97316',
                    'cb': '#FACC15',
                    'wd': '#DC2626',
                    'th': '#0F766E',
                    'lm': '#7F1D1D',
                }

            },
            boxShadow: {
                // 只定義單一層級的陰影，複合陰影交給 CSS
                block: '0 8px 0 rgba(0,0,0,.18)',
                blockSm: '0 5px 0 rgba(0,0,0,.18)',
                blockHover: '0 10px 0 rgba(0,0,0,.22)',
                insetSoft: 'inset 0 1px 0 rgba(255,255,255,.55)'
            },
            transitionTimingFunction: {
                pop: 'cubic-bezier(.2, 1.3, .3, 1)'
            },
            keyframes: {
                wobble: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-1.5deg)' },
                    '75%': { transform: 'rotate(1.5deg)' }
                }
            },
            animation: {
                wobble: 'wobble 350ms ease-in-out'
            }
        }
    },
    safelist: [
        {
            pattern: /bg-pawa-(blue|blue2|purple|green|yellow|orange|red|pink|cyan)/,
            variants: ['hover', 'active'],
        },
    ],
    content: [
        "./app/**/*.{vue,js,ts,jsx,tsx}",
        "./app.vue"
    ],
    plugins: [require('@tailwindcss/typography')]
}
