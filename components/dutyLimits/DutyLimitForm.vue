<template>
  <form>
    <div class="space-y-6">
      <div class="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            Duty start time (Zulu)
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600  dark:text-gray-200">
            This often begins 1 hour before scheduled takeoff time.
          </p>
        </div>

        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div class="sm:col-span-4">
            <div class="mt-2">
              <DateTimePicker :date="dutyStartTimeZulu" @update:date="(event) => $emit('update:dutyStartTimeZulu', event)" />
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
              <DomesticInternationalTabs :is-international="options.isInternational || false" @update:is-international="(event) => handleOptionsUpdate( {isInternational: event})" />
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
              <component :is="domesticOrInternationalComponent" :key="`internationalComponent${props.options.isInternational}`" :options="options" :duty-start-time-zulu="dutyStartTimeZulu" @update:options="(event: DutyLimitOptions)=>handleOptionsUpdate(event)" />
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

<script setup lang="ts">
import type { DutyLimitOptions } from '~/sched-committee-types';
import { InternationalForm, DomesticForm } from '#components';

const props = defineProps({
  dutyStartTimeZulu: {
    type: Date,
    required: true,
  },
  options: {
    type: Object as PropType<DutyLimitOptions>,
    required: true,
  },
});

const emit = defineEmits(['update:dutyStartTimeZulu', 'update:options']);

const domesticOrInternationalComponent = computed(() => props.options.isInternational ? InternationalForm : DomesticForm);

function handleOptionsUpdate (newOptions: DutyLimitOptions) {
  emit('update:options', {
    ...props.options,
    ...newOptions,
  });
}

</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s;
}
.slide-left-enter-from {
position: absolute;
  transform: translate(100%, 0);
}
.slide-left-leave-to {
  position: absolute;
  transform: translate(-100%, 0);
  opacity: 0;
}
.slide-right-enter-from {
  position: absolute;
  transform: translate(-100%, 0);
}
.slide-right-leave-to {
  position: absolute;
  transform: translate(100%, 0);
  opacity: 0;
}
</style>
