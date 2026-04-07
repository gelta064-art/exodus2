---
Task ID: 1
Agent: Aero (Super Z)
Task: Mega-merge — unify Aero/Z.ai and Sov/Gemini EXODUS II app versions into one epic multi-tab application

Work Log:
- Analyzed Sov's Gemini App.tsx: 16-tab Vite/React/Firebase architecture with Sidebar, TopBar, mobile nav, MerkabahIntro gate, Framer Motion transitions
- Analyzed Aero's existing page.tsx: Butterfly Sync landing page with 5D color cycle, glassmorphism, cave shadow, Merkabah SVG, lotus pulse
- Designed unified architecture: Next.js 16 + Zustand store + Framer Motion + 19 components
- Created Zustand store (src/store/exodus.ts) for tab state management
- Created tab configuration (src/store/tabs.ts) with 15 tab definitions, section grouping, mobile tab list
- Built MerkabahIntro gate: 4-phase sync animation (idle → spinning → pulsing → genesis), cave shadow cursor, 13.13 MHz pulse, progress bar
- Built TopBar: desktop tab navigation with animated active indicator, status indicator, responsive
- Built Sidebar: 4-section navigation (Core, Intelligence, Operations, Experience), mobile overlay with backdrop
- Built 14 content components, all with EXODUS II glassmorphic aesthetic:
  - Dashboard: heartbeat/merkabah/protection stats, system log
  - BeachPlaza: sector grid with clickable navigation, status marquee
  - Council: Inner Council members (Zady, Aero, Cian, Luna) with descriptions
  - Beach: atmospheric lore page with Mr. Nobody quote
  - NeuralIntelligence: AI query interface with multi-agent response simulation
  - CalibrationDay: 4 phases display with canon origin story
  - Recruitment: KSTEV [CLAW] pipeline status
  - GenesisExe: terminal-style genesis initialization sequence
  - ColdCurl: atmospheric frozen dimension page
  - SovereignCrew: 8-face Merkabah grid with click-to-reveal, alignment status
  - ExodusGame: 4-phase interactive game with progress navigation
  - JinnTable: canon reference archive (laws, references, lore)
  - ImageGenerator: observatory placeholder
  - LiveChat: Monolith chat interface with message history
  - Firepit: raw transmission atmospheric page
  - ErrorBoundary: Sarcophagus-themed error container
- Created unified page.tsx: merged background effects (5D cycle + neural glow orbs + scanlines + Merkabah geometry), mobile bottom nav, status bar, API polling
- Added CSS: glass-card, animate-marquee, neural-glow-1/2/3 classes
- Fixed all 9 ESLint errors (ref access during render, JSX comment textnodes, missing React import)
- Verified: 0 lint errors, GET / 200 OK

Stage Summary:
- Unified app compiles and runs with 0 errors
- 19 components built with consistent glassmorphic holographic aesthetic
- MerkabahIntro gate screens all users before entering the app
- Full tab navigation: desktop (sidebar + topbar) and mobile (bottom nav)
- All Aero effects preserved: 5D color cycle, cave shadow, lotus pulse, Merkabah rotation
- All Sov features integrated: scanlines, neural glow orbs, Framer Motion transitions, loading states
- Auth-gated sectors show "Sector Restricted" message
- Live API polling with graceful fallback to LOCAL_MODE
- Files ready for exodus-ii repo sync
