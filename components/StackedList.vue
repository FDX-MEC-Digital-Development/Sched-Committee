<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="(question, index) in questions" :key="`question${index}`" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap">
      <UPopover>
        <div>
          <p class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
            {{ question.text }}
          </p>
          <div v-if="question.note || question.caption" class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
            <p v-if="question.caption">
              {{ question.caption }}
            </p>
            <svg v-if="question.note && question.caption" viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current ">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <p v-if="question.note">
              {{ question.note }}
            </p>
          </div>
        </div>
        <!-- <dl class="flex w-full flex-none justify-between gap-x-8 sm:w-auto hidden">
          <div class="flex -space-x-0.5">
            <dt class="sr-only">
              Commenters
            </dt>
            <dd>
              <Icon name="heroicons:adjustments-horizontal" />
            </dd>
          </div>
          <div class="flex w-16 gap-x-2.5">
            <dt>
              <span class="sr-only">Total comments</span>
              <Icon name="heroicons:academic-cap" class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd class="text-sm leading-6 text-gray-900">
              ??
            </dd>
          </div>
        </dl> -->
        <template #panel="{ close }">
          <PopoverCard v-if="question.popoverText !== undefined" :description="question.popoverText" @close="close()" />
        </template>
      </UPopover>
    </li>
  </ul>
</template>

<script setup lang="ts">

// define an interface for this list based on the question object in the template
export interface Question {
  text: string;
  caption?: string;
  note?: string;
  popoverText?: string;
};

defineProps({
  questions: {
    type: Array as PropType<Question[]>,
    required: true,
  },
});

</script>
