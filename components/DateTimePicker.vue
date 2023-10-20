<template>
  <UFormGroup name="dutyStart">
    <UInput type="datetime-local" trailing :model-value="dateISOString" @update:model-value="(event)=>handleDatetimeUpdate({newDatetimeInput: event})" />
  </UFormGroup>
</template>

<script lang="ts" setup>
import { isValid, format } from 'date-fns';
const props = defineProps({
  date: {
    type: Date,
    default: (new Date()),
  },
},

);

// this concatination is required because "T" is milliseconds
const dateISOString = computed(() => format(props.date, 'yyyy-MM-dd') + 'T' + format(props.date, 'HH:mm'));

const emit = defineEmits(['update:date']);

function handleDatetimeUpdate ({ newDatetimeInput }: { newDatetimeInput: string }) {
  const newDate = new Date(newDatetimeInput + 'Z');
  if (isValid(newDate)) {
    console.log(`Updating dutyStartTimeZulu to ${newDate}`);
    emit('update:date', newDate);
  }
}

</script>

<style>

</style>
