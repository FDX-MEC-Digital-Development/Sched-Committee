<template>
  <div class="min-h-full">
    <header class="shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 title dark:text-white">
          FedEx ALPA Scheduling Committee
        </h1>
      </div>
    </header>
    <main class="dark:text-white">
      <UCard class="dark:text-white">
        <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Duty Limits
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
          Use this tool to calulate scheduled, operational, and FAR duty limits.
        </p>
      </UCard>
      <UCard>
        <DateTimePicker v-model:date="dutyStartTimeZulu" />
      </UCard>

      <DomesticInternationalTabs v-model:is-international="options.isInternational" />
      <UCard>
        <template #header>
          <transition :name="options.isInternational ? 'slide-left' : 'slide-right'">
            <component :is="domesticOrInternationalComponent" v-model:duty-start-time-zulu="dutyStartTimeZulu" v-model:options="options" />
          </transition>
        </template>
        <UButton label="View Duty Limits" class="execute" @click="handleViewDutyLimits" />
        <template #footer>
          <div v-if="isDutyLimitsVisible">
            <domestic-duty-limit-results
              v-if="!options.isInternational"
              ref="resultElement"
              class="result"
              :based-on-time="dutyStartTimeZulu"
              :duty-limits="domesticDutyLimit"
              :duty-start-time-l-b-t="dutyStartTimeLBT"
            /><InternationalDutyLimitResults
              v-else
              ref="resultsElement"
              class="result"
              :based-on-time="dutyStartTimeZulu"
              :duty-limits="internationalDutyLimits"
              :options="options"
            />
          </div>
        </template>
      </UCard>
    </main>
    <PageFooter />
  </div>
</template>
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

watchEffect(() => {
  if (isValid(dutyStartTimeZulu.value)) {
    const hoursUntilUpdatedDutyStartTimeZulu = ((dutyStartTimeZulu.value.getTime() - (new Date()).getTime()) / 1000 / 60 / 60);

    const isGrid = (hoursUntilUpdatedDutyStartTimeZulu > 96);
    options.value.isGrid = isGrid;
  }
})
;

const { domestic: domesticDutyLimit, international: internationalDutyLimits, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);
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

const domesticOrInternationalComponent = computed(() => options.value.isInternational ? InternationalForm : DomesticForm);

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
<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s;
}
.slide-left-enter-from {
position: absolute;
  transform: translate(100%, 0);
}
.slide-left-leave-to {
  position: absolute;
  transform: translate(-100%, 0);
  opacity: 0;
}
.slide-right-enter-from {
  position: absolute;
  transform: translate(-100%, 0);
}
.slide-right-leave-to {
  position: absolute;
  transform: translate(100%, 0);
  opacity: 0;
}
</style>
