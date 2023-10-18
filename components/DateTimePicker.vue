<template>
  <UFormGroup name="dutyStart">
    <UInput type="date" trailing :model-value="todaysDateInDateStringFormat" @update:model-value="(event)=>handleDateUpdate({newDateInput: event})" />
    <UInput type="time" trailing :model-value="timeRightNowInTimeStringFormat" @update:model-value="(event)=>handleDateUpdate({newTimeInput: event})" />
  </UFormGroup>
</template>

<script lang="ts" setup>
import { isValid } from 'date-fns';
const props = defineProps({
  date: {
    type: Date,
    default: (new Date()),
  },
},

);

const dateIOSString = computed(() => props.date.toISOString());

const todaysDateInDateStringFormat = computed(() => dateIOSString.value.split('T')[0]);
const timeRightNowInTimeStringFormat = computed(() => dateIOSString.value.split('T')[1].split('.')[0]);

const emit = defineEmits(['update:date']);

function handleDateUpdate ({ newDateInput, newTimeInput }: {newDateInput?: string, newTimeInput?: string}) {
  const dateInput = newDateInput || todaysDateInDateStringFormat.value;
  const timeInput = newTimeInput || timeRightNowInTimeStringFormat.value;
  console.log(dateIOSString.value);
  console.log(`todaysDateInDateStringFormat: ${todaysDateInDateStringFormat.value}, timeRightNowInTimeStringFormat: ${timeRightNowInTimeStringFormat.value}`);
  console.log(`newDateInput: ${newDateInput}, newTimeInput: ${newTimeInput}`);
  const newDate = new Date(`${dateInput}T${timeInput}Z`);
  if (isValid(newDate)) {
    console.log(`Updating dutyStartTimeZulu to ${newDate}`);
    emit('update:date', newDate);
  }
}

</script>

<style>

</style>
