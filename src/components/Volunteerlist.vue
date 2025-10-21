<script setup>
import { computed, ref, onMounted } from 'vue'
import { Pen, Trash2 } from 'lucide-vue-next'
import AddVolunteer from './AddVolunteer.vue'
import TheHeader from './TheHeader.vue'
import NavBar from './NavBar.vue'
import TheFooter from './TheFooter.vue'
import NavBarAdmin from './NavBarAdmin.vue'

const showModal = ref(false)
const editingVolunteer = ref(null)
const volunteers = ref([])

const editVolunteer = (volunteer) => {
  editingVolunteer.value = { ...volunteer }
  showModal.value = true
}

// Recherche
const searchQuery = ref('')
const selectedCity = ref('Toutes les villes')

// Fetch initial des bénévoles
async function fetchVolunteers() {
  try {
    const response = await fetch('http://localhost:8081/api/volunteers')
    const data = await response.json()
    volunteers.value = data
  } catch (error) {
    console.error('Erreur :', error)
  }
}

onMounted(() => {
  fetchVolunteers()
})

// Liste filtrée selon recherche et ville
const filteredVolunteers = computed(() => {
  return volunteers.value.filter((volunteer) => {
    const fullName = `${volunteer.firstname} ${volunteer.lastname}`.toLowerCase()
    const matchesName = fullName.includes(searchQuery.value.toLowerCase())
    const volunteerCityName = volunteer.city?.name || ''
    const matchesCity =
      selectedCity.value === 'Toutes les villes' || volunteerCityName === selectedCity.value
    return matchesName && matchesCity
  })
})

//  Ajout ou mise à jour
const addOrUpdateVolunteer = async (formValue) => {
  try {
    const volunteerForm = {
      firstname: formValue.firstname,
      lastname: formValue.lastname,
      mail: formValue.mail,
      password: formValue.password,
      city: { id: formValue.cityId },
    }

    if (editingVolunteer.value) {
      //  Mode édition  PUT

      const response = await fetch(
        `http://localhost:8081/api/volunteers/${editingVolunteer.value.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(volunteerForm),
        },
      )

      const updatedVolunteer = await response.json()
      const index = volunteers.value.findIndex((v) => v.id === editingVolunteer.value.id)
      if (index !== -1) {
        volunteers.value[index] = updatedVolunteer
      }
    } else {
      //  Mode ajout  POST
      const response = await fetch('http://localhost:8081/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volunteerForm),
      })

      const newVolunteer = await response.json()
      volunteers.value.push(newVolunteer)
    }

    //  Ferme la fenêtre modal et réinitialise
    showModal.value = false
    editingVolunteer.value = null
  } catch (error) {
    console.error('Erreur lors de l’ajout ou de la modification :', error)
  }
}
const deleteVolunteer = async (id) => {
  try {
    // confirmation avant suppression
    const confirmDelete = window.confirm('Es-tu sûr de vouloir supprimer ce bénévole ?')
    if (!confirmDelete) return

    const response = await fetch(`http://localhost:8081/api/volunteers/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      // Suppression côté frontend
      volunteers.value = volunteers.value.filter((volunteer) => volunteer.id !== id)
      console.log(`Bénévolesupprimé avec succès.`)
    } else {
      console.error('Erreur lors de la suppression du bénévole :', response.statusText)
    }
  } catch (error) {
    console.error('Erreur lors de la suppression :', error)
  }
}
</script>

<template>
  <header>
    <TheHeader />
  </header>
  <NavBarAdmin />
  <main>
    <div class="main-content">
      <div class="card">
        <div class="actions-list">
          <div class="submit-btn">
            <button @click="showModal = true">Ajouter un.e bénévole</button>
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
            <h3 class="volunteer-info">{{ volunteer.firstname }} {{ volunteer.lastname }}</h3>
            <p class="volunteer-city">{{ volunteer.city?.name }}</p>
            <div class="volunteers-actions">
              <button class="action-btn edit-btn" @click="editVolunteer(volunteer)">
                <Pen />
              </button>
              <button class="action-btn delete-btn" @click="deleteVolunteer(volunteer.id)">
                <Trash2 />
              </button>
            </div>
          </div>

          <div v-else class="no-results">Aucun bénévole trouvé.</div>
        </div>
        <AddVolunteer
          v-if="showModal"
          @submitForm="addOrUpdateVolunteer"
          @close="
            () => {
              showModal = false
              editingVolunteer = null
            }
          "
        />
      </div>
    </div>
  </main>
  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped>
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
</style>
