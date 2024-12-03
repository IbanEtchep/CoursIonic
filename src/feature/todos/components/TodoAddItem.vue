<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { IonItem, IonInput, IonButton, IonNote } from '@ionic/vue'

const emit = defineEmits<{
  (e: 'add', title: string): void
}>()

const schema = yup.object({
  title: yup
      .string()
      .required('Le titre est requis')
      .min(3, 'Le titre doit contenir au moins 3 caractères'),
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const { value: title, errorMessage } = useField<string>('title')

const onSubmit = handleSubmit((values) => {
  emit('add', values.title)
  resetForm()
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <ion-item :class="{ 'ion-invalid': errorMessage }">
      <ion-input v-model="title" placeholder="Ajouter un élément"></ion-input>
    </ion-item>

    <ion-note v-if="errorMessage" color="danger" class="error-message">
      {{ errorMessage }}
    </ion-note>

    <ion-button expand="block" type="submit" class="ion-margin">
      Ajouter
    </ion-button>
  </form>
</template>