<template>
  <main class="-mt-8">
    <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div class="rounded-lg bg-grey dark:bg-gray-900 px-5 py-6 sm:px-6" aria-label="title-section">
        <CardHeading :title :description />
      </div>
      <div class="rounded-lg bg-grey dark:bg-gray-900 px-6    py-6  sm:px-6">
        <slot name="form" />
      </div>
      <div class="flex items-center justify-end gap-x-6">
        <slot name="button" />
      </div>
      <div v-show="isResultsVisible" class="rounded-lg bg-grey dark:bg-gray-900 px-5 py-6  sm:px-6">
        <slot name="results" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  title: string,
  description?: string,
  isResultsVisible: boolean,
}>(),
{
  description: undefined,
  isResultsVisible: false,
});

</script>
