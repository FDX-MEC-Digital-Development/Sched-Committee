<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">
        Duty limits
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Based on a duty start time of {{ formattedBasedOnDate }}, you have {{ dutyLimitType }} duty limits.
      </p>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Scheduled duty limit
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ props.scheduledDutyLimit }} @ {{ format(props.scheduledDutyLimitTime, 'MM-dd-yy HH:mm') }}Z {{ timeUntilScheduledDutyLimit }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Operational duty limit
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ props.operationalDutyLimit }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            FAR duty limit
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ props.farDutyLimit }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Disclaimer
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            CBA reference
          </dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
              <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div class="flex w-0 flex-1 items-center">
                  <UIcon name="i-heroicons-document-text" class="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <span class=" font-medium">CBA 12.C</span>
                    <span class="flex-shrink-0 text-gray-400">External site</span>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">View</a>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { format } from 'date-fns';

const props = defineProps({
  basedOnTime: {
    type: Date,
    default: null,
  },
  dutyLimitType: {
    type: String,
    default: 'non-blended',
  },
  scheduledDutyLimit: {
    type: String,
    default: 'Not calculated yet',
  },
  operationalDutyLimit: {
    type: String,
    default: 'Not calculated yet',
  },
  farDutyLimit: {
    type: String,
    default: 'Not calculated yet',
  },
  scheduledDutyLimitTime: {
    type: Date,
    default: undefined,
    required: false,

  },
  operationalDutyLimitTime: {
    type: Date,
    default: null,

  },
  farDutyLimitTime: {
    type: Date,
    default: null,

  },

},
);

const formattedBasedOnDate = computed(() =>
  props.basedOnTime?.toISOString().split('T')[0],
);

const timeUntilScheduledDutyLimit = useTimeAgo(() => props.scheduledDutyLimitTime!);
</script>

<style>

</style>
