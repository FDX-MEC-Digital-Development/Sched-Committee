<template>
  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900  dark:text-white flex items-center">
      CBA reference
    </dt>
    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
        <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
          <div class="flex w-0 flex-1 items-center">
            <UIcon name="i-heroicons-document-text" class="flex-shrink-0 h-5 w-5 text-gray-400" />
            <div class="ml-4 flex min-w-0 flex-1 gap-2 dark:text-white">
              <span class=" font-medium">{{ cbaReference }}</span>
              <span class="flex-shrink-0 text-gray-400">External site</span>
            </div>
          </div>
          <div class="ml-4 flex-shrink-0">
            <a :href="cbaLink" class="font-medium text-indigo-600 hover:text-indigo-500" target="_blank">View</a>
          </div>
        </li>
      </ul>
    </dd>
  </div>
</template>

<script lang="ts" setup>

// international link: https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12D
// domestic link: https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C

const props = defineProps({
  isInternational: {
    type: Boolean,
    default: false,
  },
});

const cbaReference = computed(() => {
  return props.isInternational ? '12.D' : '12.C';
});

const cbaLink = computed(() => {
  return props.isInternational ? 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12D' : 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C';
});
</script>

<style>

</style>
