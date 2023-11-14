<template>
  <ContentSection title="Personal Assessment" caption="Before each flight" :content="[]">
    <div class="flow-root">
      <ul role="list" class="-mb-8">
        <li v-for="(question, index) in questions.PersonalAssessment" :key="`question${index}`">
          <div class="relative pb-8">
            <span v-if="index !== questions.PersonalAssessment.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
            <div class="relative flex space-x-3">
              <div>
                <span class="dark:bg-gray-900 bg-white h-8 w-8 rounded-full flex items-center justify-center ring-8 dark:ring-gray-900 ring-white">
                  <UIcon name="i-heroicons-question-mark-circle" class="h-5 w-5 dark:text-white text-black" /></span>
              </div>
              <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p class="text-sm text-gray-500">
                    {{ question }}
                  </p>
                </div>
                <div class="whitespace-nowrap text-right text-sm text-gray-500 hidden" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </ContentSection>
</template>

<script setup lang="ts">
const questions = {

  PersonalAssessment: [
    'How long have I been awake?',
    'Quality and Recency of Sleep',
    'How long will my Duty continue?',
    'How much longer will I be awake?',
    'What is my workload? (MX issues, WX issues,...?)',
  ],
  IMSAFEChecklist: [''],
};

</script>
