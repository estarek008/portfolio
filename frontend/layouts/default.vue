<template>
  <div>
    <AppNav />
    <main>
      <slot />
    </main>
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <span class="logo-text">Esraa<span class="logo-dot">.</span></span>
          <p>AI & Generative AI Specialist<br>Technical Leader · Applied Researcher</p>
        </div>
        <div class="footer-links">
          <NuxtLink to="/experience">Experience</NuxtLink>
          <NuxtLink to="/certificates">Certificates</NuxtLink>
          <NuxtLink to="/projects">Projects</NuxtLink>
          <NuxtLink to="/publications">Research</NuxtLink>
          <NuxtLink to="/blog">Blog</NuxtLink>
          <NuxtLink to="/contact">Contact</NuxtLink>
        </div>
        <div class="footer-socials">
          <a href="https://www.linkedin.com/in/esraa-tarek-ba538673" target="_blank" rel="noopener" class="social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a href="https://scholar.google.com/citations?user=LmnJVdsAAAAJ&hl=en" target="_blank" rel="noopener" class="social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
            Scholar
          </a>
          <a href="mailto:estarek008@gmail.com" class="social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>
        </div>
      </div>
      <div class="footer-bottom container">
        <span>© {{ new Date().getFullYear() }} Esraa Tarek Sadek. All rights reserved.</span>
        <NuxtLink to="/admin" class="admin-link">Admin</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  background: var(--navy-950);
  border-top: 1px solid var(--border);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand .logo-text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--white);
}

.logo-dot { color: var(--cyan-400); }

.footer-brand p {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--muted-light);
  line-height: 1.6;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-links a {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--white-80);
  text-decoration: none;
  transition: var(--transition);
}

.footer-links a:hover { color: var(--cyan-300); }

.footer-socials {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--white-80);
  text-decoration: none;
  transition: var(--transition);
}

.social-btn:hover { color: var(--cyan-300); }

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--muted);
}

.admin-link {
  font-size: 0.75rem;
  color: var(--muted);
  opacity: 0.5;
}

.admin-link:hover { opacity: 1; color: var(--cyan-400); }

@media (max-width: 768px) {
  .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
  .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
}
</style>
