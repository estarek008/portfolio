<template>
  <div>
    <section class="page-hero">
      <div class="grid-bg" />
      <div class="container">
        <span class="section-label">Portfolio</span>
        <h1 class="page-title">Projects</h1>
        <p class="page-desc">Enterprise AI solutions spanning GenAI automation, compliance intelligence, and multimodal AI systems — built for real-world impact.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="filters-bar">
          <div class="search-input-wrap">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="search" type="text" class="form-input" placeholder="Search projects..." />
          </div>
          <button v-for="cat in categories" :key="cat" class="filter-btn" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
            {{ cat === 'all' ? 'All' : cat }}
          </button>
        </div>

        <div v-if="pending" class="loading-spinner"><div class="spinner" /></div>
        <div v-else class="projects-grid">
          <div v-for="project in filtered" :key="project.id" class="project-card card">
            <div class="project-top">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="badge badge-cyan">{{ project.category || 'AI' }}</span>
                <span class="status-badge" :class="statusClass(project.status)">{{ project.status }}</span>
              </div>
              <div class="project-links">
                <a v-if="project.demo_link" :href="project.demo_link" target="_blank" rel="noopener" class="icon-btn" title="Demo">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
                <a v-if="project.github_link" :href="project.github_link" target="_blank" rel="noopener" class="icon-btn" title="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-tools flex flex-wrap gap-2 mt-3">
              <span v-for="tool in (project.tools || '').split(',').slice(0, 4)" :key="tool" class="badge badge-navy">{{ tool.trim() }}</span>
            </div>
          </div>
        </div>

        <div v-if="!pending && filtered.length === 0" class="empty-state">
          No projects match your search.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const search = ref('')
const activeCategory = ref('all')
const categories = ['all', 'Generative AI', 'ML', 'Computer Vision', 'Robotics', 'Data Engineering']

const { data, pending } = await useFetch(`${config.public.apiBase}/api/projects`)
const projects = computed(() => (data.value as any)?.data || [])

const filtered = computed(() => {
  return projects.value.filter((p: any) => {
    const matchCat = activeCategory.value === 'all' || p.category === activeCategory.value
    const q = search.value.toLowerCase()
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || (p.tools || '').toLowerCase().includes(q)
    return matchCat && matchSearch
  })
})

const statusClass = (s: string) => {
  if (s === 'In Progress') return 'status-progress'
  if (s === 'Research') return 'status-research'
  return 'status-completed'
}

useHead({ title: 'Projects — Esraa Tarek Sadek' })
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

.page-desc { max-width: 600px; color: var(--white-80); }

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.project-card { padding: 1.75rem; }

.project-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.project-links {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--white-05);
  border: 1px solid var(--border);
  color: var(--white-80);
  transition: var(--transition);
}

.icon-btn:hover {
  background: rgba(6, 182, 212, 0.12);
  border-color: var(--border-glow);
  color: var(--cyan-300);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: var(--font-display);
}

.status-completed { background: rgba(34, 197, 94, 0.12); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.2); }
.status-progress  { background: rgba(251, 191, 36, 0.12); color: #fcd34d; border: 1px solid rgba(251, 191, 36, 0.2); }
.status-research  { background: rgba(168, 85, 247, 0.12); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.2); }

.project-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.75rem;
  line-height: 1.35;
}

.project-desc {
  font-size: 0.875rem;
  color: var(--muted-light);
  line-height: 1.7;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: var(--muted-light);
}

@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
}
</style>
