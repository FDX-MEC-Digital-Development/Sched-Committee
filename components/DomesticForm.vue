<template>
  <form>
    <div class="max-w-2xl space-y-10 md:col-span-2">
      <fieldset>
        <div class="xs:mt-2 space-y-6">
          <!--           <label for="about" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Domicile</label> -->
          <UFormGroup label="Domicile">
            <USelectMenu :model-value="options.domicile" :options="domicileOptions" @update:model-value="(event) => handleOptionsUpdate({domicile: event})" />
          </UFormGroup>
        </div>
        <div class="mt-6 space-y-6">
          <div class="relative flex gap-x-3">
            <div class="flex h-6 items-center">
              <UCheckbox :model-value="options.is2TripsWithOneOptional" name="Optional assignment" @update:model-value="(event) => handleOptionsUpdate({is2TripsWithOneOptional: event})" />
            </div>
            <div class="text-sm leading-6">
              <label for="comments" class="font-medium text-gray-900">Optional assignment</label>
              <p class="text-gray-500">
                2 trips with one as an optional assignment (eg. SON, SWP, PDO, VLT, DRF)
              </p>
            </div>
          </div>
          <div class="relative flex gap-x-3">
            <div class="flex h-6 items-center">
              <UCheckbox :model-value="options.isDayRoomScheduledAndReserved" name="Day room" @update:model-value="(event) => handleOptionsUpdate({isDayRoomScheduledAndReserved: event})" />
            </div>
            <div class="text-sm leading-6">
              <label for="candidates" class="font-medium text-gray-900">Day room</label>
              <p class="text-gray-500">
                Duty period contains flight segments with at least 4 hours between block-in and block-out and a day room is scheduled and reserved during that time
              </p>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </form>
</template>

<script setup lang="ts">
import { isValid } from 'date-fns';
import type { DutyLimitOptions, Domicile } from '~/sched-committee-types';

const props = defineProps({
  dutyStartTimeZulu: {
    type: Date,
    default: null,
  },

  options: {
    type: Object as PropType<DutyLimitOptions>,
    default: () => ({
      is2TripsWithOneOptional: false,
      isDayRoomScheduledAndReserved: false,
    }),
  },
});

const emit = defineEmits(['update:dutyStartTimeZulu', 'update:domicile', 'update:options']);

// const dateStringFormat = 'yyyy-MM-dd';
const todaysDateInDateStringFormat = props.dutyStartTimeZulu ? props.dutyStartTimeZulu.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
const timeRightNowInTimeStringFormat = props.dutyStartTimeZulu ? props.dutyStartTimeZulu.toISOString().split('T')[1].split('.')[0] : new Date().toISOString().split('T')[1].split('.')[0];

const dateInput = ref<string>(todaysDateInDateStringFormat);
const timeInput = ref<string>(timeRightNowInTimeStringFormat);

const domicileOptions : Domicile[] = ['MEM', 'IND', 'OAK', 'LAX', 'ANC', 'CGN'];

function handleOptionsUpdate (newOptions: DutyLimitOptions) {
  emit('update:options', {
    ...props.options,
    ...newOptions,
  });
}

const updatedDutyStartTimeZulu = computed(() => {
  const newDate = new Date(`${dateInput.value}T${timeInput.value}Z`);
  return newDate;
});

watchEffect(() => {
  if (isValid(updatedDutyStartTimeZulu.value)) {
    emit('update:dutyStartTimeZulu', updatedDutyStartTimeZulu.value);
  }
})
;

</script>
