<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <button type="button" class="-m-2.5 p-2.5 text-gray-800 lg:hidden" @click="$emit('sidebarOpen')">
          <span class="sr-only">Open sidebar</span>
          <Icon name="heroicons:bars-3" class="h-6 w-6" aria-hidden="true" />
        </button>
      </ion-buttons>
      <ion-title>
        {{ navigation.find((item) => item.current)?.name }}
      </ion-title>
      <ion-buttons slot="end">
        <ColorModeButton />
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts" setup>
import type { NavigationLink } from '~/sched-committee-types';

defineProps({
  navigation: {
    type: Array<NavigationLink>,
    required: true,
  },
});

defineEmits(['sidebarOpen']);
</script>

<style scoped>
ion-header ion-toolbar:first-of-type{
    padding-top: var(--ion-safe-area-top, 0);
}
</style>
