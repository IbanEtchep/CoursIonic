<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonToast,
  IonItem,
  IonLabel,
} from '@ionic/vue';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/core/auth/stores/auth.store';
import { loginSchema } from '@/core/auth/validation/login.schema';

const router = useRouter();
const authStore = useAuthStore();
const error = ref('');

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
});

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values.email, values.password);
    router.push('/todos');
  } catch (e) {
    error.value = e.message;
  }
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Connexion</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form @submit.prevent="onSubmit">
        <ion-item>
          <ion-label position="stacked">Adresse e-mail</ion-label>

          <ion-input
              type="email"
              v-model="email"
              :class="{ 'ion-invalid': emailError, 'ion-valid': !emailError && email }"
          ></ion-input>
          <div class="error-message" v-if="emailError">{{ emailError }}</div>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Mot de passe</ion-label>
          <ion-input
              type="password"
              v-model="password"
              :class="{ 'ion-invalid': passwordError, 'ion-valid': !passwordError && password }"
          ></ion-input>
          <div class="error-message" v-if="passwordError">{{ passwordError }}</div>
        </ion-item>

        <ion-button type="submit" expand="block" class="ion-margin-top">
          Se connecter
        </ion-button>

        <ion-button fill="clear" expand="block" router-link="/register">
          Pas de compte ? S'inscrire
        </ion-button>
      </form>

      <ion-toast
          :is-open="!!error"
          :message="error"
          duration="3000"
          color="danger"
          @didDismiss="error = ''"
      />
    </ion-content>
  </ion-page>
</template>

<style scoped>
.ion-invalid {
  --highlight-background: var(--ion-color-danger) !important;
  --highlight-height: 2px;
}

.ion-valid {
  --highlight-background: var(--ion-color-success);
  --highlight-height: 2px;
}

.error-message {
  color: var(--ion-color-danger);
  font-size: 0.8em;
  margin-bottom: 5px;
}
</style>