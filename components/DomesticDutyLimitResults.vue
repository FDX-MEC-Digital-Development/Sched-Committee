<template>
  <div>
    <Transition name="fade" appear>
      <div class="px-4 sm:px-0">
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          Duty limits
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Based on a duty start time of {{ formattedBasedOnDate }}Z ({{ dutyLimits.dutyStartTimeLBT.value.toString().padStart(4,"0") }} LBT), you have {{ dayNightOrCritical }} {{ dutyLimitType }} duty limits.
        </p>
      </div>
    </Transition>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div
          v-for="(dutyLimit, index) in dutyLimitsDisplay"
          :key="`dutyLimit${index}`"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <Transition
            ref="dutyLimitList"
            appear
            :css="false"

            @enter="onEnter"
          >
            <div :data-index="index" class="stagger-list">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                {{ dutyLimit.label }}
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <DutyLimitDisplay :duty-limit-in-minutes="dutyLimit.minutes" :duty-end-time-zulu="dutyLimit.endTimeZulu" />
              </dd>
            </div>
          </Transition>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Disclaimer
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            CBA reference
          </dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
              <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div class="flex w-0 flex-1 items-center">
                  <UIcon name="i-heroicons-document-text" class="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <span class=" font-medium">CBA 12.C</span>
                    <span class="flex-shrink-0 text-gray-400">External site</span>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">View</a>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import { PropType } from 'vue';
import { DutyLimits } from '~/sched-committee-types';

const props = defineProps({
  basedOnTime: {
    type: Date,
    required: true,
  },
  dutyLimits: {
    type: Object as PropType<DutyLimits>,
    required: true,
  },

},
);

const formattedBasedOnDate = computed(() =>
  format(props.basedOnTime, 'MM-dd-yy HH:mm'),

);

// output 'day', 'night', or 'critical' based on the duty start time (0500-1559 LBT), (1600-0059 LBT), else
const dayNightOrCritical = computed(() =>
  props.dutyLimits.dutyStartTimeLBT.value >= 500 && props.dutyLimits.dutyStartTimeLBT.value <= 1559
    ? 'day'
    : (props.dutyLimits.dutyStartTimeLBT.value >= 1600 && props.dutyLimits.dutyStartTimeLBT.value <= 2359) || props.dutyLimits.dutyStartTimeLBT.value < 100
        ? 'night'
        : 'critical',
);

const dutyLimitType = computed(() =>
  (props.dutyLimits.dutyStartTimeLBT.value >= 0 && props.dutyLimits.dutyStartTimeLBT.value <= 100) ||
(props.dutyLimits.dutyStartTimeLBT.value >= 1515 && props.dutyLimits.dutyStartTimeLBT.value <= 1645) ||
(props.dutyLimits.dutyStartTimeLBT.value >= 2230 && props.dutyLimits.dutyStartTimeLBT.value <= 2400) ||
(props.dutyLimits.dutyStartTimeLBT.value >= 500 && props.dutyLimits.dutyStartTimeLBT.value <= 530)
    ? 'blended'
    : 'non-blended',
);

const dutyLimitsDisplay = computed(() => ([
  {
    label: 'Scheduled duty limit',
    minutes: props.dutyLimits.domestic.value.scheduled,
    endTimeZulu: props.dutyLimits.domestic.value.endOfScheduledDutyDate,
  },
  {
    label: 'Operational duty limit',
    minutes: props.dutyLimits.domestic.value.operational,
    endTimeZulu: props.dutyLimits.domestic.value.endOfOperationalDutyDate,
  },
  {
    label: 'FAR duty limit',
    minutes: props.dutyLimits.domestic.value.far,
    endTimeZulu: props.dutyLimits.domestic.value.endOfFARDutyDate,
  },
]));

const dutyLimitList = ref();
const { $anime } = useNuxtApp();
// const onEnter = (event: any) => console.log(`here${event}`);
function onEnter (event: any) {
  $anime({
    targets: event,
    translateX: [50, 0],
    opacity: [0, 1],
    scale: [1.2, 1],
    delay: event.dataset.index * 500 + 500,
    easing: 'easeInQuad',
    duration: 500,
  });
/*   $anime({
    targets: '.stagger-list',
    translateX: [50, 0],
    opacity: [0, 1],
    scale: [1.2, 1],
    delay: $anime.stagger(1000, { start: 1000 }),
    easing: 'easeInQuad',
    duration: 1000,
  }); */
}

</script>

<style>
.fade-enter-active{
  transition: all 0.5s ease-in-out;
}

.fade-enter-from
{
  transform: translateY(-50px) scale(1.2);

  opacity: 0;
}

</style>
