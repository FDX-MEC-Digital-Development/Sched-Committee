<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
    <div v-auto-animate class="flex h-16 shrink-0 items-center">
      <img class="h-10 w-auto" src="./../assets/logo.svg" alt="Scheduling committee logo">
    </div>
    <NavigationVertical :navigation="navigation" @route-change="$emit('routeChange')">
      <li class="mt-auto">
        <ColorModeButton />
      </li><li v-if="false" class="mt-auto">
        <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
          <Icon name="heroicons-cog-6-tooth" class="h-6 w-6 shrink-0" aria-hidden="true" />
          Settings
        </a>
      </li>
    </NavigationVertical>
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

defineEmits(['routeChange']);

/* function fadeInLogo () {
  // const logo = document.querySelector('.logo-thumbnail-hidden');
  const svgAnimation = document.querySelector('.svg-animation path');

  const { $anime } = useNuxtApp();

  $anime({
    targets: svgAnimation,
    opacity: 0,

    duration: 500,
    easing: 'linear',
    complete: () => {
      animationLogoVisible.value = false;
    },

  });

} */

</script>

<style>
.logo-thumbnail-hidden {
  opacity: 0;
}
</style>
