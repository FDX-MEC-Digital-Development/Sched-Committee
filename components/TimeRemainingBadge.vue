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

const divColor = computed(() => {
  if (props.minutesRemaining > 120) {
    return 'bg-green-100 text-green-800';
  } else if (props.minutesRemaining < 0) {
    return 'bg-red-100 text-red-800';
  } else {
    return 'bg-ywllow-100 text-yellow-800';
  }
});

</script>

<style>

</style>
