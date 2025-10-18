<template>
  <div>
    <TheHeader />
    <NavBar />
    <main>
      <div class="main-content">
        <div class="card">
          <div class="dashboard-header">
            <h2 class="card-header">Bonjour Bob !</h2>
            <div class="month-navigation">
              <button class="month-nav-btn" @click="prevMonth"> <svg xmlns="http://www.w3.org/2000/svg" width="16"
                  height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-chevron-left-icon lucide-chevron-left">
                  <path d="m15 18-6-6 6-6" />
                </svg> </button>
              <span class="current-month">{{ currentMonthName }} {{ currentYear }}</span>
              <button class="month-nav-btn" @click="nextMonth">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-chevron-right-icon lucide-chevron-right">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          <div class="waste-grid">
            <WasteCard v-for="waste in wasteTypes" :key="waste.id" :label="cleanWasteName(waste.name)"
              :quantity="wasteTotalForMonth(waste.id)" :color="wasteConfig[waste.name]?.color || 'gray'"
              :icon="wasteConfig[waste.name]?.icon || null" />
          </div>
        </div>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TheFooter from '@/components/TheFooter.vue'
import NavBar from '@/components/NavBar.vue'
import TheHeader from '@/components/TheHeader.vue'
import WasteCard from '@/components/WasteCard.vue'
import CigaretteIcon from '../components/CigaretteIcon.vue'
import PackageIcon from '../components/PackageIcon.vue'
import GlassIcon from '@/components/GlassIcon.vue'
import TrashIcon from '@/components/TrashIcon.vue'
import SmartphoneIcon from '@/components/SmartphoneIcon.vue'
import QuestionMarkIcon from '@/components/QuestionMarkIcon.vue'




const wasteTypes = ref([])
const collects = ref([])

const wasteConfig = {
  "🚬 Mégots de cigarette": {
    color: 'rgb(251, 191, 36)',
    icon: CigaretteIcon
  },
  "🥤 Plastique": {
    color: 'rgb(96, 165, 250)',
    icon: PackageIcon
  },
  "🍶 Verre": {
    color: 'rgb(52, 211, 153)',
    icon: GlassIcon
  },
  "🥫 Métal": {
    color: 'rgb(148, 163, 184)',
    icon: TrashIcon
  },
  "📱 Électronique": {
    color: 'rgb(167, 139, 250)',
    icon: SmartphoneIcon
  },
  "❓ Autre": {
    color: 'rgb(248, 113, 113)',
    icon: QuestionMarkIcon
  }
}

function cleanWasteName(name) {
  // Supprime les emojis et retourne le nom nettoyé
  return name.replace(/[^\p{L}\p{N}\s]/gu, '').trim();
}

const months = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
]
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

const currentMonthName = computed(() => months[currentMonth.value])

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}
function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

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


async function fetchCollects() {
  try {
    const resp = await fetch('http://localhost:8081/api/collects')
    if (!resp.ok) throw new Error('Erreur API collects')
    const data = await resp.json()

    collects.value = data.map(collect => ({
      date: collect.date,
      wastes: collect.wastes.map(w => ({
        wasteTypeId: w.wasteTypeId,
        quantity: w.quantity
      }))
    }))
  } catch (err) {
    console.error('Erreur fetch collects : ', err)
  }
}

// calculer le total pour un type de déchet pour le mois courant sélectionné
function wasteTotalForMonth(wasteTypeId) {
  let total = 0
  collects.value.forEach(collect => {
    const d = new Date(collect.date)
    if (
      d.getMonth() === currentMonth.value &&
      d.getFullYear() === currentYear.value
    ) {
      collect.wastes.forEach(w => {
        if (w.wasteTypeId === wasteTypeId) {
          total += w.quantity
        }
      })
    }
  })
  return total
}

function getIcon(wasteName) {
  const icon = wasteConfig[wasteName]?.icon || null
  console.log('ICON for', wasteName, ':', icon)
  return icon
}

onMounted(() => {
  fetchWasteTypes()
  fetchCollects()
})
</script>
<style scoped></style>