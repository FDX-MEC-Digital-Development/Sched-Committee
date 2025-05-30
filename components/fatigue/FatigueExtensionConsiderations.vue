<template>
  <ContentSection :title="title" :caption="subtitle" :content="[]">
    <div class="space-y-6">
      <!-- Main explanation -->
      <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <UIcon name="i-heroicons-information-circle" class="h-5 w-5 text-blue-400" />
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700 dark:text-blue-300">
              In the event of a trip delay, revision or operational emergency that extends, or would extend, a pilot beyond the operational limitations, a pilot who becomes excessively tired shall notify CRS immediately and then speak to the Duty Officer about his situation.
            </p>
          </div>
        </div>
      </div>

      <!-- Options -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          Available Options
        </h3>        <p class="text-sm text-gray-600 dark:text-gray-400">
          Depending on the pilot's situation and the Duty Officer's assessment, one of the following alternatives shall be enlisted to address the issue:
        </p><div class="space-y-3">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 mt-1" />
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100 text-sm">
                Revise Duty Within Operational Limits
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Adjust the duty assignment to stay within operational parameters while addressing the operational need.
              </p>
            </div>
          </div>

          <div class="flex items-center justify-center py-2">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              OR
            </span>
          </div>

          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 mt-1" />
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-100 text-sm">
                Legal Rest
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Provide the required legal rest period before continuing with duty assignment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Important distinction -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <UIcon name="i-heroicons-shield-exclamation" class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <h4 class="font-medium text-red-800 dark:text-red-200 text-sm">
                Key Difference from Fatigue Call (12.A.9)
              </h4>
              <div class="mt-2 text-sm text-red-700 dark:text-red-300 space-y-2">
                <p>
                  <strong>If you determine you require more rest than a legal rest period, only then</strong> can the Company remove you from the balance of your trip and be placed in sick leave status.
                </p>
                <p>
                  This is substantially different than how a Fatigue Call as defined in (12.A.9) is handled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact info -->
      <div class="text-center py-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          If you have any issues with how your duty extension is handled please contact the Fatigue Committee.
        </p>
      </div>
    </div>
  </ContentSection>
</template>

<script lang="ts" setup>
const title = 'Extension beyond Operational Duty Limits';
const subtitle = '12.C.5.b.ii.(Domestic) or 12.D.6.c.(International)';
</script>
