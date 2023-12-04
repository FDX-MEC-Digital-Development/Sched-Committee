<template>
  <footer class="p-4 bg-white sm:p-6 dark:bg-gray-900">
    <div class="mx-auto max-w-screen-xl">
      <div class="md:flex md:justify-between">
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <UButton @click="privacyPolicyVisible = true">
                  Privacy Policy
                </UButton>
                <PrivacyPolicy v-model:is-open="privacyPolicyVisible" />
              </li>
              <li>
                <UButton @click="TermsAndConditionsVisible = true">
                  Terms of Service
                </UButton>
                <TermsAndConditions v-model:is-open="TermsAndConditionsVisible" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8">
      <div class="sm:flex sm:items-center sm:justify-between flex-wrap gap-6 flex">
        <p class="text-sm text-gray-500 sm:text-left dark:text-gray-400">
          This project is free software: you can redistribute it and/or modify
          it under the terms of the GNU Affero General Public License as published by
          the Free Software Foundation, either version 3 of the License, or
          (at your option) any later version.
        </p>
        <p class="text-sm text-gray-500 sm:text-left dark:text-gray-400">
          This program is distributed in the hope that it will be useful,
          but WITHOUT ANY WARRANTY; without even the implied warranty of
          MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
          GNU Affero General Public License for more details.
        </p>
        <p class="text-sm text-gray-500 sm:text-left dark:text-gray-400">
          Copyright 2023 Joshua Carter (Acrobid.com).
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>

const privacyPolicyVisible = ref(false);
const TermsAndConditionsVisible = ref(false);

</script>

<style>

</style>
