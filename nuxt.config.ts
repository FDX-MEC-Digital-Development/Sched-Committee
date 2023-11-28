// https://nuxt.com/docs/api/configuration/nuxt-config
import { VitePWA } from 'vite-plugin-pwa';

export default defineNuxtConfig({
  app: {
    baseURL: process.env.NITRO_PRESET ? '/Sched-Committee/' : undefined, // this is for github pages
    pageTransition: { name: 'page', mode: 'out-in' },

  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  experimental: {
    payloadExtraction: true, // for PWA
  },
  nitro: {
    preset: process.env.NITRO_PRESET || undefined, // this is for github pages
  },
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
    // '@vite-pwa/nuxt',
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
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'ALPA Scheduling Committee',
          short_name: 'Scheduling',
          description: 'ALPA Scheduling Committee App',
          theme_color: '#18181b',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      })],
  },

  ssr: false,

});
