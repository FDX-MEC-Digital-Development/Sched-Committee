<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <date-time-form v-model:date="dateInput" v-model:time="timeInput" />
            <p>{{ options.isGrid }}</p>
          </div>
          <UFormGroup label="Number of Pilots" class="sm:col-span-4">
            <USelect :model-value="options.crewNumberOfPilots" label="Number of pilots" :options="[2,3,4]" @update:model-value="(event) =>handleOptionsUpdate({crewNumberOfPilots: event})" />
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

watchEffect(() => console.log(props.options));

const emit = defineEmits(['update:dutyStartTimeZulu', 'update:options']);

// const dateStringFormat = 'yyyy-MM-dd';
const todaysDateInDateStringFormat = props.dutyStartTimeZulu ? props.dutyStartTimeZulu.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
const timeRightNowInTimeStringFormat = props.dutyStartTimeZulu ? props.dutyStartTimeZulu.toISOString().split('T')[1].split('.')[0] : new Date().toISOString().split('T')[1].split('.')[0];

const hoursUntilUpdatedDutyStartTimeZulu = computed(() => isValid(updatedDutyStartTimeZulu.value) ? ((updatedDutyStartTimeZulu.value.getTime() - (new Date()).getTime()) / 1000 / 60 / 60) : undefined);

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
    const isGrid = hoursUntilUpdatedDutyStartTimeZulu?.value && hoursUntilUpdatedDutyStartTimeZulu.value > 96;
    emit('update:options', { isGrid });
    emit('update:dutyStartTimeZulu', updatedDutyStartTimeZulu.value);
  }
})
;

</script>
