import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import WasteCollection from '@/views/WasteCollection.vue';
import ProfilVolunteer from '@/views/ProfilVolunteer.vue';
import DonationAsso from '@/views/DonationAsso.vue';


const routes = [
    {path: '/', redirect: '/dashboard'},
    {path: '/dashboard', component: Dashboard},
    {path: '/collectes', component: WasteCollection},
     {path: '/dons', component: DonationAsso},   
    {path: '/profil', component: ProfilVolunteer}

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;