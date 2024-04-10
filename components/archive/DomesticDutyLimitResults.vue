<template>
  <div>
    <Transition name="fade-slide-down" appear>
      <div class="px-4 sm:px-0 dark:text-white">
        <h3 class="text-base font-semibold leading-10 text-gray-900 dark:text-white">
          Duty limits
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-10 text-gray-500">
          Based on a duty start time of {{ formattedBasedOnDate }}Z ({{ dutyStartTimeLBT.toString().padStart(4,"0") }} LBT), you have {{ dayNightOrCritical }} {{ dutyLimitType }} duty limits.
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
          <div :data-index="index" class="stagger-list">
            <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-white">
              {{ dutyLimit.label }}
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <StaggerList>
                <DutyLimitDisplay :duty-limit-in-minutes="dutyLimit.minutes" :duty-end-time-zulu="dutyLimit.endTimeZulu" />
              </StaggerList>
            </dd>
            <dl v-if="dutyLimit.bottomNotes" class="text-sm mt-5 font-medium leading-6 text-gray-900 dark:text-white">
              {{ dutyLimit.bottomNotes }}
            </dl>
          </div>
        </div>

        <CBAReference />
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatInTimeZone } from 'date-fns-tz';
import type { PropType } from 'vue';
import type { DomesticDutyLimit } from '~/sched-committee-types';

const props = defineProps({
  basedOnTime: {
    type: Date,
    required: true,
  },
  dutyLimits: {
    type: Object as PropType<DomesticDutyLimit>,
    required: true,
  },
  dutyStartTimeLBT: {
    type: Number,
    required: true,
  },

},
);

const formattedBasedOnDate = computed(() =>
  formatInTimeZone(props.basedOnTime, 'UTC', 'MM-dd-yy HH:mm'),

);

// output 'day', 'night', or 'critical' based on the duty start time (0500-1559 LBT), (1600-0059 LBT), else
const dayNightOrCritical = computed(() =>
  props.dutyStartTimeLBT >= 500 && props.dutyStartTimeLBT <= 1559
    ? 'day'
    : (props.dutyStartTimeLBT >= 1600 && props.dutyStartTimeLBT <= 2359) || props.dutyStartTimeLBT < 100
        ? 'night'
        : 'critical',
);

const dutyLimitType = computed(() =>
  (props.dutyStartTimeLBT >= 0 && props.dutyStartTimeLBT <= 100) ||
(props.dutyStartTimeLBT >= 1515 && props.dutyStartTimeLBT <= 1645) ||
(props.dutyStartTimeLBT >= 2230 && props.dutyStartTimeLBT <= 2400) ||
(props.dutyStartTimeLBT >= 500 && props.dutyStartTimeLBT <= 530)
    ? 'blended'
    : 'non-blended',
);

const dutyLimitsDisplay = computed(() => ([
  {
    label: 'Scheduled duty limit',
    bottomNotes: 'Bid pack pairing fatigue risk is based on no delays. Please assess your fatigue risk before exceeding scheduled limits.',
    minutes: props.dutyLimits.scheduled,
    endTimeZulu: props.dutyLimits.endOfScheduledDutyDate,
  },
  {
    label: 'Operational duty limit',
    bottomNotes: 'You must have prior approval (DO) to exceed operational duty limits. You must assess your fatigue risk.',

    minutes: props.dutyLimits.operational,
    endTimeZulu: props.dutyLimits.endOfOperationalDutyDate,
  },
  {
    label: 'FAR duty limit',
    minutes: props.dutyLimits.far,
    endTimeZulu: props.dutyLimits.endOfFARDutyDate,
  },
]));

/* const dutyLimitList = ref();
const { $anime } = useNuxtApp();
// const onEnter = (event: any) => console.log(`here${event}`);
function onEnter () {
/*   $anime({
    targets: event,
    translateX: [50, 0],
    opacity: [0, 1],
    scale: [1.2, 1],
    delay: event.dataset.index * 500 + 500,
    easing: 'easeInQuad',
    duration: 500,
  });
  $anime({
    targets: '.stagger-list',
    translateX: [50, 0],
    opacity: [0, 1],
    scale: [0.6, 1],
    delay: $anime.stagger(300, { start: 500 }),
    easing: 'easeInQuad',
    duration: 500,
  });
} */

</script>

<style>
.fade-slide-down-enter-active{
  transition: all 0.5s ease-in-out;
}

.fade-slide-down-enter-from
{
  transform: translateY(-50px) scale(1.2);

  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
}

</style>
