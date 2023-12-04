<template>
  <SlideoverCard
    :content="privacyPolicyPlaceholderContent"
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
const privacyPolicyPlaceholderContent = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut semper libero. Sed euismod, nisl quis tincidunt aliquet, enim diam aliquam nunc, vit'];

const caption = 'Privacy Policy';
const title = 'Privacy Policy';
const header = 'Privacy Policy';
const footer = 'Privacy Policy';

</script>

<style>

</style>
