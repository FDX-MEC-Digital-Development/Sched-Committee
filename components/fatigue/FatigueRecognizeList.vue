<template>
  <ContentSection title="Recognize Fatigue" caption="Signs of fatigue" :content="[]">
    <StackedList :questions="RecognizeFatigueQuestions" />
  </ContentSection>
</template>

<script lang="ts" setup>
import { type Question } from '@/components/StackedList.vue';
const RecognizeFatigue = [
  'Difficulty Making Decisions',
  'Missed radio calls/checklists',
  'Forgetting',
  'Headache',
  'Extreme apathy',
  'Fixation',
  'Slow reaction time',
  'Difficulty focusing',
  'Feeling irritable',
  'Wandering thoughts',
  'Errors conducting routine tasks',
  'Increased risk taking',
];

const RecognizeFatigueQuestions: Question[] = RecognizeFatigue.map((question) => {
  return {
    text: question,
  };
});
</script>

<style>

</style>
