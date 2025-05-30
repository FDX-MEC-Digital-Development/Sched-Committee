<template>
  <div class="rounded-lg bg-gray-50 dark:bg-gray-900 px-5 py-6 sm:px-6">
    <ContentSection title="Company Responsibilities" caption="What the Company Must Provide" :content="[]">
      <div class="space-y-6">
        <UCard class="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500">
          <template #header>
            <h3 class="text-lg font-medium text-indigo-900 dark:text-indigo-100">
              Regardless of when and where you call out fatigued, the Company shall provide:
            </h3>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <UIcon name="i-heroicons-truck" class="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h4 class="font-medium text-indigo-900 dark:text-indigo-100 mb-1">
                Ground Transportation
              </h4>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <UIcon name="i-heroicons-building-office-2" class="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h4 class="font-medium text-indigo-900 dark:text-indigo-100">
                Hotel accommodations
              </h4>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <UIcon name="i-heroicons-arrow-uturn-left" class="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h4 class="font-medium text-indigo-900 dark:text-indigo-100">
                Deadhead back to base
              </h4>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h4 class="font-medium text-gray-900 dark:text-gray-100">
                Processing & Timeline
              </h4>
            </div>
          </template>

          <p class="text-sm text-gray-700 dark:text-gray-300">
            Processing should occur during your rest period, with a minimum of 8 hours after you get to the hotel.
          </p>
        </UCard>

        <UCard class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-currency-dollar" class="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
              <h4 class="font-medium text-orange-800 dark:text-orange-200">
                Important Financial Note
              </h4>
            </div>
          </template>

          <div class="text-sm text-orange-700 dark:text-orange-300 space-y-2">
            <p><strong>Duty Officer will create an Accepted Fare Letter</strong> covering deadhead expenses back to base.</p>
            <p>These funds are <strong>only usable for this specific deadhead</strong> - other deviation bank funds cannot be used for fatigue-related deadheads.</p>
          </div>
        </UCard>

        <UCard class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
              <h4 class="font-medium text-orange-800 dark:text-orange-200">
                Pairing Display
              </h4>
            </div>
          </template>

          <p class="text-sm text-orange-700 dark:text-orange-300 mt-4">
            Your pairing will only show activity up to the fatigue call, nothing after.
          </p>
        </UCard>

        <UCard class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-shield-check" class="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <h4 class="font-medium text-red-800 dark:text-red-200">
                Company Accountability
              </h4>
            </div>
          </template>

          <p class="text-sm text-red-700 dark:text-red-300">
            The Company has an ethical and professional responsibility to know where the pilot is and how long they are on duty at all times until the pilot has returned to their base or deviated from the new back-end deadhead.
          </p>
        </UCard>

        <UCard class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-question-mark-circle" class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
              <h4 class="font-medium text-yellow-800 dark:text-yellow-200">
                Why the CARMA Checklist Exists
              </h4>
            </div>
          </template>

          <p class="text-sm text-yellow-700 dark:text-yellow-300">
            The CARMA Checklist exists because pilots could be left on their own after a fatigue call while CRS works to re-crew the uncovered flight.
          </p>
        </UCard>
      </div>
    </ContentSection>
  </div>
</template>

<script lang="ts" setup>
</script>
