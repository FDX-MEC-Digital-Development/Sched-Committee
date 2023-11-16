<template>
  <ContentSection :caption="copy.caption" :title="copy.title" :content="copy.content">
    Bid-pack pairing fatigue modeling is based on a best case scenario. Our assessment does not consider delays due to weather or maintenance. Our pairing fatigue modeling is based on utilizing hub turn rest on any turns greater than 2+30. If a revision extends your duty time or hub turn mitigation is reduced, <strong>self-assessment for fatigue is essential</strong>. A pairing may be within acceptable fatigue limits for one person and not another. This assessment can even change for an individual from one day to the next.
  </ContentSection>
</template>

<script lang="ts" setup>
const copy = {
  title: 'Fatigue Self-Assessment',
  caption: 'Fatigue',
  content: ['How much sleep will you have had within the previous 24 hours? Everyone has different limits. But typically, if that number is less than 4 consider yourself susceptible to fatigue.',
    'Remember. You do not have to call in fatigued to file a fatigue report. If you are reading this consider filing a fatigue report to help your fellow pilots.'],
};
</script>

<style>

</style>
