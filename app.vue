<template>
  <ion-app>
    <AppLayout class="safe-area-inset-bottom safe-area-inset-top safe-area-inset-left safe-area-inset-right">
      <NuxtPage />
    </AppLayout>
  </ion-app>
</template>

<script setup lang="ts">
useHead({
  title: 'Scheduling Committee',
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
