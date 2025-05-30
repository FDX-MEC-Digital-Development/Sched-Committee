<template>
  <div class="space-y-8 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="text-center">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Fatigue Management
      </h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Comprehensive tools and resources for fatigue assessment and management
      </p>
    </div>

    <!-- Navigation: Full Cards on Base Route -->
    <div v-if="isBaseRoute" class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

    <!-- Navigation: Compact Header on Child Routes -->
    <div v-else class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4">
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
      </div>      <!-- Mobile Navigation Select -->
      <div class="sm:hidden">
        <USelect
          v-model="selectedPage"
          :options="selectOptions"
          placeholder="Navigate to another section"
          @change="navigateToPage"
        />
      </div>
    </div>

    <!-- Child Route Content -->
    <div class="mt-8 ">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const selectedPage = ref('');

// Check if we're on the base fatigue route
const isBaseRoute = computed(() => route.path === '/fatigue');

// Find the current page item for display in compact navigation
const currentPageItem = computed(() => {
  return fatigueItems.find(item => item.href === route.path);
});

// Options for USelect component
const selectOptions = computed(() => {
  return fatigueItems.map(item => ({
    label: item.title,
    value: item.href,
  }));
});

// Function to navigate when selection changes
const navigateToPage = (selectedValue: string) => {
  if (selectedValue) {
    navigateTo(selectedValue);
  }
};

const fatigueItems = [
  {
    title: 'Recognize Fatigue',
    description: 'Signs and symptoms of cognitive impairment',
    href: '/fatigue/recognize-fatigue',
    icon: 'heroicons:eye',
  },
  {
    title: 'Self-Assessment',
    description: 'Evaluate your readiness for duty',
    href: '/fatigue/ops-self-assessment',
    icon: 'heroicons:clipboard-document-check',
  },
  {
    title: 'IM SAFE Checklist',
    description: 'Standard aviation safety assessment',
    href: '/fatigue/im-safe',
    icon: 'heroicons:shield-check',
  },
  {
    title: 'Call Out Fatigued',
    description: 'CARMA checklist for fatigue calls',
    href: '/fatigue/carma',
    icon: 'heroicons:phone',
  },
  {
    title: 'Trip Removal',
    description: 'Understanding compensation and procedures',
    href: '/fatigue/trip-removal',
    icon: 'heroicons:document-text',
  },
  {
    title: 'Reports',
    description: 'Filing fatigue reports and documentation',
    href: '/fatigue/reports',
    icon: 'heroicons:document-arrow-up',
  },
  {
    title: 'FRMC Contact',
    description: 'Fatigue Risk Management Committee info',
    href: '/fatigue/frmc-contact',
    icon: 'heroicons:users',
  },
  {
    title: 'Additional Resources',
    description: 'More tools and pilot narratives',
    href: '/fatigue/additional-resources',
    icon: 'heroicons:book-open',
  },
];
</script>
