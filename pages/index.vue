<script lang="ts" setup>
import { Domicile, DutyLimitOptions } from '~/sched-committee-types';

const dutyStartTimeZulu = ref<Date>(new Date());
const domicile = ref<Domicile>('MEM');
const options = ref<DutyLimitOptions>({
  is2TripsWithOneOptional: false,
  isDayRoomScheduledAndReserved: false,
  isInternational: false,
  isGrid: false, // "grid" means the trip starts more than 96 hours from now
  isInboundFlightSegmentGreaterThan5HoursTZD: false,
  crewNumberOfPilots: 2,
  layoverLength: 36,
});

const calculatedDutyLimits = useDutyLimits(dutyStartTimeZulu, domicile, options);

</script>

<template>
  <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
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

      <DomesticInternationalTabs v-model:is-international="options.isInternational" />
      <UCard v-if="options.isInternational == false">
        <domestic-form v-model:dutyStartTimeZulu="dutyStartTimeZulu" v-model:domicile="domicile" v-model:options="options" />
        <domestic-duty-limit-results
          :based-on-time="dutyStartTimeZulu"
          :duty-limits="calculatedDutyLimits"
        />
      </UCard>
      <UCard v-else>
        <InternationalForm v-model:duty-start-time-zulu="dutyStartTimeZulu" v-model:options="options" />
        <UCard />
      </ucard>
    </main>
  </div>
</template>

<style>

</style>
