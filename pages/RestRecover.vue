<template>
  <GenericToolPage title="Required Rest" description="Use this tool to calulate required rest after a duty period." :is-results-visible>
    <template #form>
      <RestRecoverForm v-model:options="options" v-model:duty-end-time-zulu="dutyEndTimeZulu" />
    </template>
    <template #button>
      <UButton label="View Rest" class="result execute rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" @click="isResultsVisible = true" />
    </template>
    <template #results>
      <CardGrid>
        <CardGridItem :key="JSON.stringify(options)" class="stagger-list ">
          <StaggerList>
            <ResultsCard title="Results" :link-title="results.cbaLink.value?.reference" :link-href="results.cbaLink.value?.link">
              <template #default>
                <div class="space-y-4">
                  <dl>
                    <dt class="flex self-center font-medium leading-6 text-gray-900  items-center  justify-between w-full ">
                      <span class="sr-only">Scheduled</span>
                      Scheduled
                    </dt>
                    <dd class="text-sm font-medium leading-6 text-gray-900  items-center flex justify-between w-full" :aria-label="`Scheduled rest`">
                      <UBadge size="lg">
                        {{ minutesToHours(results.restMinutesRequiredScheduled.value) }}
                      </UBadge>
                    </dd>
                  </dl>
                  <dl v-if="results.restMinutesOperationallyReducableTo.value !== undefined">
                    <dt class="flex self-center font-medium leading-6 text-gray-900  items-center  justify-between w-full ">
                      <span class="sr-only">Operational</span>
                      Operational
                    </dt>
                    <dd class="text-sm font-medium leading-6 text-gray-900  items-center flex justify-between w-full" :aria-label="`operational rest`">
                      <UBadge size="lg">
                        {{ minutesToHours(results.restMinutesOperationallyReducableTo.value) }}
                      </UBadge>
                    </dd>
                  </dl>
                </div>
              </template>
              <template #notes>
                <div v-if="notes.length > 0">
                  <dt class="flex-none">
                    <span class="sr-only">Notes</span>
                    <UIcon name="i-heroicons-shield-exclamation-solid" class="h-6 w-5 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd v-for="note in notes" :key="note" class="text-sm leading-6 text-gray-500">
                    {{ note }}
                  </dd>
                </div>
              </template>
            </ResultsCard>{{ results }}
          </StaggerList>
        </CardGridItem>
      </CardGrid>
    </template>
  </GenericToolPage>
</template>

<script lang="ts" setup>
import type { DomesticRestOptions, InternationalRestOptions, RestOptions } from '~/sched-committee-types';

const defaultDomesticRestOptions: DomesticRestOptions = {
  afterExceed8BlockHoursIn24Hours: false,
  exception12C2dAfterExceeding735ActualBlockHours: false,
  exception12C2dPriorToExceeding735ActualBlockHours: false,
  hotelStbyScenario: false,
  operatingInCriticalPeriod: false,
  priorToExceed8BlockHoursIn24Hours: false,
};

const defaultInternationalRestOptions: InternationalRestOptions = {

  doubleCrew: false,
  lateArrival: false,
  willExceed8BlockHoursOr12HoursOnDuty: false,
};

const options = ref<RestOptions>({
  isInternational: false,
  internationalOptions: defaultInternationalRestOptions,
  domesticOptions: defaultDomesticRestOptions,
  minutesPairingConstructedPriorToShowtime: 0,
  nextDuty: 'Revenue',
  prevDuty: 'Revenue',
});

const dutyEndTimeZulu = ref<Date>(new Date());
const isResultsVisible = ref(false);

const results = useRestRecover(dutyEndTimeZulu, options);
const notes = computed(() => results.notes.value ? results.notes.value : []);

// eslint-disable-next-line no-console
watchEffect(() => console.log({ results }));

function minutesToHours (minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours}:${remainder.toString().padStart(2, '0')}`;
}

</script>

<style>

</style>
