"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

const shippedFeatures = [
  {
    name: "Bash Execution",
    desc: 'BashTool — the "crown jewel." Full shell access with safety layers, destructive command warnings, and preapproved lists.',
  },
  {
    name: "File Tools",
    desc: "FileReadTool, FileEditTool, FileWriteTool, GlobTool, GrepTool — the core file manipulation suite.",
  },
  {
    name: "Agent Tool + Sub-agents",
    desc: "AgentTool with 5 built-in sub-agents: exploreAgent, planAgent, generalPurposeAgent, verificationAgent, claudeCodeGuideAgent.",
  },
  {
    name: "Web Search & Fetch",
    desc: "WebSearchTool and WebFetchTool for live web access during sessions.",
  },
  {
    name: "MCP Integration",
    desc: "MCPTool, McpAuthTool, ListMcpResourcesTool, ReadMcpResourceTool — full Model Context Protocol support.",
  },
  {
    name: "Task Management",
    desc: "TaskCreateTool, TaskGetTool, TaskListTool, TaskOutputTool, TaskStopTool, TaskUpdateTool for background task orchestration.",
  },
  {
    name: "Notebook Editing",
    desc: "NotebookEditTool for Jupyter notebook manipulation — read cells, edit code, view outputs.",
  },
  {
    name: "Planning Mode",
    desc: "EnterPlanModeTool / ExitPlanModeV2Tool — structured planning before execution with plan/act separation.",
  },
  {
    name: "Skills System",
    desc: "SkillTool — bundled and user-defined skills for repeatable workflows. Slash command integration.",
  },
  {
    name: "Session Management",
    desc: "Resume, compact, export, share — full session lifecycle with transcript persistence and replay.",
  },
];

interface UnshippedFeature {
  name: string;
  codename?: string;
  desc: string;
  completeness: number;
  implications: string;
}

const unshippedFeatures: UnshippedFeature[] = [
  {
    name: "Background Agents",
    codename: "Kairos",
    desc: "24/7 agents with GitHub webhooks, push notifications, and PR monitoring. Agents run continuously on remote servers, watching repos and responding to events.",
    completeness: 85,
    implications:
      "Turns Claude Code from a session tool into a persistent CI/CD teammate. Could replace simple GitHub Actions workflows.",
  },
  {
    name: "Multi-Agent Orchestration",
    codename: "Coordinator Mode",
    desc: "One Claude spawning worker Claudes with restricted toolsets and scratchpads. Parent agent delegates subtasks and aggregates results.",
    completeness: 70,
    implications:
      "Parallel work on complex tasks. One agent plans, others execute in isolated contexts. Could dramatically speed up large refactors.",
  },
  {
    name: "Browser Control",
    codename: undefined,
    desc: "Full Playwright integration for browser automation — not just web_fetch. Navigate, click, fill forms, take screenshots.",
    completeness: 90,
    implications:
      "E2E testing, web scraping, visual verification all from within Claude Code sessions. Closes the gap with browser-based AI tools.",
  },
  {
    name: "Ultraplan",
    codename: undefined,
    desc: "30-minute Opus session on a remote server for deep task planning. Generates comprehensive implementation plans before execution begins.",
    completeness: 60,
    implications:
      "Dedicated planning phase with the most capable model. Could produce higher-quality architectural decisions for complex projects.",
  },
  {
    name: "Cron Scheduling",
    codename: undefined,
    desc: "CronCreateTool, CronDeleteTool, CronListTool — schedule agents to run on a cron schedule. Basically a CI/CD agent.",
    completeness: 80,
    implications:
      'Automated code review, dependency updates, test runs on schedule. "Run this agent every morning at 9am" becomes possible.',
  },
  {
    name: "Voice Mode",
    codename: "Tengu",
    desc: "Full push-to-talk voice interface. Uses Deepgram Nova 3 for transcription. Gemstone codenames for feature flags: tengu_cobalt_frost, tengu_amber_quartz.",
    completeness: 75,
    implications:
      "Hands-free coding, pair programming by talking. Voice commands for navigation and execution.",
  },
  {
    name: "Persistent Memory",
    codename: "memdir",
    desc: "Cross-session memory without external storage. Memory directory system with relevance scoring and age-based decay.",
    completeness: 80,
    implications:
      "Claude remembers project context, coding preferences, and past decisions across sessions. No more re-explaining your codebase.",
  },
  {
    name: "Worktrees",
    codename: undefined,
    desc: "EnterWorktreeTool / ExitWorktreeTool for git worktree isolation. Work on multiple branches simultaneously in separate directories.",
    completeness: 85,
    implications:
      "Parallel feature development without branch switching. Each agent can work in its own worktree.",
  },
  {
    name: "Sleep/Resume Agents",
    codename: undefined,
    desc: "Agents can sleep and self-resume without user prompts. Pause work, wait for external events, then continue autonomously.",
    completeness: 65,
    implications:
      "Long-running workflows that span hours or days. Wait for CI, wait for review, then resume.",
  },
  {
    name: "Plugin System",
    codename: undefined,
    desc: "DiscoverPlugins, ManagePlugins, BrowseMarketplace, AddMarketplace, PluginSettings, ValidatePlugin — a full marketplace ecosystem.",
    completeness: 70,
    implications:
      "Third-party extensions for Claude Code. Community-built tools, custom workflows, shared configurations.",
  },
  {
    name: "Team Tools",
    codename: undefined,
    desc: "TeamCreateTool, TeamDeleteTool for creating and managing multi-agent teams with shared context.",
    completeness: 50,
    implications:
      "Formalized multi-agent collaboration. Named teams with persistent membership and shared scratchpads.",
  },
];

const internalFeatures = [
  {
    name: "ant-trace",
    desc: "Internal distributed tracing for debugging agent execution paths",
  },
  {
    name: "insights",
    desc: "Usage analytics and session telemetry dashboard for Anthropic engineers",
  },
  {
    name: "mock-limits",
    desc: "Simulate rate limits and quota exhaustion for testing error handling",
  },
  {
    name: "reset-limits",
    desc: "Reset rate limit counters during development and testing",
  },
  {
    name: "heapdump",
    desc: "Capture V8 heap snapshots for memory leak investigation",
  },
  {
    name: "perf-issue",
    desc: "Performance profiling tool for identifying slow tool executions",
  },
  {
    name: "debug-tool-call",
    desc: "Inspect raw tool call payloads, token counts, and execution timing",
  },
  {
    name: "stats",
    desc: "Internal statistics: token usage, tool call frequency, error rates",
  },
];

const buddySpecies = [
  "duck",
  "capybara",
  "dragon",
  "ghost",
  "axolotl",
  "chonk",
  "penguin",
  "cat",
  "dog",
  "frog",
  "owl",
  "fox",
  "bunny",
  "slime",
  "crab",
  "bat",
  "bee",
  "mushroom",
];

const buddyRarities = [
  { name: "Common", chance: "60%", color: "text-text-secondary" },
  { name: "Uncommon", chance: "25%", color: "text-shipped" },
  { name: "Rare", chance: "10%", color: "text-accent" },
  { name: "Epic", chance: "4%", color: "text-unshipped" },
  { name: "Legendary", chance: "1%", color: "text-internal" },
];

const sectionLinks = [
  { id: "shipped", label: "Shipped" },
  { id: "unshipped", label: "Unshipped" },
  { id: "internal", label: "Internal Only" },
  { id: "buddy", label: "/buddy Easter Egg" },
];

function ProgressBar({ value, label }: { value: number; label: string }) {
  const color =
    value >= 80
      ? "bg-shipped"
      : value >= 60
        ? "bg-unshipped"
        : "bg-internal";

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-xs text-text-muted">completeness</span>
        <span className="font-mono text-xs text-text-secondary">{label}</span>
      </div>
      <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "shipped" | "unshipped" | "internal";
}) {
  const styles = {
    shipped: "bg-shipped/15 text-shipped border-shipped/30",
    unshipped: "bg-unshipped/15 text-unshipped border-unshipped/30",
    internal: "bg-internal/15 text-internal border-internal/30",
  };

  const labels = {
    shipped: "SHIPPED",
    unshipped: "UNSHIPPED",
    internal: "INTERNAL",
  };

  return (
    <span
      className={`font-mono text-[10px] px-2 py-0.5 rounded border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="px-6 lg:px-12 pt-12 lg:pt-20 pb-8"
      >
        <div className="max-w-4xl">
          <p className="font-mono text-sm text-text-muted mb-4">
            $ claude --list-feature-flags --include-hidden
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Hidden <span className="text-unshipped">Features</span>
          </h1>
          <p className="text-text-secondary mt-4 max-w-2xl">
            44 feature flags found in the source. Some shipped, some built but
            flagged off, some internal only. A catalog of what Claude Code can
            do — and what it&apos;s about to do.
          </p>

          <div className="flex flex-wrap gap-2 mt-8">
            {sectionLinks.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-mono text-xs px-3 py-1.5 rounded bg-bg-secondary border border-border text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 mt-8 font-mono text-sm">
            <div>
              <span className="text-shipped">
                {shippedFeatures.length}
              </span>{" "}
              <span className="text-text-muted">shipped</span>
            </div>
            <div>
              <span className="text-unshipped">
                {unshippedFeatures.length}
              </span>{" "}
              <span className="text-text-muted">unshipped</span>
            </div>
            <div>
              <span className="text-internal">
                {internalFeatures.length}
              </span>{" "}
              <span className="text-text-muted">internal</span>
            </div>
            <div>
              <span className="text-accent">1</span>{" "}
              <span className="text-text-muted">easter egg</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-6 lg:px-12 pb-20 max-w-4xl space-y-16">
        {/* SHIPPED */}
        <section>
          <SectionHeader
            id="shipped"
            title="Shipped Features"
            subtitle="Currently available in production Claude Code"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {shippedFeatures.map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-bg-secondary border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-mono text-sm font-bold text-shipped">
                    {feature.name}
                  </h4>
                  <StatusBadge status="shipped" />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* UNSHIPPED */}
        <section>
          <SectionHeader
            id="unshipped"
            title="Unshipped Features"
            subtitle="Built but flagged off — 20+ features waiting to go live"
          />

          <div className="space-y-4">
            {unshippedFeatures.map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-bg-secondary border border-border rounded-lg p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-mono text-sm font-bold text-unshipped">
                      {feature.name}
                      {feature.codename && (
                        <span className="text-text-muted font-normal ml-2">
                          ({feature.codename})
                        </span>
                      )}
                    </h4>
                  </div>
                  <StatusBadge status="unshipped" />
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {feature.desc}
                </p>

                <div className="bg-bg-primary border border-border rounded p-3 mb-1">
                  <p className="text-xs text-text-muted mb-1 font-mono">
                    implications
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.implications}
                  </p>
                </div>

                <ProgressBar
                  value={feature.completeness}
                  label={`~${feature.completeness}%`}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* INTERNAL ONLY */}
        <section>
          <SectionHeader
            id="internal"
            title="Internal Only"
            subtitle="Anthropic employee tools — not accessible in public builds"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {internalFeatures.map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-bg-secondary border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-mono text-sm font-bold text-internal">
                    /{feature.name}
                  </h4>
                  <StatusBadge status="internal" />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* /buddy Easter Egg */}
        <section>
          <SectionHeader
            id="buddy"
            title="/buddy Easter Egg"
            subtitle='The ASCII pet system hidden in Claude Code — salt: "friend-2026-401"'
          />

          <div className="space-y-4">
            {/* Overview card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-secondary border border-border rounded-lg p-5"
            >
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                An entire gacha pet system built into a coding tool. 18 species,
                rarity tiers from common to legendary, shiny variants, wearable
                hats, and stat tracking. Species names are{" "}
                <span className="font-mono text-accent">hex-encoded</span> in
                the source to dodge the internal build scanner. The salt{" "}
                <span className="font-mono text-unshipped">
                  &quot;friend-2026-401&quot;
                </span>{" "}
                confirms it was an April Fools feature.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-bg-primary border border-border rounded p-3">
                  <p className="font-mono text-xs text-text-muted mb-2">
                    species
                  </p>
                  <p className="font-mono text-2xl font-bold text-accent">18</p>
                </div>
                <div className="bg-bg-primary border border-border rounded p-3">
                  <p className="font-mono text-xs text-text-muted mb-2">
                    rarity tiers
                  </p>
                  <p className="font-mono text-2xl font-bold text-unshipped">
                    5
                  </p>
                </div>
                <div className="bg-bg-primary border border-border rounded p-3">
                  <p className="font-mono text-xs text-text-muted mb-2">
                    legendary drop rate
                  </p>
                  <p className="font-mono text-2xl font-bold text-internal">
                    1%
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Species grid */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="bg-bg-secondary border border-border rounded-lg p-5"
            >
              <h4 className="font-mono text-sm font-bold text-accent mb-3">
                Species Pool
              </h4>
              <p className="text-xs text-text-muted mb-3">
                Names stored as hex in source (e.g.,{" "}
                <span className="font-mono text-text-secondary">
                  0x6475636b
                </span>{" "}
                = &quot;duck&quot;) to avoid build scanner detection
              </p>
              <div className="flex flex-wrap gap-1.5">
                {buddySpecies.map((species) => (
                  <span
                    key={species}
                    className="font-mono text-xs px-2 py-1 rounded bg-bg-primary border border-border text-text-secondary"
                  >
                    {species}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Rarity tiers */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="bg-bg-secondary border border-border rounded-lg p-5"
            >
              <h4 className="font-mono text-sm font-bold text-accent mb-3">
                Gacha Rarity Tiers
              </h4>
              <div className="space-y-2">
                {buddyRarities.map((rarity) => (
                  <div
                    key={rarity.name}
                    className="flex items-center justify-between"
                  >
                    <span className={`font-mono text-sm font-bold ${rarity.color}`}>
                      {rarity.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-text-muted">
                        {rarity.chance}
                      </span>
                      <div className="w-32 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            rarity.name === "Common"
                              ? "bg-text-secondary"
                              : rarity.name === "Uncommon"
                                ? "bg-shipped"
                                : rarity.name === "Rare"
                                  ? "bg-accent"
                                  : rarity.name === "Epic"
                                    ? "bg-unshipped"
                                    : "bg-internal"
                          }`}
                          style={{ width: rarity.chance }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Customization + Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 }}
                className="bg-bg-secondary border border-border rounded-lg p-5"
              >
                <h4 className="font-mono text-sm font-bold text-accent mb-3">
                  Customization
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-mono text-xs text-text-muted mb-1">
                      shiny variants
                    </p>
                    <p className="text-sm text-text-secondary">
                      Rare alternate colorways for each species. Visual-only, no
                      stat bonus.
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-muted mb-1">
                      hats
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["crown", "wizard", "propeller", "tinyduck"].map(
                        (hat) => (
                          <span
                            key={hat}
                            className="font-mono text-xs px-2 py-1 rounded bg-bg-primary border border-border text-unshipped"
                          >
                            {hat}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.24 }}
                className="bg-bg-secondary border border-border rounded-lg p-5"
              >
                <h4 className="font-mono text-sm font-bold text-accent mb-3">
                  Pet Stats
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      stat: "DEBUGGING",
                      desc: "How helpful your buddy is at finding bugs",
                      color: "text-shipped",
                    },
                    {
                      stat: "CHAOS",
                      desc: "Tendency to suggest unconventional solutions",
                      color: "text-internal",
                    },
                    {
                      stat: "SNARK",
                      desc: "Sass level in buddy comments and reactions",
                      color: "text-unshipped",
                    },
                  ].map((s) => (
                    <div key={s.stat}>
                      <span className={`font-mono text-sm font-bold ${s.color}`}>
                        {s.stat}
                      </span>
                      <p className="text-xs text-text-muted">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Fun note */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-bg-primary border border-border rounded-lg p-4 font-mono text-xs text-text-muted"
            >
              <span className="text-text-secondary">// </span>
              The buddy subsystem is 6 files, uses hex-encoded species names to
              avoid the internal build scanner flagging &quot;fun&quot; code, and
              includes the salt{" "}
              <span className="text-unshipped">
                &quot;friend-2026-401&quot;
              </span>{" "}
              — a reference to April 1st, 2026. Good enough for picking ducks.
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
