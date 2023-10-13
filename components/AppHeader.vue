<template>
  <ion-header>
    <ion-toolbar>
      <HeadlessDisclosure v-slot="{ open }" as="nav" class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="h-14 w-14"

                  src="../assets/thumbnail_scheduling logo crop2.0.png"
                  alt="Your Company"
                >
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</a>
                </div>
              </div>
            </div>

            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <HeadlessDisclosureButton
                class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Icon
                  v-if="!open"
                  name="clarity:bars-line"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
                <Icon
                  v-else
                  name="fa6-solid:xmark"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
              </HeadlessDisclosureButton>
            </div>
          </div>
        </div>
        <HeadlessDisclosurePanel class="md:hidden">
          <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <HeadlessDisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </HeadlessDisclosureButton>
          </div>
        </HeadlessDisclosurePanel>
      </HeadlessDisclosure>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts" setup>
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Duty', href: '#', current: false },
  { name: 'Fatigue', href: '#', current: false },
  { name: 'Links', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
</script>

<style></style>
