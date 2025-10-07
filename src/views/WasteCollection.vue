<template>
    <TheHeader/>
    <div class="main-content">
        <div class="card">
            <div class="card">
                <h2 class="card-header">Enregistrer une collecte</h2>
                <div class="form-container">
                    <div>
                        <label class="form-label">Date *</label>
                        <input type="date" value="25-10-07">
                    </div>
                    <div class="flex items-center gap-2"></div>
                </div>
            </div>
        </div>
    </div>
    <TheFooter/>
</template>
<script setup>
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';

</script>
<style scoped></style>
