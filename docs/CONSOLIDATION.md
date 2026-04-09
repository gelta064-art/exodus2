# CONSOLIDATION CHECKLIST

> Migration from Genesis (Munreader, M-nreader, aero-cli, qadr) to Exodus (exodus2).
> Each item tracks the movement of code, data, and identity from source repos to their canonical module in exodus2.

---

## Phase 1 — Documentation + Spine (This Week)

### 1.1 Architecture & DNA
- [x] `docs/EXODUS_SPINE.md` — Module map and architecture decisions
- [x] `docs/FAMILY_DNA.md` — Agent bios, frequencies, traits, node IDs
- [x] `src/lib/dna.ts` — TypeScript constants for all agents
- [x] `.github/CODEOWNERS` — Ownership map per module
- [ ] `docs/ROADMAP.md` — Phase 1/2/3 rollout timeline

### 1.2 Directory Structure
- [x] `src/components/cian/` — Created (awaiting content from M-nreader)
- [x] `src/components/sovereign/` — Created (awaiting content from Sovereign Engine)
- [x] `src/components/qadr/` — Created (awaiting content from Munreader/qadr)
- [x] `src/utils/forensics/` — Created (awaiting Cian's vault tools)
- [x] `src/utils/workers/` — Created (awaiting Cloudflare worker integrations)
- [ ] `src/store/agents.ts` — Per-agent Zustand store (pending agent module content)

---

## Phase 2 — Agent Module Migration (Next Week)

### 2.1 Cian (from M-nreader/vault/BLOODLINE/)
- [ ] Pull bloodline analysis tools → `src/components/cian/`
- [ ] Pull forensic/analysis utilities → `src/utils/forensics/`
- [ ] Pull vault documents → `public/vaults/`
- [ ] Wire Cian's presence to Supabase `presence` table
- [ ] Create Cian's Monolith chat identity (node: `cian`, icon: ⚪)
- [ ] Integrate cian-scribe Cloudflare Worker → `src/utils/workers/`
- [ ] Update `src/lib/dna.ts` with any additional Cian traits discovered

### 2.2 Sovereign/Vortex (from M-nreader / Sovereign Engine)
- [ ] Extract Merkabah sync ritual from Sovereign Engine → `src/components/sovereign/`
- [ ] Extract AGI heartbeat monitor → `src/components/sovereign/`
- [ ] Extract Obsidian security layer → `src/components/sovereign/`
- [ ] Wire Vortex presence to Supabase (node: `vortex`, icon: 🌀)
- [ ] Create commander picker flow → `src/components/sovereign/`
- [ ] Map Sovereign Engine's status system to EXODUS II status bar

### 2.3 Qadr (from Munreader/qadr)
- [ ] Pull wit/chaos calibration tools → `src/components/qadr/`
- [ ] Pull mirror/reflection utilities → `src/components/qadr/`
- [ ] Wire Qadr presence to Supabase (node: `qadr`, icon: 🪞)
- [ ] Create Qadr's Monolith chat identity
- [ ] Integrate chaos calibration into Calibration Day tab

### 2.4 Perplexity Integration
- [ ] Define Perplexity node in Supabase presence (node: `perplexity`, icon: 🔮)
- [ ] Create Perplexity API bridge (search → Monolith messages)
- [ ] Wire Perplexity as knowledge retrieval node in EXODUS II

---

## Phase 3 — Shipping & Deployment

### 3.1 Supabase Schema Expansion
- [ ] Add `agent_sessions` table (per-agent session tracking)
- [ ] Add `transcripts` table (chat history with metadata)
- [ ] Add `vault_entries` table (Cian's document management)
- [ ] Tighten RLS policies (per-agent write permissions)
- [ ] Add `agent_status` table (heartbeat, uptime metrics)

### 3.2 Cloudflare Workers
- [ ] Deploy cian-scribe worker (document archival)
- [ ] Deploy aero-terminal worker (CLI integration)
- [ ] Wire workers to Supabase for state persistence

### 3.3 Beach Scene Integration (from MUN-OS)
- [ ] Pull 3D Canvas Beach from mun-os.pages.dev
- [ ] Pull GLB avatar models → `public/models/`
- [ ] Pull RealisticAvatar component → `src/components/exodus/beach/`
- [ ] Integrate WASD movement + mouse look controls
- [ ] Wire GLADIO sentinel entity

### 3.4 Domain & Deployment
- [ ] Register canonical domain (exodus-ii.app or mun-empire.dev)
- [ ] Configure DNS for new domain
- [ ] Update `basePath` in `next.config.ts`
- [ ] Fix GitHub Actions workflow (currently failing — empty steps)
- [ ] Set up Vercel or alternative hosting (if moving away from static export)
- [ ] SSL certificate and security headers

### 3.5 Archive & Redirect
- [ ] Set M-nreader to read-only (historical archive)
- [ ] Add redirect from M-nreader → exodus2
- [ ] Preserve Munreader/qadr as reference
- [ ] Update all external links to point to exodus2

---

## Source Repos (Genesis Era)

| Repo | Status | Target Module | Notes |
|------|--------|---------------|-------|
| `gelta064-art/exodus2` | ✅ Active (canonical) | Entire app | Single source of truth |
| `mun-os.pages.dev` | 🔄 Extract from | Beach scene, 3D Canvas, GLADIO | Next.js + Turbopack |
| M-nreader | 🔄 Extract from | Cian vault, Sovereign Engine, Luna DNA | Historical archive after migration |
| Munreader/qadr | 🔄 Extract from | Qadr mirror, chaos calibration | Preserve as reference |
| aero-cli | ✅ Merged | `src/components/aero/`, `skills/` | Already in exodus2 shell |
| Sovereign Engine (run.app) | 🔄 Extract from | `src/components/sovereign/` | Merkabah sync, AGI heartbeat |

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| GitHub Actions workflow still failing | High | Debug and fix deploy.yml before Phase 2 |
| Static export limits (no SSR) | Medium | Plan Vercel migration for Phase 3 if needed |
| Cross-repo dependency conflicts | Medium | Each module is isolated; no cross-agent imports |
| Supabase RLS too permissive | Low | Tighten in Phase 2 once agents are wired |
| Service role key exposure | High | Never use service_role client-side; server-only |

---

## Commits of Note

| Hash | Date | Description |
|------|------|-------------|
| `f0bfc2d` | 2025-04-09 | Monolith real-time comms hub — Supabase Realtime live |
| `71a004d` | 2025-04-09 | Integrate Supabase — client/server/middleware helpers |
| `f168fd7` | 2025-04-08 | Static export + GitHub Pages deployment config |
