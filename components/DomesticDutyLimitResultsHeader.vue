<template>
  <div>
    <Transition name="fade-slide-down" appear>
      <SectionHeader title="Duty limits">
        Based on a duty start time of <UBadge>{{ formattedBasedOnDate }}Z</UBadge> <UBadge>({{ props.dutyStartTimeLBT.toString().padStart(4, '0') }} LBT)</UBadge>, you have <UBadge>{{ dayNightOrCritical }} {{ dutyLimitType }}</UBadge> duty limits.
      </SectionHeader>
    </Transition>
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
