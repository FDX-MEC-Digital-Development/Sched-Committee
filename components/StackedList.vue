<template>
  <div class="space-y-6">
    <div
      v-for="(question, index) in questions"
      :key="`question${index}`"
      class="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-gray-900/10 dark:border-gray-400 pb-6 sm:grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 group transition-all duration-200"
    >
      <div class="lg:col-span-3 xl:col-span-2">
        <div
          class="flex items-center gap-3"
        >
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {{ question.text }}
          </h3>
        </div>

        <p
          v-if="question.caption"
          class="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200"
        >
          {{ question.caption }}
        </p>
      </div>

      <div class="lg:col-span-2 xl:col-span-1">
        <div class="space-y-3">
          <div v-if="question.note" class="mt-2">
            <div class="rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <UIcon
                    name="i-heroicons-information-circle"
                    class="h-5 w-5 text-blue-400"
                  />
                </div>
                <div class="ml-3">
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    {{ question.note }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="question.popoverText" class="mt-3">
            <UPopover>
              <template #default="{ open }">
                <UButton
                  variant="outline"
                  color="gray"
                  size="sm"
                  :trailing="true"
                  class="justify-between w-full"
                >
                  <span>More details</span>
                  <UIcon
                    name="i-heroicons-chevron-right"
                    class="h-4 w-4 transition-transform duration-200"
                    :class="{ 'rotate-90': open }"
                  />
                </UButton>
              </template>

              <template #panel="{ close }">
                <PopoverCard :description="question.popoverText" @close="close()" />
              </template>
            </UPopover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// define an interface for this list based on the question object in the template
export interface Question {
  text: string;
  caption?: string;
  note?: string;
  popoverText?: string;
}

defineProps<{
  questions: Question[],
}>();

</script>
