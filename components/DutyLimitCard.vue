<template>
  <div class="lg:col-start-3 lg:row-end-1  flex  justify-between  h-full">
    <h2 class="sr-only">
      {{ title }}
    </h2>
    <div class="rounded-lg bg-gray-50 flex flex-wrap flex-col shadow-sm ring-1 ring-gray-900/5 card-background">
      <dl class="flex flex-wrap mb-6">
        <div class="flex-none pl-6 pt-6" :aria-label="`title ${title}`">
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            {{ title }}
          </dt>
          <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
            {{ duration }} hours
          </dd>
        </div>
        <div class="flex-none  px-6 pt-4 ml-auto" :aria-label="`time remaining ${title}`">
          <dt class="sr-only">
            Time remaining
          </dt>
          <TimeRemainingBadge v-if="Math.abs(minutesRemaining) < (60 * 24 * 2)" :label="timeRemaining" :minutes-remaining="minutesRemaining" />
        </div>
        <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
          <dt class="flex-none">
            <span class="sr-only">Duty end time</span>
            <Icon name="heroicons-solid:at-symbol" class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm font-medium leading-6 text-gray-900  items-center flex justify-between w-full" :aria-label="`duty end time ${title}`">
            <UBadge>{{ dutyEndTime }}Z</UBadge>
          </dd>
          <dd v-if="false">
            <UButton icon="i-heroicons-bell" color="gray" variant="solid" class="self-end" />
          </dd>
        </div>
        <div v-if="notes" class="mt-4 flex w-full flex-none gap-x-4 px-6" :aria-label="`notes ${title}`">
          <dt class="flex-none">
            <span class="sr-only">Notes</span>
            <Icon name="heroicons-solid:shield-exclamation" class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            {{ notes }}
          </dd>
        </div>
        <div v-if="blockHours" class="mt-4 flex w-full flex-none gap-x-4 px-6" :aria-label="`block hours ${title}`">
          <dt class="flex-none">
            <span class="sr-only">Block hours</span>
            <Icon
              name="mdi:airplane-clock"
              class="h-6 w-5 text-gray-400"
              aria-hidden="true"
            />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            {{ blockHours }}
          </dd>
        </div>
        <div v-if="landings" class="mt-4 flex w-full flex-none gap-x-4 px-6" :aria-label="`landings ${title}`">
          <dt class="flex-none">
            <span class="sr-only">Landings</span>
            <Icon
              name="mdi:airplane-landing"
              class="h-6 w-5 text-gray-400"
              aria-hidden="true"
            />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            {{ landings }}
          </dd>
        </div>
      </dl>
      <div class="mt-auto border-t border-gray-900/5 px-6 py-6 w-full">
        <NuxtLink :to="link.link" class="text-sm font-semibold leading-6 text-gray-900">
          {{ link.title }} <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  timeRemaining: { type: String, required: false, default: '' },
  minutesRemaining: { type: Number, required: false, default: 780 },
  dutyEndTime: { type: String, required: true },
  notes: { type: String, required: false, default: '' },
  blockHours: { type: String, required: false, default: '' },
  landings: { type: String, required: false, default: '' },
});

const fatigueAssessmentLinks = {
  scheduled: {
    title: 'Fatigue Assessment',
    link: { path: '/fatigue' },
  },
  operational: {
    title: 'Call in fatigued',
    link: { path: '/fatigue', hash: '#carma-checklist' },
  },
  far: {
    title: 'Beyond operational',
    link: { path: '/fatigue', hash: '#extension' },
  },

};

const link = computed(() => {
  if (props.title === 'Operational duty limit') { return fatigueAssessmentLinks.operational; }

  if (props.title === 'FAR duty limit') { return fatigueAssessmentLinks.far; }

  return fatigueAssessmentLinks.scheduled;
});

</script>

<style>
.card-background {
  background-color: #DFDBE5;
background-image: url( 'assets/signal.svg' );
background-color: #DFDBE5;
background-image: linear-gradient(to bottom left, rgba(249, 250, 251, .4) 30%, rgba(249, 250, 251, .8) 45%, rgba(249, 250, 251, 1) 65%),url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23f36834' fill-opacity='0.21'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
</style>
