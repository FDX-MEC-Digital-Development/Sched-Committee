<template>
  <GenericToolPage title="Required Rest" description="Use this tool to calulate required rest after a duty period." :is-results-visible>
    <template #form>
      <RestRecoverForm v-model:options="options" v-model:duty-end-time-zulu="dutyEndTimeZulu" />
    </template>
    <template #button>
      <UButton label="View Rest" class="result execute rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" @click="handleViewResults()" />
    </template>
    <template #results>
      <RestRecoverResults :results :notes />
    </template>
  </GenericToolPage>
</template>

<script lang="ts" setup>
import type { DomesticRestOptions, InternationalRestOptions, RestOptions } from '~/sched-committee-types';

const defaultDomesticRestOptions: DomesticRestOptions = {
  afterExceed8BlockHoursIn24Hours: false,
  exception12C2dAfterExceeding735ActualBlockHours: false,
  exception12C2dPriorToExceeding735ActualBlockHours: false,
  hotelStbyScenario: false,
  operatingInCriticalPeriod: false,
  priorToExceed8BlockHoursIn24Hours: false,
};

const defaultInternationalRestOptions: InternationalRestOptions = {

  doubleCrew: false,
  lateArrival: false,
  willExceed8BlockHoursOr12HoursOnDuty: false,
};

const options = ref<RestOptions>({
  isInternational: false,
  internationalOptions: defaultInternationalRestOptions,
  domesticOptions: defaultDomesticRestOptions,
  minutesPairingConstructedPriorToShowtime: 0,
  nextDuty: 'Revenue',
  prevDuty: 'Revenue',
});

const dutyEndTimeZulu = ref<Date>(new Date());
const isResultsVisible = ref(false);

const results = useRestRecover(dutyEndTimeZulu, options);
const notes = computed(() => results.notes.value ? results.notes.value : []);

async function handleViewResults () {
  isResultsVisible.value = true;
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

</style>
