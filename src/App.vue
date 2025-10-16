<script setup>
import './assets/main.css'
import CollectAsso from './components/CollectAsso.vue'
import WasteCollection from './views/WasteCollection.vue'
import Dashboard from './views/Dashboard.vue'
import VolunteerList from './components/VolunteerList.vue'

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
