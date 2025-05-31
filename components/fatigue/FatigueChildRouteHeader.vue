<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4">
    <!-- Back Button and Current Page -->
    <div class="flex items-center justify-between mb-3 sm:mb-4">
      <div class="flex items-center space-x-2 sm:space-x-3">
        <NuxtLink
          to="/fatigue"
          class="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <Icon name="heroicons:arrow-left" class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Back to Overview
        </NuxtLink>
      </div>
      <div class="flex items-center space-x-1 sm:space-x-2">
        <Icon :name="currentPageItem?.icon || 'heroicons:document'" class="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
        <span class="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{{ currentPageItem?.title }}</span>
      </div>
    </div>

    <!-- Horizontal Navigation Pills (Hidden on Mobile, Shown on SM+) -->
    <div class="hidden sm:flex flex-wrap gap-2">
      <NuxtLink
        v-for="item in fatigueItems"
        :key="item.href"
        :to="item.href"
        :class="[
          'inline-flex items-center px-3 py-2 text-xs font-medium rounded-full transition-colors',
          route.path === item.href
            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        ]"
      >
        <Icon :name="item.icon" class="h-3 w-3 mr-2" />
        {{ item.title }}
      </NuxtLink>
    </div>

    <!-- Mobile Navigation DropdownMenu -->
    <div class="sm:hidden">
      <UDropdown
        :items="dropdownMenuItems"
        :ui="{
          content: 'w-64',
        }"
      >
        <UButton
          :key="currentPageItem?.href"
          :icon="currentPageItem?.icon || 'heroicons:bars-3'"
          :label="currentPageItem?.title || 'Navigate'"
          color="neutral"
          variant="outline"
          trailing-icon="heroicons:chevron-down"
          block
        />
      </UDropdown>
    </div>
    <!-- Slot for Child Route Content -->
    <div class="mt-8">
      <slot name="page-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
// useRoute will be auto-imported by Nuxt 3

interface FatigueItem {
  title: string;
  description?: string; // Optional as not directly used by all parts of this header for its own rendering
  href: string;
  icon: string;
}

interface DropdownMenuContentItem {
  label: string;
  icon: string;
  to: string;
}

defineProps({
  fatigueItems: {
    type: Array as PropType<FatigueItem[]>,
    required: true,
  },
  currentPageItem: {
    type: Object as PropType<FatigueItem | undefined>,
    default: undefined,
  },
  dropdownMenuItems: {
    type: Array as PropType<DropdownMenuContentItem[][]>,
    required: true,
  },
});

const route = useRoute();
</script>
