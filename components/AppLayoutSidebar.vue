<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
    <div class="flex h-16 shrink-0 items-center">
      <img class="h-8 w-auto" src="./../assets/thumbnail_scheduling logo crop2.0.png" alt="Scheduling committee logo">
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <a :href="item.href" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                <Icon :name="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                {{ item.name }}
              </a>
            </li>
          </ul>
        </li>
        <li class="mt-auto">
          <ColorModeButton />
        </li><li v-if="false" class="mt-auto">
          <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
            <Icon name="heroicons-cog-6-tooth" class="h-6 w-6 shrink-0" aria-hidden="true" />
            Settings
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import type { NavigationLink } from '~/sched-committee-types';

defineProps({
  navigation: {
    type: Array<NavigationLink>,
    required: true,
  },
});

</script>

<style>

</style>
