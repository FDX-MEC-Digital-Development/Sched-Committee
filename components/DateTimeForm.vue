<template>
  <UFormGroup label="Duty start time" name="dutyStart">
    <UInput icon="i-heroicons-calendar" type="date" trailing :model-value="date" @update:model-value="handleDateUpdate" />
    <UInput icon="i-heroicons-clock" type="time" trailing :model-value="time" @update:model-value="handleTimeUpdate" />
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

const handleDateUpdate = (event: Event) => {
  console.log(event);
  console.log('date updated');
  emit('update:date', event);
};

const handleTimeUpdate = (event: Event) => {
  console.log(event);
  console.log('time updated');
  emit('update:time', event);
};
</script>

<style>

</style>
