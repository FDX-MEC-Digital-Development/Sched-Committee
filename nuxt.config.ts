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
    '@nuxtjs/ionic',
    '@vueuse/nuxt',
    '@nuxt/ui', '@hypernym/nuxt-anime',
  ],
  eslint: {
    /* module options */
  },
  headlessui: {
    prefix: 'Headless',
  },
  ionic: {
    integrations: {
      meta: false,
      pwa: false,
      router: true,
      icons: false,
      //
    },
    css: {
      core: true,
      basic: false,
      utilities: false,
      //
    },
    config: {
      //
    },
  },
  ssr: false,

});
