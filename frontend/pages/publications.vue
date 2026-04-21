<template>
  <div>
    <section class="page-hero">
      <div class="grid-bg" />
      <div class="container">
        <span class="section-label">Academic Research</span>
        <h1 class="page-title">Publications</h1>
        <p class="page-desc">Peer-reviewed research in Computer Vision, Machine Learning, Deep Learning, and Robotics — focused on AI for healthcare and autism detection.</p>
        <a href="https://scholar.google.com/citations?user=LmnJVdsAAAAJ&hl=en" target="_blank" rel="noopener" class="btn btn-outline scholar-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
          View Google Scholar Profile
        </a>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-if="pending" class="loading-spinner"><div class="spinner" /></div>
        <div v-else class="pubs-list">
          <div v-for="(pub, i) in publications" :key="pub.id" class="pub-card card">
            <div class="pub-number">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="pub-body">
              <h3 class="pub-title">{{ pub.title }}</h3>
              <p class="pub-journal">{{ pub.journal }}</p>
              <p class="pub-authors">{{ pub.authors }}</p>
              <div class="pub-footer">
                <div class="pub-meta flex items-center gap-3 flex-wrap">
                  <span class="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {{ pub.year }}
                  </span>
                  <span class="meta-item citations">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                    {{ pub.citations }} citations
                  </span>
                </div>
                <div class="pub-tags flex flex-wrap gap-2">
                  <span v-for="tag in (pub.tags || '').split(',').filter(Boolean)" :key="tag" class="badge badge-navy">{{ tag.trim() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const { data, pending } = await useFetch(`${config.public.apiBase}/api/publications`)
const publications = computed(() => (data.value as any)?.data || [])
useHead({ title: 'Publications — Esraa Tarek Sadek' })
</script>

<style scoped>
.page-hero {
  padding: 8rem 0 4rem;
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
}

.page-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0.5rem 0 1rem;
}

.page-desc { max-width: 600px; color: var(--white-80); margin-bottom: 1.5rem; }

.scholar-btn { display: inline-flex; }

.pubs-list { display: flex; flex-direction: column; gap: 1.25rem; }

.pub-card {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  align-items: flex-start;
}

.pub-number {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--border-glow);
  line-height: 1;
  flex-shrink: 0;
  min-width: 3rem;
}

.pub-body { flex: 1; }

.pub-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--white);
  line-height: 1.45;
  margin-bottom: 0.5rem;
}

.pub-journal {
  font-size: 0.85rem;
  color: var(--cyan-400);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.pub-authors {
  font-size: 0.8rem;
  color: var(--muted-light);
  margin-bottom: 1rem;
}

.pub-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--muted-light);
  font-family: var(--font-display);
  font-weight: 500;
}

.meta-item.citations { color: var(--blue-400); }

@media (max-width: 600px) {
  .pub-card { flex-direction: column; gap: 1rem; }
  .pub-number { font-size: 1.5rem; }
}
</style>
