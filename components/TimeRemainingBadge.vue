<template>
  <dd :class="divColor" class="inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
    {{ label }}
  </dd>
</template>

<script lang="ts" setup>

const props = defineProps({
  minutesRemaining: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const MINUTES_REMAINING_RED_THRESHOLD = 0;
const MINUTES_REMAINING_GREEN_THRESHOLD = 120;

const divColor = computed(() => {
  if (props.minutesRemaining > MINUTES_REMAINING_GREEN_THRESHOLD) {
    return 'bg-green-100 text-green-800';
  } else if (props.minutesRemaining < MINUTES_REMAINING_RED_THRESHOLD) {
    return 'bg-red-100 text-red-800';
  } else {
    return 'bg-orange-100 text-orange-800';
  }
});

</script>

<style>

</style>
