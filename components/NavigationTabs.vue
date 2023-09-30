<template>
  <ion-tab-bar>
    <ion-tab-button tab="tab1" href="/tabs/tab1">
      <Icon name="ant-design:schedule-outlined" size="2em" />
      <ion-label>Home</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab2" href="/tabs/tab2">
      <Icon name="icon-park-outline:in-flight" size="2em" />
      <ion-label>Duty</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab3" href="/tabs/tab3">
      <Icon name="mdi:sleep-schedule" size="2em" />
      <ion-label>Fatigue</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab4" href="/tabs/tab4">
      <Icon name="mdi:search" size="2em" />
      <ion-label>Links</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script setup lang="ts"></script>
