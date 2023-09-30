<template>
  <ion-page>
    <div class="min-h-full">
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            FedEx ALPA Scheduling Committee
          </h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <ion-list>
            <ion-item>
              <ion-label>Enter Duty Period Start Time</ion-label>
              <ion-datetime presentation="time" hour-cycle="h23"></ion-datetime>
            </ion-item>
            <ion-item> Scheduled Max duty Limit </ion-item>
            <ion-item>
              Bid pack pairing fatigue risk is based on no delays. Please assess
              your fatigue risk before exceeding scheduled limits. Tools. (link)
            </ion-item>
            <ion-item> Operational Max Duty Limit</ion-item>
            <ion-item>
              You must have prior approval (DO) to exceed operational duty
              limits. You must assess your fatigue risk. Tools. (Link)</ion-item
            >
            <ion-item>FAR Max Duty Limit</ion-item>
          </ion-list>
        </div>
      </main>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
definePageMeta({
  alias: ['/'],
});
</script>

<style></style>
