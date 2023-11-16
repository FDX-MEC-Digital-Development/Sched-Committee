<template>
  <ContentSection :title="title" :caption="subtitle" :content="content" />
</template>

<script lang="ts" setup>
const title = 'Extension beyond Operational Duty Limits';

const subtitle = '12.C.5.b.ii.(Domestic) or 12.D.6.c.(International)';

const content = ['In the event of a trip delay, revision or operational emergency that extends, or would extend, a pilot beyond the operational limitations, a pilot who becomes excessively tired shall notify CRS immediately and then speak to the Duty Officer about his situation. Depending on the pilot’s situation and the Duty Officer’s assessment, one of the following alternatives shall be enlisted to address the issue:',

  '(a) Revise duty within operational limits.',

  'OR',

  '(b) Legal rest.',

  'If you determine you require more rest than a legal rest period, only then can the Company remove you from the balance of your trip and be placed in sick leave status. This is substantially different than how a Fatigue Call as defined in (12.A.9) is handled.',
  'If you have any issues with how your duty extension is handled please contact the Fatigue Committee.']; </script>

<style>

</style>
