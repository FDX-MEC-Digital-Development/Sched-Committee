<script setup lang="ts">
const props = defineProps({
  isInternational: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:isInternational']);
const items = [{
  label: 'Domestic',
  isInternational: false,
}, {
  label: 'International',
  isInternational: true,
}];

const selectedTabIndex = computed(() => {
  return props.isInternational ? 1 : 0;
});

function handleChange (event: number) {
  emit('update:isInternational', items[event].isInternational);
}
</script>

<template>
  <UTabs :items="items" :model-value="selectedTabIndex" @change="handleChange" @update:model-value="handleChange" />
</template>
