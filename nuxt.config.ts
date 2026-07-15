// https://nuxt.com/docs/api/configuration/nuxt-config
/// <reference types="node" />

export default defineNuxtConfig({

  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: true,
  },

  modules: [
    "@nuxt/icon",
    "@nuxtjs/sitemap",
  ],

  css: [
    "@/assets/styles/main.scss",
  ],

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,

    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId1: process.env.TELEGRAM_CHAT_ID_1,
    telegramChatId2: process.env.TELEGRAM_CHAT_ID_2,
  },

   
   site: {
    url: "https://armobilewash.netlify.app",
  },

  sitemap: {
    autoLastmod: true,
  },

  app: {
    head: {

      title: "AR Mobile Wash | Professional Mobile Car Wash in Vancouver",

      htmlAttrs: {
        lang: "en",
      },

      meta: [
        {
          charset: "utf-8",
           name:"google-site-verification", 
           content:"E4V-4f28namRJtxZYIkXvlmKebq-50khVg2_4whDd48", 
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content:
            "Professional mobile car wash service across Vancouver. Fast, reliable, and convenient booking for interior and exterior detailing.",
        },
        {
          name: "keywords",
          content:
            "mobile car wash Vancouver, car detailing Vancouver, mobile detailing, exterior car wash, interior car cleaning, AR Mobile Wash",
        },
        {
          name: "author",
          content: "AR Mobile Wash",
        },
        {
          name: "robots",
          content: "index, follow",
        },
        {
          name: "theme-color",
          content: "#D4AF37",
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