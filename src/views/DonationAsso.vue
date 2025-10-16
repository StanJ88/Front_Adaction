<template>
    <TheHeader />
    <div>
        <NavBar />
        <div class="main-content">
            <div class="card">
                <h2 class="card-header">Faire un don</h2>
                <div class="points-display">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-gift" aria-hidden="true">
                        <rect x="3" y="8" width="18" height="4" rx="1"></rect>
                        <path d="M12 8v13"></path>
                        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
                        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
                    </svg>
                    <span>Points collectés :</span>
                </div>
                <div class="associations-grid">
                    <div class="association-card">
                        <div class="association-header">
                            <span class="association-emoji">🌬️</span>
                            <h3>Clean Air Initiative</h3>
                        </div>
                        <p class="association-header">Lutte contre la pollution de l'air et promotion des énergies
                            propres.</p>
                        <div class="association-footer">
                            <span class="points-required"></span>
                            <buttton class="donate-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"
                                    aria-hidden="true">
                                    <path
                                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                                    </path>
                                </svg>
                                <span>Faire un don</span>
                            </buttton>
                        </div>
                    </div>
                </div>
                <div class="associations-grid">
                    <div class="association-card">
                        <div class="association-header">
                            <span class="association-emoji">🌊</span>
                            <h3>Ocean Cleanup</h3>
                        </div>
                        <p class="association-header">Association dédiée au nettoyage des océans et à la protection de
                            la vie marine.</p>
                        <div class="association-footer">
                            <span class="points-required"></span>
                            <buttton class="donate-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"
                                    aria-hidden="true">
                                    <path
                                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                                    </path>
                                </svg>
                                <span>Faire un don</span>
                            </buttton>
                        </div>
                    </div>
                </div>
                <div class="associations-grid">
                    <div class="association-card">
                        <div class="association-header">
                            <span class="association-emoji">🌳</span>
                            <h3>Forest Guardians</h3>
                        </div>
                        <p class="association-header">Protection des forêts et reforestation à travers le monde.</p>
                        <div class="association-footer">
                            <span class="points-required"></span>
                            <buttton class="donate-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"
                                    aria-hidden="true">
                                    <path
                                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                                    </path>
                                </svg>
                                <span>Faire un don</span>
                            </buttton>
                        </div>
                    </div>
                </div>
                <div class="associations-grid">
                    <div class="association-card">
                        <div class="association-header">
                            <span class="association-emoji">🦁</span>
                            <h3>Wildlife Protectors</h3>
                        </div>
                        <p class="association-header">Protection des espèces menacées et préservation de leur habitat.
                        </p>
                        <div class="association-footer">
                            <span class="points-required"></span>
                            <buttton class="donate-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"
                                    aria-hidden="true">
                                    <path
                                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                                    </path>
                                </svg>
                                <span>Faire un don</span>
                            </buttton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';
</script>
<style></style>