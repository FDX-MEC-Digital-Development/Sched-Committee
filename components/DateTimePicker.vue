<template>
  <UFormGroup name="dutyStart">
    <UInput type="datetime-local" trailing :model-value="dateISOString" @update:model-value="(event)=>handleDatetimeUpdate({newDatetimeInput: event})" />
    {{ debug }}
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
const debug = ref();

function handleDatetimeUpdate ({ newDatetimeInput }: { newDatetimeInput: string }) {
  debug.value = newDatetimeInput;
  console.log(newDatetimeInput);

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
