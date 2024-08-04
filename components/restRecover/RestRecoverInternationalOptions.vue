<template>
  <form>
    <div class="max-w-2xl space-y-10 md:col-span-2">
      <fieldset>
        <OptionsCheckbox v-model="internationalOptions.doubleCrew" label="Double Crew" caption="Are you double crewing?" />
        <OptionsCheckbox v-model="internationalOptions.willExceed8BlockHoursOr12HoursOnDuty" label="Exceed 8 Block Hours or 12 Hours on Duty" caption="Will you exceed 8 block hours or 12 hours on duty?" />
        <OptionsCheckbox v-model="internationalOptions.lateArrival" label="Late Arrival" caption="Are you arriving late?" />
      </fieldset>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { InternationalRestOptions } from '~/sched-committee-types';

const internationalOptions = defineModel<InternationalRestOptions>('internationalOptions', { required: true });

/* export interface InternationalRestOptions {
  doubleCrew: boolean,
  willExceed8BlockHoursOr12HoursOnDuty: boolean,
  lateArrival: boolean,
} */
</script>

<style>

</style>
