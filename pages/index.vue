<script lang="ts" setup>
import { Domicile } from '~/sched-committee-types';

const dutyStartTimeZulu = ref<Date>(new Date());
const domicile = ref<Domicile>('MEM');

const calculatedDutyLimits = useDutyLimits(dutyStartTimeZulu, domicile);
const formattedDutyLimits = computed(() =>
// format number of minutes to hours
  // (calculatedDutyLimits.dutyLimits.value?.scheduledDutyLimit ? calculatedDutyLimits.dutyLimits.value.scheduledDutyLimit / 60 : 0).toString(),
  calculatedDutyLimits.scheduledDutyLimit.value ? `${(calculatedDutyLimits.scheduledDutyLimit.value / 60).toString()} hours` : 'Not calculated yet',

);

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
      <domestic-form v-model:dutyStartTimeZulu="dutyStartTimeZulu" :domicile="domicile" />
      <domestic-duty-limit-results
        :scheduled-duty-limit="formattedDutyLimits"
        :scheduled-duty-limit-time="calculatedDutyLimits.endOfScheduledDutyTime.value"
      />
    </main>
  </div>
</template>

<style>

</style>
