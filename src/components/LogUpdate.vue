<template>
  <TheHeader />

  <div class="main-content">
    <div class="card">
      <h2 class="card-header">Connexion</h2>
      <form class="form-container" @submit.prevent="login">
        <div>
          <label class="form-label">Prénom *</label>
          <input placeholder="Votre prénom" type="text" v-model="prenom" />
        </div>

        <div>
          <label class="form-label">Mot de passe *</label>
          <input placeholder="Votre mot de passe" required type="password" v-model="password" />
        </div>

        <button class="submit-btn" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m10 17 5-5-5-5" />
            <path d="M15 12H3" />
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          </svg>
          <span>Mise à jour</span>
        </button>
      </form>
      <div class="logout-section">
        <button class="submit-btn manage-btn" type="button" @click="logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <path d="M16 3.128a4 4 0 0 1 0 7.744" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const prenom = ref('')
const password = ref('')

const logout = () => {
  console.log('Bouton déconnexion cliqué')
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
}
</script>
<style scoped></style>
