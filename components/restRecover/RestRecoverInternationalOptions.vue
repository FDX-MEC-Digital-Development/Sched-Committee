<template>
  <form>
    <div class="max-w-2xl space-y-10 md:col-span-2">
      <fieldset v-auto-animate>
        <div v-if="hours >= 96">
          <OptionsSelect v-model="options.prevDuty" label="Previous Duty" :options="dutyOptions" />
          <OptionsSelect v-model="options.nextDuty" label="Next Duty" :options="dutyOptions" />
        </div>

        <div v-else>
          <OptionsCheckbox v-model="options.internationalOptions.doubleCrew" label="Double Crew" caption="Are you operating with 4 crew members?" />
          <OptionsCheckbox v-model="options.internationalOptions.willExceed8BlockHoursOr12HoursOnDuty" label="High block/Long duty" caption="Will you exceed 8 block hours or 12 hours on duty?" />
          <OptionsCheckbox v-model="options.internationalOptions.lateArrival" label="Late Arrival" caption="Are you arriving after your scheduled block in time?" />
        </div>
      </fieldset>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { RestOptions } from '~/sched-committee-types';

const props = defineProps<{
  minutesPairingConstructedPriorToShowtime: number;
}>();

const hours = computed(() => Math.floor(props.minutesPairingConstructedPriorToShowtime / 60));

const options = defineModel<RestOptions>('options', { required: true });

const dutyOptions = ['Revenue', 'Deadhead', 'HotelStby'];

</script>

<style>

</style>
