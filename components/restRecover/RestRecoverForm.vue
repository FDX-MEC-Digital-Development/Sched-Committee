<template>
  <form>
    <div class="space-y-6">
      <UAccordion class="mt-1 text-sm leading-6 text-gray-600  dark:text-gray-200" :items="dutyEndTimeList">
        <template #duty-end>
          <ul class="list-disc pl-5 space-y-2 text-gray-900 dark:text-white">
            <li v-for="item in dutyEndCriteriaList" :key="item" class="italic text-gray-900 dark:text-white ">
              {{ item }}
            </li>
          </ul>
        </template>
      </UAccordion>
      <div v-if="false" class="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            Duty end time (Zulu)
          </h2>
        </div>

        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div class="sm:col-span-4">
            <div class="mt-2">
              <DateTimePicker :date="dutyEndTimeZulu" @update:date="(event) => dutyEndTimeZulu = event" />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-gray-900/10 pb-6 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            Leg type
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200" />
        </div>
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div class="sm:col-span-full">
            <div class="xs:mt-2">
              <DomesticInternationalTabs :is-international="options.isInternational" @update:is-international="(event) => options = {...options, isInternational: event}" />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-gray-900/10 pb-6 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            Pairing constructed how many hours prior to showtime?
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200" />
        </div>
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div class="sm:col-span-full">
            <div class="xs:mt-2">
              <OptionsInput v-model="hoursCustructedPriorToShowtime" type="number" />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-x-8 gap-y-5 border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            Options
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200">
            Select options which apply.
          </p>
        </div>
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div v-auto-animate class="sm:col-span-full">
            <div v-if="!options.isInternational" class="xs:mt-2">
              <RestRecoverDomesticOptions :domestic-options="options.domesticOptions" @update:domestic-options="(event) => options = {...options, domesticOptions: event}" />
            </div>

            <div v-else class="xs:mt-2">
              <RestRecoverInternationalOptions v-model:options="options" :minutes-pairing-constructed-prior-to-showtime="options.minutesPairingConstructedPriorToShowtime" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end gap-x-6">
      <slot name="button" />
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { RestOptions } from '~/sched-committee-types';

const options = defineModel<RestOptions>('options', { required: true });
const dutyEndTimeZulu = defineModel<Date>('dutyEndTimeZulu', { required: true });
const hoursCustructedPriorToShowtime = ref(100);

watchEffect(() => {
  const minutes = hoursCustructedPriorToShowtime.value * 60;
  options.value.minutesPairingConstructedPriorToShowtime = minutes;
});

/*
  label: 'Getting Started',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
  content */
const dutyEndTimeList = [{
  label: 'When does duty end?',
  slot: 'duty-end',
  icon: 'i-heroicons-information-circle',
  defaultOpen: false,

}];

const dutyEndCriteriaList = [
  'Flight deck duty or deadhead - 30 minutes after block-in (12.B.1.g)',
  'If delayed by CIQ (Customs, Immigration, and Quarantine) procedures, call the duty officer for a revised duty-off time (12.B.2) prior to entering legal rest.',
  'Transportation time to the hotel does not affect duty.',
  'Deadhead by surface transportation - ends at scheduled arrival time (12.B.1.f)'];

</script>

<style>

</style>
