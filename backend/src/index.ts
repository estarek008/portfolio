import { Hono } from 'hono'
import { cors } from 'hono/cors'

export type Bindings = {
  DB: D1Database
  KV: KVNamespace
  BUCKET: R2Bucket
  ADMIN_SECRET: string
  FRONTEND_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS
app.use('*', async (c, next) => {
  const corsMiddleware = cors({
    origin: c.env.FRONTEND_URL || '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
  return corsMiddleware(c, next)
})

// Health check
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

// ─── Certificates ─────────────────────────────────────────────────────────────
app.get('/api/certificates', async (c) => {
  const { category, search } = c.req.query()
  let query = 'SELECT * FROM certificates WHERE 1=1'
  const params: string[] = []
  if (category && category !== 'all') {
    query += ' AND category = ?'
    params.push(category)
  }
  if (search) {
    query += ' AND (title LIKE ? OR provider LIKE ? OR skills LIKE ?)'
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }
  query += ' ORDER BY completion_date DESC, id DESC'
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ data: results })
})

app.get('/api/certificates/:id', async (c) => {
  const id = c.req.param('id')
  const cert = await c.env.DB.prepare('SELECT * FROM certificates WHERE id = ?').bind(id).first()
  if (!cert) return c.json({ error: 'Not found' }, 404)
  return c.json({ data: cert })
})

app.post('/api/certificates', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const body = await c.req.json()
  const { title, provider, category, completion_date, description, skills, verify_link } = body
  if (!title || !provider || !category) return c.json({ error: 'title, provider, category required' }, 400)
  const result = await c.env.DB.prepare(
    'INSERT INTO certificates (title, provider, category, completion_date, description, skills, verify_link) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(title, provider, category, completion_date || null, description || null, skills || null, verify_link || null).run()
  return c.json({ data: { id: result.meta.last_row_id, ...body } }, 201)
})

app.put('/api/certificates/:id', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const id = c.req.param('id')
  const body = await c.req.json()
  const { title, provider, category, completion_date, description, skills, verify_link } = body
  await c.env.DB.prepare(
    'UPDATE certificates SET title=?, provider=?, category=?, completion_date=?, description=?, skills=?, verify_link=? WHERE id=?'
  ).bind(title, provider, category, completion_date || null, description || null, skills || null, verify_link || null, id).run()
  return c.json({ data: { id, ...body } })
})

app.delete('/api/certificates/:id', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM certificates WHERE id = ?').bind(id).run()
  return c.json({ message: 'Deleted' })
})

// ─── Projects ─────────────────────────────────────────────────────────────────
app.get('/api/projects', async (c) => {
  const { category, search, featured } = c.req.query()
  let query = 'SELECT * FROM projects WHERE 1=1'
  const params: (string | number)[] = []
  if (category && category !== 'all') {
    query += ' AND category = ?'
    params.push(category)
  }
  if (featured === 'true') {
    query += ' AND featured = 1'
  }
  if (search) {
    query += ' AND (title LIKE ? OR description LIKE ? OR tools LIKE ?)'
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }
  query += ' ORDER BY featured DESC, created_at DESC'
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ data: results })
})

app.get('/api/projects/:id', async (c) => {
  const id = c.req.param('id')
  const project = await c.env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first()
  if (!project) return c.json({ error: 'Not found' }, 404)
  return c.json({ data: project })
})

app.post('/api/projects', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const body = await c.req.json()
  const { title, description, tools, demo_link, github_link, status, category, featured } = body
  if (!title || !description || !tools) return c.json({ error: 'title, description, tools required' }, 400)
  const result = await c.env.DB.prepare(
    'INSERT INTO projects (title, description, tools, demo_link, github_link, status, category, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(title, description, tools, demo_link || null, github_link || null, status || 'Completed', category || null, featured ? 1 : 0).run()
  return c.json({ data: { id: result.meta.last_row_id, ...body } }, 201)
})

app.put('/api/projects/:id', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const id = c.req.param('id')
  const body = await c.req.json()
  const { title, description, tools, demo_link, github_link, status, category, featured } = body
  await c.env.DB.prepare(
    'UPDATE projects SET title=?, description=?, tools=?, demo_link=?, github_link=?, status=?, category=?, featured=? WHERE id=?'
  ).bind(title, description, tools, demo_link || null, github_link || null, status || 'Completed', category || null, featured ? 1 : 0, id).run()
  return c.json({ data: { id, ...body } })
})

app.delete('/api/projects/:id', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(id).run()
  return c.json({ message: 'Deleted' })
})

// ─── Blog ─────────────────────────────────────────────────────────────────────
app.get('/api/blog', async (c) => {
  const { search, tag } = c.req.query()
  let query = 'SELECT id, title, slug, excerpt, tags, created_at FROM blog_posts WHERE published = 1'
  const params: string[] = []
  if (search) {
    query += ' AND (title LIKE ? OR excerpt LIKE ?)'
    params.push(`%${search}%`, `%${search}%`)
  }
  if (tag) {
    query += ' AND tags LIKE ?'
    params.push(`%${tag}%`)
  }
  query += ' ORDER BY created_at DESC'
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ data: results })
})

app.get('/api/blog/:slug', async (c) => {
  const slug = c.req.param('slug')
  const post = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE slug = ? AND published = 1').bind(slug).first()
  if (!post) return c.json({ error: 'Not found' }, 404)
  return c.json({ data: post })
})

app.post('/api/blog', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const body = await c.req.json()
  const { title, slug, excerpt, content, tags, published } = body
  if (!title || !slug || !content) return c.json({ error: 'title, slug, content required' }, 400)
  const result = await c.env.DB.prepare(
    'INSERT INTO blog_posts (title, slug, excerpt, content, tags, published) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(title, slug, excerpt || null, content, tags || null, published ? 1 : 0).run()
  return c.json({ data: { id: result.meta.last_row_id, ...body } }, 201)
})

app.put('/api/blog/:id', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const id = c.req.param('id')
  const body = await c.req.json()
  const { title, slug, excerpt, content, tags, published } = body
  await c.env.DB.prepare(
    'UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, tags=?, published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?'
  ).bind(title, slug, excerpt || null, content, tags || null, published ? 1 : 0, id).run()
  return c.json({ data: { id, ...body } })
})

app.delete('/api/blog/:id', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run()
  return c.json({ message: 'Deleted' })
})

// ─── Publications ─────────────────────────────────────────────────────────────
app.get('/api/publications', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM publications ORDER BY year DESC, citations DESC').all()
  return c.json({ data: results })
})

// ─── Contact ──────────────────────────────────────────────────────────────────
app.post('/api/contact', async (c) => {
  const body = await c.req.json()
  const { name, email, subject, message } = body
  if (!name || !email || !message) return c.json({ error: 'name, email, message required' }, 400)
  await c.env.DB.prepare(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)'
  ).bind(name, email, subject || null, message).run()
  return c.json({ message: 'Message received. Thank you!' }, 201)
})

// ─── Admin: contact messages ──────────────────────────────────────────────────
app.get('/api/admin/messages', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const { results } = await c.env.DB.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all()
  return c.json({ data: results })
})

app.put('/api/admin/messages/:id/read', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const id = c.req.param('id')
  await c.env.DB.prepare('UPDATE contact_messages SET read = 1 WHERE id = ?').bind(id).run()
  return c.json({ message: 'Marked as read' })
})

// ─── Admin: stats ─────────────────────────────────────────────────────────────
app.get('/api/admin/stats', async (c) => {
  const auth = c.req.header('Authorization')
  if (auth !== `Bearer ${c.env.ADMIN_SECRET}`) return c.json({ error: 'Unauthorized' }, 401)
  const [certs, projects, posts, messages] = await Promise.all([
    c.env.DB.prepare('SELECT COUNT(*) as count FROM certificates').first<{ count: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM projects').first<{ count: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM blog_posts WHERE published = 1').first<{ count: number }>(),
    c.env.DB.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE read = 0').first<{ count: number }>(),
  ])
  return c.json({
    data: {
      certificates: certs?.count ?? 0,
      projects: projects?.count ?? 0,
      blog_posts: posts?.count ?? 0,
      unread_messages: messages?.count ?? 0,
    }
  })
})

export default app
