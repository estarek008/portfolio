# 🚀 Esraa Tarek Sadek — Portfolio Website

A full-stack personal portfolio built with:
- **Frontend**: Nuxt 3 (deployed to Cloudflare Pages)
- **Backend API**: Hono (deployed to Cloudflare Workers)
- **Database**: Cloudflare D1 (SQLite at the edge)
- **KV**: Cloudflare KV (caching)
- **Storage**: Cloudflare R2 (file uploads)

---

## 📁 Project Structure

```
esraa-portfolio/
├── backend/          ← Hono API (Cloudflare Workers)
│   ├── src/index.ts  ← All API routes
│   ├── schema.sql    ← D1 database schema
│   ├── seed.sql      ← Pre-loaded data (certs, projects, pubs)
│   ├── wrangler.toml ← Cloudflare Worker config
│   └── package.json
└── frontend/         ← Nuxt 3 app (Cloudflare Pages)
    ├── pages/        ← All pages
    ├── components/   ← AppNav
    ├── layouts/      ← Default layout + footer
    ├── assets/css/   ← Global design system
    ├── nuxt.config.ts
    └── package.json
```

---

## ⚡ STEP 1 — Prerequisites

Install Node.js (v18+) and Wrangler CLI:

```bash
npm install -g wrangler
wrangler login
```

---

## ⚡ STEP 2 — Create Cloudflare Resources

### Create D1 Database
```bash
wrangler d1 create esraa-portfolio-db
# Copy the database_id from the output
```

### Create KV Namespace
```bash
wrangler kv:namespace create "PORTFOLIO_KV"
# Copy the id from the output
```

### Create R2 Bucket
```bash
wrangler r2 bucket create esraa-portfolio-files
```

---

## ⚡ STEP 3 — Configure Backend

1. Open `backend/wrangler.toml`
2. Replace the placeholders:
   ```toml
   database_id = "REPLACE_WITH_YOUR_D1_ID"    ← paste D1 id here
   id = "REPLACE_WITH_YOUR_KV_ID"              ← paste KV id here
   ADMIN_SECRET = "CHANGE_THIS_BEFORE_DEPLOY"  ← set a strong secret
   FRONTEND_URL = "https://your-pages-url.pages.dev"
   ```

---

## ⚡ STEP 4 — Deploy Backend

```bash
cd backend
npm install

# Initialize the database schema
npm run db:init:remote

# Seed with all your data (certificates, projects, publications)
npm run db:seed:remote

# Deploy the Worker
npm run deploy
```

Note the Worker URL — it will look like:
`https://esraa-portfolio-api.YOUR-SUBDOMAIN.workers.dev`

---

## ⚡ STEP 5 — Configure & Deploy Frontend

1. Open `frontend/nuxt.config.ts` and update the API base if needed, OR

2. Create a `.env` file in the frontend folder:
```env
NUXT_PUBLIC_API_BASE=https://esraa-portfolio-api.YOUR-SUBDOMAIN.workers.dev
```

3. Deploy to Cloudflare Pages:
```bash
cd frontend
npm install
npm run build

# Then deploy the output folder
wrangler pages deploy .output/public --project-name esraa-portfolio
```

Or connect your Git repository to Cloudflare Pages via the dashboard for automatic deployments.

---

## ⚡ STEP 6 — Upload Profile Photo

1. Go to your Cloudflare R2 dashboard
2. Open the `esraa-portfolio-files` bucket
3. Upload your profile photo as `profile.jpg`
4. In `frontend/pages/index.vue`, change:
   ```html
   <img v-if="false" ...>
   ```
   to:
   ```html
   <img v-if="true" src="/profile.jpg" ...>
   ```
   And serve it from `/public/profile.jpg` in the frontend, OR use an R2 public URL.

---

## 🔧 MAINTENANCE GUIDE

### Adding a New Certificate (via Admin Panel)
1. Go to `https://your-site.pages.dev/admin`
2. Enter your `ADMIN_SECRET`
3. Click **Certificates → + Add Certificate**
4. Fill in title, provider, category, date, skills, verify link
5. Click **Add Certificate** — it appears on the site immediately

### Adding a New Project
1. Admin panel → **Projects → + Add Project**
2. Fill in all fields, toggle "Feature on homepage" if needed
3. Save — appears live immediately

### Writing a Blog Post
1. Admin panel → **Blog → + New Post**
2. Write content in Markdown format
3. Toggle "Publish immediately" or leave as Draft
4. The auto-generated slug becomes the URL: `/blog/your-post-slug`

### Updating Missing Certificate Dates
1. Admin panel → **Certificates**
2. Click ✏️ next to any certificate
3. Update the date and save

### Redeploying After Code Changes

**Backend changes:**
```bash
cd backend
npm run deploy
```

**Frontend changes:**
```bash
cd frontend
npm run build
wrangler pages deploy .output/public --project-name esraa-portfolio
```

---

## 🔐 Security Notes

- Your `ADMIN_SECRET` is the password to the admin panel — keep it safe
- The admin panel is accessible at `/admin` — it's protected by the secret only
- All write/delete API endpoints require the `Authorization: Bearer <secret>` header
- The contact form submits to D1 — no external email service required (reply manually via email link in admin)

---

## 🌐 Environment Variables Summary

| Variable | Where | Description |
|----------|-------|-------------|
| `ADMIN_SECRET` | `backend/wrangler.toml` | Admin panel password |
| `FRONTEND_URL` | `backend/wrangler.toml` | CORS allowed origin |
| `NUXT_PUBLIC_API_BASE` | `frontend/.env` | Backend Worker URL |

---

## 📌 Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, featured projects, quick links |
| `/experience` | Full work history + education + achievements |
| `/certificates` | All 21+ certs — grid & timeline view with filters |
| `/projects` | Project portfolio with search & category filters |
| `/publications` | 5 research papers with citations |
| `/skills` | All skill categories in visual pill clouds |
| `/blog` | Blog listing — coming soon state until you add posts |
| `/blog/[slug]` | Individual blog post |
| `/contact` | Contact form + social links |
| `/admin` | Admin panel — manage all content |

---

Built with ❤️ for Esraa Tarek Sadek
