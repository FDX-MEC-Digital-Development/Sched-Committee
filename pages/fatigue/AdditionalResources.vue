<template>
  <ContentSection
    title="Additional Resources"
    :content="['More resources and pilot narratives available here.']"
  >
    <UButton
      to="https://fdx.alpa.org/Committees/Fatigue-Risk-Management-Committee"
      target="_blank"
      color="indigo"
      variant="outline"
      size="sm"
    >
      <template #leading>
        <UIcon name="i-heroicons-home" />
      </template>
      Visit FRMC Home Page
      <template #trailing>
        <UIcon name="i-heroicons-arrow-top-right-on-square" />
      </template>
    </UButton>
  </ContentSection>
</template>

<script setup>

</script>
