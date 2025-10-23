<!-- eslint-disable vue/valid-v-for -->
<template>
  <TheHeader />

  <!-- Message de succès -->
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
        class="lucide lucide-circle-check-big"
      >
        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    </div>
    {{ successMessage }}
  </div>

  <NavBar />

  <div class="main-content">
    <div class="card">
      <h2 class="card-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-circle-alert"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="12"></line>
          <line x1="12" x2="12.01" y1="16" y2="16"></line>
        </svg>
        Enregistrer une collecte
      </h2>

      <div class="form-container">
        <div>
          <label class="form-label">Date *</label>
          <input type="date" v-model="date" />
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-map-pin"
            >
              <path
                d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
              />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span class="text-sm font-medium">Localisation</span>
          </div>
          <select v-model="selectedCity">
            <option value="">Sélectionnez une ville</option>
            <option v-for="(cityName, id) in cities" :key="id" :value="id">{{ cityName }}</option>
          </select>
        </div>

        <div>
          <label class="form-label">Types de déchet *</label>
          <div class="waste-types-grid">
            <div v-for="(waste, index) in wasteTypes" :key="index" class="waste-type-item">
              <button type="button" class="waste-type-btn">{{ waste.name }}</button>
              <div class="flex items-center gap-2">
                <button class="p-1 rounded-full hover:bg-gray-100" @click="decrement(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-minus"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="0"
                  class="w-16 text-center"
                  v-model="waste.quantity"
                  @keydown="validateNumberInput"
                  @input="sanitizeQuantity(index)"
                />
                <button class="p-1 rounded-full hover:bg-gray-100" @click="increment(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-plus"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <button :disabled="!isFormValid" class="submit-btn" @click="submitForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-save"
          >
            <path
              d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
            />
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
            <path d="M7 3v4a1 1 0 0 0 1 1h7" />
          </svg>
          <span>Enregistrer</span>
        </button>
      </div>
    </div>
  </div>

  <TheFooter />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'

const date = ref(new Date().toISOString().split('T')[0])
const selectedCity = ref('')
const wasteTypes = ref([])
const successMessage = ref('')

// Récupération du volunteerId depuis le localStorage
const storedVolunteerId = localStorage.getItem('volunteerId')
const volunteerId = ref(storedVolunteerId ? parseInt(storedVolunteerId, 10) : null)

const cities = {
  1: 'Paris',
  2: 'Marseille',
  3: 'Lyon',
  4: 'Toulouse',
  5: 'Nice',
  6: 'Nantes',
  7: 'Strasbourg',
  8: 'Montpellier',
  9: 'Bordeaux',
  10: 'Lille',
}

const isFormValid = computed(
  () => wasteTypes.value.some((waste) => waste.quantity > 0) && selectedCity.value && date.value,
)

const increment = (index) => wasteTypes.value[index].quantity++
const decrement = (index) =>
  wasteTypes.value[index].quantity > 0 && wasteTypes.value[index].quantity--

const validateNumberInput = (e) => {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete']
  if (!((e.key >= '0' && e.key <= '9') || allowedKeys.includes(e.key))) e.preventDefault()
}

const sanitizeQuantity = (index) => {
  const q = wasteTypes.value[index].quantity
  if (isNaN(q) || q < 0) wasteTypes.value[index].quantity = 0
}

const fetchWasteTypes = async () => {
  try {
    const res = await fetch('http://localhost:8081/api/waste-type')
    if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`)
    const data = await res.json()
    wasteTypes.value = data.map((w) => ({
      id: w.id,
      name: w.label,
      quantity: 0,
    }))
  } catch (err) {
    console.error('Erreur récupération types déchets :', err)
  }
}

const submitForm = async () => {
  if (!isFormValid.value || !volunteerId.value) return

  const wastesCollected = wasteTypes.value
    .filter((w) => w.quantity > 0)
    .map((w) => ({ wasteTypeId: w.id, quantity: w.quantity }))

  try {
    const res = await fetch('http://localhost:8081/api/collects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cityId: selectedCity.value,
        volunteerId: volunteerId.value,
        date: date.value,
        wastes: wastesCollected,
      }),
    })

    if (res.ok) {
      successMessage.value = ' Collecte enregistrée avec succès !'
      setTimeout(() => (successMessage.value = ''), 3000)
      wasteTypes.value.forEach((w) => (w.quantity = 0))
      selectedCity.value = ''
      date.value = new Date().toISOString().split('T')[0]
    } else {
      console.error('Erreur serveur:', res.statusText)
    }
  } catch (err) {
    console.error('Erreur réseau :', err)
  }
}

onMounted(fetchWasteTypes)
</script>

<style scoped>
.gap-2 {
  gap: 0.5rem;
}
</style>
