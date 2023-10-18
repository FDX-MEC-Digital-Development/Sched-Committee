<template>
  <div>
    <IonDatetimeButton datetime="datetime" />

    <IonModal :keep-contents-mounted="true">
      <IonDatetime id="datetime" hour-cycle="h23" @ion-change="(newISODate) =>handleDateUpdate({newISODate})" />
    </IonModal>
    <UFormGroup name="dutyStart">
      <UInput type="date" trailing :model-value="todaysDateInDateStringFormat" @update:model-value="(event: string)=>handleDateUpdate({newDateInput: event})" />
      <UInput type="time" trailing :model-value="timeRightNowInTimeStringFormat" @update:model-value="(event: string)=>handleDateUpdate({newTimeInput: event})" />
    </UFormGroup>
  </div>
</template>

<script lang="ts" setup>

import { isValid } from 'date-fns';
import { IonModal, IonDatetime, IonDatetimeButton } from '@ionic/vue';
import { IonDatetimeCustomEvent, DatetimeChangeEventDetail } from '@ionic/core';

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

function handleDateUpdate ({ newDateInput, newTimeInput, newISODate }: {newDateInput?: string, newTimeInput?: string, newISODate?: IonDatetimeCustomEvent<DatetimeChangeEventDetail>}) {
  console.log({ newISODate });
  if (newISODate?.detail?.value && typeof newISODate.detail.value === 'string') {
    const newDate = new Date(newISODate.detail.value);
    if (isValid(newDate)) {
      console.log(`Updating dutyStartTimeZulu to ISO Date ${newDate}`);
      emit('update:date', newDate);
    }
    return;
  }
  const dateInput = newDateInput || todaysDateInDateStringFormat.value;
  const timeInput = newTimeInput || timeRightNowInTimeStringFormat.value;
  const newDate = new Date(`${dateInput}T${timeInput}Z`);
  if (isValid(newDate)) {
    console.log(`Updating dutyStartTimeZulu to ${newDate}`);
    emit('update:date', newDate);
  }
}

</script>

<style>

</style>
