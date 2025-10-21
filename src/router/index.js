import { createRouter, createWebHistory } from 'vue-router'
//Bénévole
import Dashboard from '@/views/Dashboard.vue'
import WasteCollection from '@/views/WasteCollection.vue'
import DonationAsso from '@/views/DonationAsso.vue'
//Admin
import Leaderboard from '@/views/Leaderboard.vue'
import Login from '@/views/Login.vue'
import ProfilVolunteer from '@/views/ProfilVolunteer.vue'
import VolunteerList from '@/components/Volunteerlist.vue'

const routes = [
  // Page Login
  { path: '/login', component: Login },
  // Routes Bénévole
  { path: '/', redirect: '/dashboard' },
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

// Garde de navigation pour protéger les routes admin
router.beforeEach((to, from, next) => {
  const isAdminRoute = to.path.startsWith('/admin')
  const isAdmin = localStorage.getItem('role') === 'ADMIN'

  if (isAdminRoute) {
    if (!isAdmin) {
      next('/dashboard') // si pas admin → dashboard
    } else {
      next() // autorise l'accès à la route admin demandée
    }
  } else {
    next() // autorise l'accès aux autres routes
  }
})

export default router
