<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/vue'
import type { Todo } from '@/types/todo'
import TodoItem from "@/feature/todos/components/TodoItem.vue";
import TodoAddItem from "@/feature/todos/components/TodoAddItem.vue";

const todos = ref<Todo[]>([])

const addTodo = (title: string) => {
  todos.value.push({
    id: Date.now(),
    title,
    completed: false
  })
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Todo list</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <TodoItem
            v-for="todo in todos"
            :key="todo.id"
            :item="todo"
            @delete="removeTodo"
            @toggle="toggleTodo"
        />
      </ion-list>

      <TodoAddItem @add="addTodo" />
    </ion-content>
  </ion-page>
</template>
