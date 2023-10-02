<script lang="ts" setup>
import { Domicile } from '~/sched-committee-types';

const dutyStartTimeZulu = ref<Date>(new Date());
const domicile = ref<Domicile>('MEM');

const calculatedDutyLimits = useDutyLimits(dutyStartTimeZulu, domicile);

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
        :based-on-time="dutyStartTimeZulu"
        :duty-limits="calculatedDutyLimits"
      />
    </main>
  </div>
</template>

<style>

</style>
