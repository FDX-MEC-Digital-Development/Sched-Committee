<template>
  <div class="text-base leading-7 text-gray-700 dark:text-gray-300 lg:max-w-lg">
    <p class="text-base font-semibold leading-7 text-indigo-600">
      {{ caption }}
    </p>
    <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
      {{ title }}
    </h1>
    <div class="max-w-xl text-black dark:text-white">
      <p v-if="$slots" class="mt-6">
        <slot />
      </p>
      <p v-for="(paragraph, index) in content" :key="index" :class="index == 0 && !$slots ? 'mt-6' : 'mt-8'">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
// define caption, title, and content (array) props
defineProps({
  caption: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
});
</script>

<style>

</style>
