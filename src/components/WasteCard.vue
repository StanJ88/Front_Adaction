<template>
  <div class="waste-card">
    <div class="waste-icon" :style="{ backgroundColor: color }">
      <component v-if="icon" :is="icon" />
    </div>
    <div class="waste-info">
      <h3>{{ label }}</h3>
      <p class="waste-count">{{ quantity }} collecté(s)</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  quantity: Number,
  color: String,
  icon: [Object] // ne mets pas "default" ici
})
</script>

<style scoped>
.waste-grid {
  margin-bottom: 1rem;
}
</style>