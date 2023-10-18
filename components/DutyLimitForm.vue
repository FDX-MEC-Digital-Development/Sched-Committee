<template>
  <form>
    <div class="space-y-12">
      <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Duty start time (Zulu)
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This often begins 1 hour before scheduled takeoff time.
          </p>
        </div>
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div class="sm:col-span-4">
            <div class="mt-2">
              <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <DateTimePicker :model-value:date="dutyStartTimeZulu" @update:date="(event) => $emit('update:dutyStartTimeZulu', event)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Options
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            <DomesticInternationalTabs :is-international="options.isInternational" @update:is-international="(event) => handleOptionsUpdate( {isInternational: event})" />
          </p>
        </div>
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div class="sm:col-span-4">
            <div class="mt-2">
              <transition :name="options.isInternational ? 'slide-left' : 'slide-right'">
                <component :is="domesticOrInternationalComponent" :options="options" :duty-start-time-zulu="dutyStartTimeZulu" @update:options="(event)=>handleOptionsUpdate(event)" />
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <UButton label="View Duty Limits" class="execute rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="handleViewDutyLimits" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { DutyLimitOptions } from '~/sched-committee-types';
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

const setDutyLimitsVisible = ref(false);

async function handleViewDutyLimits () {
  setDutyLimitsVisible.value = !setDutyLimitsVisible.value;
  await nextTick();

  const resultElement = document.querySelector('.result');
  resultElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/*   $anime({
    targets: '.result',
    translateX: [50, 0],
    opacity: [0, 1],
    easing: 'easeInQuad',
    duration: 1000,
  }); */
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
