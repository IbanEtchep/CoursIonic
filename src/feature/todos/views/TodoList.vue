<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/vue'
import TodoItem from "@/feature/todos/components/TodoItem.vue";
import TodoAddItem from "@/feature/todos/components/TodoAddItemForm.vue";
import { useTodoStore } from '@/feature/todos/stores/todo.store'
import {useRouter} from "vue-router";

const todoStore = useTodoStore()

const router = useRouter();
const navigateToTodoDetails = (id: number) => {
  router.push({ name: 'TodoDetails', params: { id } });
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Liste des tâches</ion-title>
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