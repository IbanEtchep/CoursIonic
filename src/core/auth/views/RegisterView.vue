<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonLabel, IonInput,
  IonButton, IonToast, IonNote
} from '@ionic/vue';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/core/auth/stores/auth.store";
import { registerSchema } from "@/core/auth/validation/register.schema";

const router = useRouter();
const authStore = useAuthStore();
const error = ref('');

const { handleSubmit } = useForm({
  validationSchema: registerSchema,
});

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>('confirmPassword');

const passwordStrength = (password: string): number => {
  let score = 0;
  if (!password) return score;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  return score;
};

const getPasswordStrengthLabel = (strength: number): string => {
  switch (strength) {
    case 0:
    case 1:
      return 'Très faible';
    case 2:
      return 'Faible';
    case 3:
      return 'Moyen';
    case 4:
      return 'Fort';
    case 5:
      return 'Très fort';
    default:
      return '';
  }
};

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.register(values.email, values.password);
    router.push('/todos');
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message;
    } else {
      error.value = "Une erreur s'est produite";
    }
  }
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inscription</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form @submit.prevent="onSubmit">
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
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

        <ion-item>
          <ion-label position="stacked">Confirmer le mot de passe</ion-label>
          <ion-input
              type="password"
              v-model="confirmPassword"
              :class="{ 'ion-invalid': confirmPasswordError, 'ion-valid': !confirmPasswordError && confirmPassword }"
          ></ion-input>
          <div class="error-message" v-if="confirmPasswordError">{{ confirmPasswordError }}</div>
        </ion-item>

        <div class="password-strength" v-if="password">
          <div class="strength-meter">
            <div
                class="strength-meter-fill"
                :data-strength="passwordStrength(password)"
            ></div>
          </div>
          <ion-note>
            Force : {{ getPasswordStrengthLabel(passwordStrength(password)) }}
          </ion-note>
        </div>

        <ion-button type="submit" expand="block" class="ion-margin-top">
          S'inscrire
        </ion-button>

        <ion-button fill="clear" expand="block" router-link="/login">
          Déjà un compte ? Se connecter
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
.password-strength {
  padding: 10px;
}

.strength-meter {
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
  margin: 8px 0;
}

.strength-meter-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.strength-meter-fill[data-strength="0"],
.strength-meter-fill[data-strength="1"] {
  width: 20%;
  background-color: #ff4444;
}

.strength-meter-fill[data-strength="2"] {
  width: 40%;
  background-color: #ffbb33;
}

.strength-meter-fill[data-strength="3"] {
  width: 60%;
  background-color: #ffeb3b;
}

.strength-meter-fill[data-strength="4"] {
  width: 80%;
  background-color: #00C851;
}

.strength-meter-fill[data-strength="5"] {
  width: 100%;
  background-color: #007E33;
}
</style>