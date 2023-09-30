// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // Simple usage
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-headlessui",
    "@nuxtjs/ionic",
  ],
  eslint: {
    /* module options */
  },
  headlessui: {
    prefix: "Headless",
  },
  ssr: false,
});
