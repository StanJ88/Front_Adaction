<template>
  <nav class="navbar">
    <div class="navbar-container">
      <NavbarLink to="/">
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
          <path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" />
          <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" />
          <path d="M5 21h14" />
        </svg>
        Dashboard
      </NavbarLink>
      <NavbarLink to="/">
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
          class="lucide lucide-package-plus-icon lucide-package-plus"
        >
          <path d="M16 16h6" />
          <path d="M19 13v6" />
          <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
          <path d="m7.5 4.27 9 5.15" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <line x1="12" x2="12" y1="22" y2="12" />
        </svg>
        Collectes
      </NavbarLink>
      <NavbarLink to="/">
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
          class="lucide lucide-heart-icon lucide-heart"
        >
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
        Dons
      </NavbarLink>
      <NavbarLink to="/">
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
          class="lucide lucide-user-icon lucide-user"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Profil
      </NavbarLink>
    </div>
  </nav>
</template>

<script setup>
import NavbarLink from './NavbarLink.vue';
</script>

<style>
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
}</style>