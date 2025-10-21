<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Liens existants -->
      <NavbarLink to="/admin/manage-users">
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
          class="lucide lucide-sprout-icon lucide-sprout"
        >
          <path
            d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"
          />
          <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" />
          <path d="M5 21h14" />
        </svg>
        <span>Gestion des bénévoles</span>
      </NavbarLink>

      <NavbarLink to="/admin/leaderboard">
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
          class="lucide lucide-trophy-icon lucide-trophy"
        >
          <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
          <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
          <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
          <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
        </svg>
        <span>Leaderboard</span>
      </NavbarLink>

      <!-- Bouton Déconnexion -->
      <button class="navbar-link logout-link" @click="handleLogout">
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
          class="lucide lucide-log-out"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span>Déconnexion</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import NavbarLink from './NavbarLink.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
  try {
    await fetch('http://localhost:8081/api/logout', {
      method: 'POST',
      credentials: 'include',
    })

    // Nettoyage du stockage local
    localStorage.removeItem('role')

    // Redirection
    router.push('/login')
  } catch (err) {
    console.error('Erreur lors de la déconnexion:', err)
    alert('Une erreur est survenue lors de la déconnexion.')
  }
}
</script>

<style scoped>
/* Garde ton design actuel */
.navbar {
  background-color: white;
  border-bottom: 1px solid var(--border-color);
  padding: 0.2rem 1rem;
}

.navbar-container {
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.navbar-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.navbar-link:hover,
.navbar-link.active {
  color: var(--primary-color);
  background-color: #ecfdf5;
}

.navbar-link.active {
  font-weight: 500;
}

.logout-link {
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
}

/* Responsive navbar */
@media (max-width: 640px) {
  .navbar-container {
    gap: 1.5rem;
  }

  .navbar-link {
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.25rem;
  }

  .navbar-link span {
    font-size: 0.75rem;
  }
}
</style>
