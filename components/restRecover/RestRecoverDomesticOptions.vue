<template>
  <form>
    <div class="max-w-2xl space-y-10 md:col-span-2">
      <fieldset>
        <OptionsCheckbox v-model="domesticOptions.afterExceed8BlockHoursIn24Hours" label="High Block trips" caption="Have you just exceeded 8 block hours in the last 24?" />
        <OptionsCheckbox v-model="domesticOptions.priorToExceed8BlockHoursIn24Hours" label="High Block trips" caption="Are you about to exceed 8 block hours in the next 24?" />
        <OptionsCheckbox v-model="domesticOptions.exception12C2d" label="12C2d Exception" caption="Are you operating under the 12C2d exception?" />
        <OptionsCheckbox v-model="domesticOptions.hotelStbyScenario" label="Hotel Standby Scenario" caption="Are you in a hotel standby scenario?" />
        <OptionsCheckbox v-model="domesticOptions.operatingInCriticalPeriod" label="Operating in Critical Period" caption="Are you operating in a critical period?" />
      </fieldset>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { DomesticRestOptions } from '~/sched-committee-types';

const domesticOptions = defineModel<DomesticRestOptions>('domesticOptions', { required: true });

/* export interface DomesticRestOptions {
  operatingInCriticalPeriod: boolean, // must also receive less than 11 hours of rest operationally for this condition to be true
  hotelStbyScenario: boolean,
  priorToExceed8BlockHoursIn24Hours: boolean,
  afterExceed8BlockHoursIn24Hours: boolean,
  exception12C2d: boolean,
} */

</script>

<style>

</style>
