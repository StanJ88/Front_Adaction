<template>
    <TheHeader/>
    <div class="main-content">
        <div class="card">
            <h2 class="card-header">Connexion</h2>
            <form class="form-container">
                <div>
                    <label class="form-label"></label>
                    <input placeholder="Votre prénom" type="text" value>  
                </div>
                    <div>
                    <label class="form-label"></label>
                    <input placeholder="Votre mot de passe" required type="password" value>  
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import TheHeader from './TheHeader.vue';

</script>
<style scoped></style>