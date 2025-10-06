<template>
  <header class="header">
    <div class="header-content">
  <h1 class="header-title">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-recycle"
      aria-hidden="true"
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
    Adaction
  </h1>
</div>
    <p class="header-subtitle">Agir pour un environnement plus propre.</p>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background-color: #059669;
  color: white;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.header-subtitle {
  text-align: center;
  color: #a7f3d0;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>