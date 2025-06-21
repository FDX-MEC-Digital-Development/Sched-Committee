<template>
  <div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <NuxtLink
      v-for="item in fatigueItems"
      :key="item.href"
      :to="item.href"
      class="group relative rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 sm:px-6 sm:py-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div>
        <span class="inline-flex rounded-lg p-2 sm:p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
          <Icon :name="item.icon" class="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
      </div>
      <div class="mt-3 sm:mt-4">
        <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
          {{ item.title }}
        </h3>
        <p class="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {{ item.description }}
        </p>
      </div>
      <span class="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-400 group-hover:text-gray-500">
        <Icon name="heroicons:chevron-right" class="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

interface FatigueItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

defineProps({
  fatigueItems: {
    type: Array as PropType<FatigueItem[]>,
    required: true,
  },
});
</script>
