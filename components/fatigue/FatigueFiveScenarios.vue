<template>
  <div class="rounded-lg bg-gray-50 dark:bg-gray-900 px-5 py-6 sm:px-6">
    <ContentSection title="Five Fatigue Call Scenarios" caption="Decision Tree">
      <div class="space-y-6">
        <!-- All Five Scenarios in One Flow -->
        <UCard>
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h4 class="font-medium text-gray-900 dark:text-gray-100">
                Five Fatigue Call Scenarios
              </h4>
            </div>
          </template>          <div class="space-y-4">
            <!-- All 5 scenarios in logical flow -->
            <div class="space-y-4">
              <!-- Scenario 1 -->
              <div class="flex items-start space-x-3">
                <UBadge color="indigo" variant="solid" size="sm" class="mt-0.5">
                  1
                </UBadge>
                <div>
                  <p class="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    Before check-in with legal rest
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    Call CRS to discuss fatigue concerns
                  </p>
                  <UBadge color="gray" variant="soft" size="xs" class="mt-1">
                    No CARMA needed
                  </UBadge>
                </div>
              </div>

              <!-- Scenario 2 -->
              <div class="flex items-start space-x-3">
                <UBadge color="indigo" variant="solid" size="sm" class="mt-0.5">
                  2
                </UBadge>
                <div>
                  <p class="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    Before check-in without legal rest
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    Hub turn or similar situation
                  </p>
                  <UBadge color="gray" variant="soft" size="xs" class="mt-1">
                    No CARMA needed
                  </UBadge>
                </div>
              </div>

              <!-- Scenario 3 -->
              <div class="flex items-start space-x-3">
                <UBadge color="indigo" variant="solid" size="sm" class="mt-0.5">
                  3
                </UBadge>
                <div>
                  <p class="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    After check-in: Trip <strong>postponed</strong>
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    You go into rest, trip continues later
                  </p>
                  <UBadge color="gray" variant="soft" size="xs" class="mt-1">
                    No CARMA needed
                  </UBadge>
                </div>
              </div>

              <!-- Scenario 4 -->
              <div class="flex items-start space-x-3">
                <UBadge color="indigo" variant="solid" size="sm" class="mt-0.5">
                  4
                </UBadge>
                <div>
                  <p class="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    After check-in: Trip <strong>revised</strong>
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    You go into rest, trip continues modified
                  </p>
                  <UBadge color="gray" variant="soft" size="xs" class="mt-1">
                    No CARMA needed
                  </UBadge>
                </div>
              </div>

              <!-- Scenario 5 - Special highlighting -->
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                <div class="flex items-start space-x-3">
                  <UBadge color="red" variant="solid" size="sm" class="mt-0.5">
                    5
                  </UBadge>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <p class="font-medium text-red-800 dark:text-red-200 text-sm">
                        After check-in: <strong>Removed</strong> from the balance of the trip
                      </p>
                      <UBadge color="red" variant="solid" size="sm" class="font-medium">
                        USE CARMA
                      </UBadge>
                    </div>
                    <p class="text-xs text-red-600 dark:text-red-300 mt-1">
                      Company terminates your involvement in the trip - CARMA process begins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <UCard class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
              <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Important Distinction
              </h3>
            </div>
          </template>

          <div class="space-y-3 text-sm text-yellow-700 dark:text-yellow-300">
            <div>
              <p class="font-semibold">
                When NOT to Use CARMA Checklist:
              </p>
              <ul class="list-disc list-inside mt-1 space-y-1 ml-2">
                <li><strong>"Revised":</strong> Company puts you into rest and the trip continues</li>
                <li><strong>"Postponed":</strong> Company puts you into rest and the trip continues</li>
              </ul>
            </div>

            <div>
              <p class="font-semibold">
                When to Use CARMA Checklist:
              </p>
              <ul class="list-disc list-inside mt-1 ml-2">
                <li><strong>"Removed":</strong> Company removes you from the balance of your trip</li>
              </ul>
            </div>
          </div>
        </UCard>        <div class="text-center">
          <p class="text-lg font-medium text-gray-900 dark:text-gray-100">
            The CARMA Checklist applies
            <UBadge color="red" variant="solid" class="mx-1">
              ONLY
            </UBadge>
            to scenario #5
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
            When the Company removes you from the balance of your trip following a fatigue call after trip check-in
          </p>
        </div>
      </div>
    </ContentSection>
  </div>
</template>

<script setup>
</script>
