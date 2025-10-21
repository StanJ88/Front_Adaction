<template>
  <TheHeader />
  <div class="success-message" v-if="successMessage">
    <div class="success-icon">
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
        class="lucide lucide-circle-check-big-icon lucide-circle-check-big"
      >
        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    </div>
    {{ successMessage }}
  </div>
  <div class="main-content">
    <div class="card">
      <h2 class="card-header">Connexion</h2>
      <form class="form-container" @submit.prevent="handleLogin">
        <div>
          <label class="form-label">Prénom *</label>
          <input placeholder="Votre prénom" type="text" v-model="firstname" />
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
          <span>Se connecter</span>
        </button>
        <button class="submit-btn manage-btn" type="button" @click="goToManageUsers">
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
          <span>Gérer les bénévoles</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const firstname = ref('')
const password = ref('')
const successMessage = ref('')

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstname.value,
        password: password.value,
      }),
    })

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

    const data = await response.json()

    if (data.role === 'ADMIN') {
      localStorage.setItem('role', 'ADMIN')
      successMessage.value = 'Bienvenue Admin ! 🎉'

      setTimeout(() => {
        router.push('/admin/manage-users')
        successMessage.value = ''
      }, 2000)
    } else if (data.role === 'VOLONTAIRE') {
      localStorage.setItem('role', 'VOLONTAIRE')
      successMessage.value = 'Connexion réussie ! 👏'

      setTimeout(() => {
        router.push('/dashboard')
        successMessage.value = ''
      }, 2000)
    } else {
      alert('Identifiants incorrects')
    }
  } catch (err) {
    console.error('Erreur lors de la connexion:', err)
    alert('Erreur lors de la connexion')
  }
}

// Fonction pour rediriger vers la gestion des bénévoles
const goToManageUsers = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/me', {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

    const data = await response.json()

    if (data.role === 'ADMIN') {
      localStorage.setItem('role', 'ADMIN')
      router.push('/admin/manage-users')
    } else {
      alert('Accès refusé : vous devez être administrateur.')
    }
  } catch (err) {
    console.error("Erreur lors de la vérification de l'utilisateur:", err)
    alert("Vous devez être connecté en tant qu'administrateur pour accéder à cette page.")
  }
}
</script>
<style scoped></style>
