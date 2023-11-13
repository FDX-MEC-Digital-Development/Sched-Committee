// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NITRO_PRESET ? '/Sched-Committee/' : undefined, // this is for github pages
    pageTransition: { name: 'page', mode: 'out-in' },

  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  nitro: {
    preset: process.env.NITRO_PRESET || undefined,
  },
  head: [{ name: 'viewport', content: 'initial-scale=1, user-scalable=no, width=device-width, height=device-height, viewport-fit=cover' }],

  css: [
    '~/assets/css/main.css',
  ],
  colorMode: {
    preference: 'dark',
  },

  devtools: { enabled: false },
  modules: [
    // Simple usage
    '@nuxtjs/eslint-module',
    // '@nuxtjs/tailwindcss', // nuxtUI already has tailwind and color mode
    'nuxt-icon',
    'nuxt-headlessui',
    // '@nuxtjs/ionic',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@hypernym/nuxt-anime',
    '@formkit/auto-animate/nuxt',
  ],
  eslint: {
    /* module options */
  },
  headlessui: {
    prefix: 'Headless',
  },

  ssr: false,

});
