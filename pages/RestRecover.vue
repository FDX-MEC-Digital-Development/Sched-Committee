<template>
  <GenericToolPage title="Rest" description="Use this tool to calulate scheduled, operational, and FAR duty limits." :is-results-visible>
    <template #form>
      <RestRecoverForm v-model:options="options" v-model:duty-end-time-zulu="dutyEndTimeZulu" />
    </template>
    <template #button>
      <UButton label="View Rest" class="result execute rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" @click="isResultsVisible = true" />
    </template>
    <template #results>
      {{ results }}
    </template>
  </GenericToolPage>
</template>

<script lang="ts" setup>
import type { DomesticRestOptions, InternationalRestOptions, RestOptions } from '~/sched-committee-types';

const defaultDomesticRestOptions: DomesticRestOptions = {
  afterExceed8BlockHoursIn24Hours: false,
  exception12C2d: false,
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
  nextDuty: 'Operational',
  prevDuty: 'Operational',
});

const dutyEndTimeZulu = ref<Date>(new Date());
const isResultsVisible = ref(false);

const results = useUseRestRecover(dutyEndTimeZulu, options);

// eslint-disable-next-line no-console
watchEffect(() => console.log({ results }));

</script>

<style>

</style>
