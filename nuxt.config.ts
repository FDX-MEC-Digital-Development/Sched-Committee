// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: 'light',
  },

  devtools: { enabled: true },
  modules: [
    // Simple usage
    '@nuxtjs/eslint-module',
    // '@nuxtjs/tailwindcss',
    'nuxt-icon',
    'nuxt-headlessui',
    // '@nuxtjs/ionic',
    '@vueuse/nuxt',
    '@nuxt/ui',
  ],
  eslint: {
    /* module options */
  },
  headlessui: {
    prefix: 'Headless',
  },
  ssr: false,

});
