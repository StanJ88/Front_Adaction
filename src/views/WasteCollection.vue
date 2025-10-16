<!-- eslint-disable vue/valid-v-for -->
<template>
  <TheHeader />
  <NavBar />
  <div class="main-content">
    <div class="card">
      <div class="card">
        <h2 class="card-header"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-circle-alert" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg> Enregistrer une collecte</h2>
        <div class="form-container">
          <div>
            <label class="form-label">Date *</label>
            <input type="date" v-model="date">
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin">
                <path
                  d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span class="text-sm front-medium text-gray-">Localisation
              </span>
            </div>
            <select v-model="selectedCity">
              <option value>Sélectionnez une ville</option>
              <option value="1">Paris</option>
              <option value="2">Marseille</option>
              <option value="3">Lyon</option>
              <option value="4">Toulouse</option>
              <option value="5">Nice</option>
              <option value="6">Nantes</option>
              <option value="7">Strasbourg</option>
              <option value="8">Montpellier</option>
              <option value="9">Bordeaux</option>
              <option value="10">Lille</option>
            </select>
          </div>
          <div>
            <label class="form-label">Types de déchet *</label>
            <div class="waste-types-grid">
              <div v-for="(waste, index) in wasteTypes" :key="index" class="waste-type-item">
                <button type="button" class="waste-type-btn">{{ waste.name }}</button>
                <div class="flex items-center gap-2">
                  <button class="p-1 rounded-full hover:bg-gray-100" @click="decrement(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-minus">
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <input type="number" min="0" class="w-16 text-center" v-model="waste.quantity">
                  <button class="p-1 rounded-full hover:bg-gray-100" @click="increment(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-plus">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
              <button :disabled="!isFormValid" class="submit-btn" @click="submitForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-save">
                  <path
                    d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                  <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                  <path d="M7 3v4a1 1 0 0 0 1 1h7" />
                </svg>
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> <!--Ajout d'une card pour afficher la collecte réalisée -->
    <div class="card" v-if="collects.length > 0">
      <h3>Mes collectes du jour</h3>
      <div class="reports-list">
        <div v-for="(collect, index) in collects" :key="index" class="report-item">
          <div class="report-header">
            <span class="report-timestamp">{{ collect.date }}</span>
          </div>
          <p class="report-description"></p>
          <p class="report-location">📍{{ collect.city }}</p>
          <div class="waste-quantity">
            <div v-for="(waste, wIndex) in collect.wastes" :key="wIndex" class="waste-item">
              <span>{{ waste.value }} : {{ waste.quantity }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TheFooter />
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import NavBar from '@/components/NavBar.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';

const date = ref("2025-10-08");
const selectedCity = ref("");
const wasteTypes = ref([]);
const collects = ref([]); // Pour stocker les collectes enregistrées

const isFormValid = computed(() => {
  return wasteTypes.value.some(waste => waste.quantity > 0) && selectedCity.value && date.value;
});

const increment = (index) => {
  wasteTypes.value[index].quantity++;
};

const decrement = (index) => {
  if (wasteTypes.value[index].quantity > 0) {
    wasteTypes.value[index].quantity--;
  }
};

const getCityName = (id) => {
  const cities = {
    "1": "Paris",
    "2": "Marseille",
    "3": "Lyon",
    "4": "Toulouse",
    "5": "Nice",
    "6": "Nantes",
    "7": "Strasbourg",
    "8": "Montpellier",
    "9": "Bordeaux",
    "10": "Lille",
  };
  return cities[id];
};

const fetchWasteTypes = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/waste-type');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    wasteTypes.value = data.map(waste => ({
      id: waste.id,
      name: waste.label,
      value: waste.value,
      className: waste.className,
      quantity: 0
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des types de déchets :', error);
  }
};

const fetchCollects = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/collects');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    //console.log("Données brutes des collectes :", data); // Log des données brutes

    collects.value = data.map(collect => ({
      id: collect.id,
      city: getCityName(collect.cityId),
      date: collect.date,
      wastes: collect.wastes.map(waste => {
        const wasteType = wasteTypes.value.find(wt => wt.id === waste.wasteTypeId);
        console.log("ID du déchet :", waste.wasteTypeId, "Nom trouvé :", wasteType?.name); // Log des IDs
        return {
          name: wasteType?.name,
          quantity: waste.quantity
        };
      })
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des collectes :', error);
  }
};

const submitForm = async () => {
  if (isFormValid.value) {
    const wastesCollected = wasteTypes.value
      .filter(waste => waste.quantity > 0)
      .map(waste => {
        console.log("Waste Type ID envoyé :", waste.id, waste.quantity); // Log pour vérifier l'ID
        return {
          wasteTypeId: waste.id,
          quantity: waste.quantity
        };
      });

    try {
      const response = await fetch('http://localhost:8081/api/collects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityId: selectedCity.value,
          volunteerId: 1, // À adapter
          date: date.value,
          wastes: wastesCollected,
        }),
      });

      if (response.ok) {
        alert('Collecte enregistrée avec succès !');
        // Réinitialisation du formulaire
        wasteTypes.value.forEach(waste => waste.quantity = 0);
        selectedCity.value = "";
        date.value = "2025-10-16";
        await fetchCollects();
        console.log("Collectes après mise à jour :", collects.value);
      } else {
        alert('Erreur lors de l\'enregistrement.');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      alert('Erreur réseau.');
    }
  }
};

onMounted(() => {
  fetchWasteTypes(); // charge les types de déchets
  fetchCollects(); // charge les collectes
});
</script>

<style scoped>
.gap-2 {
  gap: 0.5rem;
}
</style>
