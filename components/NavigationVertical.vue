<template>
  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" class="-mx-2 space-y-1">
          <li v-for="item in navigation" :key="item.name">
            <NuxtLink :to="item.href" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']" @click="$emit('routeChange')">
              <Icon :name="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>

      <slot />
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import type { NavigationLink } from '~/sched-committee-types';

defineProps({
  navigation: {
    type: Array<NavigationLink>,
    required: true,
  },
});

defineEmits(['routeChange']);

</script>

<style>

</style>
