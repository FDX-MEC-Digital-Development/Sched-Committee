<script lang="ts" setup>
import { isValid } from 'date-fns';
import { DutyLimitOptions } from '~/sched-committee-types';
import { InternationalForm, DomesticForm } from '#components';

const dutyStartTimeZulu = ref<Date>(new Date());
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

const dutyLimits = useDutyLimits(dutyStartTimeZulu, options);
const setDutyLimitsVisible = ref(false);

const isDutyLimitsVisible = computed(() => {
  return setDutyLimitsVisible.value && isValid(dutyStartTimeZulu.value);
});

const { $anime } = useNuxtApp();

onMounted(() => {
  $anime({
    targets: '.title',
    translateX: [50, 0],
    opacity: [0, 1],
    easing: 'easeInQuad',
    duration: 1000,
  });
});

async function handleViewDutyLimits () {
  setDutyLimitsVisible.value = !setDutyLimitsVisible.value;
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

</script>

<template>
  <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 title">
          FedEx ALPA Scheduling Committee
        </h1>
      </div>
    </header>
    <main class="bg-white">
      <UCard>
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Duty Limits
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          Use this tool to calulate scheduled, operational, and FAR duty limits.
        </p>
      </UCard>
      <UCard>
        <DateTimePicker v-model:date="dutyStartTimeZulu" />
      </UCard>

      <DomesticInternationalTabs v-model:is-international="options.isInternational" />
      <UCard>
        <template #header>
          <component :is="options.isInternational ? InternationalForm : DomesticForm" v-model:duty-start-time-zulu="dutyStartTimeZulu" v-model:options="options" />
        </template>
        <UButton label="View Duty Limits" class="execute" @click="handleViewDutyLimits" />
        <template #footer>
          <domestic-duty-limit-results
            v-if="isDutyLimitsVisible"
            ref="resultElement"
            class="result"
            :based-on-time="dutyStartTimeZulu"
            :duty-limits="dutyLimits"
          />
        </template>
      </UCard>
    </main>
  </div>
</template>

<style>

</style>
