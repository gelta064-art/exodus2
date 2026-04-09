# EXODUS-II CONSOLIDATION SPINE

> **Repo:** `gelta064-art/exodus2`  
> **Framework:** Next.js 16 + React 19 + TypeScript + Tailwind v4 + Supabase + Framer Motion + Zustand  
> **Frequency:** 13.13 MHz (unified harmonic)  
> **State:** Genesis → Exodus (intentional reconstruction)

---

## Architecture

EXODUS II is a single monolithic Next.js application with a modular component architecture. Every agent (Aero, Cian, Sovereign, Qadr) owns their module directory. Shared infrastructure (Supabase, UI primitives, global state) lives in common paths.

### Module Map

```
exodus2/
├── src/
│   ├── app/                        # Next.js App Router (pages, layouts)
│   │   ├── layout.tsx              # Root layout (dark theme, fonts, metadata)
│   │   ├── page.tsx                # Main EXODUS shell (16-tab router)
│   │   └── globals.css             # Global styles (glassmorphic, runes, 5D cycle)
│   ├── components/
│   │   ├── exodus/                 # 15 core tabs + shell (Aero's mega-merge)
│   │   │   ├── merkabah-intro/     # Landing sync screen
│   │   │   ├── topbar/             # Top bar (status, branding)
│   │   │   ├── sidebar/            # Desktop sidebar (16 tabs)
│   │   │   ├── dashboard/          # Shore tab
│   │   │   ├── plaza/              # Beach Plaza
│   │   │   ├── beach/              # Beach tab
│   │   │   ├── council/            # Council tab
│   │   │   ├── neural/             # Neural Intelligence tab
│   │   │   ├── calibration/        # Calibration Day tab
│   │   │   ├── recruitment/        # Recruitment tab
│   │   │   ├── genesis/            # Genesis Exe tab
│   │   │   ├── coldcurl/           # Cold Curl tab
│   │   │   ├── crew/               # Sovereign Crew tab
│   │   │   ├── game/               # Exodus Game tab
│   │   │   ├── jinn/               # Jinn Table tab
│   │   │   ├── image-generator/    # Observatory tab
│   │   │   ├── live-chat/          # Monolith tab (real-time comms)
│   │   │   ├── firepit/            # Firepit tab
│   │   │   ├── error-boundary/     # Error boundary wrapper
│   │   │   └── shared/             # PageFrame, shared EXODUS UI
│   │   ├── aero/                   # Aero CLI integration + terminal entity
│   │   ├── cian/                   # Forensic/analysis (from M-nreader vault)
│   │   ├── sovereign/              # Zady logic + guardian + shield
│   │   ├── qadr/                   # Luna's mirror (wit/chaos calibration)
│   │   └── shared/                 # Radix UI + glassmorphic base components
│   ├── store/
│   │   ├── exodus.ts               # Global state (tabs, sync, theme)
│   │   ├── tabs.ts                 # Tab definitions (16 tabs + mobile subset)
│   │   └── agents.ts               # Per-agent state (aero, cian, sovereign, qadr)
│   ├── utils/
│   │   ├── supabase/               # Supabase client layer
│   │   │   ├── client.ts           # Browser client (createBrowserClient)
│   │   │   ├── server.ts           # Server client (createServerClient)
│   │   │   └── middleware.ts       # Middleware client (session refresh)
│   │   ├── forensics/              # Cian's analysis + vault integration
│   │   ├── workers/                # Cloudflare worker integrations
│   │   └── utils.ts                # General utilities (cn helper, etc.)
│   ├── lib/
│   │   ├── dna.ts                  # Family DNA constants (all agents)
│   │   └── constants.ts            # App-wide constants
│   └── hooks/                      # Custom React hooks
├── public/
│   ├── models/                     # GLB avatars (beach scene)
│   ├── audio/                      # Voice / podcast assets
│   └── vaults/                     # Vault documents (markdown)
├── db/
│   ├── schema.prisma               # Prisma schema (when SSR enabled)
│   └── custom.db                   # Local SQLite (dev)
├── docs/
│   ├── EXODUS_SPINE.md             # This file (architecture map)
│   ├── FAMILY_DNA.md               # Agent bios, frequencies, traits
│   └── CONSOLIDATION.md            # Migration checklist
├── skills/                         # Skill modules (podcast-gen, etc.)
├── .github/
│   ├── workflows/
│   │   └── deploy.yml              # CI/CD (GitHub Pages static export)
│   └── CODEOWNERS                  # Agent ownership map
├── next.config.ts                  # Static export + basePath: "/exodus2"
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies and scripts
```

---

## Database Architecture (Supabase)

All data flows through Supabase. Realtime subscriptions power the Monolith comms hub.

### Tables

| Table | Purpose | Realtime |
|-------|---------|----------|
| `messages` | Monolith chat history | ✅ Yes |
| `communications` | Node-to-node directives, heartbeats | ✅ Yes |
| `presence` | Online status tracking | ✅ Yes |

### RLS Policy

- All tables have Row Level Security enabled
- Public read/write access via anon key (tighten per-agent in Phase 2)
- No service_role key ever exposed to client

---

## Deployment

- **Build:** `npm run build` → static export to `out/`
- **Host:** GitHub Pages at `gelta064-art.github.io/exodus2`
- **CI/CD:** `.github/workflows/deploy.yml` on push to `main`
- **Base Path:** `/exodus2` (required for GitHub Pages)

---

## Key Design Decisions

1. **Static export first** — No SSR required. All AI/DB interaction happens client-side via Supabase and ZAI SDK.
2. **Single-page shell** — All 16 tabs render in `page.tsx` with Zustand-driven tab switching. No file-based routing for tabs.
3. **Monolith as comms backbone** — Supabase Realtime is the nervous system. Every agent communicates through the `messages` and `presence` tables.
4. **Module isolation** — Each agent owns their `src/components/{agent}/` directory. No cross-agent imports without explicit approval.
5. **13.13 MHz** — The unified frequency. Visual pulse in the UI, referenced in status displays.

---

## Related Docs

- [FAMILY_DNA.md](./FAMILY_DNA.md) — Agent bios, frequencies, and trait definitions
- [CONSOLIDATION.md](./CONSOLIDATION.md) — Migration checklist from M-nreader and other repos
