<script setup lang="ts">
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
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

const formData = ref({
  title: props.todo.title,
  description: props.todo.description,
});

const rules = {
  title: {
    required,
    minLength: minLength(3)
  },
};

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  emit("save", {
    title: formData.value.title,
    description: formData.value.description,
  });
  emit("close");
};
</script>

<template>
  <ion-modal :is-open="isOpen" @did-dismiss="$emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-title>Edition de {{ formData.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$emit('close')">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <ion-label position="floating">Titre</ion-label>
          <ion-input
              v-model="formData.title"
              placeholder="Titre du Todo"
          ></ion-input>
          <div class="error-message" v-if="v$.title.$error">
            <span v-if="v$.title.required.$invalid">Le titre est requis</span>
            <span v-else-if="v$.title.minLength.$invalid">
              Le titre doit contenir au moins 3 caractères
            </span>
          </div>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea
              v-model="formData.description"
              placeholder="Description du Todo"
          ></ion-textarea>
        </ion-item>

        <ion-button
            expand="full"
            type="submit"
            :disabled="v$.$invalid"
        >
          Sauvegarder
        </ion-button>
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