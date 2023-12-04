<template>
  <div class="bg-white dark:bg-gray-900 py-0 sm:py-8">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!--NavigationVertical :navigation="fatigueNavigation" /-->
      <div class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <FatigueQuotes />
        <div>
          <FatigueAssessmentDescription />

          <!-- <div class="mt-10 flex hidden">
            <a href="#" class="text-base font-semibold leading-7 text-indigo-600">Learn more about our company <span aria-hidden="true">&rarr;</span></a>
          </div> -->
        </div>
      </div>
      <div id="personal-assessment" class="mx-auto  pt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <FatiguePersonalAssessmentQuestions />
        <div id="signs-of-fatigue">
          <FatigueRecognizeList />
        </div>
      </div>
      <div id="carma-checklist" class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <FatigueCarmaChecklist class="mt-16" />
        <div id="trip-removal">
          <FatigueTripRemovalExplanation class="mt-16" />
        </div>
      </div>
      <div id="extension" class="mx-auto pt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <FatigueExtensionConsiderations />
        <div />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import type { NavigationLink } from '~/sched-committee-types';

/* const fatigueNavigation: NavigationLink[] = [
  { name: 'Personal Assessment', href: { hash: '#personal-assessment' }, icon: 'heroicons:home', current: false },
  { name: 'Signs of Fatigue', href: { hash: '#signs-of-fatigue' }, icon: 'heroicons:home', current: false },
  { name: 'Calling in Fatigued', href: { hash: '#carma-checklist' }, icon: 'heroicons:home', current: false },
  { name: 'Trip Removal', href: { hash: '#trip-removal' }, icon: 'heroicons:home', current: false }];
 */
</script>

<style>

</style>
