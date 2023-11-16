<template>
  <div ref="randomTextRef">
    <slot
      :active-content="activeContent"
      :progress="counter"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(
  {
    content: { type: Array as PropType<string[]>, required: true },
    interval: { type: Number, default: 5000 },
    linear: { type: Boolean, default: false },
    loop: { type: Boolean, default: false },
  });

// count up to 100 in duration milliseconds
const onePercentInterval = props.interval / 100;
const { counter, reset: resetCounter, pause: pauseCounter, resume: resumeCounter } = useInterval(onePercentInterval, { controls: true });

const randomTextRef = ref(null);

const activeContent = ref(props.content[0]);
const activeContentIndex = ref(0);
const activeContentIsVisible = ref(true);

const randomFunction = () => {
  const filteredContent = props.content.filter(content => content !== activeContent.value);

  const randomContent = filteredContent[Math.floor(Math.random() * filteredContent.length)];
  activeContent.value = randomContent;
};

/**
 * - If the current content is the last one, go back to the first one
 */
const linearFunction = () => {
  if (activeContentIndex.value === props.content.length - 1) {
    if (!props.loop) { return; }
    activeContentIndex.value = 0;
  } else {
    activeContentIndex.value++;
  }
  activeContent.value = props.content[activeContentIndex.value];
};

const { pause: pauseIntervalFn, resume: resumeIntervalFn } = useIntervalFn(() => {
  if (!props.linear) {
    randomFunction();
  } else {
    linearFunction();
  }
  resetCounter();
}, props.interval);

useIntersectionObserver(
  randomTextRef,
  ([{ isIntersecting }], _observerElement) => {
    activeContentIsVisible.value = isIntersecting;
  },
);

watch(activeContentIsVisible, (isVisible) => {
  if (isVisible) {
    resumeIntervalFn();
    resumeCounter();
  } else {
    pauseIntervalFn();
    pauseCounter();
    resetCounter();
  }
});
</script>

<style>

</style>
