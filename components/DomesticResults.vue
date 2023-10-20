<template>
  <CardGrid>
    <CardGridItems :duty-limit-cards="dutyLimitCards" />
  </CardGrid>
</template>

<script lang="ts" setup>
import { minutesToHours, differenceInMinutes } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import type { DomesticDutyLimit, DutyLimitCard } from '~/sched-committee-types';

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

const dutyLimitCards = computed<DutyLimitCard[]>(() => {
  const domesticScheduledCard = {
    title: 'Scheduled duty limit',
    notes: 'Bid pack pairing fatigue risk is based on no delays. Please assess your fatigue risk before exceeding scheduled limits.',
    duration: minutesToHours(props.domesticDutyLimits.scheduled).toString(),
    minutes: props.domesticDutyLimits.scheduled,
    dutyEndTime: formatInTimeZone(props.domesticDutyLimits.endOfScheduledDutyDate, 'UTC', 'dd-MM HH:MM'),
    dutyEndTimeZulu: props.domesticDutyLimits.endOfScheduledDutyDate,
    minutesRemaining: differenceInMinutes(props.domesticDutyLimits.endOfScheduledDutyDate, new Date()),
  };
  const domesticOperationalCard = {
    title: 'Operational duty limit',
    notes: 'You must have prior approval (DO) to exceed operational duty limits. You must assess your fatigue risk.',
    duration: minutesToHours(props.domesticDutyLimits.operational).toString(),
    minutes: props.domesticDutyLimits.operational,
    dutyEndTime: formatInTimeZone(props.domesticDutyLimits.endOfOperationalDutyDate, 'UTC', 'dd-MM HH:MM'),
    dutyEndTimeZulu: props.domesticDutyLimits.endOfOperationalDutyDate,
    minutesRemaining: differenceInMinutes(props.domesticDutyLimits.endOfOperationalDutyDate, new Date()),
  };
  const domesticFARCard = {
    title: 'FAR duty limit',
    notes: '',
    duration: minutesToHours(props.domesticDutyLimits.far).toString(),
    minutes: props.domesticDutyLimits.far,
    dutyEndTime: formatInTimeZone(props.domesticDutyLimits.endOfFARDutyDate, 'UTC', 'dd-MM HH:MM'),
    dutyEndTimeZulu: props.domesticDutyLimits.endOfFARDutyDate,
    minutesRemaining: differenceInMinutes(props.domesticDutyLimits.endOfFARDutyDate, new Date()),
  };

  return [domesticScheduledCard, domesticOperationalCard, domesticFARCard];
},
);

</script>

<style>

</style>
