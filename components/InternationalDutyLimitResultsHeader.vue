<template>
  <div>
    <Transition name="fade-slide-down" appear>
      <SectionHeader title="Duty limits">
        Based on a duty start time of <UBadge>{{ formattedBasedOnDate }}Z</UBadge>, you have <UBadge>{{ props?.options?.isGrid ? 'grid' : 'non-grid' }}</UBadge> duty limits.
      </SectionHeader>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { formatInTimeZone } from 'date-fns-tz';
import type { PropType } from 'vue';
import type { DutyLimitOptions } from '~/sched-committee-types';

const props = defineProps({
  basedOnTime: {
    type: Date,
    required: true,
  },

  options: {
    type: Object as PropType<DutyLimitOptions>,
    required: true,
  },

},
);

const formattedBasedOnDate = computed(() =>
  formatInTimeZone(props.basedOnTime, 'UTC', 'MM-dd-yy HH:mm'),

);

const subtitle = computed(() =>
  `Based on a duty start time of ${formattedBasedOnDate.value}Z you have ${props?.options?.isGrid ? 'grid' : 'non-grid'} duty limits.`,
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
