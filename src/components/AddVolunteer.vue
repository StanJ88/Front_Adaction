<script setup>
import { ref } from 'vue'
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
})
// Émission de l'event vers le parent (App.vue)
const emit = defineEmits(['close', 'submitForm'])

const handleSubmit = () => {
  console.log('Infos du bénévole :', form.value)
  emit('submitForm', form.value)
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <h3>Ajouter un.e bénévole</h3>
      <form class="form-container" @submit.prevent="handleSubmit">
        <div>
          <label class="form-label">Prénom</label>
          <input required v-model="form.firstName" type="text" />
        </div>
        <div>
          <label class="form-label">Nom</label>
          <input required v-model="form.lastName" type="text" />
        </div>
        <div>
          <label class="form-label">Email</label>
          <input required v-model="form.email" type="email" />
        </div>
        <div>
          <label class="form-label">Mot de passe</label>
          <input required v-model="form.password" type="password" />
        </div>
        <div>
          <label class="form-label">Localisation</label>
          <input required v-model="form.location" type="text" />
        </div>
        <div class="modal-actions">
          <button type="submit" class="submit-btn">Ajouter</button>
          <button
            type="button"
            class="submit-btn"
            @click="emit('close')"
            style="background-color: rgb(107, 114, 128)"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}
</style>
