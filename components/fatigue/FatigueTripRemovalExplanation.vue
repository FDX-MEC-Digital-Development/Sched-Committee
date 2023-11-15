<template>
  <ContentSection title="Trip Removal due to Fatigue" caption="CBA 12.A.9" :content="copy" />
</template>

<script lang="ts" setup>

const copy = [
  '1. A pilot who is excessively tired prior to check-in for a trip in base, following a legal rest period… pilot will be removed from his trip and to the extent he had trip guarantee, the hours shall be eligible for make-up (GMU bank). (12.A.9.a). [Ex: B-Reserve, notified at 1300L, assigned a trip that launches at 0030 and released into rest]',
  '2. A pilot who is excessively tired prior to actual check-in for a trip in base, without a legal rest period… pilot will be removed from his trip, and that trip will be placed into Sick Leave status, as provided in Section 14.B.5. [Ex: Hub turning, call in fatigued for next trip]',
  '3. A pilot who becomes excessively tired subsequent to trip check-in shall notify CRS immediately and talk to the Duty Officer about (their) situation. Depending on the pilot’s situation and the DO’s assessment, one of the following alternatives shall be enlisted to address the issue:',
  'a. The pilot may be given a legal rest period, schedule will be revised to continue.',
  'b. Pilot’s current trip may be revised to include some alternative duty assignment.',
  'c. Pilot’s trip concludes, put in sick for remainder of trip.',
  'Compensation due to Fatigue After Trip Check-in (12.A.9.g)',
  'The Fatigue Event Review Committee (FERC. Consists of 2 FedEx Company employees and 2 ALPA members) meets and discusses all pilot fatigue calls made subsequent to actual trip check-in, with sick bank deduction. The FERC will evaluate the circumstances surrounding the fatigue call and will attempt to reach a consensus concerning compensation for the trip (sick-bank reimbursement). We are at roughly 95% sick-bank reimbursement and 100% pay coverage.',
  'Example 1 (No Reimbursement): Pilot calls in fatigued for hub turn trip after the inbound flight is delayed 1 hour due to maintenance. The pilot mentions in his fatigue report narrative that he had difficulty sleeping due to a head cold he’s been fighting for a couple of days. FERC decides: No Reimbursement of Sick Bank.',
  'Example 2 (Reimbursement): Pilot was scheduled for a single leg (XXX-IND) duty period, had some difficulty resting in XXX but knew he only had the one leg that night. Upon arrival into IND, he was advised that the trip had been revised to operate an additional leg (IND-XXX) in the same duty period. Knowing that he had difficulty resting in XXX and would not have an opportunity to nap in IND prior to the additional leg, he felt unsafe to continue and called in fatigue. FERC decides: Reimbursement of Sick Bank.',
  'There are some cases where the sick bank is not charged at all. For example, if a pilot is into overage (already operating beyond the original end time of the trip) and calls in fatigue, the sick bank is not charged for the remainder of that trip. The pilot will stop earning overage at the time of the fatigue call.',
];
</script>

<style>

</style>
