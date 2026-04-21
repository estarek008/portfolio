<template>
  <div>
    <section class="page-hero">
      <div class="grid-bg" />
      <div class="container">
        <span class="section-label">Thoughts & Insights</span>
        <h1 class="page-title">Blog</h1>
        <p class="page-desc">Articles on Generative AI, LLMs, enterprise AI strategy, and lessons from building real-world AI systems.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="filters-bar">
          <div class="search-input-wrap">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="search" type="text" class="form-input" placeholder="Search posts..." />
          </div>
        </div>

        <div v-if="pending" class="loading-spinner"><div class="spinner" /></div>

        <div v-else-if="posts.length === 0" class="empty-blog">
          <div class="empty-icon">✍️</div>
          <h3>Coming Soon</h3>
          <p>Blog posts on AI, GenAI, and enterprise AI strategy are on the way. Check back soon!</p>
        </div>

        <div v-else class="blog-grid">
          <NuxtLink v-for="post in filtered" :key="post.id" :to="`/blog/${post.slug}`" class="blog-card card">
            <div class="blog-meta">
              <span class="blog-date">{{ formatDate(post.created_at) }}</span>
              <div class="blog-tags flex flex-wrap gap-2">
                <span v-for="tag in (post.tags || '').split(',').filter(Boolean).slice(0, 2)" :key="tag" class="badge badge-cyan">{{ tag.trim() }}</span>
              </div>
            </div>
            <h3 class="blog-title">{{ post.title }}</h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <span class="read-more">Read article →</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const search = ref('')
const { data, pending } = await useFetch(`${config.public.apiBase}/api/blog`)
const posts = computed(() => (data.value as any)?.data || [])
const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return posts.value.filter((p: any) => !q || p.title.toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q))
})
const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
useHead({ title: 'Blog — Esraa Tarek Sadek' })
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

.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.blog-card {
  text-decoration: none;
  display: block;
  padding: 2rem;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.blog-date {
  font-size: 0.78rem;
  color: var(--muted-light);
  font-family: var(--font-display);
  font-weight: 500;
}

.blog-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--white);
  line-height: 1.4;
  margin-bottom: 0.75rem;
  transition: var(--transition);
}

.blog-card:hover .blog-title { color: var(--cyan-300); }

.blog-excerpt {
  font-size: 0.875rem;
  color: var(--muted-light);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.read-more {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--cyan-400);
  transition: var(--transition);
}

.blog-card:hover .read-more { color: var(--cyan-300); letter-spacing: 0.02em; }

.empty-blog {
  text-align: center;
  padding: 5rem 2rem;
}

.empty-icon { font-size: 3rem; margin-bottom: 1rem; }

.empty-blog h3 {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: 0.75rem;
}

.empty-blog p { color: var(--muted-light); max-width: 400px; margin: 0 auto; }

@media (max-width: 768px) {
  .blog-grid { grid-template-columns: 1fr; }
}
</style>
