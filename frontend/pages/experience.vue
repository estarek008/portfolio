<template>
  <div>
    <section class="page-hero">
      <div class="grid-bg" />
      <div class="container">
        <span class="section-label">Professional Journey</span>
        <h1 class="page-title">Experience & Education</h1>
        <p class="page-desc">9+ years at the intersection of applied AI, academic research, and enterprise consulting across the MENA region.</p>
      </div>
    </section>

    <section class="section">
      <div class="container exp-layout">

        <!-- Work Experience -->
        <div>
          <h2 class="subsection-title"><span class="text-gradient">Work Experience</span></h2>
          <div class="exp-timeline">
            <div v-for="(job, i) in jobs" :key="i" class="exp-item">
              <div class="exp-marker">
                <div class="exp-dot" :class="{ current: job.current }" />
                <div v-if="i < jobs.length - 1" class="exp-line" />
              </div>
              <div class="exp-content card">
                <div class="exp-header">
                  <div>
                    <h3 class="exp-title">{{ job.title }}</h3>
                    <p class="exp-company">{{ job.company }}</p>
                  </div>
                  <span class="exp-period">{{ job.period }}</span>
                </div>
                <ul class="exp-bullets">
                  <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
                </ul>
                <div v-if="job.tags" class="flex flex-wrap gap-2 mt-3">
                  <span v-for="tag in job.tags" :key="tag" class="badge badge-navy">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Education + Achievements -->
        <div>
          <h2 class="subsection-title"><span class="text-gradient">Education</span></h2>
          <div class="edu-list">
            <div v-for="edu in education" :key="edu.degree" class="edu-card card">
              <div class="edu-icon">🎓</div>
              <div>
                <h3 class="edu-degree">{{ edu.degree }}</h3>
                <p class="edu-school">{{ edu.school }}</p>
                <span class="edu-period badge badge-navy">{{ edu.period }}</span>
              </div>
            </div>
          </div>

          <h2 class="subsection-title mt-4" style="margin-top:3rem"><span class="text-gradient">Key Achievements</span></h2>
          <div class="achievements">
            <div v-for="a in achievements" :key="a" class="achievement-item">
              <span class="achievement-icon">⚡</span>
              <p>{{ a }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const jobs = [
  {
    title: 'AI & Analytics Division Manager',
    company: 'DataScience Middle East (Emircom LLC)',
    period: 'Aug 2024 – Present',
    current: true,
    bullets: [
      'Set the technical vision for GenAI and Agentic AI adoption across financial, governmental, and healthcare sectors.',
      'Built and mentored a 25-person multidisciplinary team of data scientists, AI engineers, and analysts.',
      'Designed enterprise-scale GenAI automation engines for AML, CDD, and regulatory intelligence.',
      'Integrated ChatGPT, Perplexity, and custom LLMs into a shareholder mapping platform, reducing manual tracing by >70%.',
      'Led development of a GenAI chatbot for loan analysis and e-invoice support using Gradio with dynamic UI and model switching.',
    ],
    tags: ['GenAI', 'LLMs', 'SAS Viya', 'AML', 'Leadership'],
  },
  {
    title: 'Data Engineer / Scientist Consultant',
    company: 'DataScience Middle East (Emircom LLC)',
    period: 'Nov 2022 – Aug 2024',
    current: false,
    bullets: [
      'Built LLM-integrated SAS Viya pipelines to support regulated workflows across banking and government sectors.',
      'Customized SAS Macros and Machine Learning models in Viya to support dynamic rule-based GenAI augmentations.',
      'Optimized GenAI outputs with structured metadata extraction, pattern recognition, and hybrid rule-based + neural logic.',
    ],
    tags: ['SAS Viya', 'Python', 'LLMs', 'Data Engineering'],
  },
  {
    title: 'Assistant Lecturer — ML, Deep Learning & Embedded Systems',
    company: 'Ain Shams University',
    period: 'Jul 2022 – Present',
    current: true,
    bullets: [
      'Teach advanced undergraduate and master\'s courses in ML, Deep Learning, Transformers, and GenAI trends.',
      'Supervise applied research combining embedded systems with LLM-based interactive models.',
      'Designed comprehensive AI/ML/GenAI curricula covering transformers, computer vision, and production-oriented skills.',
    ],
    tags: ['Teaching', 'ML', 'Deep Learning', 'Curriculum Design'],
  },
  {
    title: 'Team Lead — Shams Robot',
    company: 'Robotic Research Lab, Ain Shams University',
    period: 'Feb 2021 – Oct 2022',
    current: false,
    bullets: [
      'Led the creation of an autonomous robotic nurse incorporating vision-based GenAI for behavior recognition.',
      'Integrated facial recognition, navigation systems, and GenAI-assisted communication using dialogue models.',
    ],
    tags: ['Robotics', 'Computer Vision', 'GenAI', 'Research'],
  },
  {
    title: 'Instructor & Technical Author',
    company: 'AMIT Learning / Nahdet Misr Publishing Group',
    period: 'Various',
    current: false,
    bullets: [
      'Delivered structured training programs in Python, AI fundamentals, real-time systems, and ML workflows.',
      'Authored and reviewed educational materials, textbooks, and instructional content for learners across levels.',
    ],
    tags: ['Training', 'Python', 'AI Education', 'Authoring'],
  },
  {
    title: 'Software Development Engineer',
    company: 'Elibre DMCC',
    period: 'Previous',
    current: false,
    bullets: [
      'Built engineering vision systems including 3D object recognition and smart drawing tools.',
    ],
    tags: ['Computer Vision', '3D Recognition', 'Engineering'],
  },
]

const education = [
  { degree: 'PhD Student — Computer Science (AI in Smart Cities)', school: 'Ain Shams University', period: '2023 – Present' },
  { degree: 'Pre-PhD — Computer Science (GenAI Research Focus)', school: 'Ain Shams University', period: '2022 – 2023' },
  { degree: 'M.Sc. in Computer Science (Machine Learning & Computer Vision)', school: 'Ain Shams University', period: '2017 – 2022' },
  { degree: 'B.Sc. in Computer Engineering', school: 'Ain Shams University', period: '2011 – 2015' },
]

const achievements = [
  'Designed enterprise-scale GenAI automation engines for AML, CDD, and regulatory intelligence using hybrid SAS-Python pipelines.',
  'Reduced manual shareholder tracing by over 70% through LLM-driven identity reconciliation platform.',
  'Directed creation of an AI facility compliance reviewer combining LLMs + OCR for regulatory mapping.',
  'Led pre-sales and feasibility studies across UAE, KSA, Qatar, and Egypt for enterprise AI projects.',
  'Published 5 peer-reviewed papers on computer vision and AI with 30+ total citations on Google Scholar.',
]

useHead({ title: 'Experience — Esraa Tarek Sadek' })
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

.exp-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: start;
}

.subsection-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
}

/* ─── Timeline ─────────────────────────────── */
.exp-timeline { display: flex; flex-direction: column; gap: 0; }

.exp-item {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 1.25rem;
}

.exp-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exp-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--navy-700);
  border: 2px solid var(--border-glow);
  flex-shrink: 0;
  margin-top: 1.5rem;
  transition: var(--transition);
}

.exp-dot.current {
  background: var(--cyan-500);
  border-color: var(--cyan-400);
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.5);
}

.exp-line {
  flex: 1;
  width: 2px;
  background: linear-gradient(to bottom, var(--border-glow), var(--border));
  margin: 4px 0;
}

.exp-content {
  margin-bottom: 1.25rem;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.exp-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.2rem;
}

.exp-company {
  font-size: 0.85rem;
  color: var(--cyan-400);
  font-weight: 500;
}

.exp-period {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--muted-light);
  white-space: nowrap;
  padding: 0.25rem 0.625rem;
  background: var(--navy-700);
  border-radius: 100px;
  border: 1px solid var(--border);
}

.exp-bullets {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.exp-bullets li {
  font-size: 0.85rem;
  color: var(--white-80);
  padding-left: 1.1rem;
  position: relative;
  line-height: 1.6;
}

.exp-bullets li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--cyan-400);
  font-weight: 700;
}

/* ─── Education ──────────────────────────── */
.edu-list { display: flex; flex-direction: column; gap: 1rem; }

.edu-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
}

.edu-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 0.1rem; }

.edu-degree {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.2rem;
  line-height: 1.4;
}

.edu-school {
  font-size: 0.82rem;
  color: var(--cyan-400);
  margin-bottom: 0.5rem;
}

/* ─── Achievements ───────────────────────── */
.achievements { display: flex; flex-direction: column; gap: 1rem; }

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  background: var(--white-05);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.achievement-icon { font-size: 1rem; flex-shrink: 0; margin-top: 0.1rem; }

.achievement-item p {
  font-size: 0.875rem;
  color: var(--white-80);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .exp-layout { grid-template-columns: 1fr; }
}
</style>
