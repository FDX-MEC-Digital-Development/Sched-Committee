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
    <FatigueNavigationCardGrid v-if="isBaseRoute" :fatigue-items="fatigueItems" />

    <!-- Navigation: Compact Header on Child Routes -->
    <FatigueChildRouteHeader
      v-else
      :fatigue-items="fatigueItems"
      :current-page-item="currentPageItem"
      :dropdown-menu-items="dropdownMenuItems"
    >
      <template #page-content>
        <NuxtPage />
      </template>
    </FatigueChildRouteHeader>
  </div>
</template>

<script setup lang="ts">
import FatigueNavigationCardGrid from '~/components/fatigue/FatigueNavigationCardGrid.vue';
import FatigueChildRouteHeader from '~/components/fatigue/FatigueChildRouteHeader.vue';

interface FatigueItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface DropdownMenuContentItem {
  label: string;
  icon: string;
  to: string;
}

const route = useRoute();

// Check if we're on the base fatigue route
const isBaseRoute = computed(() => route.path === '/fatigue');

const fatigueItems: FatigueItem[] = [
  {
    title: 'Recognize Fatigue',
    description: 'Signs and symptoms of cognitive impairment',
    href: '/fatigue/RecognizeFatigue',
    icon: 'heroicons:eye',
  },
  {
    title: 'Self-Assessment',
    description: 'Evaluate your readiness for duty',
    href: '/fatigue/OpsSelfAssessment',
    icon: 'heroicons:clipboard-document-check',
  },
  {
    title: 'IM SAFE Checklist',
    description: 'Standard aviation safety assessment',
    href: '/fatigue/ImSafe',
    icon: 'heroicons:shield-check',
  },
  {
    title: 'Calling In Fatigued',
    description: 'How to call in fatigued',
    href: '/fatigue/CallingInFatigued',
    icon: 'heroicons:phone',
  },
  {
    title: 'Trip Removal',
    description: 'Understanding compensation and procedures',
    href: '/fatigue/TripRemoval',
    icon: 'heroicons:document-text',
  },
  {
    title: 'Reports',
    description: 'Filing fatigue reports and documentation',
    href: '/fatigue/Reports',
    icon: 'heroicons:document-arrow-up',
  },
  {
    title: 'FRMC Contact',
    description: 'Fatigue Risk Management Committee info',
    href: '/fatigue/FrmcContact',
    icon: 'heroicons:users',
  },
  {
    title: 'Additional Resources',
    description: 'More tools and pilot narratives',
    href: '/fatigue/AdditionalResources',
    icon: 'heroicons:book-open',
  },
];

// Find the current page item for display in compact navigation
const currentPageItem = computed(() => {
  return fatigueItems.find(item => item.href === route.path);
});

// Items for UDropdownMenu component
const dropdownMenuItems = computed((): DropdownMenuContentItem[][] =>
  fatigueItems.map(item => ([{
    label: item.title,
    icon: item.icon,
    to: item.href,
  }])),
);

</script>
