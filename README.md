# Inside Claude Code — Architecture Deep Dive

An interactive study website that breaks down Claude Code's internal architecture, based on community analysis of the March 31, 2026 source leak.

**🌐 Live:** [claude-code-study-five.vercel.app](https://claude-code-study-five.vercel.app)

## What Is This?

On March 31, 2026, Claude Code v2.1.88 was published to npm with a 59.8MB source map file accidentally attached. This `.map` file exposed 1,902 TypeScript source files — the full internal architecture of Anthropic's agentic coding CLI.

This site organizes and explains the key findings for **AI engineers** and **developers** who want to understand how the leading agentic coding tool is built.

> **Disclaimer:** This is educational material for learning purposes. It does not distribute proprietary source code. Data comes from the [clawd-code](https://github.com/instructkr/clawd-code) community Python port which catalogs the architectural surface without reproducing the original TypeScript.

## What You'll Learn

### 🏗️ Architecture
How Claude Code's runtime works under the hood:
- **Bootstrap flow** — The 7-stage startup pipeline (prefetch → trust gate → mode routing → turn loop)
- **Single-threaded master loop** (codename "nO") — Why Anthropic chose simplicity over complex multi-agent orchestration
- **Tool system** — 94 unique tools with permission layering, deny lists, and simple-mode fallback
- **Command system** — 141 slash commands from `/help` to hidden stubs like `/bughunter` and `/teleport`
- **Permission model** — Trust-gated deferred init, sandbox toggle, destructive command warnings

### 🔮 Hidden Features
44 feature flags found in the source, with 20+ fully built but unshipped:
- **Background Agents (Kairos)** — 24/7 agents with GitHub webhooks and push notifications
- **Multi-Agent Orchestration (Coordinator Mode)** — One Claude spawning worker Claudes with restricted toolsets
- **Ultraplan** — 30-minute Opus session on remote server for deep task planning
- **Voice Mode (Tengu)** — Full push-to-talk with Deepgram Nova 3
- **Browser Control** — Playwright integration, not just `web_fetch`
- **Cron Scheduling** — CI/CD-style scheduled agent tasks
- **The /buddy Pet System** — An ASCII Tamagotchi with gacha rarity, shiny variants, and stats like DEBUGGING, CHAOS, and SNARK 🐤

### 🔍 Interactive Explorer
Searchable, filterable catalogs of:
- All **207 command entries** (141 unique commands)
- All **184 tool entries** (94 unique tools)

### 🗺️ Subsystems Map
Visual breakdown of all **28 subsystems** with file counts — from `utils` (564 files) down to `voice` (1 file).

### 🏺 Code Archaeology
The human side of a $380B company's codebase:
- 460 `eslint-disable` comments
- 803KB `main.tsx` (4,683 lines)
- 50+ `_DEPRECATED` functions still in production
- Hex-encoded "duck" to dodge their own build scanner
- An engineer named Ollie openly questioning his own memoization in production

### 📚 Lessons for Builders
Practical takeaways you can apply to your own agent systems, including tool abstraction patterns, permission design, and multi-agent architecture strategies.

## Tech Stack

- [Next.js](https://nextjs.org/) 15 (App Router, static export)
- TypeScript 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/) (minimal animations)
- Deployed on [Vercel](https://vercel.com)

## Data Source

Architectural metadata is sourced from [instructkr/clawd-code](https://github.com/instructkr/clawd-code), a community Python port by [Sigrid Jin](https://github.com/instructkr) that catalogs the structural surface of Claude Code's architecture. The JSON snapshots in `src/data/` contain command names, tool names, subsystem structure, and source path hints — no proprietary source code.

## Running Locally

```bash
git clone https://github.com/paulosalvatore/claude-code-study.git
cd claude-code-study
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contributing

This is a personal study project, but PRs are welcome for:
- Corrections to architectural descriptions
- Additional insights from community analysis
- UI/UX improvements
- New sections or deeper dives into specific subsystems

## Author

Built by [Paulo Salvatore](https://github.com/paulosalvatore) with the help of [PaulinhoClaw](https://github.com/openclaw/openclaw) 🤙

## License

MIT — educational use. This project does not claim ownership of any Anthropic intellectual property.
