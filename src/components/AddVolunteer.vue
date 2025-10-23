<script setup>
import { ref, onMounted, watch } from 'vue'

// Props pour recevoir le bénévole à éditer
const props = defineProps({
  volunteer: Object,
})

// Events vers le parent
const emit = defineEmits(['close', 'submitForm'])

const form = ref({
  firstname: '',
  lastname: '',
  mail: '',
  password: '',
  cityId: '',
})

const cities = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8081/api/cities')
    if (!res.ok) throw new Error('Erreur de chargement des villes')
    cities.value = await res.json()
  } catch (err) {
    console.error('Erreur chargement villes:', err)
  }
})

// Watch pour pré-remplir le formulaire si on édite un bénévole
watch(
  () => props.volunteer,
  (newVal) => {
    if (newVal) {
      form.value.firstname = newVal.firstname || ''
      form.value.lastname = newVal.lastname || ''
      form.value.mail = newVal.mail || ''
      form.value.password = ''
      form.value.cityId = newVal.city?.id || ''
    } else {
      form.value.firstname = ''
      form.value.lastname = ''
      form.value.mail = ''
      form.value.password = ''
      form.value.cityId = ''
    }
  },
  { immediate: true },
)

// Submit du formulaire
const handleSubmit = () => {
  emit('submitForm', form.value)
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <h3>{{ volunteer ? 'Modifier le bénévole' : 'Ajouter un.e bénévole' }}</h3>
      <form class="form-container" @submit.prevent="handleSubmit">
        <div>
          <label class="form-label">Prénom</label>
          <input required v-model="form.firstname" type="text" />
        </div>
        <div>
          <label class="form-label">Nom</label>
          <input required v-model="form.lastname" type="text" />
        </div>
        <div>
          <label class="form-label">Email</label>
          <input required v-model="form.mail" type="email" />
        </div>
        <div>
          <label class="form-label">Mot de passe</label>
          <input :required="!volunteer" v-model="form.password" type="password" />
        </div>
        <div>
          <label class="form-label">Ville</label>
          <select required v-model="form.cityId">
            <option disabled value="">-- Sélectionne une ville --</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="modal-actions">
          <button type="submit" class="submit-btn">
            {{ volunteer ? 'Mettre à jour' : 'Ajouter' }}
          </button>
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
