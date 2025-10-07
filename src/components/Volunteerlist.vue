<script setup>
import { ref, computed, onMounted } from 'vue'
import { Pen } from 'lucide-vue-next'
import { Trash2 } from 'lucide-vue-next'

// tableau  pour  les bénévoles
const volunteers = ref([
  { id: 1, name: 'Rachel Green', city: 'Paris' },
  { id: 2, name: 'Chandler Bing', city: 'Lyon' },
  { id: 3, name: 'Phoebe Buffet', city: 'Nantes' },
  { id: 4, name: 'Ross Geller', city: 'Paris' },
  { id: 5, name: 'Monica Geller', city: 'Lyon' },
])

//  recherche
const searchQuery = ref('')
const selectedCity = ref('Toutes les villes')

// fetch initial des bénévoles
async function fetchVolunteers() {
  try {
    const res = await fetch('http://localhost:3309/api/volunteers')
    if (!res.ok) throw new Error('Erreur API')
    volunteers.value = await res.json()
  } catch (err) {
    console.error('Erreur lors du chargement des bénévoles :', err)
  }
}

onMounted(() => {
  fetchVolunteers()
})

// liste filtrée selon searchQuery et selectedCity
const filteredVolunteers = computed(() => {
  return volunteers.value.filter((volunteer) => {
    const matchesName = volunteer.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCity =
      selectedCity.value === 'Toutes les villes' || volunteer.city === selectedCity.value
    return matchesName && matchesCity
  })
})
</script>

<template>
  <header></header>
  <main>
    <div class="card">
      <div class="actions-list">
        <div class="submit-btn">
          <button>Ajouter un.e bénévole</button>
        </div>

        <div class="search-filters">
          <div class="search-container">
            <input
              type="text"
              class="search-input"
              placeholder="Rechercher un.e bénévole"
              v-model="searchQuery"
            />
          </div>

          <div class="location-filter">
            <select v-model="selectedCity">
              <option value="Toutes les villes">Toutes les villes</option>
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Nantes">Nantes</option>
            </select>
          </div>
        </div>
      </div>

      <div class="volunteer-list">
        <div
          v-if="filteredVolunteers.length"
          class="volunteer-item"
          v-for="(volunteer, index) in filteredVolunteers"
          :key="volunteer.id || index"
        >
          <h3 class="volunteer-info">{{ volunteer.name }}</h3>
          <p class="volunteer-city">{{ volunteer.city }}</p>
          <div class="volunteers-actions">
            <button class="action-btn edit-btn"><Pen /></button>
            <button class="action-btn delete-btn"><Trash2 /></button>
          </div>
        </div>

        <div v-else class="no-results">Aucun bénévole trouvé.</div>
      </div>
    </div>
  </main>
  <footer></footer>
</template>

<style scoped>
.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.card-header {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
}
.actions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.volunteers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.volunteer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
}

.volunteer-info {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
}

.volunteer-city {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.volunteer-actions {
  display: flex;
  gap: 0.5rem;
}

.volunteers-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.action-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #dbeafe;
  color: #1e40af;
}

.edit-btn:hover {
  background-color: #bfdbfe;
}

.delete-btn {
  background-color: #fee2e2;
  color: #b91c1c;
}

.delete-btn:hover {
  background-color: #fecaca;
}

.search-filters {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.search-container,
.location-filter {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s;
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: #059669;
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.location-filter select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 0.875rem;
}
.submit-btn,
.donate-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled),
.donate-btn:hover:not(:disabled) {
  background-color: #047857;
}

.submit-btn:disabled,
.donate-btn:disabled {
  background-color: var(--text-secondary);
  cursor: not-allowed;
}
</style>
