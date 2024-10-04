<template>
  <UInput v-model="model" :type class="border-gray-300 relative block cursor-pointer rounded-lg border bg-white px-3 py-2 shadow-sm focus:outline-none sm:flex sm:justify-between dark:bg-slate-700 " variant="none" :placeholder />
</template>

<script lang="ts" setup>
const model = defineModel<string | number>();

withDefaults(defineProps<{
  type?: 'text' | 'number',
  placeholder?: string
}>(), {
  type: 'text',
  placeholder: '',
});

</script>

<style>

</style>
