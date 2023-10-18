<template>
  <CardGrid>
    <CardGridItem v-for="(card, index) in dutyLimitCards" :key="`${card.title}${index}`" class="stagger-list ">
      <DutyLimitDisplayHeadless v-slot="slotProps" :duty-limit-in-minutes="card.minutes" :duty-end-time-zulu="card.dutyEndTimeZulu">
        <StaggerList>
          <DutyLimitCard
            :title="card.title"
            :duration="slotProps.dutyLimitHHMM"
            :duty-end-time="slotProps.endTime"
            :notes="card.notes"
            :time-remaining="slotProps.timeUntilScheduledDutyLimit"
          />
        </StaggerList>
      </DutyLimitDisplayHeadless>
    </CardGridItem>
  </CardGrid>
</template>

<script lang="ts" setup>
import { minutesToHours, format } from 'date-fns';
import { DomesticDutyLimit } from '~/sched-committee-types';

const props = defineProps({
  domesticDutyLimits: {
    type: Object as PropType<DomesticDutyLimit>,
    required: true,
  },
  dutyStartTimeLBT: {
    type: Number,
    required: true,
  },
});

const dutyLimitCards = computed(() => {
  const domesticScheduledCard = {
    title: 'Scheduled duty limit',
    notes: 'Bid pack pairing fatigue risk is based on no delays. Please assess your fatigue risk before exceeding scheduled limits.',
    duration: minutesToHours(props.domesticDutyLimits.scheduled).toString(),
    minutes: props.domesticDutyLimits.scheduled,
    dutyEndTime: format(props.domesticDutyLimits.endOfScheduledDutyDate, 'dd-MM HH:MM'),
    dutyEndTimeZulu: props.domesticDutyLimits.endOfScheduledDutyDate,
  };
  const domesticOperationalCard = {
    title: 'Operational duty limit',
    notes: 'You must have prior approval (DO) to exceed operational duty limits. You must assess your fatigue risk.',
    duration: minutesToHours(props.domesticDutyLimits.operational).toString(),
    minutes: props.domesticDutyLimits.operational,
    dutyEndTime: format(props.domesticDutyLimits.endOfOperationalDutyDate, 'dd-MM HH:MM'),
    dutyEndTimeZulu: props.domesticDutyLimits.endOfOperationalDutyDate,
  };
  const domesticFARCard = {
    title: 'Scheduled duty limit',
    notes: '',
    duration: minutesToHours(props.domesticDutyLimits.far).toString(),
    minutes: props.domesticDutyLimits.far,
    dutyEndTime: format(props.domesticDutyLimits.endOfFARDutyDate, 'dd-MM HH:MM'),
    dutyEndTimeZulu: props.domesticDutyLimits.endOfFARDutyDate,
  };

  return [domesticScheduledCard, domesticOperationalCard, domesticFARCard];
},
);

</script>

<style>

</style>
