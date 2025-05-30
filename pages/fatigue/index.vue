<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="text-center">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Fatigue Management
      </h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Comprehensive tools and resources for fatigue assessment and management
      </p>
    </div>

    <!-- Quick Navigation Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="item in fatigueItems"
        :key="item.href"
        :to="item.href"
        class="group relative rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
      >
        <div>
          <span class="inline-flex rounded-lg p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
            <Icon :name="item.icon" class="h-6 w-6" />
          </span>
        </div>
        <div class="mt-4">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </div>
        <span class="absolute right-4 top-4 text-gray-400 group-hover:text-gray-500">
          <Icon name="heroicons:chevron-right" class="h-5 w-5" />
        </span>
      </NuxtLink>
    </div>    <!-- Child Route Content -->
    <div class="mt-8">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'fatigue',
});

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
