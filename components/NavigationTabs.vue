<template>
  <ion-tab-bar>
    <ion-tab-button tab="index" href="/index">
      <Icon name="ant-design:schedule-outlined" size="2em" />
      <ion-label>Home</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="duty" href="/DutyLimits">
      <Icon name="icon-park-outline:in-flight" size="2em" />
      <ion-label>Duty</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="fatigue" href="/FatigueAssessment">
      <Icon name="mdi:sleep-schedule" size="2em" />
      <ion-label>Fatigue</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="links" href="/links">
      <Icon name="mdi:search" size="2em" />
      <ion-label>Links</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script setup lang="ts"></script>
