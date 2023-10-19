<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <UFormGroup label="Number of Pilots" class="sm:col-span-4 ">
            <USelect :model-value="options.crewNumberOfPilots" label="Number of pilots" :options="[2,3,4]" @update:model-value="(event) =>handleOptionsUpdate({crewNumberOfPilots: Number.parseInt(event)})" />
          </UFormGroup>
          <UFormGroup label="Inbound flight segment" class="sm:col-span-4">
            <UCheckbox :model-value="options.isInboundFlightSegmentGreaterThan5HoursTZD" name="Greater than 5 hours time zone difference" label="Greater than 5 hours time zone difference" @update:model-value="(event) => handleOptionsUpdate({isInboundFlightSegmentGreaterThan5HoursTZD: event})" />
          </UFormGroup>
          <UFormGroup label="Layover length (hours)" class="sm:col-span-4">
            <UInput type="number" :model-value="options.layoverLength" @update:model-value="(event: string)=>handleOptionsUpdate({layoverLength: parseInt(event)})" />
          </UFormGroup>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">

import type { DutyLimitOptions } from '~/sched-committee-types';

const props = defineProps({
  dutyStartTimeZulu: {
    type: Date,
    default: null,
  },

  options: {
    type: Object as PropType<DutyLimitOptions>,
    default: () => ({
      isInternational: true,
      isGrid: false, // "grid" means the trip starts more than 96 hours from now
      isInboundFlightSegmentGreaterThan5HoursTZD: false,
      crewNumberOfPilots: 2,
      layoverLength: 36,
    }),
  },
});

const emit = defineEmits(['update:options']);

function handleOptionsUpdate (newOptions: DutyLimitOptions) {
  emit('update:options', {
    ...props.options,
    ...newOptions,
  });
}

</script>
