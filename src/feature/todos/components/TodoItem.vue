<script setup lang="ts">

import { IonLabel, IonItem, IonCheckbox, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/vue'
import {Todo} from "@/feature/todos/model/todo.model";


interface Props {
  item: Todo
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'toggle', id: number): void
  (e: 'show', id: number): void
}>()

</script>

<template>
  <ion-item-sliding>
    <ion-item>
      <ion-checkbox
          slot="start"
          :checked="item.completed"
          @ionChange="emit('toggle', item.id)"
      ></ion-checkbox>

      <ion-label :class="{ completed: item.completed }" @click.stop="emit('show', item.id)">
        {{ item.title }}
      </ion-label>
    </ion-item>

    <ion-item-options side="end">
      <ion-item-option color="danger" @click.stop="emit('delete', item.id)">Supprimer</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
