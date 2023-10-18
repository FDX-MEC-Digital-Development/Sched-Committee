<template>
  <div
    class="bg-red-800"
  >
    <header class="py-10 mt-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">
          {{ title }}
        </h1>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style>

</style>
