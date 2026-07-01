// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
   devtools: { enabled: true },
     modules: ['@nuxt/icon'],
       css: ['@/assets/styles/main.scss'],
       app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap',
        },
      ],
    },
  },
})
