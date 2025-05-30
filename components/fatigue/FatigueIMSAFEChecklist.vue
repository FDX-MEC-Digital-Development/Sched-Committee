<template>
  <ContentSection title="IM SAFE Checklist" caption="Are you fit for duty?" :content="[]">
    <StackedList :questions="checklist" />
  </ContentSection>
</template>

<script lang="ts" setup>
import { type Question } from '@/components/StackedList.vue';

const checklist: Question[] = [
  {
    text: 'Illness',
    caption: 'Are you suffering from any illness or symptoms that might affect you or other crewmembers?',
    note: 'Cold? Congested?',
  },
  {
    text: 'Medication',
    caption: 'Are you taking prescriptions? Over-the-counter?',
    note: 'How long should you wait before you are legal to go flying. ex: Benadryl - 60 hours before you can fly.',
  },
  {
    text: 'Stress',
    caption: 'Three types: Physiological, Environmental, and Psychological.',
    note: 'What life factors are occupying your thoughts? Family? Financial? Too hot? Too cold? Commuting?',
  },
  {
    text: 'Alcohol',
    caption: 'Legal limits aren\'t always clear cut for your performance.',
    note: 'Some countries have zero tolerance. FAA recommends pilots wait at least 24 hours after drinking to get behind the controls.',
  },
  {
    text: 'Fatigue',
    caption: 'Look-back: When did you last sleep? Quality? Last 24 hours?',
    note: 'Look forward: How long is your duty period? Do you have a proper sleep strategy?',
  },
  {
    text: 'Emotion/Eating',
    caption: 'How do you feel?',
    note: 'Hangry? Properly hydrated?',
  },
];
</script>
