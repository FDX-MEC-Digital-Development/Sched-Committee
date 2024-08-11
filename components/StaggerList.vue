<template>
  <div>
    <Transition

      :css="false"
      appear
      @enter="onEnter"
    >
      <slot />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const { $anime } = useNuxtApp();
function onEnter () {
  // @ts-expect-error $anime is not typed
  $anime({
    targets: '.stagger-list',
    translateX: [50, 0],
    opacity: [0, 1],
    // scale: [0.6, 1],
    // translateY: [50, 0],
    // @ts-expect-error $anime is not typed
    delay: $anime.stagger(300, { start: 500 }),
    easing: 'spring(1, 80, 10, 0)',
    duration: 500,
  });
}
</script>

<style>

</style>
