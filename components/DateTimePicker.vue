<template>
  <UFormGroup name="dutyStart">
    <!--UInput type="datetime-local" trailing :model-value="dateISOString" @update:model-value="(event)=>handleDatetimeUpdate({newDatetimeInput: event})" /-->
    <VueDatePicker
      :model-value="date"
      utc="preserve"
      date-picker
      timezone="utc"
      :dark="isDark"
      :enable-time-picker="false"
      :clearable="false"
      :month-change-on-scroll="false"
      :teleport-center="true"
      @update:model-value="(dateString: string) => handleDatePickerUpdate({dateString})"
    />
    <VueDatePicker
      time-picker
      :model-value="hoursMinutes"
      utc="preserve"
      timezone="utc"
      :dark="isDark"
      :clearable="false"
      :format="`HH:mm'Z'`"
      @update:model-value="(timeObject) => handleDatePickerUpdate({timeObject})"
    >
      <template #input-icon>
        <Icon name="i-heroicons-clock" class="w-auto  px-3" />
      </template>
    </VueDatePicker>
    <UFormGroup />
  </uformgroup>
</template>

<script lang="ts" setup>
import { isValid } from 'date-fns';
import { UTCDateMini } from '@date-fns/utc';
// import { formatInTimeZone } from 'date-fns-tz';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  date: {
    type: Date,
    default: (new UTCDateMini()),
  },
},
);

const hoursMinutes = computed(() => ({
  hours: props.date.getHours(),
  minutes: props.date.getMinutes(),
}));

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
// this concatination is required because "T" is milliseconds
// const dateISOString = computed(() => formatInTimeZone(props.date, 'UTC', 'yyyy-MM-dd') + 'T' + formatInTimeZone(props.date, 'UTC', 'HH:mm'));

const emit = defineEmits(['update:date']);

/* function handleDatetimeUpdate ({ newDatetimeInput }: { newDatetimeInput: string }) {
  // given the format 2023-10-21T21:55, construct a new date using date-fns-utc
  const [year, month, day, hour, minute] = newDatetimeInput.split(/[-T:]/).map(x => parseInt(x, 10));
  const newDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
  if (isValid(newDate)) {
    console.log(`Updating dutyStartTimeZulu to ${newDate}`);
    emit('update:date', newDate);
  }
} */

function handleDatePickerUpdate ({ dateString, timeObject }: {dateString?: string | undefined, timeObject?: {hours: number, minutes: number, seconds: number} | undefined}) {
  if (dateString === undefined && timeObject === undefined) {
    return;
  }
  if (dateString !== undefined) {
    const [year, month, day, hour, minute] = dateString.split(/[-T:]/).map(x => parseInt(x, 10));
    const newDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
    if (isValid(newDate)) {
      emit('update:date', newDate);
    }
  } else if (timeObject !== undefined) {
    const newDate = new UTCDateMini(Date.UTC(props.date.getFullYear(), props.date.getMonth(), props.date.getDate(), timeObject.hours, timeObject.minutes));
    if (isValid(newDate)) {
      emit('update:date', newDate);
    }
  }
}

</script>

<style>

</style>
