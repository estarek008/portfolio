<template>
  <div>
    <div v-if="pending" class="loading-spinner" style="margin-top:8rem"><div class="spinner" /></div>
    <div v-else-if="!post" class="not-found">
      <div class="container" style="padding-top:8rem;text-align:center">
        <h1 style="color:var(--white)">Post not found</h1>
        <NuxtLink to="/blog" class="btn btn-outline" style="margin-top:1.5rem;display:inline-flex">← Back to Blog</NuxtLink>
      </div>
    </div>
    <div v-else>
      <section class="post-hero">
        <div class="grid-bg" />
        <div class="container post-hero-inner">
          <NuxtLink to="/blog" class="back-link">← Blog</NuxtLink>
          <div class="post-meta flex items-center gap-3 flex-wrap">
            <span class="post-date">{{ formatDate(post.created_at) }}</span>
            <span v-for="tag in (post.tags || '').split(',').filter(Boolean)" :key="tag" class="badge badge-cyan">{{ tag.trim() }}</span>
          </div>
          <h1 class="post-title">{{ post.title }}</h1>
          <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>
        </div>
      </section>

      <section class="section post-body-section">
        <div class="container post-layout">
          <article class="post-content" v-html="renderedContent" />
          <aside class="post-sidebar">
            <div class="card sidebar-card">
              <h3 class="sidebar-title">About the Author</h3>
              <p class="sidebar-name">Esraa Tarek Sadek</p>
              <p class="sidebar-role">AI & Analytics Division Manager</p>
              <p class="sidebar-bio">9+ years building and leading enterprise AI systems across the MENA region.</p>
              <div class="sidebar-links">
                <a href="https://www.linkedin.com/in/esraa-tarek-ba538673" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:0.8rem;padding:0.5rem 1rem">LinkedIn</a>
                <a href="https://scholar.google.com/citations?user=LmnJVdsAAAAJ" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:0.8rem;padding:0.5rem 1rem">Scholar</a>
              </div>
            </div>
            <NuxtLink to="/contact" class="card sidebar-card cta-card" style="text-decoration:none;display:block">
              <p class="cta-text">Have a question or project idea?</p>
              <span class="btn btn-primary" style="margin-top:1rem;display:inline-flex">Get in touch →</span>
            </NuxtLink>
          </aside>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()

const { data, pending } = await useFetch(`${config.public.apiBase}/api/blog/${route.params.slug}`)
const post = computed(() => (data.value as any)?.data)

const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  // Simple markdown-like rendering
  return post.value.content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (line) => line.startsWith('<') ? line : `<p>${line}</p>`)
})

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

useHead(() => ({ title: post.value ? `${post.value.title} — Esraa Tarek Sadek` : 'Blog — Esraa Tarek Sadek' }))
</script>

<style scoped>
.post-hero {
  padding: 8rem 0 4rem;
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
}

.back-link {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--muted-light);
  margin-bottom: 1.5rem;
  transition: var(--transition);
}
.back-link:hover { color: var(--cyan-300); }

.post-meta { margin-bottom: 1rem; }
.post-date {
  font-size: 0.8rem;
  color: var(--muted-light);
  font-family: var(--font-display);
  font-weight: 500;
}

.post-title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 800;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.15;
}

.post-excerpt {
  font-size: 1.05rem;
  color: var(--white-80);
  max-width: 680px;
  line-height: 1.75;
}

.post-body-section { padding-top: 3rem; }

.post-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3.5rem;
  align-items: start;
}

.post-content {
  color: var(--white-80);
  line-height: 1.85;
  font-size: 1rem;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3) {
  color: var(--white);
  margin: 2rem 0 1rem;
  font-family: var(--font-display);
}

.post-content :deep(p) { margin-bottom: 1.25rem; }

.post-content :deep(strong) { color: var(--white); font-weight: 700; }

.post-content :deep(code) {
  background: var(--navy-800);
  border: 1px solid var(--border);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875em;
  color: var(--cyan-300);
}

.post-content :deep(ul) {
  list-style: none;
  margin: 1rem 0 1.25rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.post-content :deep(li) {
  padding-left: 1.25rem;
  position: relative;
  color: var(--white-80);
}

.post-content :deep(li)::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--cyan-400);
  font-weight: 700;
}

.sidebar-card { padding: 1.5rem; margin-bottom: 1.25rem; }
.sidebar-title { font-size: 0.85rem; font-weight: 700; color: var(--white); margin-bottom: 0.875rem; text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-display); }
.sidebar-name { font-size: 1rem; font-weight: 700; color: var(--white); }
.sidebar-role { font-size: 0.8rem; color: var(--cyan-400); margin: 0.2rem 0 0.75rem; }
.sidebar-bio { font-size: 0.82rem; color: var(--muted-light); line-height: 1.6; margin-bottom: 1rem; }
.sidebar-links { display: flex; gap: 0.5rem; }

.cta-card { cursor: pointer; }
.cta-text { font-size: 0.9rem; color: var(--white-80); line-height: 1.5; }

@media (max-width: 900px) {
  .post-layout { grid-template-columns: 1fr; }
  .post-sidebar { display: none; }
}
</style>
