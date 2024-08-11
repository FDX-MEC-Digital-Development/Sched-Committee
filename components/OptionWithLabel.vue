<template>
  <div class="mt-6 space-y-6 py-2">
    <div class="relative flex gap-x-3">
      <div class="flex h-6 items-center">
        <slot />
      </div>
      <div class="text-sm leading-6">
        <label for="comments" class="font-medium text-gray-900 dark:text-white">{{ label }}</label>
        <p v-if="caption" class="text-gray-500 dark:text-white">
          {{ caption }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

defineProps<{
  label: string,
  caption?: string
}>();
</script>

<style>

</style>
