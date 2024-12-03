<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { IonItem, IonLabel, IonInput, IonButton, IonNote } from '@ionic/vue'

const emit = defineEmits<{
  (e: 'add', title: string): void
}>()

const { handleSubmit, resetForm } = useForm()

const { value: title, errorMessage } = useField<string>('title', (value) => {
  if (!value) return 'Le titre est requis'
  if (value.length < 3) return 'Le titre doit contenir au moins 3 caractères'
  return true
})

const onSubmit = handleSubmit((values) => {
  emit('add', values.title)
  resetForm()
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <ion-item :class="{ 'ion-invalid': errorMessage }">
      <ion-label position="floating">Titre</ion-label>
      <ion-input v-model="title"></ion-input>

      <ion-note slot="error" v-if="errorMessage">
        {{ errorMessage }}
      </ion-note>
    </ion-item>

    <ion-button
        expand="block"
        type="submit"
        class="ion-margin">
      Ajouter
    </ion-button>
  </form>
</template>

<style scoped>
form {
  margin: 1rem;
}
</style>
