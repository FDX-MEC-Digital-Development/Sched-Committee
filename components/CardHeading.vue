<template>
  <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 dark:bg-gray-900">
    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
      {{ title }}
    </h3>
    <p v-if="description" class="mt-1 text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style>

</style>
