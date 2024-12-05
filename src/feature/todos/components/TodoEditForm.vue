<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import {
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonModal,
  IonContent,
  IonTextarea,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/vue";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "save", updatedTodo: { title: string; description: string }): void;
  (e: "close"): void;
}>();

const schema = yup.object({
  title: yup.string().required('Le titre est requis').min(3, 'Le titre doit contenir au moins 3 caractères'),
});

const { handleSubmit} = useForm({
  validationSchema: schema,
  initialValues: {
    title: props.todo.title,
    description: props.todo.description,
  }
});

const { value: title, errorMessage: titleError } = useField<string>('title');
const { value: description, errorMessage: descriptionError } = useField<string>('description');

const onSubmit = handleSubmit((values) => {
  emit("save", {
    title: values.title,
    description: values.description,
  });
  emit("close");
});
</script>

<template>
  <ion-modal :is-open="isOpen" @did-dismiss="$emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-title>Edition de {{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$emit('close')">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="onSubmit">
        <ion-item>
          <ion-label position="floating">Titre</ion-label>
          <ion-input v-model="title" placeholder="Titre du Todo"></ion-input>
          <div class="error-message" v-if="titleError">{{ titleError }}</div>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea v-model="description" placeholder="Description du Todo"></ion-textarea>
          <div class="error-message" v-if="descriptionError">{{ descriptionError }}</div>
        </ion-item>

        <ion-button expand="full" type="submit">Sauvegarder</ion-button>
      </form>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
.error-message {
  color: var(--ion-color-danger);
  font-size: 0.8em;
  margin: 5px 0;
  padding-left: 16px;
}
</style>