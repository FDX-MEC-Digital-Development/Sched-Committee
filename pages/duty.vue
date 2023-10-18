<template>
  <main class="-mt-32">
    <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div class="rounded-lg bg-grey px-5 py-6 shadow sm:px-6">
        <CardHeading title="Duty Limits" description="Use this tool to calulate scheduled, operational, and FAR duty limits." />
        <DutyLimitCard title="Results" stat="4" />
        <DutyLimitCard title="Results" stat="4" />

        <DutyLimitCard title="Results" stat="4" />

        <CBAReference />
        <DutyLimitDisclaimer />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Duty Limits',
});
</script>
