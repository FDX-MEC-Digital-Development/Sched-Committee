<template>
  <slot :duty-limit-h-h-m-m="formattedDutyLimitHHMM" :end-time="formattedEndTime" :time-until-scheduled-duty-limit="timeUntilScheduledDutyLimit" />
  <!-- {{ formattedDutyLimitHHMM }} hours @ {{ formattedEndTime }}Z ({{ timeUntilScheduledDutyLimit }}) -->
</template>

<script lang="ts" setup>
import { format } from 'date-fns';

const props = defineProps({
  dutyLimitInMinutes: {
    type: Number,
    required: true,
  },
  dutyEndTimeZulu: {
    type: Date,
    required: true,
  },
});

const formattedDutyLimitHHMM = computed(() => {
  const hours = Math.floor(props.dutyLimitInMinutes / 60);
  const minutes = props.dutyLimitInMinutes % 60 !== 0 ? (props.dutyLimitInMinutes % 60).toFixed(0).padStart(2, '0') : '';
  return `${hours}${minutes !== '' ? ':' : ''}${minutes}`;
});
const formattedEndTime = computed(() => format(props.dutyEndTimeZulu, 'MM-dd-yy HH:mm'));
const timeUntilScheduledDutyLimit = useTimeAgo(() => props.dutyEndTimeZulu);
</script>

<style>

</style>
