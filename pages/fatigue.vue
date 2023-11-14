<template>
  <div class="bg-white dark:bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <FatigueQuotes />
        <div>
          <FatigueAssessmentDescription />

          <div class="mt-10 flex hidden">
            <a href="#" class="text-base font-semibold leading-7 text-indigo-600">Learn more about our company <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <FatiguePersonalAssessmentQuestions />
        <div>
          <FatigueRecognizeList />
        </div>
      </div>
      <div class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <FatigueCarmaChecklist class="mt-16" />
        <div>
          <FatigueTripRemovalExplanation class="mt-16" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
