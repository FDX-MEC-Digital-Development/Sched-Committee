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
// const onEnter = (event: any) => console.log(`here${event}`);
function onEnter () {
/*   $anime({
    targets: event,
    translateX: [50, 0],
    opacity: [0, 1],
    scale: [1.2, 1],
    delay: event.dataset.index * 500 + 500,
    easing: 'easeInQuad',
    duration: 500,
  }); */
  $anime({
    targets: '.stagger-list',
    translateX: [50, 0],
    opacity: [0, 1],
    scale: [0.6, 1],
    delay: $anime.stagger(300, { start: 500 }),
    easing: 'easeInQuad',
    duration: 500,
  });
}
</script>

<style>

</style>
