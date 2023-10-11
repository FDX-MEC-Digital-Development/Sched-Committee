<template>
  <div>
    <Transition name="fade-slide-down" appear>
      <div class="px-4 sm:px-0">
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          Duty limits
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Based on a duty start time of {{ formattedBasedOnDate }}Z, you have {{ props?.options?.isGrid ? 'grid' : 'non-grid' }} duty limits..
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
            <dt class="text-sm font-medium leading-6 text-gray-900">
              {{ dutyLimit.label }}
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <StaggerList>
                <div>
                  <DutyLimitDisplay :duty-limit-in-minutes="dutyLimit.minutes" :duty-end-time-zulu="dutyLimit.endTimeZulu" />
                  <p v-if="dutyLimit.landings">
                    {{ dutyLimit.landings }}
                  </p>
                </div>
              </StaggerList>
            </dd>
            <dl v-if="dutyLimit.bottomNotes" class="text-sm mt-5 font-medium leading-6 text-gray-900">
              {{ dutyLimit.bottomNotes }}
            </dl>
            <dt class="text-sm font-medium leading-6 text-gray-900 mt-4">
              Block hours
            </dt>
            <dl>
              <p>{{ dutyLimit.blockHours }}</p>
            </dl>
          </div>
        </div>

        <DutyLimitDisclaimer />
        <CBAReference />
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';
import { PropType } from 'vue';
import { DutyLimitOptions, InternationalDuty } from '~/sched-committee-types';

const props = defineProps({
  basedOnTime: {
    type: Date,
    required: true,
  },
  dutyLimits: {
    type: Object as PropType<InternationalDuty[]>,
    required: true,
  },
  options: {
    type: Object as PropType<DutyLimitOptions>,
    required: true,
  },

},
);

const formattedBasedOnDate = computed(() =>
  format(props.basedOnTime, 'MM-dd-yy HH:mm'),

);

const dutyLimitsDisplay = computed(() => {
  const scheduledDutyLimits = props.dutyLimits.map(dutyLimit =>
    ({
      label: 'Scheduled duty limit',
      bottomNotes: dutyLimit?.scheduledNotes,
      landings: dutyLimit?.landings ? `${dutyLimit?.landings} landings` : undefined,
      blockHours: dutyLimit?.blockHours.scheduled ? `${dutyLimit?.blockHours.scheduled}` : undefined,
      minutes: dutyLimit.scheduled,
      endTimeZulu: dutyLimit.endOfScheduledDutyDate,
    }));

  const operationalDutyLimits = props.dutyLimits.filter(dutyLimit => dutyLimit.operational !== undefined && dutyLimit.endOfOperationalDutyDate !== undefined).map(dutyLimit =>
    ({
      label: 'Operational duty limit',
      bottomNotes: dutyLimit?.operationalNotes,
      landings: dutyLimit?.landings ? `${dutyLimit?.landings} landings` : undefined,
      blockHours: typeof dutyLimit?.blockHours.operational === 'number' ? `${dutyLimit?.blockHours.operational} block hours` : typeof dutyLimit?.blockHours.operational === 'string' ? dutyLimit?.blockHours.operational : undefined,
      minutes: dutyLimit.operational!,
      endTimeZulu: dutyLimit.endOfOperationalDutyDate!,
    }));

  return [...scheduledDutyLimits, ...operationalDutyLimits];
});

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
