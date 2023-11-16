<template>
  <main class="-mt-8">
    <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div class="rounded-lg bg-grey dark:bg-gray-900 px-5 py-6  sm:px-6">
        <CardHeading title="Duty Limits" description="Use this tool to calulate scheduled, operational, and FAR duty limits." />
      </div>
      <div class="rounded-lg bg-grey dark:bg-gray-900 px-6    py-6  sm:px-6">
        <DutyLimitForm v-model:dutyStartTimeZulu="dutyStartTimeZulu" v-model:options="options">
          <template #button>
            <UButton label="View Duty Limits" class="result execute rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" @click="handleViewDutyLimits" />
          </template>
        </DutyLimitForm>
      </div>

      <div v-if="isDutyLimitsVisible" class="rounded-lg bg-grey dark:bg-gray-900 px-5 py-6  sm:px-6">
        <div v-if="!options.isInternational">
          <DomesticDutyLimitResultsHeader :based-on-time="dutyStartTimeZulu" :duty-limits="domesticDutyLimits" :duty-start-time-l-b-t="dutyStartTimeLBT" />
          <DomesticResults :domestic-duty-limits="domesticDutyLimits" :duty-start-time-l-b-t="dutyStartTimeLBT" />
        </div>
        <div v-else>
          <InternationalDutyLimitResultsHeader :based-on-time="dutyStartTimeZulu" :options="options" />
          <InternationalResults :international-duty-limits="internationalDutyLimits" />
        </div><CBAReference :is-international="options.isInternational" />
        <DutyLimitDisclaimer />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { isValid } from 'date-fns';
import { UTCDateMini } from '@date-fns/utc';

import type { DutyLimitOptions } from '~/sched-committee-types';

definePageMeta({
  title: 'Duty Limits',
});

const dutyStartTimeZulu = ref<Date>(new UTCDateMini());
const options = ref<DutyLimitOptions>({
  is2TripsWithOneOptional: false,
  isDayRoomScheduledAndReserved: false,
  isInternational: false,
  isGrid: false, // true means the trip starts more than 96 hours from now
  isInboundFlightSegmentGreaterThan5HoursTZD: false,
  crewNumberOfPilots: 2,
  layoverLength: 36,
  domicile: 'MEM',
});

watchEffect(() => {
  if (isValid(dutyStartTimeZulu.value)) {
    const hoursUntilUpdatedDutyStartTimeZulu = ((dutyStartTimeZulu.value.getTime() - (new Date()).getTime()) / 1000 / 60 / 60);

    const isGrid = (hoursUntilUpdatedDutyStartTimeZulu > 96);
    options.value.isGrid = isGrid;
  }
})
;

const isDutyLimitsVisible = ref(false);

async function handleViewDutyLimits () {
  isDutyLimitsVisible.value = true;
  await nextTick();

  const resultElement = document.querySelector('.result');
  resultElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/*   $anime({
    targets: '.result',
    translateX: [50, 0],
    opacity: [0, 1],
    easing: 'easeInQuad',
    duration: 1000,
  }); */
}

const { domestic: domesticDutyLimits, international: internationalDutyLimits, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

</script>
