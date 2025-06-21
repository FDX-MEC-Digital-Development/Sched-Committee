<template>
  <ContentSection
    title="Fatigue Reports"
    caption="Submit and Access Fatigue Reports"
    :content="[
      'You do not need to call-in fatigued to file a fatigue report.',
      'Use these reporting methods to submit new fatigue reports or access existing ones.',
      'ART reports create Accountability and Dialogue.',
      'All reports are confidential and help improve safety for everyone.'
    ]"
  >
    <div class="mt-6 space-y-4">
      <!-- Company Reports Section -->
      <div class="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Company Reports - Create Awareness and Data
        </h3>
        <div class="space-y-3">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            <strong>Company Insite:</strong> File for operational issues (sleep rooms, recliners, etc.)
          </div>
          <div class="text-sm text-gray-700 dark:text-gray-300">
            <strong>Company FEM:</strong> File under Reports on PFC to identify fatigue hazards
          </div>
        </div>
      </div>

      <!-- DART Reports Section -->
      <div class="bg-green-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h3 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          DART Reports - Create Accountability and Dialogue
        </h3>
        <div class="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Copy everything to a DART and reference Company report or ASAP
        </div>

        <UButton
          to="https://dart.alpa.org/"
          target="_blank"
          color="green"
          variant="outline"
          size="sm"
        >
          <template #leading>
            <UIcon name="i-heroicons-document-arrow-up" />
          </template>
          Submit DART Report
          <template #trailing>
            <UIcon name="i-heroicons-arrow-top-right-on-square" />
          </template>
        </UButton>
      </div>

      <!-- Additional Resources -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Additional Resources
        </h3>

        <UButton
          to="https://fdx.alpa.org/Committees/Fatigue-Risk-Management-Committee"
          target="_blank"
          color="indigo"
          variant="outline"
          size="sm"
        >
          <template #leading>
            <UIcon name="i-heroicons-chart-bar-square" />
          </template>
          Fatigue Reports Analysis (June 2024)
          <template #trailing>
            <UIcon name="i-heroicons-arrow-top-right-on-square" />
          </template>
        </UButton>
      </div>
    </div>
  </ContentSection>
</template>

<script lang="ts" setup>
</script>
