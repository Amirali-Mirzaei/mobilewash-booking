// https://nuxt.com/docs/api/configuration/nuxt-config
/// <reference types="node" />

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: true,
  },

  modules: ["@nuxt/icon"],

  css: ["@/assets/styles/main.scss"],

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,

    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId1: process.env.TELEGRAM_CHAT_ID_1,
    telegramChatId2: process.env.TELEGRAM_CHAT_ID_2,
  },

  app: {
    head: {
      title: "AR Professional Car Wash",

      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content:
            "Professional mobile car wash service across Vancouver. Fast, reliable, and convenient booking.",
        },
      ],

     link: [
       {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
       },
       {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96x96.png",
       },
       {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
       },
       {
        rel: "manifest",
        href: "/site.webmanifest",
       },
      ],
    },
  },
});