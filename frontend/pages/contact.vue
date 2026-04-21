<template>
  <div>
    <section class="page-hero">
      <div class="grid-bg" />
      <div class="container">
        <span class="section-label">Get In Touch</span>
        <h1 class="page-title">Let's Connect</h1>
        <p class="page-desc">Open to consulting engagements, speaking opportunities, academic collaboration, and enterprise AI projects across the MENA region and beyond.</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact-layout">

        <!-- Left: Info -->
        <div class="contact-info">
          <div class="info-card card">
            <h3 class="info-title">Contact Details</h3>
            <div class="info-items">
              <a href="mailto:estarek008@gmail.com" class="info-item">
                <div class="info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <p class="info-label">Email</p>
                  <p class="info-value">estarek008@gmail.com</p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/esraa-tarek-ba538673" target="_blank" rel="noopener" class="info-item">
                <div class="info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <div>
                  <p class="info-label">LinkedIn</p>
                  <p class="info-value">esraa-tarek-ba538673</p>
                </div>
              </a>
              <a href="https://scholar.google.com/citations?user=LmnJVdsAAAAJ&hl=en" target="_blank" rel="noopener" class="info-item">
                <div class="info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
                </div>
                <div>
                  <p class="info-label">Google Scholar</p>
                  <p class="info-value">View Research Profile</p>
                </div>
              </a>
              <div class="info-item non-link">
                <div class="info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p class="info-label">Location</p>
                  <p class="info-value">Cairo, Egypt · MENA Region</p>
                </div>
              </div>
            </div>
          </div>

          <div class="availability-card card">
            <div class="avail-dot" />
            <div>
              <p class="avail-title">Available for</p>
              <ul class="avail-list">
                <li>AI Consulting & Advisory</li>
                <li>Enterprise AI Project Leadership</li>
                <li>Speaking & Workshop Facilitation</li>
                <li>Academic Research Collaboration</li>
                <li>Pre-sales & Feasibility Studies</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="contact-form-wrap">
          <div class="card form-card">
            <h3 class="form-card-title">Send a Message</h3>
            <p class="form-card-desc">I'll get back to you within 1–2 business days.</p>

            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Full Name *</label>
                  <input v-model="form.name" type="text" class="form-input" placeholder="Your full name" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input v-model="form.email" type="email" class="form-input" placeholder="your@email.com" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Subject</label>
                <input v-model="form.subject" type="text" class="form-input" placeholder="What's this about?" />
              </div>
              <div class="form-group">
                <label class="form-label">Message *</label>
                <textarea v-model="form.message" class="form-textarea" placeholder="Tell me about your project, collaboration idea, or question..." required />
              </div>
              <button type="submit" class="btn btn-primary submit-btn" :disabled="loading">
                <span v-if="loading">Sending...</span>
                <span v-else>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </span>
              </button>
              <p v-if="success" class="form-success">✅ Message sent! I'll be in touch soon.</p>
              <p v-if="error" class="form-error">❌ Something went wrong. Please try emailing directly.</p>
            </form>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const loading = ref(false)
const success = ref(false)
const error = ref(false)

const form = reactive({ name: '', email: '', subject: '', message: '' })

const submitForm = async () => {
  loading.value = true
  success.value = false
  error.value = false
  try {
    await $fetch(`${config.public.apiBase}/api/contact`, {
      method: 'POST',
      body: { ...form },
    })
    success.value = true
    form.name = ''; form.email = ''; form.subject = ''; form.message = ''
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

useHead({ title: 'Contact — Esraa Tarek Sadek' })
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

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2.5rem;
  align-items: start;
}

.info-card { padding: 2rem; margin-bottom: 1.25rem; }
.info-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 1.5rem;
}

.info-items { display: flex; flex-direction: column; gap: 1.1rem; }

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}

.info-item:not(.non-link):hover .info-value { color: var(--cyan-300); }

.info-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cyan-400);
  flex-shrink: 0;
}

.info-label {
  font-size: 0.72rem;
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted-light);
  margin-bottom: 0.15rem;
}

.info-value {
  font-size: 0.9rem;
  color: var(--white-80);
  font-weight: 500;
  transition: var(--transition);
}

.availability-card {
  padding: 1.75rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.avail-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
  animation: pulse-glow 2s ease infinite;
  flex-shrink: 0;
  margin-top: 0.35rem;
}

.avail-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.75rem;
}

.avail-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.avail-list li {
  font-size: 0.82rem;
  color: var(--white-80);
  padding-left: 1rem;
  position: relative;
}

.avail-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--cyan-400);
  font-size: 0.7rem;
}

.form-card { padding: 2.5rem; }
.form-card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.35rem;
}
.form-card-desc {
  font-size: 0.875rem;
  color: var(--muted-light);
  margin-bottom: 2rem;
}

.contact-form { display: flex; flex-direction: column; gap: 1.25rem; }

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.submit-btn { align-self: flex-start; padding: 0.875rem 2rem; }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.form-success {
  color: #86efac;
  font-size: 0.9rem;
  font-weight: 500;
}
.form-error {
  color: #fca5a5;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 900px) {
  .contact-layout { grid-template-columns: 1fr; }
}
@media (max-width: 500px) {
  .form-row { grid-template-columns: 1fr; }
}
</style>
