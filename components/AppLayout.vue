<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="closeSidebar()">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="closeSidebar()">
                    <span class="sr-only">Close sidebar</span>
                    <Icon name="heroicons:x-mark" class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <AppLayoutSidebar :navigation="navigation" :hide-animation="hideAnimation" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <AppLayoutSidebar :navigation="navigation" />
    </div>

    <div class=" sticky top-0 z-40 flex items-center gap-x-6 bg-red-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <AppLayoutHeader :navigation="navigation" @sidebar-open="sidebarOpen = true" />
    </div>

    <main class="py-10 lg:pl-72 dark:bg-gray-900">
      <div>
        <slot />
      </div>
      <PageFooter />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

const navigation = ref([
  { name: 'Home', href: '#', icon: 'heroicons:home', current: false },
  { name: 'Duty Limits', href: 'dutyLimits', icon: 'heroicons:clock', current: true },
  { name: 'Fatigue', href: '#', icon: 'heroicons:bell-alert', current: false },
  { name: 'Links', href: '#', icon: 'heroicons:link', current: false },

]);

const sidebarOpen = ref(false);
const hideAnimation = ref(false);

onMounted(() => {
  // const path = document.querySelectorAll('path'); // Select all path elements

  // Start the staggered animation when the component is mounted
  // drawPath(path);
});

function closeSidebar () {
  sidebarOpen.value = false;
  hideAnimation.value = true;
}
</script>

<style>

</style>
