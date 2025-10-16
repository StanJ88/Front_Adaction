<script setup>
//import VolunteerList from './components/VolunteerList.vue'
import './assets/main.css'
import VolunteerList from './components/VolunteerList.vue';
//import CollectAsso from './components/CollectAsso.vue'
import Dashboard from './views/Dashboard.vue';

//import CollectAsso from './components/CollectAsso.vue'
</script>
<script>
import Navbar from '@/components/NavBar.vue';

export default {
  components: {
    Navbar
  },
};
</script>

<template>
  <main>
    <div id="app">
    <router-view />
  </div> 
  <!--<VolunteerList/>-->
  </main>
</template>
