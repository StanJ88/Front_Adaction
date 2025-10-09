<template>
  <a :href="to" class="navbar-link">
    <slot></slot>
  </a>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>