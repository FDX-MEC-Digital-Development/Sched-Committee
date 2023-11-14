<template>
  <div>
    <div class=" flex-auto  bg-white p-4 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
      <div class="relative rounded-lg p-4 hover:bg-gray-50">
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
    </div>
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
