export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  components: true,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@vueuse/nuxt'],
  app: {
    head: {
      title: 'CANDOJO',
      meta: [{ name: 'description', content: 'CANDOJO｜可愛又實用的工具與筆記' }]
    }
  },
  future: { compatibilityVersion: 4 },
  css: ['~/assets/css/main.css'],
  // 確保 Tailwind 掃描正確的資料夾
  tailwindcss: {
    configPath: 'tailwind.config.ts', // 連結你剛才寫好的 config
    exposeConfig: true,
    viewer: true,
  }
})
