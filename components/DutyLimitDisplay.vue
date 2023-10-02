<template>
  <div>
    {{ (dutyLimitInMinutes / 60).toFixed(2) }} hours @ {{ formattedEndTime }}Z ({{ timeUntilScheduledDutyLimit }})
  </div>
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

const formattedEndTime = computed(() => format(props.dutyEndTimeZulu, 'MM-dd-yy HH:mm'));
const timeUntilScheduledDutyLimit = useTimeAgo(() => props.dutyEndTimeZulu);
</script>

<style>

</style>
