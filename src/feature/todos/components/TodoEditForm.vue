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
  IonDatetime,
  IonDatetimeButton,
} from "@ionic/vue";

interface Todo {
  title: string;
  description: string;
  dueDate?: string;
}

interface Props {
  todo: Todo;
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "save", updatedTodo: { title: string; description: string; dueDate?: string }): void;
  (e: "close"): void;
}>();

const schema = yup.object({
  title: yup.string().required('Le titre est requis').min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: yup.string(),
  dueDate: yup.date().nullable(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: props.todo.title,
    description: props.todo.description,
    dueDate: props.todo.dueDate || new Date().toISOString(),
  }
});

const { value: title, errorMessage: titleError } = useField<string>('title');
const { value: description, errorMessage: descriptionError } = useField<string>('description');
const { value: dueDate } = useField<string>('dueDate');

const onSubmit = handleSubmit((values) => {
  emit("save", {
    title: values.title,
    description: values.description,
    dueDate: values.dueDate,
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
          <ion-label position="stacked">Titre</ion-label>
          <ion-input v-model="title" placeholder="Titre du Todo"></ion-input>
          <div class="error-message" v-if="titleError">{{ titleError }}</div>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Description</ion-label>
          <ion-textarea v-model="description" placeholder="Description du Todo"></ion-textarea>
          <div class="error-message" v-if="descriptionError">{{ descriptionError }}</div>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Date d'échéance</ion-label>
          <ion-datetime-button datetime="datetime"></ion-datetime-button>

          <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime"
                          v-model="dueDate"
                          locale="fr-FR"
                          :first-day-of-week="1"
            ></ion-datetime>
          </ion-modal>
        </ion-item>

        <ion-button expand="full" type="submit">Sauvegarder</ion-button>
      </form>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
ion-button[type="submit"] {
  margin: 20px;
}

ion-datetime {
  --background: var(--ion-background-color);
}
</style>