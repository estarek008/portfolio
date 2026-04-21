<template>
  <div>
    <section class="page-hero">
      <div class="grid-bg" />
      <div class="container">
        <span class="section-label">Lifelong Learning</span>
        <h1 class="page-title">Certificates & Courses</h1>
        <p class="page-desc">A curated collection of professional certifications across AI, GenAI, SAS platform, and data science — reflecting a continuous learning journey.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">

        <!-- View Toggle -->
        <div class="view-toggle">
          <button class="toggle-btn" :class="{ active: view === 'grid' }" @click="view = 'grid'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            Grid
          </button>
          <button class="toggle-btn" :class="{ active: view === 'timeline' }" @click="view = 'timeline'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            Timeline
          </button>
        </div>

        <!-- Filters -->
        <div class="filters-bar">
          <div class="search-input-wrap">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="search" type="text" class="form-input" placeholder="Search certificates..." />
          </div>
          <button v-for="cat in categories" :key="cat" class="filter-btn" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
            {{ cat === 'all' ? 'All' : cat }}
          </button>
        </div>

        <!-- Grid View -->
        <div v-if="view === 'grid'" class="certs-grid">
          <div v-if="pending" class="loading-spinner"><div class="spinner" /></div>
          <div v-else-if="filtered.length === 0" class="empty-state">No certificates match your search.</div>
          <div v-for="cert in filtered" :key="cert.id" class="cert-card card">
            <div class="cert-header">
              <span class="badge" :class="categoryColor(cert.category)">{{ cert.category }}</span>
              <span v-if="cert.completion_date" class="cert-date">{{ formatDate(cert.completion_date) }}</span>
            </div>
            <h3 class="cert-title">{{ cert.title }}</h3>
            <p class="cert-provider">{{ cert.provider }}</p>
            <div v-if="cert.skills" class="cert-skills flex flex-wrap gap-2 mt-3">
              <span v-for="skill in cert.skills.split(',').slice(0,3)" :key="skill" class="badge badge-navy">{{ skill.trim() }}</span>
            </div>
            <a v-if="cert.verify_link" :href="cert.verify_link" target="_blank" rel="noopener" class="cert-verify btn btn-outline mt-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Verify
            </a>
          </div>
        </div>

        <!-- Timeline View -->
        <div v-else class="timeline">
          <div v-for="(group, year) in timelineGroups" :key="year" class="timeline-year">
            <div class="timeline-year-label">{{ year }}</div>
            <div class="timeline-items">
              <div v-for="cert in group" :key="cert.id" class="timeline-item">
                <div class="timeline-dot" />
                <div class="timeline-content card">
                  <div class="cert-header">
                    <span class="badge" :class="categoryColor(cert.category)">{{ cert.category }}</span>
                    <span v-if="cert.completion_date" class="cert-date">{{ formatDate(cert.completion_date) }}</span>
                  </div>
                  <h3 class="cert-title">{{ cert.title }}</h3>
                  <p class="cert-provider">{{ cert.provider }}</p>
                  <a v-if="cert.verify_link" :href="cert.verify_link" target="_blank" rel="noopener" class="cert-verify btn btn-outline mt-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Verify
                  </a>
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
const view = ref<'grid' | 'timeline'>('grid')
const search = ref('')
const activeCategory = ref('all')

const categories = ['all', 'Generative AI & LLMs', 'AI / ML / Data Science', 'SAS Platform', 'Other']

const { data, pending } = await useFetch(`${config.public.apiBase}/api/certificates`)
const certs = computed(() => (data.value as any)?.data || [])

const filtered = computed(() => {
  return certs.value.filter((c: any) => {
    const matchCat = activeCategory.value === 'all' || c.category === activeCategory.value
    const q = search.value.toLowerCase()
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.provider.toLowerCase().includes(q) || (c.skills || '').toLowerCase().includes(q)
    return matchCat && matchSearch
  })
})

const timelineGroups = computed(() => {
  const groups: Record<string, any[]> = {}
  filtered.value.forEach((c: any) => {
    const year = c.completion_date ? c.completion_date.slice(0, 4) : 'Date TBD'
    if (!groups[year]) groups[year] = []
    groups[year].push(c)
  })
  return Object.fromEntries(Object.entries(groups).sort(([a], [b]) => b.localeCompare(a)))
})

const categoryColor = (cat: string) => {
  if (cat === 'Generative AI & LLMs') return 'badge-cyan'
  if (cat === 'AI / ML / Data Science') return 'badge-blue'
  return 'badge-navy'
}

const formatDate = (d: string) => {
  if (!d) return ''
  const date = new Date(d)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

useHead({ title: 'Certificates — Esraa Tarek Sadek' })
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

.page-desc {
  max-width: 600px;
  color: var(--white-80);
  font-size: 1rem;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--white-80);
  transition: var(--transition);
}

.toggle-btn.active {
  background: rgba(6, 182, 212, 0.12);
  border-color: var(--border-glow);
  color: var(--cyan-300);
}

.certs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.cert-card { padding: 1.5rem; }

.cert-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.875rem;
  flex-wrap: wrap;
}

.cert-date {
  font-size: 0.75rem;
  color: var(--muted-light);
  font-family: var(--font-display);
  font-weight: 500;
}

.cert-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--white);
  line-height: 1.4;
  margin-bottom: 0.35rem;
}

.cert-provider {
  font-size: 0.82rem;
  color: var(--cyan-400);
  font-weight: 500;
}

.cert-verify {
  padding: 0.4rem 0.875rem;
  font-size: 0.78rem;
  display: inline-flex;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem;
  color: var(--muted-light);
}

/* ─── Timeline ─────────────────────────────── */
.timeline { position: relative; padding-left: 2rem; }

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--cyan-500), transparent);
}

.timeline-year { margin-bottom: 3rem; }

.timeline-year-label {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--cyan-400);
  margin-bottom: 1.5rem;
  padding-left: 0.5rem;
  position: relative;
}

.timeline-year-label::before {
  content: '';
  position: absolute;
  left: -2.6rem;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--cyan-500);
  box-shadow: 0 0 12px var(--cyan-500);
}

.timeline-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding-left: 0.5rem;
}

.timeline-item { position: relative; }

.timeline-dot {
  position: absolute;
  left: -2.1rem;
  top: 1.5rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--navy-700);
  border: 2px solid var(--border-glow);
}

.timeline-content { padding: 1.25rem; }

@media (max-width: 1024px) {
  .certs-grid { grid-template-columns: repeat(2, 1fr); }
  .timeline-items { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .certs-grid { grid-template-columns: 1fr; }
  .timeline { padding-left: 1.5rem; }
}
</style>
