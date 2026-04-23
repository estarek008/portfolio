<template>
  <div>
    <!-- ─── Hero ──────────────────────────────── -->
    <section class="hero">
      <div class="grid-bg" />
      <div class="glow-dot" style="width:600px;height:600px;background:rgba(6,182,212,0.07);top:-150px;right:-150px;" />
      <div class="glow-dot" style="width:400px;height:400px;background:rgba(14,165,233,0.06);bottom:0;left:-100px;" />

      <div class="container hero-inner">
        <div class="hero-content">
          <span class="hero-label animate-fade-up">Cairo, Egypt · Available for Consulting</span>
          <h1 class="hero-title animate-fade-up delay-100">
            Building the Future<br>with <span class="text-gradient">AI & GenAI</span>
          </h1>
          <p class="hero-desc animate-fade-up delay-200">
            AI & Analytics Division Manager with 9+ years architecting enterprise AI systems —
            from LLM-driven automation and RAG pipelines to real-time decisioning and
            multimodal AI, across financial, government, and healthcare sectors.
          </p>
          <div class="hero-actions animate-fade-up delay-300">
            <NuxtLink to="/experience" class="btn btn-primary">View Experience</NuxtLink>
            <NuxtLink to="/projects" class="btn btn-outline">See Projects</NuxtLink>
          </div>
          <div class="hero-stats animate-fade-up delay-400">
            <div class="stat">
              <span class="stat-num">9+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num">25+</span>
              <span class="stat-label">Team Members Led</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num">21+</span>
              <span class="stat-label">Certifications</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num">5</span>
              <span class="stat-label">Publications</span>
            </div>
          </div>
        </div>

        <div class="hero-visual animate-fade-up delay-200">
          <div class="profile-ring">
            <div class="profile-img-wrap">
              <img v-if="false" src="" alt="Esraa Tarek Sadek" class="profile-img" />
              <div class="profile-placeholder">
                <span>ET</span>
              </div>
            </div>
            <div class="ring-orbit ring-1">
              <div class="orbit-dot" />
            </div>
            <div class="ring-orbit ring-2">
              <div class="orbit-dot" />
            </div>
          </div>
          <div class="floating-badge badge-llm animate-fade-up delay-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            LLM Orchestration
          </div>
          <div class="floating-badge badge-sas animate-fade-up delay-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            SAS Viya
          </div>
          <div class="floating-badge badge-rag animate-fade-up delay-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            RAG Pipelines
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Expertise Tags ─────────────────────── -->
    <section class="section expertise-section">
      <div class="container">
        <div class="expertise-grid">
          <div v-for="item in expertise" :key="item.title" class="expertise-card card">
            <div class="expertise-icon">{{ item.icon }}</div>
            <h3 class="expertise-title">{{ item.title }}</h3>
            <p class="expertise-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Featured Projects ─────────────────── -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Portfolio</span>
          <h2 class="section-title">Featured Projects</h2>
        </div>
        <div class="projects-grid">
          <div v-for="project in featuredProjects" :key="project.id" class="card project-card">
            <div class="project-category badge badge-cyan">{{ project.category }}</div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-tools flex flex-wrap gap-2 mt-3">
              <span v-for="tool in project.tools?.split(',').slice(0,3)" :key="tool" class="badge badge-navy">{{ tool.trim() }}</span>
            </div>
          </div>
        </div>
        <div class="mt-4 text-center" style="margin-top:2.5rem">
          <NuxtLink to="/projects" class="btn btn-outline">View All Projects →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ─── Quick Links ────────────────────────── -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-grid">
          <NuxtLink to="/certificates" class="cta-card card">
            <span class="cta-icon">🏅</span>
            <h3>21+ Certificates</h3>
            <p>SAS, Dataiku, Oracle, Databricks & more</p>
            <span class="cta-arrow">→</span>
          </NuxtLink>
          <NuxtLink to="/publications" class="cta-card card">
            <span class="cta-icon">📚</span>
            <h3>5 Publications</h3>
            <p>Computer Vision, ML, Robotics & Healthcare AI</p>
            <span class="cta-arrow">→</span>
          </NuxtLink>
          <NuxtLink to="/blog" class="cta-card card">
            <span class="cta-icon">✍️</span>
            <h3>AI Blog</h3>
            <p>Insights on GenAI, LLMs & enterprise AI strategy</p>
            <span class="cta-arrow">→</span>
          </NuxtLink>
          <NuxtLink to="/contact" class="cta-card card">
            <span class="cta-icon">💬</span>
            <h3>Let's Connect</h3>
            <p>Open to consulting, speaking & collaboration</p>
            <span class="cta-arrow">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const expertise = [
  { icon: '🤖', title: 'Generative AI & LLMs', desc: 'GPT, Claude, Gemini, RAG pipelines, prompt engineering, LLM orchestration and fine-tuning for enterprise production.' },
  { icon: '🧠', title: 'AI Systems Engineering', desc: 'Real-time decisioning engines, AML/CDD automation, multimodal AI, SAS Viya + Python hybrid pipelines.' },
  { icon: '📊', title: 'Analytics & Data Science', desc: 'Deep learning, computer vision, NLP, predictive modeling across financial, government and healthcare sectors.' },
  { icon: '🏛️', title: 'Strategy & Leadership', desc: 'Division management, AI roadmaps, pre-sales, feasibility studies, stakeholder engagement and team upskilling.' },
]

const { data: projectsData } = await useFetch(`${config.public.apiBase}/api/projects?featured=true`)
const featuredProjects = computed(() => (projectsData.value as any)?.data?.slice(0, 3) || [])

useHead({ title: 'Esraa Tarek Sadek — AI & Analytics Leader' })
</script>

<style scoped>
/* ─── Hero ────────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 0 6rem;
  position: relative;
  overflow: hidden;
  background: var(--gradient-hero);
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
}

.hero-label {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cyan-400);
  margin-bottom: 1.25rem;
  padding: 0.35rem 0.875rem;
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 100px;
  background: rgba(6, 182, 212, 0.08);
}

.hero-title {
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--white);
  margin-bottom: 1.5rem;
  line-height: 1.05;
}

.hero-desc {
  font-size: 1.05rem;
  color: var(--white-80);
  max-width: 560px;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat { text-align: center; }

.stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--cyan-400);
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--white-80);
  margin-top: 0.35rem;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--border);
}

/* ─── Profile Visual ────────────────────────── */
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 420px;
}

.profile-ring {
  position: relative;
  width: 240px;
  height: 240px;
}

.profile-img-wrap {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border-glow);
  box-shadow: 0 0 60px rgba(6,182,212,0.25);
  animation: pulse-glow 3s ease infinite;
}

.profile-img { width: 100%; height: 100%; object-fit: cover; }

.profile-placeholder {
  width: 100%;
  height: 100%;
  background: var(--navy-700);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 800;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ring-orbit {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid var(--border);
}

.ring-1 { inset: -30px; animation: spin 12s linear infinite; }
.ring-2 { inset: -60px; animation: spin 20s linear infinite reverse; }

.orbit-dot {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cyan-400);
  box-shadow: 0 0 10px var(--cyan-400);
}

@keyframes spin { to { transform: rotate(360deg); } }

.floating-badge {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  background: rgba(5, 13, 26, 0.9);
  border: 1px solid var(--border-glow);
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--cyan-300);
  backdrop-filter: blur(8px);
  animation: float 4s ease-in-out infinite;
  white-space: nowrap;
}

.badge-llm { top: 15%; left: -10%; animation-delay: 0s; }
.badge-sas { bottom: 20%; left: -5%; animation-delay: 1.2s; }
.badge-rag { top: 35%; right: -8%; animation-delay: 0.6s; }

/* ─── Expertise ─────────────────────────────── */
.expertise-section {
  padding-top: 0;
}

.expertise-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.expertise-card { text-align: center; padding: 2rem 1.5rem; }

.expertise-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.expertise-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.5rem;
}

.expertise-desc {
  font-size: 0.85rem;
  color: var(--muted-light);
  line-height: 1.6;
}

/* ─── Projects ──────────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.project-category { margin-bottom: 1rem; }
.project-title { font-size: 1.1rem; font-weight: 700; color: var(--white); margin-bottom: 0.75rem; }
.project-desc { font-size: 0.875rem; color: var(--muted-light); line-height: 1.6; }

/* ─── CTA Grid ──────────────────────────────── */
.cta-section { background: var(--navy-950); }

.cta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.cta-card {
  text-decoration: none;
  padding: 2rem 1.5rem;
  position: relative;
  display: block;
}

.cta-icon { font-size: 1.75rem; display: block; margin-bottom: 1rem; }

.cta-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.35rem;
}

.cta-card p {
  font-size: 0.8rem;
  color: var(--muted-light);
  line-height: 1.5;
}

.cta-arrow {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: var(--cyan-400);
  font-size: 1rem;
  transition: var(--transition);
}

.cta-card:hover .cta-arrow { transform: translateX(4px); }

/* ─── Responsive ─────────────────────────────── */
@media (max-width: 1024px) {
  .expertise-grid { grid-template-columns: repeat(2, 1fr); }
  .cta-grid { grid-template-columns: repeat(2, 1fr); }
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
  .hero-visual { height: 280px; }
  .profile-ring { width: 180px; height: 180px; }
  .badge-llm, .badge-sas, .badge-rag { display: none; }
  .expertise-grid, .cta-grid { grid-template-columns: 1fr 1fr; }
  .projects-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .expertise-grid, .cta-grid { grid-template-columns: 1fr; }
  .hero-stats { gap: 1rem; }
  .stat-divider { display: none; }
}
</style>
