<template>
  <div>
    <section class="page-hero">
      <div class="grid-bg" />
      <div class="container">
        <span class="section-label">Expertise</span>
        <h1 class="page-title">Skills & Competencies</h1>
        <p class="page-desc">A comprehensive skillset spanning technical AI engineering, platform expertise, strategic leadership, and academic research.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="skills-layout">
          <div v-for="group in skillGroups" :key="group.title" class="skill-group card">
            <div class="skill-group-header">
              <span class="skill-icon">{{ group.icon }}</span>
              <h3 class="skill-group-title">{{ group.title }}</h3>
            </div>
            <div class="skills-cloud">
              <span v-for="skill in group.skills" :key="skill" class="skill-pill" :class="group.color">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const skillGroups = [
  {
    icon: '🤖',
    title: 'Generative AI & LLMs',
    color: 'pill-cyan',
    skills: ['GPT-4 / ChatGPT', 'Claude', 'Gemini', 'LLaMA', 'Mistral', 'Azure OpenAI', 'vLLM', 'Prompt Engineering', 'RAG Pipelines', 'Vector Databases', 'LLM Orchestration', 'Fine-tuning', 'Domain Adaptation', 'Embeddings', 'Context Optimization'],
  },
  {
    icon: '🧠',
    title: 'AI / ML / Data Science',
    color: 'pill-blue',
    skills: ['TensorFlow', 'Deep Learning', 'CNNs', 'Transformers', 'Computer Vision', 'NLP', 'Multimodal AI', 'AML / CDD Systems', 'Real-time Decision Engines', 'Predictive Modeling', 'OCR Pipelines', 'Anomaly Detection'],
  },
  {
    icon: '🛠️',
    title: 'Tools & Platforms',
    color: 'pill-navy',
    skills: ['SAS Viya', 'SAS ESP', 'SAS Intelligent Decisioning', 'SAS Visual Analytics', 'Dataiku DSS', 'Databricks', 'AWS', 'Python', 'Gradio', 'Streamlit', 'MLOps', 'Jupyter', 'Git'],
  },
  {
    icon: '👥',
    title: 'Leadership & Strategy',
    color: 'pill-cyan',
    skills: ['Team Leadership', 'AI Product Strategy', 'Roadmap Building', 'Stakeholder Management', 'Data Governance', 'Model Ethics', 'Regulatory Alignment', 'Solution Architecture', 'Feasibility Studies', 'Technical Proposal Writing', 'Pre-sales & RFP'],
  },
  {
    icon: '🎤',
    title: 'Communication & Consulting',
    color: 'pill-blue',
    skills: ['Client Engagement', 'Executive Presentations', 'Technical-to-Non-Technical Communication', 'Content Creation', 'Workshop Facilitation', 'Cross-functional Coordination', 'Pre-sales', 'Architecture Proposing'],
  },
  {
    icon: '🎓',
    title: 'Academic & Research',
    color: 'pill-navy',
    skills: ['University Teaching', 'Curriculum Design', 'Competency Mapping', 'Academic Research', 'AI/ML Course Development', 'Student Mentoring', 'Research Supervision', 'Technical Authoring'],
  },
]

useHead({ title: 'Skills — Esraa Tarek Sadek' })
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

.skills-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.skill-group { padding: 2rem; }

.skill-group-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.skill-icon { font-size: 1.5rem; }

.skill-group-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--white);
}

.skills-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-pill {
  padding: 0.35rem 0.875rem;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  transition: var(--transition);
  cursor: default;
}

.skill-pill:hover { transform: translateY(-2px); }

.pill-cyan {
  background: rgba(6, 182, 212, 0.1);
  color: var(--cyan-300);
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.pill-cyan:hover { background: rgba(6, 182, 212, 0.18); }

.pill-blue {
  background: rgba(14, 165, 233, 0.1);
  color: var(--blue-300);
  border: 1px solid rgba(14, 165, 233, 0.2);
}

.pill-blue:hover { background: rgba(14, 165, 233, 0.18); }

.pill-navy {
  background: var(--navy-700);
  color: var(--white-80);
  border: 1px solid var(--border);
}

.pill-navy:hover { border-color: var(--border-glow); color: var(--white); }

@media (max-width: 768px) {
  .skills-layout { grid-template-columns: 1fr; }
}
</style>
