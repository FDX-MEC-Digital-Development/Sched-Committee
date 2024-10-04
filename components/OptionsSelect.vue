<template>
  <OptionWithLabel :label>
    <USelect v-model="model" :options class="border-gray-300 relative block cursor-pointer rounded-lg border bg-white px-3 py-2 shadow-sm focus:outline-none sm:flex sm:justify-between dark:bg-slate-700 " variant="none" />
  </OptionWithLabel>
</template>

<script lang="ts" setup>
const model = defineModel<string | number>();

defineProps<{
  options: string[],
  label: string,
}>();

</script>

<style>

</style>
