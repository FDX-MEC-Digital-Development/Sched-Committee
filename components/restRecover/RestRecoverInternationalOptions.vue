<template>
  <form>
    <div class="max-w-2xl space-y-10 md:col-span-2">
      <fieldset>
        <OptionsSelect v-model="options.prevDuty" label="Previous Duty" :options="dutyOptions" />
        <OptionsSelect v-model="options.nextDuty" label="Next Duty" :options="dutyOptions" />

        <OptionsCheckbox v-model="options.internationalOptions.doubleCrew" label="Double Crew" caption="Are you double crewing?" />
        <OptionsCheckbox v-model="options.internationalOptions.willExceed8BlockHoursOr12HoursOnDuty" label="Exceed 8 Block Hours or 12 Hours on Duty" caption="Will you exceed 8 block hours or 12 hours on duty?" />
        <OptionsCheckbox v-model="options.internationalOptions.lateArrival" label="Late Arrival" caption="Are you arriving late?" />
      </fieldset>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { RestOptions } from '~/sched-committee-types';

const options = defineModel<RestOptions>('options', { required: true });

const dutyOptions = ['Revenue', 'Deadhead', 'HotelStby'];

</script>

<style>

</style>
