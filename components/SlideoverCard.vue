<template>
  <div>
    <USlideover :model-value="isOpen" @update:model-value="(event)=> $emit('update:isOpen', event)">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-start justify-between">
            {{ header }}
            <div class="ml-3 flex h-7 items-center">
              <UButton type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none  focus:ring-red-500 focus:ring-offset-2" @click="(event)=>$emit('update:isOpen', false)">
                <span class="absolute -inset-2.5" />
                <span class="sr-only">Close panel</span>
                <UIcon name="i-heroicons-x-mark" class="h-6 w-6" aria-hidden="true" />
              </UButton>
            </div>
          </div>
        </template>

        <ContentSection :content="content" :caption="caption" :title="title" />
        <template #footer>
          {{ footer }}
        </template>
      </UCard>
    </USlideover>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  caption: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  footer: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['update:isOpen']);
</script>

<style>

</style>
