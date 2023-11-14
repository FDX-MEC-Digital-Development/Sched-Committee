<template>
  <div>{{ questions }}</div>
</template>

<script setup lang="ts">
const questions = {
  RecognizeFatigue: [
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
  ],
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
