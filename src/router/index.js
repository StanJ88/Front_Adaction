import { createRouter, createWebHistory } from 'vue-router'
//Bénévole
import Dashboard from '@/views/Dashboard.vue'
import WasteCollection from '@/views/WasteCollection.vue'
import ProfilVolunteer from '@/views/ProfilVolunteer.vue'
import DonationAsso from '@/views/DonationAsso.vue'
//Admin
import VolunteerList from '@/components/VolunteerList.vue'
import Leaderboard from '@/views/Leaderboard.vue'
import Login from '@/views/Login.vue'


const routes = [ 
  //Page Login
  {path: '/login', component:Login},

  //routes Bénévole
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/collectes', component: WasteCollection },
  { path: '/dons', component: DonationAsso },
  { path: '/profil', component: ProfilVolunteer },

  //Routes Admin
  { path: '/admin', redirect: '/admin/manage-users'},
  {path: '/manage-users', component: VolunteerList},
  {path: '/leaderboard', component: Leaderboard}

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Garde de navigation pour protéger les routes admin
router.beforeEach((to, from, next) => {
  const isAdminRoute = to.path.startsWith('/admin');
  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'ADMIN';

  if (isAdminRoute) {
    if (!isLoggedIn) {
      next('/login'); // Redirige vers la page de login si non connecté
    } else if (!isAdmin) {
      next('/dashboard'); // Redirige vers le dashboard si l'utilisateur n'est pas admin
    } else {
      next(); // Autorise l'accès
    }
  } else {
    next(); // Autorise l'accès aux autres routes
  }
});

export default router;