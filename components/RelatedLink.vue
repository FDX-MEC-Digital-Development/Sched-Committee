<template>
  <div class="min-w-0 flex-auto">
    <div class="flex items-center min-w-0 text-sm font-semibold leading-3 text-white">
      Related link:
    </div>
    <div v-if="linkTitle && linkHref" class="mt-1 flex items-center  text-gray-400">
      <NuxtLink :to="linkHref" class="text-xs  leading-6">
        {{ linkTitle }} <span aria-hidden="true">&rarr;</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  linkHref: string
  linkTitle: string
}>();
</script>

<style>

</style>
