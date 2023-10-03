<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Duty Limits
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          Use this tool to calulate scheduled, operational, and FAR duty limits.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <date-time-form v-model:date="dateInput" v-model:time="timeInput" />
          </div>

          <div class="col-span-full">
            <UAccordion
              :items="[{
                label: 'Options',
                icon: 'i-heroicons-chevron-down',
                defaultOpen: false,

              }]"
            >
              <template #item="{ }">
                <UCheckbox :model-value="options.isGrid" name="Grid" label="Grid" help="Trip starts more than 96 hours from now" @update:model-value="(event) => handleOptionsUpdate({isGrid: event})" />
                <UCheckbox :model-value="options.isInboundFlightSegmentGreaterThan5HoursTZD" name="Inbound flight segment > 5 hours" label="Inbound flight segment > 5 hours" help="Inbound flight segment > 5 hours" @update:model-value="(event) => handleOptionsUpdate({isInboundFlightSegmentGreaterThan5HoursTZD: event})" />
                <UCheckbox :model-value="options.crewNumberOfPilots === 3" name="3 pilots" label="3 pilots" help="3 pilots" @update:model-value="(event) => handleOptionsUpdate({crewNumberOfPilots: event ? 3 : 2})" />
                <UCheckbox :model-value="options.layoverLength === 36" name="Layover length > 36 hours" label="Layover length > 36 hours" help="Layover length > 36 hours" @update:model-value="(event) => handleOptionsUpdate({layoverLength: event ? 36 : 0})" />
              </template>
            </UAccordion>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { isValid } from 'date-fns';
import { DutyLimitOptions } from '~/sched-committee-types';

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

const emit = defineEmits(['update:dutyStartTimeZulu', 'update:options']);

// const dateStringFormat = 'yyyy-MM-dd';
const todaysDateInDateStringFormat = props.dutyStartTimeZulu ? props.dutyStartTimeZulu.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
const timeRightNowInTimeStringFormat = props.dutyStartTimeZulu ? props.dutyStartTimeZulu.toISOString().split('T')[1].split('.')[0] : new Date().toISOString().split('T')[1].split('.')[0];

const dateInput = ref<string>(todaysDateInDateStringFormat);
const timeInput = ref<string>(timeRightNowInTimeStringFormat);

function handleOptionsUpdate (newOptions: DutyLimitOptions) {
  emit('update:options', {
    ...props.options,
    ...newOptions,
  });
}

const updatedDutyStartTimeZulu = computed(() => {
  const newDate = new Date(`${dateInput.value}T${timeInput.value}Z`);
  return newDate;
});

watchEffect(() => {
  console.log(`Updating dutyStartTimeZulu to ${updatedDutyStartTimeZulu.value}`);

  if (isValid(updatedDutyStartTimeZulu.value)) {
    emit('update:dutyStartTimeZulu', updatedDutyStartTimeZulu.value);
  }
})
;

</script>
