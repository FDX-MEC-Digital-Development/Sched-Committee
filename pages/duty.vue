<template>
  <main class="-mt-32">
    <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div class="rounded-lg bg-grey px-5 py-6  sm:px-6">
        <CardHeading title="Duty Limits" description="Use this tool to calulate scheduled, operational, and FAR duty limits." />
      </div>
      <div class="rounded-lg bg-grey px-6    py-6  sm:px-6">
        <DutyLimitForm v-model:dutyStartTimeZulu="dutyStartTimeZulu" v-model:options="options" />
      </div>
      <div class="rounded-lg bg-grey px-5 py-6  sm:px-6">
        <DutyLimitCard title="Results" stat="4" />
        <DutyLimitCard title="Results" stat="4" />

        <DutyLimitCard title="Results" stat="4" />

        <CBAReference />
        <DutyLimitDisclaimer />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { DutyLimitOptions } from '~/sched-committee-types';

definePageMeta({
  title: 'Duty Limits',
});

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
</script>
