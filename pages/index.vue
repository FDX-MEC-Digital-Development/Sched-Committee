<script lang="ts" setup>
import { Domicile, DutyLimitOptions } from '~/sched-committee-types';

const dutyStartTimeZulu = ref<Date>(new Date());
const domicile = ref<Domicile>('MEM');
const options = ref<DutyLimitOptions>({
  is2TripsWithOneOptional: false,
  isDayRoomScheduledAndReserved: false,
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
        <domestic-form v-model:dutyStartTimeZulu="dutyStartTimeZulu" v-model:domicile="domicile" v-model:options="options" />
        <domestic-duty-limit-results
          :based-on-time="dutyStartTimeZulu"
          :duty-limits="calculatedDutyLimits"
        />
      </UCard>
    </main>
  </div>
</template>

<style>

</style>
