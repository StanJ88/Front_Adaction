<template>
  <div class="app-container">
    <TheHeader />
    <NavBar />

    <!-- message dynamique -->
    <div class="success-message" v-if="successMessage" :class="messageType">
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
        >
          <path d="M21.801 10A10 10 0 1 1 17 3.335" />
          <path d="m9 11 3 3L22 4" />
        </svg>
      </div>
      {{ successMessage }}
    </div>

    <div class="main-content">
      <div class="card">
        <h2 class="card-header">Mon profil</h2>

        <form class="form-container" @submit.prevent="updateProfile">
          <div>
            <label class="form-label">Prénom</label>
            <input placeholder="Votre prénom" type="text" v-model="prenom" />
          </div>

          <div>
            <label class="form-label">Nom</label>
            <input placeholder="Votre nom" type="text" v-model="nom" />
          </div>

          <div>
            <label class="form-label">Email</label>
            <input placeholder="Votre email" type="email" v-model="mail" />
          </div>

          <div>
            <label class="form-label">Ville</label>
            <select v-model="selectedCityId" class="form-select">
              <option disabled value="">-- Sélectionnez votre ville --</option>
              <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="form-label">Mot de passe *</label>
            <input placeholder="Votre mot de passe" type="password" v-model="password" />
          </div>

          <button class="submit-btn" type="submit">
            <span>Mise à jour</span>
          </button>

          <button class="submit-btn manage-btn" type="button" @click="logout">
            <span>Déconnexion</span>
          </button>
        </form>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'

const router = useRouter()

const prenom = ref('')
const nom = ref('')
const mail = ref('')
const password = ref('')
const cities = ref([])
const selectedCityId = ref('')
const volunteer = ref(null)
const successMessage = ref('')
const messageType = ref('success')

const fetchVolunteer = async () => {
  try {
    const id = localStorage.getItem('volunteerId')
    if (!id) {
      console.error('Aucun volunteerId trouvé dans le localStorage')
      return
    }

    const response = await fetch(`http://localhost:8081/api/volunteers/${id}`)
    if (!response.ok) throw new Error('Erreur API volunteer')

    volunteer.value = await response.json()

    // Pré-remplissage du formulaire
    prenom.value = volunteer.value.firstname || ''
    nom.value = volunteer.value.lastname || ''
    mail.value = volunteer.value.mail || ''
    password.value = ''
    selectedCityId.value = volunteer.value.city?.id || ''
  } catch (error) {
    console.error('Impossible de récupérer le profil :', error)
  }
}

const fetchCities = async () => {
  try {
    const res = await fetch('http://localhost:8081/api/cities')
    if (!res.ok) throw new Error('Erreur API villes')
    cities.value = await res.json()
  } catch (err) {
    console.error('Erreur de chargement des villes :', err)
  }
}

const updateProfile = async () => {
  try {
    if (!volunteer.value) return

    // Construire city en utilisant la sélection (ou fallback sur la ville existante)
    const cityIdToSend = selectedCityId.value || volunteer.value.city?.id

    const volunteerForm = {
      firstname: prenom.value,
      lastname: nom.value,
      mail: mail.value, // utiliser la valeur du champ email
      password: password.value ? password.value : volunteer.value.password,
      city: { id: cityIdToSend },
    }

    const response = await fetch(`http://localhost:8081/api/volunteers/${volunteer.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(volunteerForm),
    })

    if (!response.ok) {
      // lire le texte d'erreur si disponible pour debug
      let errText = ''
      try {
        errText = await response.text()
      } catch (e) {}
      throw new Error('Erreur API update' + (errText ? ' — ' + errText : ''))
    }

    const updatedVolunteer = await response.json()
    console.log('Profil mis à jour ✅', updatedVolunteer)

    // Mettre à jour le volunteer local et vider le mot de passe
    localStorage.setItem('firstname', updatedVolunteer.firstname)
    volunteer.value = updatedVolunteer
    password.value = ''

    // message de succès
    messageType.value = 'success'
    successMessage.value = 'Profil mis à jour avec succès 🎉'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    console.error('Erreur lors de la mise à jour :', err)
    messageType.value = 'error'
    successMessage.value = 'Erreur lors de la mise à jour ❌'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }
}

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

onMounted(() => {
  fetchVolunteer()
  fetchCities()
})
</script>

<style scoped></style>
