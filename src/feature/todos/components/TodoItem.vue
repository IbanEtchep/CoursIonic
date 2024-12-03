<script setup lang="ts">

import type { Todo } from '@/types/todo'

interface Props {
  item: Todo
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'toggle', id: number): void
}>()

</script>

<template>
  <ion-item>
    <ion-checkbox
        :checked="item.completed"
        @click="emit('toggle', item.id)"
    ></ion-checkbox>
    <ion-label :class="{ completed: item.completed }">
      {{ item.title }}
    </ion-label>
    <ion-button
        @click.stop="emit('delete', item.id)"
        slot="end">
      Supprimer
    </ion-button>
  </ion-item>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
