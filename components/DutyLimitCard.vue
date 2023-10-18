<template>
  <div class="lg:col-start-3 lg:row-end-1  flex flex-1  h-full">
    <h2 class="sr-only">
      Title
    </h2>
    <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 card-background">
      <dl class="flex flex-wrap">
        <div class="flex-auto pl-6 pt-6">
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            {{ title }}
          </dt>
          <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
            {{ duration }}
          </dd>
        </div>
        <div class="flex-none self-end px-6 pt-4">
          <dt class="sr-only">
            Time remaining
          </dt>
          <TimeRemainingBadge :label="timeRemaining" :minutes-remaining="360" />
        </div>
        <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
          <dt class="flex-none">
            <span class="sr-only">Duty end time</span>
            <Icon name="heroicons-solid:clock" class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm font-medium leading-6 text-gray-900">
            @ {{ dutyEndTime }}
          </dd>
        </div>
        <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt class="flex-none">
            <span class="sr-only">Notes</span>
            <Icon name="heroicons-solid:shield-exclamation" class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            {{ notes }}
          </dd>
        </div>
        <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt class="flex-none">
            <span class="sr-only">Block hours</span>
            <Icon
              name="heroicons-solid:globe-americas"
              class="h-6 w-5 text-gray-400"
              aria-hidden="true"
            />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            {{ blockHours }}
          </dd>
        </div>
      </dl>
      <div class="mt-6 border-t border-gray-900/5 px-6 py-6">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Fatigue assessment <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  timeRemaining: { type: String, required: false, default: '' },
  minutesRemaining: { type: Number, required: false, default: 780 },
  dutyEndTime: { type: String, required: true },
  notes: { type: String, required: false, default: '' },
  blockHours: { type: String, required: false, default: '' },
});

</script>

<style>
.card-background {
  background-color: #DFDBE5;
background-image: url( 'assets/signal.svg' );
background-color: #DFDBE5;
background-image: linear-gradient(to bottom left, rgba(249, 250, 251, .4) 10%, rgba(249, 250, 251, .8) 25%, rgba(249, 250, 251, 1) 65%),url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23f36834' fill-opacity='0.21'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
</style>
