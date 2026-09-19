# AdsToArt — Product Plan (Monetization Infrastructure)

> This plan covers the landing page, user cabinet, and extension integration needed to support paid custom image slots. The landing + cabinet will be built as a separate project. This document is a human-readable roadmap for review and iteration.

---

## Core Concept

- **Free:** 8 built-in themes, no account required, works out of the box.
- **Paid slots:** users buy slots ($5 / $8 / $10 for 1 / 2 / 3 slots). Each slot holds one custom image set they build themselves via the cabinet.
- **Custom set:** user uploads their own photos, crops and configures them for each ad size ratio, saves the set. The extension then uses it instead of (or alongside) built-in themes.

---

## Key Decisions

| Topic | Decision |
|---|---|
| Authentication | Google OAuth only — no email/password |
| Images per set | Minimum 8 (one per ratio), maximum 32 (four variants per ratio) |
| Pricing on landing | A section on the main landing page, not a separate page |
| Set sync in extension | Manual — user clicks "Sync Sets" button in popup to pull latest from server |
| Set state during editing | Extension keeps showing the last saved version until user syncs |

---

## Authentication: Google OAuth

Since this is a Chrome extension, every user already has a Google account. Google OAuth is the natural choice:

**In the extension:**
- `chrome.identity.getAuthToken({ interactive: true })` — gets a Google token in one call, no UI needed
- Token is sent to the backend, backend verifies it via Google API, finds or creates the user by email
- A session token is stored in `chrome.storage.local`

**On the landing / cabinet:**
- Standard "Sign in with Google" button
- Backend handles OAuth callback, issues a session cookie or JWT

**What this eliminates:**
- Email verification flow
- Password reset flow
- Registration form
- One-click onboarding for the user

---

## What Was Missing from the Initial Scope (resolved)

1. ~~**Extension ↔ backend connection**~~ → Google OAuth via `chrome.identity` + "Sync Sets" button
2. ~~**Password reset flow**~~ → eliminated by Google OAuth
3. **Image requirements per set** → 8 ratios × up to 4 variants = 8 min, 32 max per set
4. ~~**Pricing page**~~ → pricing section on the main landing page
5. **Set state during editing** → extension shows last saved version; user manually syncs

---

## Iterations

### Iteration 1 — Foundation

**Goal:** backend, Google auth, and payments exist. No cabinet UI yet.

- [ ] Choose stack (e.g. Next.js + Supabase or Node + Postgres + Stripe)
- [ ] Database schema: users, slots, sets, images, payments
- [ ] Google OAuth: backend endpoint that accepts Google token, verifies with Google API, returns session
- [ ] Stripe integration: one-time payment for 1/2/3 slots, webhook to grant slots on success
- [ ] API: auth endpoints + slot status endpoint (extension will call this)
- [ ] Landing page — main page: hero, how it works, pricing section (1/2/3 slots), CTA to sign in with Google

**Deliverable:** user can sign in with Google, pay for slots, backend knows how many slots they own.

---

### Iteration 2 — Cabinet Core

**Goal:** user can create and manage custom sets.

- [ ] Cabinet layout: sidebar navigation, auth guard (Google session)
- [ ] Dashboard: list of sets (name, status, slot number), create / edit / delete actions
- [ ] Set editor page:
  - Upload images (drag & drop)
  - Crop / adjust per ratio (8 ratios: 1:1, 4:3, 6:5, 1:3, 2:1, 10:1, 8:1, default)
  - For each ratio: up to 4 image variants (minimum 1 required to publish)
  - Save / publish set
- [ ] Personal info page: Google account display (email, avatar), connected account info
- [ ] Payments page: current slots owned, purchase more slots, purchase history

**Deliverable:** user with a slot can build a custom set and publish it.

---

### Iteration 3 — Extension Integration

**Goal:** the extension authenticates and uses the user's custom sets.

- [ ] "Sign in with Google" button in extension popup using `chrome.identity.getAuthToken()`
- [ ] On auth: send token to backend, store session token in `chrome.storage.local`
- [ ] "Sync Sets" button in popup: fetches user's published sets from API, stores in `chrome.storage.local`
- [ ] Popup UI update: custom slots appear alongside 8 default themes after sync
- [ ] Fallback logic: if set is missing or API unreachable → use selected default theme
- [ ] Sign out button in extension popup

**Deliverable:** end-to-end flow works — buy slot → build set in cabinet → sync in extension → extension uses it.

---

### Iteration 4 — Landing Expansion

**Goal:** SEO and organic traffic infrastructure.

- [ ] Blog section (static or CMS-backed, for LinkedIn/Twitter article reposts)
- [ ] Reviews page (pull from Chrome Web Store, display as testimonials)
- [ ] FAQ section or page
- [ ] Basic SEO: meta tags, Open Graph, sitemap, robots.txt
- [ ] Analytics (e.g. Plausible or GA4)

**Deliverable:** landing is content-ready for organic promotion campaigns.

---

### Iteration 5 — Polish & Growth Loop

**Goal:** reduce churn, improve conversion.

- [ ] Welcome email after first sign-in (via Google email)
- [ ] In-extension upsell nudge (e.g. "Add your own photos — from $5")
- [ ] Improve extension image sizing (fix the "small image with bars on sides" problem)
- [ ] Extension popup redesign (better UI)
- [ ] Internal admin dashboard: user count, revenue, active sets

**Deliverable:** product is ready for paid acquisition.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend + SSR | Next.js | Landing page, cabinet, server-side rendering |
| Backend logic | Next.js Server Actions | Sufficient for CRUD; no separate server needed |
| Stripe webhooks | Next.js Route Handler | External POST requests can't use Server Actions |
| ORM | Drizzle | Type-safe, database-agnostic — makes future migration easier |
| Database + file storage | Supabase | Postgres + Storage + built-in Google OAuth (no custom OAuth impl needed) |
| Payments | Stripe | One-time payments for slots |

**Future migration path:** Supabase Postgres → own Postgres + Google Cloud. Drizzle makes this straightforward since it's not tied to Supabase's client.

---

## Open Questions Before Starting

1. Storage costs: Supabase free tier allows 1GB file storage. With 32 images per set, estimate storage per user and factor into slot pricing.

---

## Future Ideas (not in scope)

- **Set marketplace** — users publish their custom sets for others to browse and install. Requires `is_public` flag on sets table. Natural next step after the core product is stable and has enough users.
