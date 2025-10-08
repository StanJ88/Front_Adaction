<template>
  <div>
    <TheHeader />
    <NavBar />
    <main>
      <div class="main-content">
        <div class="card">
          <div class="dashboard-header">
            <h2 class="card-header">Bonjour Bob !</h2>
            <div class="month-navigation">
              <button class="month-nav-btn" @click="prevMonth">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-chevron-left-icon lucide-chevron-left">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <span class="current-month">{{ currentMonthName }} {{ currentYear }}</span>
              <button class="month-nav-btn" @click="nextMonth">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-chevron-right-icon lucide-chevron-right">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div class="waste-grid">
            <div class="waste-card">
              <div class="waste-icon" style="background-color: rgb(251, 191, 36);"><svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-cigarette-icon lucide-cigarette">
                  <path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" />
                  <path d="M18 8c0-2.5-2-2.5-2-5" />
                  <path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                  <path d="M22 8c0-2.5-2-2.5-2-5" />
                  <path d="M7 12v4" />
                </svg></div>
              <div class="waste-info">
                <h3>Mégots de cigarette</h3>
                <p class="waste-count">collecté</p>
              </div>
            </div>
          </div>

          <div class="waste-grid">
            <div class="waste-card">
              <div class="waste-icon" style="background-color: rgb(96, 165, 250);;"><svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-package-icon lucide-package">
                  <path
                    d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                  <path d="M12 22V12" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <path d="m7.5 4.27 9 5.15" />
                </svg></div>
              <div class="waste-info">
                <h3>Plastique</h3>
                <p class="waste-count">collecté</p>
              </div>
            </div>
          </div>

          <div class="waste-grid">
            <div class="waste-card">
              <div class="waste-icon" style="background-color: rgb(52, 211, 153);"><svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-wine-icon lucide-wine">
                  <path d="M8 22h8" />
                  <path d="M7 10h10" />
                  <path d="M12 15v7" />
                  <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
                </svg></div>
              <div class="waste-info">
                <h3>Verre</h3>
                <p class="waste-count">collecté</p>
              </div>
            </div>
          </div>

          <div class="waste-grid">
            <div class="waste-card">
              <div class="waste-icon" style="background-color: rgb(148, 163, 184);"><svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-trash2-icon lucide-trash-2">
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg></div>
              <div class="waste-info">
                <h3>Métal</h3>
                <p class="waste-count">collecté</p>
              </div>
            </div>
          </div>

          <div class="waste-grid">
            <div class="waste-card">
              <div class="waste-icon" style="background-color: rgb(167, 139, 250);"><svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-smartphone-icon lucide-smartphone">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg></div>
              <div class="waste-info">
                <h3>Électronique</h3>
                <p class="waste-count">collecté</p>
              </div>
            </div>
          </div>

          <div class="waste-grid">
            <div class="waste-card">
              <div class="waste-icon" style="background-color: rgb(248, 113, 113);"><svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-circle-question-mark-icon lucide-circle-question-mark">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg></div>
              <div class="waste-info">
                <h3>Autre</h3>
                <p class="waste-count">collecté</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
  <TheFooter />
</template>

<script setup>
import TheFooter from '@/components/TheFooter.vue'
import NavBar from '@/components/NavBar.vue'
import TheHeader from '@/components/TheHeader.vue'
</script>
<script>
export default {
  data() {
    return {
      months: [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
      ],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    };
  },
  computed: {
    currentMonthName() {
      return this.months[this.currentMonth];
    },
  },
  methods: {
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
  },
};
</script>
<style scoped></style>