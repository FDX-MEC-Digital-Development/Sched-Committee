<template>
  <nav class="space-y-4">
    <ul class="space-y-2">
      <li v-for="item in menuItems" :key="item.id" class="w-full">
        <component
          :is="item.isExternalLink ? 'a' : NuxtLink"
          v-bind="item.isExternalLink ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : { to: item.href }"
          class="w-full px-4 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 block"
          :class="{ 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300': !item.isExternalLink && $route.path === item.href }"
        >
          {{ item.label }}
          <span v-if="item.isExternalLink" class="ml-1 inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </span>
        </component>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
interface MenuItem {
  id: string
  label: string
  href: string
  isExternalLink?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: 'recognize-fatigue',
    label: 'Recognize Fatigue Checklist (Are you Cognitively Impaired?)',
    href: '/fatigue/recognize-fatigue',
  },
  {
    id: 'ops-self-assessment',
    label: 'Ops Self-Assessment Checklist',
    href: '/fatigue/ops-self-assessment',
  },
  {
    id: 'im-safe',
    label: 'IM SAFE Checklist',
    href: '/fatigue/im-safe',
  },
  {
    id: 'carma',
    label: 'How To Call Out Fatigued Checklist',
    href: '/fatigue/CallingInFatigued',
  },
  {
    id: 'trip-removal',
    label: 'Trip Removal and Compensation',
    href: '/fatigue/trip-removal',
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '/fatigue/reports',
  },
  {
    id: 'frmc-home',
    label: 'FRMC Home Page',
    href: 'https://fdx.alpa.org/Committees/Fatigue-Risk-Management-Committee',
    isExternalLink: true,
  },
  {
    id: 'frmc-contact',
    label: 'FRMC Contact Info',
    href: '/fatigue/frmc-contact',
  },
  {
    id: 'additional-resources',
    label: 'Additional Resources (Coming Soon)',
    href: '/fatigue/additional-resources',
  },
];
</script>
