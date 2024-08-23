<template>
  <form>
    <div class="max-w-2xl space-y-10 md:col-span-2">
      <fieldset>
        <URadioGroup :options="radioOptions" :model-value="currentOption" :ui="{fieldset: 'space-y-2'}" @update:model-value="updateModel" />
      </fieldset>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { DomesticRestOptions } from '~/sched-committee-types';

const domesticOptions = defineModel<DomesticRestOptions>('domesticOptions', { required: true });

const currentOption = computed(() => {
  for (const key in domesticOptions.value) {
    if (domesticOptions.value[key as keyof typeof domesticOptions.value]) {
      return key;
    }
  }
  return 'none';
});

/* export interface DomesticRestOptions {
  operatingInCriticalPeriod: boolean, // must also receive less than 11 hours of rest operationally for this condition to be true
  hotelStbyScenario: boolean,
  priorToExceed8BlockHoursIn24Hours: boolean,
  afterExceed8BlockHoursIn24Hours: boolean,
  exception12C2d: boolean,
} */

const selectedOption = ref<string>('none');

function updateModel (value: string) {
  const newOptions = { ...domesticOptions.value };

  if (value === 'none') {
    // Set all options to false
    Object.keys(newOptions).forEach((key) => {
      newOptions[key as keyof typeof newOptions] = false;
    });
  } else {
    // Update options based on the selected value
    Object.keys(newOptions).forEach((key) => {
      newOptions[key as keyof typeof newOptions] = key === value;
    });
    selectedOption.value = value;
  }

  domesticOptions.value = newOptions;
}

// [{value: 'afterExceed8BlockHoursIn24Hours', label: 'High Block trips', help: 'Have you just exceeded 8 block hours in the last 24?'}]
const radioOptions = [
  { value: 'none', label: 'None', help: 'No options apply.' },
  { value: 'afterExceed8BlockHoursIn24Hours', label: 'High Block trips', help: 'Have you just exceeded 8 block hours in the last 24?' },
  { value: 'priorToExceed8BlockHoursIn24Hours', label: 'High Block trips', help: 'Are you about to exceed 8 block hours in the next 24?' },
  { value: 'exception12C2dPriorToExceeding735ActualBlockHours', label: '12C2d Exception', help: 'Does your trip (or series of trips) includes no duty (scheduled or actual) in the Critical Duty Period before exceeding 7:35 actual block hours?' },
  { value: 'exception12C2dAfterExceeding735ActualBlockHours', label: '12C2d Exception', help: 'Does your trip (or series of trips) includes no duty (scheduled or actual) in the Critical Duty Period after exceeding 7:35 actual block hours?' },
  { value: 'hotelStbyScenario', label: 'Hotel Standby Scenario', help: 'Is this a base hotel standby period?' },
  { value: 'operatingInCriticalPeriod', label: 'Operating in Critical Period', help: 'Are you operating in a critical period?' },
];

</script>

<style scoped>

</style>
