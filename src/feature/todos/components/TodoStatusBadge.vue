<script setup lang="ts">
import { IonBadge } from "@ionic/vue";

interface Props {
  completed: boolean;
}

defineProps<Props>();
</script>

<template>
  <ion-badge :color="completed ? 'success' : 'warning'">
    {{ completed ? 'Terminé' : 'En cours' }}
  </ion-badge>
</template>