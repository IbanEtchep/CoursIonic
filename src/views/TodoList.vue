<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>TODO LIST</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="todo in todos" :key="todo.id">
          <ion-checkbox :checked="todo.completed" @ionChange="toggleTodo(todo.id)"></ion-checkbox>
          <ion-label :class="{ completed: todo.completed }">
            {{ todo.title }}
          </ion-label>
          <ion-icon name="trash" aria-label="RemoveElement" @click="removeTodo(todo.id)"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-item>
        <ion-input
            :value="newTodo"
            placeholder="Ajouter un élément"
            @ionInput="newTodo = ($event.target as HTMLIonInputElement).value as string"
            @keyup.enter="addTodo()"
            ref="inputRef"
        ></ion-input>
        <ion-button slot="end" @click="addTodo()">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/vue'
import { addIcons } from 'ionicons'
import {home, addCircleOutline, trash} from 'ionicons/icons'
import type { Todo } from '@/types/todo'
import {ref} from "vue"

addIcons({
  'home': home,
  'add-circle-outline': addCircleOutline,
  'trash': trash
})

const todos = ref<Todo[]>([
  { id: 1, title: 'test 1' },
  { id: 2, title: 'blablablaz', completed: true },
  { id: 3, title: 'dzdzdzdzdzd' }
])
const newTodo = ref('');

const addTodo = () => {
  console.log("test")
  console.log(newTodo.value)
  if (newTodo.value.trim()) {
    console.log(newTodo.value.trim())
    todos.value.push({
      id: Date.now(),
      title: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

const removeTodo = (id: number) => {
  const index = todos.value.findIndex(todo => todo.id === id)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through
}
</style>