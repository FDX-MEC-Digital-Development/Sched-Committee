<template>
  <div>
    <AppLayout>
      <NuxtPwaAssets />
      <NuxtPage />
    </AppLayout>
  </div>
</template>

<script setup lang="ts">

useHead({
  title: 'Scheduling Committee',
  meta: [
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    { name: 'description', content: 'ALPA Scheduling Committee' },
    { name: 'theme-color', content: '#18181b' },
  ],
  link: [
    { rel: 'icon', href: 'favicon.ico' },
    { rel: 'apple-touch-icon', href: 'apple-touch-icon.png', sizes: '180x180' },
    { rel: 'mask-icon', href: 'mask-icon.svg', color: '#FFFFFF' },
  ],
  bodyAttrs: {
    class: 'h-full',
  },
  htmlAttrs: {
    class: 'h-full bg-gray-100',
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'Scheduling Committee';
  },
});

</script>

<style>
.page-enter-active {
  transition: all 0.4s;
  transform: translateY(20px);
  opacity: 0;
}

.page-leave-active {
  transition: all 0.4s;
  transform: translateY(20px);
  opacity: 0;
}

.page-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.page-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
