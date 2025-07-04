// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // baseURL: process.env.NITRO_PRESET ? '/Sched-Committee/' : undefined, // this is for github pages
    pageTransition: { name: 'page', mode: 'out-in' },

  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],

  },
  nitro: {
    preset: 'azure',
  },
  experimental: {
    payloadExtraction: true, // for PWA
    appManifest: true,
  },
  // nitro: {
  //   preset: process.env.NITRO_PRESET || undefined, // this is for github pages
  // },
  // head: [{ name: 'viewport', content: 'initial-scale=1, user-scalable=no, width=device-width, height=device-height, viewport-fit=cover' }],

  css: [
    '~/assets/css/main.css',
  ],
  colorMode: {
    preference: 'dark',
  },
  components:
  [{
    pathPrefix: false,
    path: '~/components',

  }],

  devtools: { enabled: false },
  modules: [
    // Simple usage
    '@nuxtjs/eslint-module',
    // '@nuxtjs/tailwindcss', // nuxtUI already has tailwind and color mode
    'nuxt-icon',
    'nuxt-headlessui',
    // '@nuxtjs/ionic',
    '@vite-pwa/nuxt',
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
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: 'FDX ALPA Scheduling Committee',
      short_name: 'Scheduling Committee',
      description: 'FDX ALPA Scheduling Committee',
      theme_color: '#18181b',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: { installPrompt: true },
  },
  ui: {
    icons: ['mdi', 'heroicons', 'heroicons-solid'],
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'sodipodi:namedview' || tag === 'pwa-install',
    },
  },

  ssr: false,
  router: {
    options: {
      hashMode: true, // use hash mode for routing for SPA
    },
  },

});
