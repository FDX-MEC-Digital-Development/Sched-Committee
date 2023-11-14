<template>
  <div class="p-4 bg-white max-w-lg">
    {{ title }}
    <span class="absolute inset-0" />
    <p class="mt-1 text-gray-600">
      {{ description }}<slot />
    </p>
    <p v-if="link !== undefined">
      <a :href="link">{{ linkText }}</a>
    </p>
    <p class="text-center">
      <UButton icon="i-heroicons-x-circle" variant="ghost" @click="$emit('close')" />
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<
  {
    title?: string
    description: string
    link?: string
    linkText?: string
  }
>();

defineEmits(['close']);

</script>

<style>

</style>
