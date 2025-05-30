<template>
  <ContentSection
    title="Operational Self-Assessment Checklist"
    caption="Will you be fatigued during your next operating period?"
    :content="[
      'Take a moment to assess your readiness for your next duty period. Consider the following factors that could impact your performance and safety.',
      'If you have concerns after completing this assessment, contact your Duty Officer to discuss your situation.'
    ]"
  >
    <StackedList :questions="assessmentQuestions" />
  </ContentSection>
</template>

<script lang="ts" setup>
import { type Question } from '@/components/StackedList.vue';

const assessmentQuestions: Question[] = [
  {
    text: 'How long have I been awake?',
    caption: 'Consider your total time awake and alertness level',
  },
  {
    text: 'How long will my Duty continue?',
    caption: 'Consider planned duty duration and potential delays',
  },
  {
    text: 'How much longer will I be awake?',
    caption: 'Calculate total anticipated wake time through end of duty',
  },
  {
    text: 'Next rest opportunity?',
    caption: 'Where and when can you get your next rest ',
    note: 'Hotel? Hub Sleep Room?',
  },
  {
    text: 'What is my workload?',
    caption: 'Consider MX issues, WX issues, and other operational factors',
  },
  {
    text: 'Quality and Recency of Sleep?',
    caption: 'Evaluate your recent sleep quality and quantity',
  },
  {
    text: 'How do I feel?',
    caption: 'Assess your current alertness and fatigue level',
  },
  {
    text: 'IM SAFE Checklist',
    caption: 'Complete the standard IM SAFE aviation safety checklist',
  },
];
</script>
