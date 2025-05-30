<template>
  <div class="bg-white dark:bg-gray-900 py-0 sm:py-8">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Navigation Menu -->
      <div class="lg:grid lg:grid-cols-[300px_1fr] lg:gap-8">
        <aside class="lg:block">
          <FatigueMainMenu :selected-item-id="selectedSection" @select="setSelectedSection" />
        </aside>

        <!-- Content Area -->
        <main>
          <!-- Recognize Fatigue Section -->
          <div v-if="selectedSection === 'recognize-fatigue'">
            <FatigueRecognizeList />
          </div>

          <!-- Ops Self-Assessment Section -->
          <div v-if="selectedSection === 'ops-self-assessment'">
            <FatigueOpsSelfAssessment />
          </div>

          <!-- IM SAFE Checklist Section -->
          <div v-if="selectedSection === 'im-safe'">
            <FatigueIMSAFEChecklist />
          </div>

          <!-- CARMA Section -->
          <div v-if="selectedSection === 'carma'">
            <FatigueCarmaChecklist />
            <div class="mt-4">
              <a
                href="https://fdx.alpa.org/Portals/7/Documents/communications/public/2024/10/2024-10-01-frmcpr.html?ver=BdymfIIe5yMZXtVZY5ihlA=="
                target="_blank"
                rel="noopener noreferrer"
                class="text-indigo-600 hover:text-indigo-500"
              >
                View CARMA Article →
              </a>
            </div>
          </div>

          <!-- Trip Removal Section -->
          <div v-if="selectedSection === 'trip-removal'">
            <FatigueTripRemovalExplanation />
            <div class="mt-4">
              <a
                href="https://fdx.alpa.org/Portals/7/Documents/Committees/fatigue/website-docs/2023-frmc-tripremoval.pdf?ver=6uTUizaUgQQuycePYoZdEg=="
                target="_blank"
                rel="noopener noreferrer"
                class="text-indigo-600 hover:text-indigo-500"
              >
                View Trip Removal PDF →
              </a>
            </div>
          </div>

          <!-- Reports Section -->
          <div v-if="selectedSection === 'reports'">
            <FatigueReportsSection />
          </div>

          <!-- FRMC Contact Section -->
          <div v-if="selectedSection === 'frmc-contact'">
            <FatigueFRMCContact />
          </div>

          <!-- Additional Resources Section -->
          <div v-if="selectedSection === 'additional-resources'">
            <ContentSection
              title="Additional Resources"
              caption="Coming Soon"
              :content="['More resources and pilot narratives will be available here soon.']"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const selectedSection = ref('recognize-fatigue');

const setSelectedSection = (id: string) => {
  selectedSection.value = id;
};
</script>

<style>

</style>
