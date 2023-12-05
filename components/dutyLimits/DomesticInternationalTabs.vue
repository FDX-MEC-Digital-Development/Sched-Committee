<template>
  <div>
    <HeadlessRadioGroup :model-value="items[selectedTabIndex]" @update:model-value="(newTab: TabItem)=>handleUpdateIsInternational(newTab )">
      <HeadlessRadioGroupLabel class="sr-only">
        Domestic or International
      </HeadlessRadioGroupLabel>
      <div class="space-y-4">
        <HeadlessRadioGroupOption v-for="item in items" :key="item.label" v-slot="{ active, checked }" as="template" :value="item">
          <div :class="[active || checked ? 'border-red-600 ring-2 ring-red-600' : 'border-gray-300', 'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between dark:bg-slate-700 ']">
            <span class="flex items-center">
              <span class="flex flex-col text-sm">
                <HeadlessRadioGroupLabel as="span" class="font-medium text-gray-900 dark:text-white">{{ item.label }}</HeadlessRadioGroupLabel>
              </span>
            </span>
          </div>
        </HeadlessRadioGroupOption>
      </div>
    </HeadlessRadioGroup>
    <!--  <UTabs :items="items" :model-value="selectedTabIndex" @change="handleChange" /> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isInternational: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:isInternational']);

interface TabItem {
  label: string;
  isInternational: boolean;
}
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

/* function handleChange (event: number) {
  emit('update:isInternational', items[event].isInternational);
} */

function handleUpdateIsInternational (newTab: TabItem) {
  emit('update:isInternational', newTab.isInternational);
}
</script>
