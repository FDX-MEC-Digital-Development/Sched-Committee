<template>
  <CardGridItem v-for="(card, index) in dutyLimitCards" :key="`${card.title}${index}`" class="stagger-list ">
    <UseTimeAgo v-slot="{ timeAgo }" :time="card.dutyEndTimeZulu">
      <StaggerList>
        <DutyLimitCard
          :title="card.title"
          :duration="formattedDutyLimitHHMM(card.minutes)"
          :duty-end-time="formattedEndTime(card.dutyEndTimeZulu)"
          :notes="card.notes"
          :time-remaining="timeAgo"
          :minutes-remaining="card.minutesRemaining"
          :block-hours="card.blockHours"
          :landings="card.landings"
        />
      </StaggerList>
    </UseTimeAgo>
  </CardGridItem>
</template>

<script lang="ts" setup>
import { UseTimeAgo } from '@vueuse/components';

import { formatInTimeZone } from 'date-fns-tz';
import type { DutyLimitCard } from '../sched-committee-types';

defineProps({
  dutyLimitCards: {
    type: Array as PropType<DutyLimitCard[]>,
    required: true,
  },
});

const formattedDutyLimitHHMM = (dutyLimitInMinutes: number) => {
  const hours = Math.floor(dutyLimitInMinutes / 60);
  const minutes = dutyLimitInMinutes % 60 !== 0 ? (dutyLimitInMinutes % 60).toFixed(0).padStart(2, '0') : '';
  return `${hours}${minutes !== '' ? ':' : ''}${minutes}`;
};
const formattedEndTime = (dutyEndTimeZulu: Date) => formatInTimeZone(dutyEndTimeZulu, 'UTC', 'MM-dd-yy HH:mm');

</script>

<style>

</style>
