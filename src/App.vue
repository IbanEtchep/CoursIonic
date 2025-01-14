<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {useNotificationStore} from "@/feature/notifications/stores/notification.store";
import {onMounted} from "vue";
import {Capacitor} from "@capacitor/core";

const notificationStore = useNotificationStore()

onMounted(async () => {
  if (Capacitor.isNativePlatform()) {
    await notificationStore.initPushNotifications()
  }
})
</script>
