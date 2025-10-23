<script setup>
const props = defineProps({
  title: { type: String, default: 'Confirmation' },
  message: { type: String, required: true },
  confirmText: { type: String, default: 'Confirmer' },
  cancelText: { type: String, default: 'Annuler' },
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div class="modal-overlay" @click.self="emit('cancel')">
    <div class="modal">
      <h3>{{ title }}</h3>
      <p class="message">{{ message }}</p>

      <div class="actions">
        <button class="confirm" @click="emit('confirm')">{{ confirmText }}</button>
        <button class="cancel" @click="emit('cancel')">{{ cancelText }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  width: 350px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.message {
  margin: 1rem 0;
}
.actions {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
.confirm {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
.cancel {
  background-color: #9ca3af;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
</style>
