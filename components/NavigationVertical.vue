<template>
  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" class="-mx-2 space-y-1">
          <li v-for="item in navigation" :key="item.name">
            <div v-if="item.subItems">
              <!-- Parent item with sub-navigation -->
              <button
                type="button"
                class="w-full group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800"
                :class="{ 'bg-gray-800 text-white': item.current }"
                @click="toggleExpanded(item.name)"
              >
                <Icon :name="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                {{ item.name }}
                <Icon
                  name="heroicons:chevron-down"
                  class="ml-auto h-5 w-5 transition-transform duration-200"
                  :class="{ 'rotate-180': expandedItems.has(item.name) }"
                />
              </button>

              <!-- Sub-navigation -->
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <ul v-if="expandedItems.has(item.name)" class="mt-1 space-y-1 pl-6">
                  <li v-for="subItem in item.subItems" :key="subItem.name">
                    <NuxtLink
                      :to="subItem.href"
                      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium"
                      :class="[
                        subItem.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      ]"
                      @click="$emit('routeChange')"
                    >
                      <Icon :name="subItem.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
                      {{ subItem.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </Transition>
            </div>

            <!-- Regular navigation item -->
            <NuxtLink
              v-else
              :to="item.href"
              :class="[
                item.current
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
              ]"
              @click="$emit('routeChange')"
            >
              <Icon :name="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>

      <slot />
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import type { NavigationLink } from '~/sched-committee-types';

defineProps({
  navigation: {
    type: Array<NavigationLink>,
    required: true,
  },
});

defineEmits(['routeChange']);

const expandedItems = ref(new Set<string>());

const toggleExpanded = (itemName: string) => {
  if (expandedItems.value.has(itemName)) {
    expandedItems.value.delete(itemName);
  } else {
    expandedItems.value.add(itemName);
  }
};

// Auto-expand fatigue menu if we're on a fatigue page
const route = useRoute();
watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/fatigue')) {
    expandedItems.value.add('Fatigue');
  }
}, { immediate: true });
</script>

<style>

</style>
