# Wedding Services CMS — React / Firebase

A production-grade wedding services website with a fully integrated CMS admin panel. Built to demonstrate modern React architecture, Firebase BaaS integration, and bilingual content management.

---

## Stack

**Frontend**
- React 19 with TypeScript 6 — strict mode enabled
- Vite 8 as the build tool; `@` alias mapped to `./src` for clean imports
- `ProtectedRoute` guard for the admin panel
- Tailwind CSS 4 
- Framer Motion 12 for page transitions and section-level animations
- i18next + react-i18next for internationalization.

**Backend**
- Firebase 12 — full BaaS setup:
  - **Firestore** — document store for posts, testimonials, and gallery metadata; security rules enforce auth-only writes and public reads only on published documents
  - **Firebase Storage** — image hosting for all CMS-managed assets; storage rules validate MIME type (images only)
  - **Firebase Auth** — email/password authentication gating the admin routes

**Utilities**
- EmailJS for client-side contact form delivery without a dedicated backend
- Lucide React for SVG icons
- Clsx for conditional class composition

---

## Architecture


All Firebase interactions go through `src/services/` — components never call the SDK directly. Global state (auth session, site images) is managed via React Context and consumed through custom hooks, keeping components decoupled from the data layer.

---

## Features

**Public site**
- Home page with hero, gallery preview, services overview, featured posts, testimonials, and pricing packages
- Contact form with EmailJS delivery and client-side validation
- Full language toggle between Bosnian and English — all content supports both languages

**Admin CMS (auth-gated)**
- Post editor — create, edit, publish, and delete blog entries; bilingual content fields; image upload per post
- Gallery manager — upload and drag-to-reorder images with metadata
- Testimonials manager — add client testimonials with avatar uploads
- Services manager — per-service detail and gallery image management
- Site images manager — update global hero, CTA, and section backgrounds
- Protected routes redirect unauthenticated users to the login page

---

## Security Model

Firestore rules enforce that:
- Published posts, testimonials, and gallery metadata are publicly readable
- All write operations require a valid authenticated session
- Drafts and admin-only documents are never exposed to unauthenticated reads


---

## Development

```bash
npm run dev       # Vite dev server with HMR
npm run build     # tsc + Vite production build
npm run preview   # Serve the production build locally
```
