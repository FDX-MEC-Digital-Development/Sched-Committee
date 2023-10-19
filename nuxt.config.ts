// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  colorMode: {
    preference: 'light',
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
    '@nuxt/ui', '@hypernym/nuxt-anime',
  ],
  eslint: {
    /* module options */
  },
  headlessui: {
    prefix: 'Headless',
  },

  ssr: false,

});
