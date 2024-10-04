<template>
  <div class="mt-6 space-y-6">
    <div class="container">
      <div v-if="label" class="label">
        <label for="comments" class="font-medium text-gray-900 dark:text-white">{{ label }}</label>
      </div>
      <div class="checkbox">
        <UCheckbox :model-value="model" @update:model-value="(event) => model = event" />
      </div>
      <div class="caption text-sm leading-6">
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
  label?: string,
  caption: string
}>();
</script>

<style>
.container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem 0.5rem; /* Adjust the gap as needed */
  align-items: center;
}

.label {
  grid-column: span 2;
}

.checkbox {
  grid-column: 1;
}

.caption {
  grid-column: 2;
}
</style>
