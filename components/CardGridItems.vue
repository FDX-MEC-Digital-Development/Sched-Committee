<template>
  <CardGridItem v-for="(card, index) in dutyLimitCards" :key="`${card.title}${index}`" class="stagger-list ">
    <DutyLimitDisplayHeadless v-slot="slotProps" :duty-limit-in-minutes="card.minutes" :duty-end-time-zulu="card.dutyEndTimeZulu">
      <StaggerList>
        <DutyLimitCard
          :title="card.title"
          :duration="slotProps.dutyLimitHHMM"
          :duty-end-time="slotProps.endTime"
          :notes="card.notes"
          :time-remaining="slotProps.timeUntilScheduledDutyLimit"
          :minutes-remaining="card.minutesRemaining"
          :block-hours="card.blockHours"
        />
      </StaggerList>
    </DutyLimitDisplayHeadless>
  </CardGridItem>
</template>

<script lang="ts" setup>
// Nuxt cannot find this type
// import { DutyLimitCard } from '../sched-committee-types';

defineProps({
  dutyLimitCards: {
    type: Array as PropType<any[]>,
    required: true,
  },
});

</script>

<style>

</style>
