<template>
  <div>
    <AppLayout><NuxtPage /></AppLayout>
  </div>
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
