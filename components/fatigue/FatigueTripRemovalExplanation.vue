<template>
  <ContentSection title="Trip Removal due to Fatigue" caption="CBA 12.A.9" :content="[]">
    <div class="space-y-6">
      <!-- Three Scenarios -->
      <div class="space-y-4">
        <div v-for="(scenario, index) in scenarios" :key="index" class="relative pl-8">
          <div class="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
          </div>
          <div class="text-sm text-gray-900 dark:text-gray-100">
            {{ scenario.text }}
          </div>
          <div v-if="scenario.example" class="mt-2 text-xs text-gray-600 dark:text-gray-400 italic">
            {{ scenario.example }}
          </div>
        </div>
      </div>

      <!-- Sub-options for scenario 3 -->
      <div class="ml-8 space-y-2">
        <div v-for="(option, index) in subOptions" :key="index" class="relative pl-6">
          <div class="absolute left-0 top-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {{ String.fromCharCode(97 + index) }}.
          </div>
          <div class="text-sm text-gray-700 dark:text-gray-300">
            {{ option }}
          </div>
        </div>
      </div>

      <!-- Compensation Section -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Compensation due to Fatigue After Trip Check-in (12.A.9.g)
        </h3>
        <div class="space-y-4 text-sm text-gray-700 dark:text-gray-300">
          <p>{{ fercDescription }}</p>

          <!-- Examples using UAccordion for cleaner presentation -->
          <UAccordion
            :items="exampleItems"
            variant="outline"
            class="mt-4"
          />

          <div class="mt-6 space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-gray-100">
              Trip Removal and Compensation (cont.)
            </h4>
            <p>{{ additionalInfo }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 italic">
              {{ fercNote }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </ContentSection>
</template>

<script lang="ts" setup>
const scenarios = [
  {
    text: 'A pilot who is excessively tired prior to actual check-in for a trip in base, following a legal rest period... pilot will be removed from his trip and to the extent he had trip guarantee, the hours shall be eligible for make-up (GMU bank). (12.A.9.a).',
    example: '[Ex: B-Reserve, notified at 1300L, assigned a trip that launches at 0030 and released in to rest]',
  },
  {
    text: 'A pilot who is excessively tired prior to actual check-in for a trip in base, without a legal rest period... pilot will be removed from his trip, and that trip will be placed into Sick Leave status, as provided in Section 14.B.5.',
    example: '[Ex: Hub turning, call in fatigued for next trip]',
  },
  {
    text: 'A pilot who becomes excessively tired subsequent to actual trip check-in shall notify CRS immediately and talk to the Duty Officer about (their) situation. Depending on the pilot\'s situation and the DO\'s assessment, one of the following alternatives shall be enlisted to address the issue:',
  },
];

const subOptions = [
  'The pilot may be given a legal rest period, schedule will be revised to continue.',
  'Pilot\'s current trip may be revised to include some alternative duty assignment.',
  'Pilot\'s trip concludes, put in sick for remainder of trip.',
];

const fercDescription = 'The Fatigue Event Review Committee (FERC)* meets and discusses all pilot fatigue calls made subsequent to actual trip check-in, with sick bank deduction. The FERC will evaluate the circumstances surrounding the fatigue call and will attempt to reach a consensus concerning compensation for the trip (sick-bank reimbursement). We are at roughly 95% sick-bank reimbursement and 100% pay coverage.';

const exampleItems = [
  {
    label: 'Example 1 (No Reimbursement)',
    defaultOpen: false,
    content: 'Pilot calls in fatigued for hub turn trip after inbound flight is delayed 1-hour due to maintenance. The pilot mentions in his fatigue report narrative that he had difficulty sleeping due to a head cold he\'s been fighting for a couple of days. FERC decides: No Reimbursement of Sick Bank.',
  },
  {
    label: 'Example 2 (Reimbursement)',
    defaultOpen: false,
    content: 'Pilot was scheduled for a single leg (XXX-IND) duty period, had some difficulty resting in XXX but knew he only had the one leg that night. Upon arrival into IND, he was advised that the trip had been revised to operate an additional leg (IND-XXX) in the same duty period. Knowing that he had difficulty resting in XXX and would not have an opportunity to nap in IND prior to the additional leg, he felt unsafe to continue and called in fatigue. FERC decides: Reimbursement of Sick Bank.',
  },
];

const additionalInfo = 'There are some cases where the sick bank is not charged at all. For example, if a pilot is into overage (already operating beyond the original end time of the trip) and calls in fatigue, the sick bank is not charged for the remainder of that trip. The pilot will stop earning overage at the time of the fatigue call.';

const fercNote = '*FERC: Consists of 2 FedEx Company employees and 2 ALPA members.';
</script>
