<template>
  <ContentSection title="Additional Guidance" caption="Important Notes" :content="[]">
    <UAccordion
      :items="accordionItems"
      variant="outline"
      class="space-y-2"
    />
  </ContentSection>
</template>

<script lang="ts" setup>
const accordionItems = [
  {
    label: 'When to Contact CRS vs Duty Officer',
    defaultOpen: false,
    content: 'If you have legal rest or a period of rest before operating, and feel the next duty period warrants a fatigue call - contact CRS first. Explain your concerns about the pairing change or revision. If they do not amend the pairing to meet your concerns, tell CRS you understand and will do your best. Do not argue or engage. You are now required to attempt rest. If fatigued prior to show, or you will be fatigued during your next duty period - call the Duty Officer.',
  },
  {
    label: 'Professional Communication Guidelines',
    defaultOpen: false,
    content: 'Be polite and professional when calling. When calling out fatigued with the Duty Officer it is a fatigue call only, not a discussion about the FOM or CBA. You are calling to say you are fatigued. The pilot\'s "script" is easy - be polite and professional (which can be hard when you are fatigued).',
  },
  {
    label: 'Duty Officer Script and Process',
    defaultOpen: false,
    content: 'The Duty Officer has a "script" too, but only when you are calling out fatigued. They need information to help with the reporting of the issue and then they follow the CARMA Checklist process.',
  },
  {
    label: 'Fatigue Reporting Requirements',
    defaultOpen: false,
    content: 'You do not have to call out fatigued to file a fatigue report. You can submit a fatigue report anytime. Help us identify fatigue hazards – anything that reduces your rest and increases your workload.',
  },
  {
    label: 'Example: Successful CRS Schedule Revision',
    defaultOpen: false,
    content: 'Recent example: pilots were revised to catch a 0300 operational jumpseat and then operate to MEM. They called CRS and said this was a challenging flip of their schedule, it would be hard to get immediate rest and then operate during the critical period. CRS looked at their pairing and was able to revise the pairing and keep them on their current circadian clock. No fatigue call was needed.',
  },

];
</script>
