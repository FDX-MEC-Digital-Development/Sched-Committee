<template>
  <div ref="randomTextRef">
    <slot
      :active-content="activeContent"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(
  {
    content: { type: Array as PropType<string[]>, required: true },
    interval: { type: Number, default: 5000 },
  });

const randomTextRef = ref(null);

const activeContent = ref(props.content[0]);
const activeContentIsVisible = ref(true);

const { pause, resume } = useIntervalFn(() => {
  const filteredContent = props.content.filter(content => content !== activeContent.value);

  const randomContent = filteredContent[Math.floor(Math.random() * filteredContent.length)];
  activeContent.value = randomContent;
}, props.interval);

useIntersectionObserver(
  randomTextRef,
  ([{ isIntersecting }], _observerElement) => {
    activeContentIsVisible.value = isIntersecting;
  },
);

watch(activeContentIsVisible, (isVisible) => {
  if (isVisible) {
    resume();
  } else {
    pause();
  }
});
</script>

<style>

</style>
