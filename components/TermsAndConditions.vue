<template>
  <SlideoverCard
    :content="termsPlaceholderContent"
    :caption="caption"
    :title="title"
    :header="header"
    :footer="footer"
    :is-open="isOpen"
    @update:is-open="(event)=> $emit('update:isOpen', event)"
  />
</template>

<script lang="ts" setup>

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['update:isOpen']);
const termsPlaceholderContent = [
  'TERMS OF USE', 'The FedEx MEC Scheduling Committee (“Committee”) Flight Time/Duty Time App is provided as a convenience for the members of the ALPA FedEx MEC. The App consists of a Duty Limit section and a section devoted to fatigue and its effects; the latter service is provided for educational purposes only.  Neither section shall be construed as offering individual legal advice, and the use of the App does not absolve individual members of their responsibility to adhere to the terms and conditions of the FedEx/ALPA Collective Bargaining Agreement, the FARs, or their personal fitness for duty self-assessment.  INFORMATION OBTAINED FROM THE APP SHOULD NOT BE RELIED UPON FOR PERSONAL, MEDICAL OR LEGAL DECISIONS AND YOU SHOULD CONSULT AN APPROPRIATE PROFESSIONAL FOR SPECIFIC ADVICE TAILORED TO YOUR SITUATION.',
  'MODIFICATION OF THE APP', 'The FedEx MEC Scheduling Committee reserves the right to change the terms, conditions, or content of this App, including suspending or terminating its operation without prior notice.',
  'EXPRESS LIABILITY DISCLAIMER', 'While the Committee strives to provide accurate information to its members, the Committee, FedEx MEC, and/or ALPA make no representation to the suitability, reliability, availability, timeliness or accuracy of the [end calculations??] derived from this App’s usage, and assumes no liability for any damages, claims, or losses, incurred as a result using the App. User agrees to assume all risks and any liability which may result from using the App.'];
const caption = 'Terms And Conditions';
const title = 'Terms And Conditions';
const header = 'Terms And Conditions';
const footer = 'Terms And Conditions';

</script>

<style>

</style>
