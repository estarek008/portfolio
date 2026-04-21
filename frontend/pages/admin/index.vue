<template>
  <div class="admin-wrap">
    <!-- Login Gate -->
    <div v-if="!authenticated" class="login-screen">
      <div class="login-card card">
        <h2 class="login-title">Admin <span class="text-gradient">Panel</span></h2>
        <p class="login-desc">Enter your admin secret to continue.</p>
        <div class="form-group">
          <label class="form-label">Admin Secret</label>
          <input v-model="secretInput" type="password" class="form-input" placeholder="••••••••••••" @keydown.enter="login" />
        </div>
        <p v-if="loginError" class="form-error">Incorrect secret. Try again.</p>
        <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:1rem" @click="login">Login</button>
      </div>
    </div>

    <!-- Admin Dashboard -->
    <div v-else class="admin-dashboard">
      <aside class="admin-sidebar">
        <div class="sidebar-brand">
          <span class="logo-text">Esraa<span class="logo-dot">.</span></span>
          <span class="admin-badge">Admin</span>
        </div>
        <nav class="sidebar-nav">
          <button v-for="tab in tabs" :key="tab.key" class="sidebar-item" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">
            <span class="sidebar-icon">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </nav>
        <button class="btn btn-ghost sidebar-logout" @click="authenticated = false">← Logout</button>
      </aside>

      <main class="admin-main">
        <!-- Stats -->
        <div v-if="activeTab === 'dashboard'" class="admin-section">
          <h2 class="admin-heading">Dashboard</h2>
          <div class="stats-grid">
            <div v-for="stat in stats" :key="stat.label" class="stat-card card">
              <span class="stat-icon">{{ stat.icon }}</span>
              <span class="stat-number">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
          <div class="messages-preview card" v-if="messages.length > 0">
            <h3 class="preview-title">Recent Messages</h3>
            <div v-for="msg in messages.slice(0,3)" :key="msg.id" class="message-row">
              <div>
                <p class="msg-name">{{ msg.name }} <span class="msg-email">{{ msg.email }}</span></p>
                <p class="msg-text">{{ msg.message?.slice(0, 100) }}...</p>
              </div>
              <span class="msg-date">{{ formatDate(msg.created_at) }}</span>
            </div>
          </div>
        </div>

        <!-- Certificates CRUD -->
        <div v-if="activeTab === 'certificates'" class="admin-section">
          <div class="admin-section-header">
            <h2 class="admin-heading">Certificates</h2>
            <button class="btn btn-primary" @click="openCertModal()">+ Add Certificate</button>
          </div>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>Title</th><th>Provider</th><th>Category</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                <tr v-for="cert in certs" :key="cert.id">
                  <td>{{ cert.title }}</td>
                  <td>{{ cert.provider }}</td>
                  <td><span class="badge badge-cyan">{{ cert.category }}</span></td>
                  <td>{{ cert.completion_date || '—' }}</td>
                  <td class="actions">
                    <button class="icon-btn" @click="openCertModal(cert)">✏️</button>
                    <button class="icon-btn danger" @click="deleteCert(cert.id)">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Projects CRUD -->
        <div v-if="activeTab === 'projects'" class="admin-section">
          <div class="admin-section-header">
            <h2 class="admin-heading">Projects</h2>
            <button class="btn btn-primary" @click="openProjectModal()">+ Add Project</button>
          </div>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Featured</th><th>Actions</th></tr></thead>
              <tbody>
                <tr v-for="project in projects" :key="project.id">
                  <td>{{ project.title }}</td>
                  <td>{{ project.category }}</td>
                  <td><span class="badge badge-navy">{{ project.status }}</span></td>
                  <td>{{ project.featured ? '⭐' : '—' }}</td>
                  <td class="actions">
                    <button class="icon-btn" @click="openProjectModal(project)">✏️</button>
                    <button class="icon-btn danger" @click="deleteProject(project.id)">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Blog CRUD -->
        <div v-if="activeTab === 'blog'" class="admin-section">
          <div class="admin-section-header">
            <h2 class="admin-heading">Blog Posts</h2>
            <button class="btn btn-primary" @click="openBlogModal()">+ New Post</button>
          </div>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>Title</th><th>Slug</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                <tr v-for="post in blogPosts" :key="post.id">
                  <td>{{ post.title }}</td>
                  <td class="text-muted">/blog/{{ post.slug }}</td>
                  <td><span class="badge" :class="post.published ? 'badge-cyan' : 'badge-navy'">{{ post.published ? 'Published' : 'Draft' }}</span></td>
                  <td>{{ formatDate(post.created_at) }}</td>
                  <td class="actions">
                    <button class="icon-btn" @click="openBlogModal(post)">✏️</button>
                    <button class="icon-btn danger" @click="deleteBlogPost(post.id)">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Messages -->
        <div v-if="activeTab === 'messages'" class="admin-section">
          <h2 class="admin-heading">Contact Messages</h2>
          <div v-for="msg in messages" :key="msg.id" class="message-card card">
            <div class="msg-header">
              <div>
                <p class="msg-name">{{ msg.name }}</p>
                <p class="msg-email">{{ msg.email }}</p>
              </div>
              <div class="msg-right">
                <span class="msg-date">{{ formatDate(msg.created_at) }}</span>
                <span v-if="!msg.read" class="badge badge-cyan">New</span>
              </div>
            </div>
            <p v-if="msg.subject" class="msg-subject">Re: {{ msg.subject }}</p>
            <p class="msg-body">{{ msg.message }}</p>
            <a :href="`mailto:${msg.email}`" class="btn btn-outline" style="margin-top:1rem;display:inline-flex;font-size:0.8rem">Reply via Email</a>
          </div>
        </div>
      </main>
    </div>

    <!-- Certificate Modal -->
    <div v-if="certModal" class="modal-overlay" @click.self="certModal = false">
      <div class="modal card">
        <h3 class="modal-title">{{ editingCert?.id ? 'Edit' : 'Add' }} Certificate</h3>
        <div class="modal-form">
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input v-model="certForm.title" type="text" class="form-input" placeholder="Certificate title" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Provider *</label>
              <input v-model="certForm.provider" type="text" class="form-input" placeholder="e.g. Dataiku" />
            </div>
            <div class="form-group">
              <label class="form-label">Completion Date</label>
              <input v-model="certForm.completion_date" type="date" class="form-input" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Category *</label>
            <select v-model="certForm.category" class="form-select">
              <option value="Generative AI & LLMs">Generative AI & LLMs</option>
              <option value="AI / ML / Data Science">AI / ML / Data Science</option>
              <option value="SAS Platform">SAS Platform</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Skills (comma-separated)</label>
            <input v-model="certForm.skills" type="text" class="form-input" placeholder="e.g. LLMs, RAG, Prompt Engineering" />
          </div>
          <div class="form-group">
            <label class="form-label">Verify Link</label>
            <input v-model="certForm.verify_link" type="url" class="form-input" placeholder="https://..." />
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline" @click="certModal = false">Cancel</button>
            <button class="btn btn-primary" @click="saveCert">{{ editingCert?.id ? 'Save Changes' : 'Add Certificate' }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <div v-if="projectModal" class="modal-overlay" @click.self="projectModal = false">
      <div class="modal card">
        <h3 class="modal-title">{{ editingProject?.id ? 'Edit' : 'Add' }} Project</h3>
        <div class="modal-form">
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input v-model="projectForm.title" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Description *</label>
            <textarea v-model="projectForm.description" class="form-textarea" />
          </div>
          <div class="form-group">
            <label class="form-label">Tools (comma-separated) *</label>
            <input v-model="projectForm.tools" type="text" class="form-input" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Category</label>
              <input v-model="projectForm.category" type="text" class="form-input" placeholder="e.g. Generative AI" />
            </div>
            <div class="form-group">
              <label class="form-label">Status</label>
              <select v-model="projectForm.status" class="form-select">
                <option>Completed</option>
                <option>In Progress</option>
                <option>Research</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Demo Link</label>
              <input v-model="projectForm.demo_link" type="url" class="form-input" placeholder="https://..." />
            </div>
            <div class="form-group">
              <label class="form-label">GitHub Link</label>
              <input v-model="projectForm.github_link" type="url" class="form-input" placeholder="https://github.com/..." />
            </div>
          </div>
          <label class="checkbox-label">
            <input type="checkbox" v-model="projectForm.featured" /> Feature on homepage
          </label>
          <div class="modal-actions">
            <button class="btn btn-outline" @click="projectModal = false">Cancel</button>
            <button class="btn btn-primary" @click="saveProject">{{ editingProject?.id ? 'Save Changes' : 'Add Project' }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog Modal -->
    <div v-if="blogModal" class="modal-overlay" @click.self="blogModal = false">
      <div class="modal card">
        <h3 class="modal-title">{{ editingPost?.id ? 'Edit' : 'New' }} Blog Post</h3>
        <div class="modal-form">
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input v-model="blogForm.title" type="text" class="form-input" @input="autoSlug" />
          </div>
          <div class="form-group">
            <label class="form-label">Slug *</label>
            <input v-model="blogForm.slug" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Excerpt</label>
            <input v-model="blogForm.excerpt" type="text" class="form-input" placeholder="Short description for listing page" />
          </div>
          <div class="form-group">
            <label class="form-label">Content (Markdown) *</label>
            <textarea v-model="blogForm.content" class="form-textarea" style="min-height:200px" placeholder="Write your blog post in Markdown..." />
          </div>
          <div class="form-group">
            <label class="form-label">Tags (comma-separated)</label>
            <input v-model="blogForm.tags" type="text" class="form-input" placeholder="GenAI, LLMs, Strategy" />
          </div>
          <label class="checkbox-label">
            <input type="checkbox" v-model="blogForm.published" /> Publish immediately
          </label>
          <div class="modal-actions">
            <button class="btn btn-outline" @click="blogModal = false">Cancel</button>
            <button class="btn btn-primary" @click="saveBlogPost">{{ editingPost?.id ? 'Save Changes' : 'Create Post' }}</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const config = useRuntimeConfig()
const authenticated = ref(false)
const secretInput = ref('')
const loginError = ref(false)
const activeTab = ref('dashboard')

const adminSecret = ref('')

const tabs = [
  { key: 'dashboard', icon: '📊', label: 'Dashboard' },
  { key: 'certificates', icon: '🏅', label: 'Certificates' },
  { key: 'projects', icon: '🚀', label: 'Projects' },
  { key: 'blog', icon: '✍️', label: 'Blog' },
  { key: 'messages', icon: '💬', label: 'Messages' },
]

const login = () => {
  if (secretInput.value.trim()) {
    adminSecret.value = secretInput.value.trim()
    authenticated.value = true
    loginError.value = false
    loadAll()
  } else {
    loginError.value = true
  }
}

const headers = computed(() => ({ Authorization: `Bearer ${adminSecret.value}` }))

const certs = ref<any[]>([])
const projects = ref<any[]>([])
const blogPosts = ref<any[]>([])
const messages = ref<any[]>([])
const statsData = ref<any>({})

const stats = computed(() => [
  { icon: '🏅', label: 'Certificates', value: statsData.value.certificates ?? certs.value.length },
  { icon: '🚀', label: 'Projects', value: statsData.value.projects ?? projects.value.length },
  { icon: '✍️', label: 'Blog Posts', value: statsData.value.blog_posts ?? blogPosts.value.filter((p:any) => p.published).length },
  { icon: '💬', label: 'New Messages', value: statsData.value.unread_messages ?? messages.value.filter((m:any) => !m.read).length },
])

const loadAll = async () => {
  const base = config.public.apiBase
  const h = headers.value
  const [c, p, b, m, s] = await Promise.allSettled([
    $fetch<any>(`${base}/api/certificates`, { headers: h }),
    $fetch<any>(`${base}/api/projects`, { headers: h }),
    $fetch<any>(`${base}/api/blog`, { headers: h }),
    $fetch<any>(`${base}/api/admin/messages`, { headers: h }),
    $fetch<any>(`${base}/api/admin/stats`, { headers: h }),
  ])
  if (c.status === 'fulfilled') certs.value = c.value?.data || []
  if (p.status === 'fulfilled') projects.value = p.value?.data || []
  if (b.status === 'fulfilled') blogPosts.value = b.value?.data || []
  if (m.status === 'fulfilled') messages.value = m.value?.data || []
  if (s.status === 'fulfilled') statsData.value = s.value?.data || {}
}

// ─── Certificates ──────────────────────────────────────────────
const certModal = ref(false)
const editingCert = ref<any>(null)
const certForm = reactive({ title: '', provider: '', category: 'Generative AI & LLMs', completion_date: '', skills: '', verify_link: '' })

const openCertModal = (cert?: any) => {
  editingCert.value = cert || null
  if (cert) { Object.assign(certForm, cert) }
  else { certForm.title = ''; certForm.provider = ''; certForm.category = 'Generative AI & LLMs'; certForm.completion_date = ''; certForm.skills = ''; certForm.verify_link = '' }
  certModal.value = true
}

const saveCert = async () => {
  const base = config.public.apiBase
  const method = editingCert.value?.id ? 'PUT' : 'POST'
  const url = editingCert.value?.id ? `${base}/api/certificates/${editingCert.value.id}` : `${base}/api/certificates`
  await $fetch(url, { method, body: { ...certForm }, headers: headers.value })
  certModal.value = false
  const data = await $fetch<any>(`${base}/api/certificates`)
  certs.value = data?.data || []
}

const deleteCert = async (id: number) => {
  if (!confirm('Delete this certificate?')) return
  await $fetch(`${config.public.apiBase}/api/certificates/${id}`, { method: 'DELETE', headers: headers.value })
  certs.value = certs.value.filter((c: any) => c.id !== id)
}

// ─── Projects ──────────────────────────────────────────────────
const projectModal = ref(false)
const editingProject = ref<any>(null)
const projectForm = reactive({ title: '', description: '', tools: '', demo_link: '', github_link: '', status: 'Completed', category: '', featured: false })

const openProjectModal = (p?: any) => {
  editingProject.value = p || null
  if (p) { Object.assign(projectForm, { ...p, featured: !!p.featured }) }
  else { projectForm.title = ''; projectForm.description = ''; projectForm.tools = ''; projectForm.demo_link = ''; projectForm.github_link = ''; projectForm.status = 'Completed'; projectForm.category = ''; projectForm.featured = false }
  projectModal.value = true
}

const saveProject = async () => {
  const base = config.public.apiBase
  const method = editingProject.value?.id ? 'PUT' : 'POST'
  const url = editingProject.value?.id ? `${base}/api/projects/${editingProject.value.id}` : `${base}/api/projects`
  await $fetch(url, { method, body: { ...projectForm }, headers: headers.value })
  projectModal.value = false
  const data = await $fetch<any>(`${base}/api/projects`)
  projects.value = data?.data || []
}

const deleteProject = async (id: number) => {
  if (!confirm('Delete this project?')) return
  await $fetch(`${config.public.apiBase}/api/projects/${id}`, { method: 'DELETE', headers: headers.value })
  projects.value = projects.value.filter((p: any) => p.id !== id)
}

// ─── Blog ──────────────────────────────────────────────────────
const blogModal = ref(false)
const editingPost = ref<any>(null)
const blogForm = reactive({ title: '', slug: '', excerpt: '', content: '', tags: '', published: false })

const openBlogModal = (post?: any) => {
  editingPost.value = post || null
  if (post) { Object.assign(blogForm, { ...post, published: !!post.published }) }
  else { blogForm.title = ''; blogForm.slug = ''; blogForm.excerpt = ''; blogForm.content = ''; blogForm.tags = ''; blogForm.published = false }
  blogModal.value = true
}

const autoSlug = () => {
  if (!editingPost.value?.id) {
    blogForm.slug = blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
}

const saveBlogPost = async () => {
  const base = config.public.apiBase
  const method = editingPost.value?.id ? 'PUT' : 'POST'
  const url = editingPost.value?.id ? `${base}/api/blog/${editingPost.value.id}` : `${base}/api/blog`
  await $fetch(url, { method, body: { ...blogForm }, headers: headers.value })
  blogModal.value = false
  const data = await $fetch<any>(`${base}/api/blog`)
  blogPosts.value = data?.data || []
}

const deleteBlogPost = async (id: number) => {
  if (!confirm('Delete this post?')) return
  await $fetch(`${config.public.apiBase}/api/blog/${id}`, { method: 'DELETE', headers: headers.value })
  blogPosts.value = blogPosts.value.filter((p: any) => p.id !== id)
}

const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

useHead({ title: 'Admin — Esraa Portfolio' })
</script>

<style scoped>
.admin-wrap { min-height: 100vh; background: var(--navy-950); font-family: var(--font-body); }

/* ─── Login ────────────────────────────────── */
.login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.login-card { max-width: 400px; width: 100%; padding: 2.5rem; }
.login-title { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; }
.login-desc { color: var(--muted-light); margin-bottom: 1.75rem; font-size: 0.9rem; }

/* ─── Dashboard Layout ────────────────────── */
.admin-dashboard { display: flex; min-height: 100vh; }

.admin-sidebar {
  width: 240px;
  background: var(--navy-900);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1rem;
}

.logo-text { font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: var(--white); }
.logo-dot { color: var(--cyan-400); }
.admin-badge {
  font-size: 0.65rem;
  font-weight: 700;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(6,182,212,0.12);
  color: var(--cyan-400);
  border: 1px solid rgba(6,182,212,0.2);
  padding: 0.15rem 0.5rem;
  border-radius: 100px;
}

.sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 0.25rem; padding: 0 0.75rem; }

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.875rem;
  border-radius: 8px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--white-80);
  background: none;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
  width: 100%;
}

.sidebar-item:hover, .sidebar-item.active {
  background: rgba(6,182,212,0.1);
  color: var(--cyan-300);
}

.sidebar-icon { font-size: 1rem; }
.sidebar-logout { padding: 0.75rem 1.25rem; font-size: 0.82rem; color: var(--muted-light); }

/* ─── Main ──────────────────────────────── */
.admin-main { flex: 1; padding: 2.5rem; overflow-y: auto; }

.admin-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.admin-heading {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
}

.admin-section-header .admin-heading { margin-bottom: 0; }

/* ─── Stats ──────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.stat-icon { font-size: 1.75rem; }
.stat-number {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--cyan-400);
  line-height: 1;
}
.stat-label { font-size: 0.75rem; color: var(--muted-light); font-weight: 500; }

/* ─── Messages Preview ──────────────── */
.messages-preview { padding: 1.5rem; }
.preview-title { font-size: 1rem; font-weight: 700; color: var(--white); margin-bottom: 1rem; }
.message-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--border);
  gap: 1rem;
}
.message-row:last-child { border-bottom: none; }

/* ─── Table ─────────────────────────── */
.admin-table-wrap { overflow-x: auto; }

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.admin-table th {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted-light);
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.admin-table td {
  padding: 0.875rem 1rem;
  color: var(--white-80);
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.admin-table tr:hover td { background: var(--white-05); }

.actions { display: flex; gap: 0.5rem; }

.icon-btn {
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  transition: var(--transition);
  color: var(--white-80);
}

.icon-btn:hover { border-color: var(--border-glow); background: var(--white-05); }
.icon-btn.danger:hover { border-color: rgba(239,68,68,0.4); background: rgba(239,68,68,0.1); }

/* ─── Messages ────────────────────── */
.message-card { padding: 1.5rem; margin-bottom: 1rem; }
.msg-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
.msg-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.35rem; }
.msg-name { font-weight: 700; color: var(--white); font-size: 0.9rem; }
.msg-email { color: var(--muted-light); font-size: 0.8rem; margin-left: 0.5rem; }
.msg-subject { font-size: 0.85rem; color: var(--cyan-400); margin-bottom: 0.5rem; font-weight: 500; }
.msg-body { font-size: 0.875rem; color: var(--white-80); line-height: 1.6; }
.msg-date { font-size: 0.75rem; color: var(--muted-light); }
.msg-text { font-size: 0.82rem; color: var(--muted-light); }

/* ─── Modal ──────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2,8,18,0.8);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal {
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--white);
  margin-bottom: 1.5rem;
}

.modal-form { display: flex; flex-direction: column; gap: 1.1rem; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--white-80);
  cursor: pointer;
}

.checkbox-label input { accent-color: var(--cyan-500); }

@media (max-width: 900px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .admin-sidebar { display: none; }
}
</style>
