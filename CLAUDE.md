@AGENTS.md

# Inside Claude Code — Architecture Deep Dive Study Website

## Project Overview
An interactive study website that breaks down Claude Code's architecture based on the March 31, 2026 source leak. Educational material for AI engineers who want to understand how the leading agentic coding tool is built. Built by Paulo Salvatore for personal learning and reference.

## Quick Commands
- `npm run dev` — Start dev server (kill existing first: `pkill -f "next dev" 2>/dev/null`)
- `npm run build` — Production build
- `npm run lint` — Lint check

## Tech Stack
- Next.js 15 (App Router)
- TypeScript 5
- Tailwind CSS 4
- Framer Motion (minimal animations — see rules below)
- React 19

## Design Direction
- **Dark theme** (developer-focused, terminal aesthetic)
- **Color scheme:** Dark navy/charcoal background (#0a0e1a), electric blue accents (#3b82f6), green for "shipped" (#22c55e), amber for "unshipped/hidden" (#f59e0b), red for "internal only" (#ef4444)
- **Typography:** Monospace for code/architecture elements, clean sans-serif (Inter) for prose
- **Layout:** Sidebar navigation (collapsible) + main content area
- **Vibe:** Feels like reading a technical postmortem, not a blog post. Dense but navigable.

## Content Language
- ALL content in English
- lang="en" in layout.tsx
- Metadata in English

## Page Structure

### 1. Home / Overview
- Hero with project stats: 1,902 TS files, 207 commands, 184 tools, 28 subsystems, 44 feature flags
- Timeline of the leak event (March 31, 2026)
- Quick navigation to all sections
- "What leaked" summary (npm .map file in v2.1.88, second time after Feb 2025)

### 2. Architecture Deep Dive (/architecture)
The core of the site. Break down the system into layers:

#### 2a. Bootstrap Flow
The startup sequence (from the ported bootstrap_graph.py):
1. Top-level prefetch side effects (MDM read, keychain prefetch, project scan)
2. Warning handler and environment guards
3. CLI parser and pre-action trust gate
4. setup() + commands/agents parallel load
5. Deferred init after trust
6. Mode routing: local / remote / ssh / teleport / direct-connect / deep-link
7. Query engine submit loop

Show this as an interactive flowchart/pipeline diagram.

#### 2b. Runtime Architecture
- Single-threaded master loop (codename "nO")
- QueryEngine: turn loop with budget tracking, compaction, structured output
- Execution Registry: routes prompts to commands + tools via token scoring
- Session persistence + transcript store with flush/replay
- Context management: PortContext tracks source, tests, assets, archive availability

#### 2c. Tool System
The tool pool assembles available tools based on:
- Simple mode (BashTool, FileReadTool, FileEditTool only)
- MCP inclusion/exclusion
- Permission context (deny names, deny prefixes)

Tool categories from the snapshot (94 unique tools):
- **Core File Tools:** FileReadTool, FileEditTool, FileWriteTool, GlobTool, GrepTool
- **Execution:** BashTool (the "crown jewel"), PowerShellTool
- **Agent Tools:** AgentTool (with sub-agents: exploreAgent, planAgent, generalPurposeAgent, verificationAgent, claudeCodeGuideAgent), forkSubagent, runAgent, resumeAgent, spawnMultiAgent
- **Task Management:** TaskCreateTool, TaskGetTool, TaskListTool, TaskOutputTool, TaskStopTool, TaskUpdateTool
- **Team/Multi-Agent:** TeamCreateTool, TeamDeleteTool
- **Web:** WebFetchTool, WebSearchTool
- **MCP Integration:** MCPTool, McpAuthTool, ListMcpResourcesTool, ReadMcpResourceTool
- **Scheduling:** CronCreateTool, CronDeleteTool, CronListTool
- **Communication:** SendMessageTool, AskUserQuestionTool
- **Specialized:** LSPTool, NotebookEditTool, SkillTool, TodoWriteTool, BriefTool, ConfigTool
- **Planning:** EnterPlanModeTool, ExitPlanModeV2Tool
- **Git Safety:** gitSafety, gitOperationTracking
- **Bash Safety:** bashSecurity, bashPermissions, bashCommandHelpers, destructiveCommandWarning, preapproved

#### 2d. Command System
141 unique commands organized by category:
- **Core:** help, version, status, config, doctor, exit
- **Session:** session, resume, compact, clear, rename, export, share, copy
- **Git/PR:** branch, commit, commit-push-pr, diff, review, pr_comments, autofix-pr
- **Agent:** agents, bridge, bridge-kick, btw
- **Planning:** plan, ultraplan, tasks
- **Navigation:** add-dir, files, context
- **Model:** model, effort, fast
- **Plugin System:** plugin, install, reload-plugins, DiscoverPlugins, ManagePlugins, ManageMarketplaces, BrowseMarketplace, AddMarketplace, PluginSettings, ValidatePlugin
- **Remote:** remote-env, remote-setup, teleport
- **Voice:** voice
- **Desktop/IDE:** desktop, ide, chrome
- **Fun/Hidden:** buddy, bughunter, stickers, good-claude, thinkback, thinkback-play
- **Internal/Dev:** ant-trace, mock-limits, reset-limits, heapdump, perf-issue, debug-tool-call, insights, stats
- **Security:** permissions, security-review, privacy-settings, sandbox-toggle
- **Skills:** skills
- **Memory:** memory

#### 2e. Permission System
- ToolPermissionContext: deny by exact name or prefix
- Trust-gated deferred init
- Sandbox toggle
- BashTool has special destructive command warnings + preapproved list

### 3. Hidden Features (/features)
Interactive catalog of 44 feature flags:

#### SHIPPED (visible features)
Show what's currently available in production CC.

#### UNSHIPPED (built but flagged off) — 20+ features
Each gets a card with: name, description, completeness estimate, implications

Key unshipped features:
- **Background Agents (Kairos):** 24/7 agents with GitHub webhooks, push notifications, PR monitoring
- **Multi-Agent Orchestration (Coordinator Mode):** One Claude spawning worker Claudes with restricted toolsets and scratchpads
- **Ultraplan:** 30-minute Opus session on remote server for deep task planning
- **Cron Scheduling:** CronCreateTool, CronDeleteTool, CronListTool — basically CI/CD agent
- **Voice Mode (Tengu):** Full push-to-talk, Deepgram Nova 3, gemstone codenames for flags (tengu_cobalt_frost, tengu_amber_quartz)
- **Browser Control:** Playwright integration, not just web_fetch
- **Sleep/Resume Agents:** Can sleep and self-resume without user prompts
- **Persistent Memory (memdir):** Cross-session memory without external storage
- **Worktrees:** EnterWorktreeTool/ExitWorktreeTool for git worktree isolation

#### INTERNAL ONLY (Anthropic employees)
- ant-trace, insights, mock-limits, etc.

#### /buddy Easter Egg
The ASCII pet system deserves its own section:
- 18 species (duck, capybara, dragon, ghost, axolotl, "chonk", etc.)
- Gacha rarity: common → legendary (1% legendary drop)
- Shiny variants, hats (crown, wizard, propeller, tinyduck)
- Stats: DEBUGGING, CHAOS, SNARK
- Species names hex-encoded to dodge internal build scanner
- Salt: "friend-2026-401" (April Fools feature)

### 4. Subsystems Map (/subsystems)
Interactive grid/tree of all 28 subsystems with file counts:
- components (389 files) — UI components, React/Ink
- utils (564 files) — Shared utilities
- services (130 files) — AgentSummary, MagicDocs, etc.
- hooks (104 files) — React hooks, notifications
- bridge (31 files) — Bridge API, config, debug
- constants (21 files) — API limits, betas, common
- skills (20 files) — Bundled skills (batch, claudeApi, etc.)
- cli (19 files) — CLI handlers
- keybindings (14 files) — Key binding system
- types (11 files) — Type definitions, generated events
- migrations (11 files) — Settings migration system
- memdir (8 files) — Memory directory, relevant memories, memory age
- entrypoints (8 files) — CLI, init, SDK types
- buddy (6 files) — The pet system 🐤
- state (6 files) — AppState, store
- vim (5 files) — Vim motions, operators, text objects
- remote (4 files) — Remote session manager, WebSocket
- native-ts (4 files) — Color diff, file index, yoga layout
- server (3 files) — Direct connect session, manager
- screens (3 files) — Doctor, REPL, ResumeConversation
- plugins (2 files) — Built-in plugins, bundled
- upstreamproxy (2 files) — Relay, proxy
- assistant (1 file) — Session history
- bootstrap (1 file) — State
- coordinator (1 file) — Coordinator mode
- moreright (1 file) — useMoreRight hook
- outputStyles (1 file) — Output style loading
- schemas (1 file) — Hook schemas
- voice (1 file) — Voice mode enabled flag

### 5. Code Archaeology (/archaeology)
The fun stuff from community analysis:
- 460 eslint-disable comments
- 803KB main.tsx (4,683 lines)
- 50+ _DEPRECATED functions still in production
- 9 empty catch blocks in config.ts
- Hex-encoded "duck" to dodge build scanner
- Best code comments ("TODO: figure out why", Ollie's memoization note, "good enough for picking ducks")
- System prompts assembled client-side (not server-side)
- 187 spinner verbs
- Sentiment regex for negative user prompts

### 6. Lessons for Builders (/lessons)
The practical takeaways:
- **Architecture patterns worth stealing:** Single-threaded loop for debuggability, tool permission layering, session compaction, trust-gated init
- **Tool design:** How CC abstracts tools (name, responsibility, source_hint), permission deny lists, simple mode fallback
- **Multi-agent patterns:** Built-in sub-agents (explore, plan, general, verification), agent memory snapshots, fork vs spawn
- **Compared to what we use:** Side-by-side with OpenClaw patterns (memory, cron, tools, sub-agents, sessions)
- **What to watch:** Features about to ship (background agents, voice, coordinator)

### 7. Interactive Explorer (/explorer)
- Searchable/filterable table of all 207 commands
- Searchable/filterable table of all 184 tools
- Click to expand details (source path, responsibility, category)
- Group by category, subsystem, or status

## Data Files
The raw data lives in the clawd-code repo. Copy these JSON files into the project for the interactive explorer:
- Copy from: `~/Documents/GitHub/clawd-code/src/reference_data/commands_snapshot.json`
- Copy from: `~/Documents/GitHub/clawd-code/src/reference_data/tools_snapshot.json`
- Copy from: `~/Documents/GitHub/clawd-code/src/reference_data/archive_surface_snapshot.json`
- Copy from: `~/Documents/GitHub/clawd-code/src/reference_data/subsystems/*.json`

Place them in `src/data/` within this project.

## Animation Rules
- Hero: ONE motion wrapper. Simple opacity fade (1s). NO parallax, NO scale.
- Cards: opacity + translateY on whileInView. Max 0.06s delay between siblings.
- Architecture diagrams: Subtle reveal animations, nothing flashy.
- Code blocks: No animation — just static with syntax highlighting.
- Rule of thumb: If you need more than 2 motion.div wrappers in a component, you're over-animating.

## Image Rules
- Minimal images — this is a data/text-heavy site
- Use SVG for diagrams/flowcharts (inline React components)
- OG image: 1200x630, dark theme with "Inside Claude Code" branding
- No external image URLs

## Important Implementation Notes
- This is a STUDY tool, not a leak distribution site. Frame everything educationally.
- Link to the clawd-code repo for attribution
- Include disclaimer about educational/research purposes
- Dark theme is mandatory — developers reading architecture docs at night
- Mobile-responsive — Paulo reads on phone too
- Syntax highlighting for code snippets (use a library like Prism or Shiki)
- Sidebar should be collapsible on mobile
- Each page section should be deep-linkable (anchor IDs)

## Commit Cadence
1. After initial scaffolding (Next.js + Tailwind + layout + sidebar)
2. After data import and Explorer page
3. After Architecture deep dive pages
4. After Hidden Features catalog
5. After Subsystems map + Code Archaeology
6. After Lessons page + final polish
7. After OG image + metadata + README

## Skills
Create `.claude/skills/` with:
- `/run-project` — install deps, start dev
- `/run-tests` — lint + type check + build

## Environment & Security
- No API keys needed — static site with JSON data
- No .env files
- Public educational content — can be deployed to Vercel later
