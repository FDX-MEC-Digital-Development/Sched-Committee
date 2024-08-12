<template>
  <CardGrid>
    <CardGridItem :key="JSON.stringify(results.cbaLink.value?.reference)" class="stagger-list">
      <StaggerList>
        <ResultsCard title="Required rest" :link-title="results.cbaLink.value?.reference" :link-href="results.cbaLink.value?.link" class="result">
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
            <div v-if="notes.length > 0" class="mt-4 flex flex-col w-full flex-none gap-y-4">
              <div v-for="note in notes" :key="note" class="flex space-x-4">
                <dt class="flex-none">
                  <span class="sr-only">Notes</span>
                  <UIcon name="i-heroicons-shield-exclamation-solid" class="h-6 w-5 text-gray-400" aria-hidden="true" />
                </dt>
                <dd class="text-sm leading-6 text-gray-500 flex-grow">
                  {{ note }}
                </dd>
              </div>
            </div>
          </template>
        </ResultsCard>
      </StaggerList>
    </CardGridItem>
  </CardGrid>
</template>

<script lang="ts" setup>
import { useRestRecover } from '~/composables/useRestRecover';

defineProps<{
  results: ReturnType<typeof useRestRecover>
    notes: string[]
}>();

function minutesToHours (minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours}:${remainder.toString().padStart(2, '0')}`;
}

</script>

<style>

</style>
