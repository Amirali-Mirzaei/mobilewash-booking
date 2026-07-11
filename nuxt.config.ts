// https://nuxt.com/docs/api/configuration/nuxt-config
/// <reference types="node" />

export default defineNuxtConfig({

  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxt/icon'
  ],

  css: [
    '@/assets/styles/main.scss'
  ],

  runtimeConfig: {
    
  mongodbUri: process.env.MONGODB_URI,

  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramChatId1: process.env.TELEGRAM_CHAT_ID_1,
  telegramChatId2: process.env.TELEGRAM_CHAT_ID_2,
},

  app: {

    head: {

      link: [

        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },

        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },

        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap'
        }

      ]

    }

  }

})