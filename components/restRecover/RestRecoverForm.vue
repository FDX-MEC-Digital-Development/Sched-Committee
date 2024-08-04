<template>
  <form>
    <div class="space-y-6">
      <div class="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            Duty end time (Zulu)
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600  dark:text-gray-200">
            This often begins 1 hour before scheduled takeoff time.
          </p>
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
          <div class="sm:col-span-full">
            <div v-auto-animate class="xs:mt-2">
              <RestRecoverDomesticOptions v-if="!options.isInternational" :domestic-options="options.domesticOptions" @update:domestic-options="(event) => options = {...options, domesticOptions: event}" />
              <RestRecoverInternationalOptions v-else :international-options="options.internationalOptions" @update:international-options="(event) => options = {...options, internationalOptions: event}" />
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

</script>

<style>

</style>
