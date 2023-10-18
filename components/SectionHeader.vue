<template>
  <div class="border-b border-gray-200 pb-5">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      {{ title }}
    </h3>
    <p v-if="subtitle" class="mt-2 max-w-4xl text-sm text-gray-500">
      {{ subtitle }}
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
