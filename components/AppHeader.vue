<template>
  <div class="min-h-full">
    <div
      class="bg-red-800"
    >
      <HeadlessDisclosure v-slot="{ open }" as="nav" class="border-b border-red-300 border-opacity-25 bg-red-700 lg:border-none">
        <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div class="relative flex h-16 items-center justify-between lg:border-b lg:border-red-400 lg:border-opacity-25">
            <div class="flex items-center px-2 lg:px-0">
              <div class="flex-shrink-0">
                <img class="block h-8 w-8" src="./../assets/thumbnail_scheduling logo crop2.0.png" alt="Scheduling committee logo">
              </div>
              <div class="hidden lg:ml-10 lg:block">
                <div class="flex space-x-4">
                  <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-red-700 text-white' : 'text-white hover:bg-red-500 hover:bg-opacity-75', 'rounded-md py-2 px-3 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                </div>
              </div>
            </div>

            <div class="flex lg:hidden">
              <!-- Mobile menu button -->
              <HeadlessDisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-red-600 p-2 text-red-200 hover:bg-red-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Icon v-if="!open" name="heroicons-outline:menu" class="block h-6 w-6" aria-hidden="true" />
                <Icon v-else name="heroicons-outline:x" class="block h-6 w-6" aria-hidden="true" />
              </HeadlessDisclosureButton>
            </div>
          </div>
        </div>
        <HeadlessDisclosurePanel class="lg:hidden">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <HeadlessDisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[item.current ? 'bg-red-700 text-white' : 'text-white hover:bg-red-500 hover:bg-opacity-75', 'block rounded-md py-2 px-3 text-base font-medium']"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </HeadlessDisclosureButton>
          </div>
        </HeadlessDisclosurePanel>
      </HeadlessDisclosure>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { IonHeader, IonToolbar } from '@ionic/vue';

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Duty', href: '#', current: false },
  { name: 'Fatigue', href: '#', current: false },
  { name: 'Links', href: '#', current: false },
];

</script>

<style></style>
