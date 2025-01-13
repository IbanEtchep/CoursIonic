<script setup lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonIcon, IonButton, IonButtons} from '@ionic/vue'
import TodoItem from "@/feature/todos/components/TodoItem.vue";
import TodoAddItem from "@/feature/todos/components/TodoAddItemForm.vue";
import { useTodoStore } from '@/feature/todos/stores/todo.store'
import {useRouter} from "vue-router";
import {logOutOutline} from "ionicons/icons";
import {useAuthStore} from "@/core/auth/stores/auth.store";
import {onMounted} from "vue";

const todoStore = useTodoStore()
const authStore = useAuthStore()

const router = useRouter();
const navigateToTodoDetails = (id: number) => {
  router.push({ name: 'TodoDetails', params: { id } });
};

const logout = () => {
  useAuthStore().logout();
  router.push({ name: 'Login' });
};

onMounted(async () => {
  if (authStore.user) {
    await todoStore.loadTodos();
  }
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Liste des tâches</ion-title>

        <ion-buttons slot="end">
          <ion-buttons slot="end">
            <ion-button @click="logout">
              <ion-icon :icon="logOutOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <TodoItem
            v-for="todo in todoStore.todos"
            :key="todo.id"
            :item="todo"
            @delete="todoStore.removeTodo"
            @toggle="todoStore.toggleTodo"
            @show="navigateToTodoDetails"
        />
      </ion-list>

      <TodoAddItem @add="todoStore.addTodo" />
    </ion-content>
  </ion-page>
</template>