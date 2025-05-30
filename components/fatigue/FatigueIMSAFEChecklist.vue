<template>
  <ContentSection title="IM SAFE Checklist" caption="Are you fit for duty?" :content="[]">
    <StackedList :questions="checklist" />
    <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
      Any of the above issues will affect your ability to perform. If your assessment is below par - do not go flying. Remember, self-assessment isn't always accurate. Talk this over with your crewmember(s), family member, friend or the Duty Officer.
    </p>
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
    caption: 'Are you taking prescriptions? Over-the-counter? How long should you wait before you are legal to go flying?',
    note: 'Example: Benadryl requires 60 hours before you can fly.',
  },
  {
    text: 'Stress',
    caption: 'Three types: Physiological, Environmental, and Psychological. What life factors are occupying your thoughts?',
    note: 'Family? Financial? Too hot? Too cold? Commuting?',
  },
  {
    text: 'Alcohol',
    caption: 'Legal limits aren\'t always clear cut for your performance. FAA recommends pilots wait at least 24 hours after drinking to get behind the controls.',
    note: 'Some countries have zero tolerance.',
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
