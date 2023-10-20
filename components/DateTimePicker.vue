<template>
  <UFormGroup name="dutyStart">
    <UInput type="datetime-local" trailing :model-value="dateISOString" @update:model-value="(event)=>handleDatetimeUpdate({newDatetimeInput: event})" />
  </UFormGroup>
</template>

<script lang="ts" setup>
import { isValid } from 'date-fns';
import { UTCDateMini } from '@date-fns/utc';
import { formatInTimeZone } from 'date-fns-tz';

const props = defineProps({
  date: {
    type: Date,
    default: (new UTCDateMini()),
  },
},

);

// this concatination is required because "T" is milliseconds
const dateISOString = computed(() => formatInTimeZone(props.date, 'UTC', 'yyyy-MM-dd') + 'T' + formatInTimeZone(props.date, 'UTC', 'HH:mm'));

const emit = defineEmits(['update:date']);

function handleDatetimeUpdate ({ newDatetimeInput }: { newDatetimeInput: string }) {
  // given the format 2023-10-21T21:55, construct a new date using date-fns-utc
  const [year, month, day, hour, minute] = newDatetimeInput.split(/[-T:]/).map(x => parseInt(x, 10));
  const newDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
  if (isValid(newDate)) {
    console.log(`Updating dutyStartTimeZulu to ${newDate}`);
    emit('update:date', newDate);
  }
}

</script>

<style>

</style>
