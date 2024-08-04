<template>
  <div class="mt-6 space-y-6">
    <div class="relative flex gap-x-3">
      <div class="flex h-6 items-center">
        <UCheckbox :model-value="model" @update:model-value="(event) => model = event" />
      </div>
      <div class="text-sm leading-6">
        <label for="comments" class="font-medium text-gray-900 dark:text-white">{{ label }}</label>
        <p class="text-gray-500">
          {{ caption }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const model = defineModel<boolean>();
defineProps<{
  label: string,
  caption: string
}>();
</script>

<style>

</style>
