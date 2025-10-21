import { createRouter, createWebHistory } from 'vue-router'
// Bénévole
import Dashboard from '@/views/Dashboard.vue'
import WasteCollection from '@/views/WasteCollection.vue'
import DonationAsso from '@/views/DonationAsso.vue'
// Admin
import Leaderboard from '@/views/Leaderboard.vue'
import Login from '@/views/Login.vue'
import ProfilVolunteer from '@/views/ProfilVolunteer.vue'
import VolunteerList from '@/components/Volunteerlist.vue'

const routes = [
  // Page Login
  { path: '/login', component: Login },

  // Routes Bénévole
  { path: '/', redirect: '/login' },
  { path: '/dashboard', component: Dashboard },
  { path: '/collectes', component: WasteCollection },
  { path: '/dons', component: DonationAsso },
  { path: '/profil', component: ProfilVolunteer },

  // Routes Admin
  { path: '/admin/manage-users', component: VolunteerList },
  { path: '/admin/leaderboard', component: Leaderboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🧩 Garde de navigation
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('role')
  const isAdminRoute = to.path.startsWith('/admin')

  // 🔒 Si c'est une route admin mais que l'utilisateur n'est pas admin → login
  if (isAdminRoute && role !== 'ADMIN') {
    next('/login')
  } else {
    next()
  }
})

export default router
