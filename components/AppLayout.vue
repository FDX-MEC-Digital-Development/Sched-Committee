<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="closeSidebar()">
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
              <AppLayoutSidebar :navigation="navigation" :hide-animation="hideAnimation" @route-change="closeSidebar()" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
      <AppLayoutSidebar :navigation="navigation" />
    </div>

    <div class=" sticky pt-32 -mt-32  -top-28 z-40 flex items-center gap-x-6 bg-red-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
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

const route = useRoute();

const navigation = computed(() => ([
  { name: 'Home', href: '/', icon: 'heroicons:home', current: route.name === 'index' },
  { name: 'Duty Limits', href: '/dutyLimits', icon: 'heroicons:clock', current: route.name === 'dutyLimits' },
  {
    name: 'Fatigue',
    href: '/fatigue',
    icon: 'heroicons:bell-alert',
    current: route.path.startsWith('/fatigue'),
    subItems: [
      { name: 'Overview', href: '/fatigue', icon: 'heroicons:squares-2x2', current: route.path === '/fatigue' },
      { name: 'Recognize Fatigue', href: '/fatigue/recognize-fatigue', icon: 'heroicons:eye', current: route.path === '/fatigue/recognize-fatigue' },
      { name: 'Self-Assessment', href: '/fatigue/ops-self-assessment', icon: 'heroicons:clipboard-document-check', current: route.path === '/fatigue/ops-self-assessment' },
      { name: 'IM SAFE', href: '/fatigue/im-safe', icon: 'heroicons:shield-check', current: route.path === '/fatigue/im-safe' },
      { name: 'Call Out Fatigued', href: '/fatigue/carma', icon: 'heroicons:phone', current: route.path === '/fatigue/carma' },
      { name: 'Trip Removal', href: '/fatigue/trip-removal', icon: 'heroicons:document-text', current: route.path === '/fatigue/trip-removal' },
      { name: 'Reports', href: '/fatigue/reports', icon: 'heroicons:document-arrow-up', current: route.path === '/fatigue/reports' },
      { name: 'FRMC Contact', href: '/fatigue/frmc-contact', icon: 'heroicons:users', current: route.path === '/fatigue/frmc-contact' },
      { name: 'Resources', href: '/fatigue/additional-resources', icon: 'heroicons:book-open', current: route.path === '/fatigue/additional-resources' },
    ],
  },
  { name: 'Required Rest', href: '/RestRecover', icon: 'heroicons:moon', current: route.name === 'restRecover' },
  { name: 'Disputed Pairings', href: '/disputedPairings', icon: 'heroicons:exclamation-circle', current: route.name === 'disputedPairings' },
]));

const sidebarOpen = ref(false);
const hideAnimation = ref(false);

function closeSidebar () {
  sidebarOpen.value = false;
  hideAnimation.value = true;
}
</script>

<style>

</style>
