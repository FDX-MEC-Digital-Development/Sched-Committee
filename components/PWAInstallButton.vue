<template>
  <div>
    <UButton v-if="showButton" square icon="i-heroicons-device-phone-mobile" variant="outline" @click="handlePWAInstall" />
    <teleport to="body">
      <pwa-install id="pwa-install-navigation" ref="PWAInstallRef" manifest-url="/Sched-Committee/manifest.webmanifest" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import '@khmyznikov/pwa-install';
import type { PWAInstallElement } from '@khmyznikov/pwa-install';

const { $pwa } = useNuxtApp();

const PWAInstallRef = ref<PWAInstallElement | null>(null);
const isInstallAvailable = ref(false);

onMounted(() => {
  if (!PWAInstallRef.value) { return; }

  PWAInstallRef.value.addEventListener('pwa-install-available-event', () => { isInstallAvailable.value = true; });
});
const showButton = computed(() => !$pwa?.isPWAInstalled && isInstallAvailable.value);

function handlePWAInstall () {
  if (!PWAInstallRef.value) { return; }
  PWAInstallRef.value.showDialog();
};
</script>

<style>

</style>
