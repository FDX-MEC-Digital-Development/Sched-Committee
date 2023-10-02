<template>
  <UFormGroup label="Duty start time" name="dutyStart">
    <UInput type="date" trailing :model-value="date" @update:model-value="handleDateUpdate" />
    <UInput type="time" trailing :model-value="time" @update:model-value="handleTimeUpdate" />
  </UFormGroup>
</template>

<script lang="ts" setup>
defineProps({
  date: {
    type: String,
    default: (new Date()).toString(),

  },
  time: {
    type: String,
    default: (new Date()).toString(),

  },
},

);

const emit = defineEmits(['update:date', 'update:time']);

const handleDateUpdate = (event: string) => {
  emit('update:date', event);
};

const handleTimeUpdate = (event: string) => {
  // if time is in format HH:MM:ss, remove the seconds
  if (/\d{2}:\d{2}:\d{2}/.test(event)) {
    event = event.split(':').slice(0, 2).join(':');
  }
  if (/\d{2}:\d{2}/.test(event)) {
    emit('update:time', event);
  }
};
</script>

<style>

</style>
