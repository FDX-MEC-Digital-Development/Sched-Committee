<template>
  <div class="rounded-lg bg-gray-50 dark:bg-gray-900 px-5 py-6 sm:px-6">
    <ContentSection title="When to Call in Fatigued" caption="Basic Guidelines">
      <div class="space-y-6">
        <UCard class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
          <p class="text-blue-800 dark:text-blue-200">
            <strong>Key Principle:</strong> A pilot who becomes excessively tired (fatigued) shall notify CRS immediately and speak with the Duty Officer about their situation. Be polite and professional - you are calling to report fatigue, not to discuss the FOM or CBA.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-list-bullet" class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Before You Call
              </h3>
            </div>
          </template>

          <div class="space-y-4">
            <div class="flex items-start">
              <UBadge color="blue" variant="solid" size="sm" class="mt-1 mr-3 flex-shrink-0">
                1
              </UBadge>
              <div class="flex-1">
                <p class="text-gray-700 dark:text-gray-300">
                  If you have legal rest before operating but have concerns about an upcoming duty period, first contact CRS to explain your concerns about pairing changes or revisions
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <UBadge color="blue" variant="solid" size="sm" class="mt-1 mr-3 flex-shrink-0">
                2
              </UBadge>
              <div class="flex-1">
                <p class="text-gray-700 dark:text-gray-300">
                  If they cannot amend the pairing to address your concerns, accept professionally and attempt rest
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <UBadge color="red" variant="solid" size="sm" class="mt-1 mr-3 flex-shrink-0">
                3
              </UBadge>
              <div class="flex-1">
                <p class="text-gray-700 dark:text-gray-300">
                  <strong>Only call the Duty Officer if you are fatigued prior to show or will be fatigued during your next duty period</strong>
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </ContentSection>
  </div>
</template>

<script setup>
</script>
