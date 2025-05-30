<template>
  <div class="space-y-8">
    <FatigueCallingInHeader />
    <FatigueWhenToCall />
    <FatigueAdditionalGuidance />
    <FatigueFiveScenarios />
    <FatigueCarmaChecklist />
    <FatigueCompanyResponsibilities />

    <div class="rounded-lg bg-gray-50 dark:bg-gray-900 px-5 py-6 sm:px-6">
      <div class="flex items-center justify-center">
        <UButton
          to="https://fdx.alpa.org/Portals/7/Documents/communications/public/2024/10/2024-10-01-frmcpr.html?ver=BdymfIIe5yMZXtVZY5ihlA=="
          target="_blank"
          color="indigo"
          variant="outline"
          size="lg"
          class="hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          <template #leading>
            <UIcon name="i-heroicons-document-text" />
          </template>
          View CARMA Article
          <template #trailing>
            <UIcon name="i-heroicons-arrow-top-right-on-square" />
          </template>
        </UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
