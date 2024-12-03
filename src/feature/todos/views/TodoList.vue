<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/vue'
import TodoItem from "@/feature/todos/components/TodoItem.vue";
import TodoAddItem from "@/feature/todos/components/TodoAddItem.vue";
import { useTodoStore } from '@/core/stores/todo.store'

const todoStore = useTodoStore()
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Todo list ({{ todoStore.totalTodos }})</ion-title>
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
        />
      </ion-list>

      <TodoAddItem @add="todoStore.addTodo" />
    </ion-content>
  </ion-page>
</template>
