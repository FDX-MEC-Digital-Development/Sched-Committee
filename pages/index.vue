<template>
  <div class="relative isolate pt-14">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div v-if="colorMode.value == 'dark'" class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      <div v-else class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8084ff] to-[#555555] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="py-24 sm:py-32 lg:pb-40">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-4xl font-bold tracking-tight dark:text-white text-black sm:text-6xl">
            ALPA Scheduling Committee
          </h1><RandomTextOnTimer v-slot="{activeContent}" v-auto-animate :content="schedulingCommitteeFunctions">
            <p :key="activeContent" class="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-700">
              {{ activeContent }}
            </p>
          </RandomTextOnTimer>

          <div class="mt-10 flex items-center justify-center gap-x-6">
            <UButton label="Duty Limits" class="result execute rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" to="/dutyLimits" />
            <UButton label="Fatigue" class="result execute rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" to="/fatigue" />

            <!-- <a href="#" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">Get started</a> -->
            <!-- <a href="#" class="text-sm font-semibold leading-6 dark:text-white text-black">Learn more <span aria-hidden="true">→</span></a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const colorMode = useColorMode();
const schedulingCommitteeFunctions = ['Scheduling Improvement Group (SIG)', 'Pilot Scheduling Improvement Team', 'Trip Services Committee', 'Secondary Line Replacement Working Group', 'Fatigue Risk Management', 'Monthly Pairing Reviews', 'Monthly Line Building'];

</script>
<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s;
}
.slide-left-enter-from {
position: absolute;
  transform: translate(100%, 0);
}
.slide-left-leave-to {
  position: absolute;
  transform: translate(-100%, 0);
  opacity: 0;
}
.slide-right-enter-from {
  position: absolute;
  transform: translate(-100%, 0);
}
.slide-right-leave-to {
  position: absolute;
  transform: translate(100%, 0);
  opacity: 0;
}
</style>
