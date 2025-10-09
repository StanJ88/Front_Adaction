<script setup>
import './assets/main.css'
import CollectAsso from './components/CollectAsso.vue'
import WasteCollection from './views/WasteCollection.vue'
import Dashboard from './views/Dashboard.vue'
import VolunteerList from './components/VolunteerList.vue'

//import CollectAsso from './components/CollectAsso.vue'
</script>

<template>
  <main>
    <VolunteerList />
    <div>
      <ProfilVolunteer />
    </div>
  </main>
</template>
