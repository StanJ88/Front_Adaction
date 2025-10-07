<template>
    <div class="app-container">
        <TheHeader />
        <NavBar />
        <div class="main-content">
            <div class="card">
                <h2 class="card-header">Mon profil</h2>
                <form class="form-container">
                    <div>
                        <label class="form-label">Prénom</label>
                        <input placeholder="Votre prénom" type="text" value="">
                    </div>
                    <div>
                        <label class="form-label">Nom</label>
                        <input placeholder="Votre nom" type="text" value="">
                    </div>
                    <div>
                        <label class="form-label">Ville</label>
                        <input placeholder="Votre ville" type="text" value="">
                    </div>
                    <div>
                        <label class="form-label">Mot de passe *</label>
                        <input placeholder="Votre mot de passe" required type="password" value="">
                    </div>
                    <button class="submit-btn" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-save-icon lucide-save">
                            <path
                                d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                            <path d="M7 3v4a1 1 0 0 0 1 1h7" />
                        </svg>
                        <span>Mise à jour</span>
                    </button>
                    <button class="submit-btn manage-btn" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-log-out-icon lucide-log-out">
                            <path d="m16 17 5-5-5-5" />
                            <path d="M21 12H9" />
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        </svg>
                        <span>Déconnexion</span>
                    </button>
                </form>
            </div>
        </div>
        <TheFooter />
    </div>
</template>
<script setup>
import NavBar from '@/components/NavBar.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';



</script>
<style scoped></style>

