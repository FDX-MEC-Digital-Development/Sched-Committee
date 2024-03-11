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
  'The FedEx MEC Scheduling Committee (“Committee”) is committed to respecting and protecting the privacy of its members.  The Committee has adopted a set of guidelines that serve as the basis for the relationship between member data and the Committee’s Flight Time/Duty Time App.  While these guidelines have been developed with the recognition that Internet technologies rapidly change, currently the use of the Committee’s Flight Time/Duty Time Appdoes not request or require personal member information and as such, no member information is stored on the App’s server.  Should future versions of this App require the disclosure of personal information, users will be notified of such a change, and will be directed to view the Committee’s revised Privacy Policy.'];
const caption = 'Privacy Policy';
const title = 'Privacy Policy';
const header = 'Privacy Policy';
const footer = 'Privacy Policy';

</script>

<style>

</style>
