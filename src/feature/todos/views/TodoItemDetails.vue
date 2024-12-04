<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "@/feature/todos/stores/todo.store";
import { ref } from "vue";
import {
  IonItem,
  IonGrid,
  IonRow,
  IonLabel,
  IonCol,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonActionSheet,
  IonButtons,
  IonButton,
  IonIcon,
  IonBackButton
} from "@ionic/vue";
import { ellipsisVertical, chevronBack } from 'ionicons/icons';
import TodoStatusBadge from "@/feature/todos/components/TodoStatusBadge.vue";
import TodoEditForm from "@/feature/todos/components/TodoEditForm.vue";

const route = useRoute();
const router = useRouter();
const todoStore = useTodoStore();

const todo = ref(todoStore.getTodo(Number(route.params.id)));

const isActionSheetOpen = ref(false);
const isEditModalOpen = ref(false);

const handleAction = (action: string) => {
  if (!todo.value) return;

  switch (action) {
    case "delete":
      todoStore.removeTodo(todo.value.id);
      router.back();
      break;
    case "complete":
      todoStore.toggleTodo(todo.value.id);
      break;
    case "edit":
      isEditModalOpen.value = true;
      break;
    default:
      break;
  }

  isActionSheetOpen.value = false;
};

const actionSheetButtons = ref([
  { text: 'Supprimer',
    role: 'destructive',
    cssClass: 'ion-color-danger',
    handler: () => handleAction('delete') },
  {
    text: todo.value?.completed ? 'Marquer comme en cours' : 'Marquer comme terminé',
    handler: () => handleAction('complete')
  },
  { text: 'Éditer', handler: () => handleAction('edit') },
  { text: 'Annuler', role: 'cancel' }
]);

const handleSaveTodo = (updatedTodo: { title: string; description: string }) => {
  if (!todo.value) return;
  todo.value.title = updatedTodo.title;
  todo.value.description = updatedTodo.description;
  todoStore.saveTodos();
  isEditModalOpen.value = false;
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/" :icon="chevronBack" text="Retour"></ion-back-button>
        </ion-buttons>
        <ion-title>Détails du Todo</ion-title>
        <ion-buttons slot="end">
          <TodoStatusBadge :completed="todo.completed" class="ion-margin-end" />
          <ion-button @click="isActionSheetOpen = true">
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid v-if="todo">
        <div @click="isEditModalOpen = true">
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label>Titre : {{ todo.title }}</ion-label>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label>Description : {{ todo.description }}</ion-label>
              </ion-item>
            </ion-col>
          </ion-row>
        </div>
      </ion-grid>

      <div v-else>
        <p>Todo introuvable.</p>
      </div>

      <ion-action-sheet
          :is-open="isActionSheetOpen"
          @did-dismiss="isActionSheetOpen = false"
          :buttons="actionSheetButtons"
      ></ion-action-sheet>

      <TodoEditForm
          :todo="todo"
          :isOpen="isEditModalOpen"
          @save="handleSaveTodo"
          @close="isEditModalOpen = false"
      />
    </ion-content>
  </ion-page>
</template>