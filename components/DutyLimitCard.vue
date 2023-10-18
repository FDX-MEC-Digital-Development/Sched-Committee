<template>
  <div class="lg:col-start-3 lg:row-end-1">
    <h2 class="sr-only">
      Summary
    </h2>
    <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
      <dl class="flex flex-wrap">
        <div class="flex-auto pl-6 pt-6">
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            Scheduled duty limit
          </dt>
          <dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
            13 hours
          </dd>
        </div>
        <div class="flex-none self-end px-6 pt-4">
          <dt class="sr-only">
            Status
          </dt>
          <dd class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            (in 1 hour)
          </dd>
        </div>
        <div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
          <dt class="flex-none">
            <span class="sr-only">Duty end time</span>
            <Icon name="heroicons-solid:user-circle" class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm font-medium leading-6 text-gray-900">
            @ 10-19-23 03:56Z
          </dd>
        </div>
        <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt class="flex-none">
            <span class="sr-only">Due date</span>
            <Icon name="heroicons-solid:calendar-days" class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            16 hours if duty period is deadhead only, or 22 hours for deadhead only if non-stop
          </dd>
        </div>
        <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt class="flex-none">
            <span class="sr-only">Block hours</span>
            <Icon name="heroicons-solid:credit-card" class="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd class="text-sm leading-6 text-gray-500">
            Not to exceed 8 scheduled block hours in 24 hours (except 12.D.3.a and 12.D.4.a references to 12.C.2.a-c)
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
</script>
