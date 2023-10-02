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
            <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Domicile</label>
            <USelect :model-value="domicile" :options="domicileOptions" @update:model-value="handleDomicileUpdate" />
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
                <UCheckbox v-model="options.is2TripsWithOneOptional" name="Optional assignment" label="Optional assignment" help="2 trips with one as an optional assignment (eg. SON, SWP, PDO, VLT, DRF)" />
                <UCheckbox v-model="options.isDayRoomScheduledAndReserved" name="Day room" label="Day room" help="Duty period contains flight segments with at least 4 hours between block-in and block-out and a day room is scheduled and reserved during that time" />
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
import { DutyLimitOptions, Domicile } from '~/sched-committee-types';

const props = defineProps({
  dutyStartTimeZulu: {
    type: Date,
    default: null,
  },
  domicile: {
    type: String,
    default: 'MEM',
  },
});

const emit = defineEmits(['update:dutyStartTimeZulu', 'update:domicile']);

// const dateStringFormat = 'yyyy-MM-dd';
const todaysDateInDateStringFormat = props.dutyStartTimeZulu ? props.dutyStartTimeZulu.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
const timeRightNowInTimeStringFormat = props.dutyStartTimeZulu ? props.dutyStartTimeZulu.toISOString().split('T')[1].split('.')[0] : new Date().toISOString().split('T')[1].split('.')[0];

const dateInput = ref<string>(todaysDateInDateStringFormat);
const timeInput = ref<string>(timeRightNowInTimeStringFormat);

const domicileOptions : Domicile[] = ['MEM', 'IND', 'OAK', 'LAX', 'ANC', 'CGN'];

const options = ref<DutyLimitOptions>({
  is2TripsWithOneOptional: false,
  isDayRoomScheduledAndReserved: false,
});

watchEffect(() => console.log(options.value.is2TripsWithOneOptional, options.value.isDayRoomScheduledAndReserved));

function handleDomicileUpdate (newDomicile: Domicile) {
  console.log(newDomicile);
  console.log('domicile updated');
  emit('update:domicile', newDomicile);
}

const updatedDutyStartTimeZulu = computed(() => {
  const newDate = new Date(`${dateInput.value}T${timeInput.value}`);
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
