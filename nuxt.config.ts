import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxt/eslint',
    '@nuxt/a11y',
    'motion-v/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://cozicraftmc.com',
      discordUrl: process.env.NUXT_PUBLIC_DISCORD_URL || '',
      tebexStoreUrl: process.env.NUXT_PUBLIC_TEBEX_STORE_URL || '',
      contactUrl: process.env.NUXT_PUBLIC_CONTACT_URL || 'mailto:hello@cozicraftmc.com',
    },
  },
  app: {
    head: {
      title: 'CoziCraft',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content: 'CoziCraft is a Minecraft Java community server with guides, updates, rules, and wiki resources.',
        },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
  compatibilityDate: '2024-04-03',
})
