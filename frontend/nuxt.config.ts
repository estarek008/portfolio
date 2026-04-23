export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  nitro: {
     preset: 'static',
    output: {
      dir: 'dist',
      publicDir: 'dist'
    }
  },

  app: {
    head: {
      title: 'Esraa Tarek Sadek — AI & Analytics Leader',
      meta: [
        { name: 'description', content: 'AI & Generative AI Specialist | Technical Leader | Applied Researcher — Portfolio of Esraa Tarek Sadek' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Esraa Tarek Sadek — AI & Analytics Leader' },
        { property: 'og:description', content: 'AI & Generative AI Specialist | Technical Leader | Applied Researcher' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8787',
    },
  },

  modules: [],

  compatibilityDate: '2024-11-01',
})
