<template>
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner container">
      <NuxtLink to="/" class="nav-logo">
        <span class="logo-text">Esraa<span class="logo-dot">.</span></span>
      </NuxtLink>

      <div class="nav-links" :class="{ open: menuOpen }">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link" @click="menuOpen = false">
          {{ link.label }}
        </NuxtLink>
        <NuxtLink to="/contact" class="btn btn-primary nav-cta" @click="menuOpen = false">
          Let's Talk
        </NuxtLink>
      </div>

      <button class="nav-burger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">
        <span /><span /><span />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const isScrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/projects', label: 'Projects' },
  { to: '/publications', label: 'Research' },
  { to: '/skills', label: 'Skills' },
  { to: '/blog', label: 'Blog' },
]

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 40
  })
})
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 1.25rem 0;
  transition: all 0.4s ease;
}

.nav.scrolled {
  background: rgba(5, 13, 26, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 4px 32px rgba(2, 8, 18, 0.5);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.nav-logo { text-decoration: none; }

.logo-text {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--white);
  letter-spacing: -0.02em;
}

.logo-dot { color: var(--cyan-400); }

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--white-80);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  transition: var(--transition);
  text-decoration: none;
  letter-spacing: 0.02em;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--cyan-300);
  background: var(--white-05);
}

.nav-cta {
  margin-left: 0.75rem;
  padding: 0.5rem 1.25rem;
  font-size: 0.85rem;
}

.nav-burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--white-80);
  border-radius: 2px;
  transition: var(--transition);
}

@media (max-width: 900px) {
  .nav-burger { display: flex; }

  .nav-links {
    position: fixed;
    top: 0; right: -100%;
    width: min(320px, 85vw);
    height: 100vh;
    flex-direction: column;
    align-items: flex-start;
    padding: 5rem 2rem 2rem;
    background: var(--navy-800);
    border-left: 1px solid var(--border);
    transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    gap: 0.5rem;
  }

  .nav-links.open { right: 0; }

  .nav-link { font-size: 1rem; padding: 0.6rem 0.75rem; width: 100%; }
  .nav-cta { margin-left: 0; margin-top: 1rem; width: 100%; justify-content: center; }
}
</style>
