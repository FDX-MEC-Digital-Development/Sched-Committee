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
            <USelect v-model="domicile" :options="domicileOptions" />
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
import { DutyLimitOptions } from '~/sched-committee-types';

// const dateStringFormat = 'yyyy-MM-dd';
const todaysDateInDateStringFormat = new Date().toISOString().split('T')[0];
const timeRightNowInTimeStringFormat = new Date().toISOString().split('T')[1].split('.')[0];
const dateInput = ref<string>(todaysDateInDateStringFormat);
const timeInput = ref<string>(timeRightNowInTimeStringFormat);

const domicileOptions = ['ANC', 'CGN', 'IND', 'LAX', 'MEM', 'OAK'];
const domicile = ref<string>('MEM');

const options = ref<DutyLimitOptions>({
  is2TripsWithOneOptional: false,
  isDayRoomScheduledAndReserved: false,
});

watchEffect(() => console.log(options.value.is2TripsWithOneOptional, options.value.isDayRoomScheduledAndReserved));

</script>
