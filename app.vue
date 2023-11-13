<template>
  <div>
    <AppLayout class="safe-area-inset-bottom safe-area-inset-top safe-area-inset-left safe-area-inset-right">
      <NuxtPage />
    </AppLayout>
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

<style scoped>
:root {
  --safe-area-inset-top: env(safe-area-inset-top);
  --safe-area-inset-bottom: env(safe-area-inset-bottom);
  --safe-area-inset-left: env(safe-area-inset-left);
  --safe-area-inset-right: env(safe-area-inset-right);
}

.safe-area-inset-top {
  padding-top: var(--safe-area-inset-top);
}

.safe-area-inset-bottom {
  padding-bottom: var(--safe-area-inset-bottom);
}

.safe-area-inset-left {
  padding-left: var(--safe-area-inset-left);
}

.safe-area-inset-right {
  padding-right: var(--safe-area-inset-right);
}

</style>
