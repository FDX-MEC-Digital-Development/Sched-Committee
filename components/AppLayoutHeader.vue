<template>
  <button type="button" class="-m-2.5 p-2.5 text-gray-200 lg:hidden" @click="$emit('sidebarOpen')">
    <span class="sr-only">Open sidebar</span>
    <Icon name="heroicons:bars-3" class="h-6 w-6" aria-hidden="true" />
  </button>
  <div class="flex-1 text-sm font-semibold leading-6 text-white">
    {{ navigation.find((item) => item.current)?.name }}
  </div>
  <Icon name="heroicons:sun" class="text-white" />
</template>

<script lang="ts" setup>
import { NavigationLink } from '~/sched-committee-types';

defineProps({
  navigation: {
    type: Array<NavigationLink>,
    required: true,
  },
});

defineEmits(['sidebarOpen']);
</script>

<style>

</style>
