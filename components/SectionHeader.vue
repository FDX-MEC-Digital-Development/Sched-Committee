<template>
  <div class=" border-gray-200 pb-5">
    <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
      {{ title }}
    </h3>
    <p v-if="subtitle || $slots" class="mt-2 max-w-4xl text-md text-gray-900 dark:text-white leading-8">
      {{ subtitle }}<slot />
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style>

</style>
