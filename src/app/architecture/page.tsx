"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { CodeBlock } from "@/components/CodeBlock";

const bootstrapSteps = [
  {
    step: "1",
    label: "Prefetch Side Effects",
    desc: "MDM config read, keychain prefetch, project directory scan — all fire before any user code runs",
    color: "bg-accent",
  },
  {
    step: "2",
    label: "Warning Handler + Env Guards",
    desc: "Process warning suppression, environment validation, platform checks",
    color: "bg-accent",
  },
  {
    step: "3",
    label: "CLI Parser + Trust Gate",
    desc: "Argument parsing, pre-action trust verification before any tool access",
    color: "bg-unshipped",
  },
  {
    step: "4",
    label: "setup() + Parallel Load",
    desc: "Commands and agents loaded in parallel. Tool pool assembled based on permissions",
    color: "bg-accent",
  },
  {
    step: "5",
    label: "Deferred Init After Trust",
    desc: "Remaining tools unlocked only after trust gate passes. MCP tools loaded here",
    color: "bg-unshipped",
  },
  {
    step: "6",
    label: "Mode Routing",
    desc: "local | remote | ssh | teleport | direct-connect | deep-link",
    color: "bg-shipped",
  },
  {
    step: "7",
    label: "Query Engine Submit Loop",
    desc: 'The main REPL loop begins. Codename "nO" — single-threaded master loop',
    color: "bg-shipped",
  },
];

const toolCategories = [
  {
    name: "Core File Tools",
    tools: ["FileReadTool", "FileEditTool", "FileWriteTool", "GlobTool", "GrepTool"],
    color: "text-accent",
  },
  {
    name: "Execution",
    tools: ["BashTool", "PowerShellTool"],
    color: "text-shipped",
    note: 'BashTool is the "crown jewel"',
  },
  {
    name: "Agent Tools",
    tools: ["AgentTool", "forkSubagent", "runAgent", "resumeAgent", "spawnMultiAgent"],
    color: "text-accent",
    note: "Sub-agents: explore, plan, general, verification, claudeCodeGuide",
  },
  {
    name: "Task Management",
    tools: ["TaskCreateTool", "TaskGetTool", "TaskListTool", "TaskOutputTool", "TaskStopTool", "TaskUpdateTool"],
    color: "text-text-primary",
  },
  {
    name: "Team / Multi-Agent",
    tools: ["TeamCreateTool", "TeamDeleteTool"],
    color: "text-unshipped",
  },
  {
    name: "Web",
    tools: ["WebFetchTool", "WebSearchTool"],
    color: "text-accent",
  },
  {
    name: "MCP Integration",
    tools: ["MCPTool", "McpAuthTool", "ListMcpResourcesTool", "ReadMcpResourceTool"],
    color: "text-accent",
  },
  {
    name: "Scheduling",
    tools: ["CronCreateTool", "CronDeleteTool", "CronListTool"],
    color: "text-unshipped",
  },
  {
    name: "Communication",
    tools: ["SendMessageTool", "AskUserQuestionTool"],
    color: "text-accent",
  },
  {
    name: "Specialized",
    tools: ["LSPTool", "NotebookEditTool", "SkillTool", "TodoWriteTool", "BriefTool", "ConfigTool"],
    color: "text-text-primary",
  },
  {
    name: "Planning",
    tools: ["EnterPlanModeTool", "ExitPlanModeV2Tool"],
    color: "text-accent",
  },
  {
    name: "Safety Systems",
    tools: ["gitSafety", "gitOperationTracking", "bashSecurity", "bashPermissions", "destructiveCommandWarning"],
    color: "text-internal",
  },
];

const commandCategories = [
  { name: "Core", commands: "help, version, status, config, doctor, exit" },
  { name: "Session", commands: "session, resume, compact, clear, rename, export, share, copy" },
  { name: "Git/PR", commands: "branch, commit, commit-push-pr, diff, review, pr_comments, autofix-pr" },
  { name: "Agent", commands: "agents, bridge, bridge-kick, btw" },
  { name: "Planning", commands: "plan, ultraplan, tasks" },
  { name: "Navigation", commands: "add-dir, files, context" },
  { name: "Model", commands: "model, effort, fast" },
  { name: "Plugin System", commands: "plugin, install, reload-plugins, DiscoverPlugins, ManagePlugins, BrowseMarketplace" },
  { name: "Remote", commands: "remote-env, remote-setup, teleport" },
  { name: "Voice", commands: "voice" },
  { name: "Desktop/IDE", commands: "desktop, ide, chrome" },
  { name: "Fun/Hidden", commands: "buddy, bughunter, stickers, good-claude, thinkback" },
  { name: "Internal/Dev", commands: "ant-trace, mock-limits, heapdump, perf-issue, debug-tool-call, insights, stats" },
  { name: "Security", commands: "permissions, security-review, privacy-settings, sandbox-toggle" },
];

const sectionLinks = [
  { id: "bootstrap", label: "Bootstrap Flow" },
  { id: "runtime", label: "Runtime Architecture" },
  { id: "tools", label: "Tool System" },
  { id: "commands", label: "Command System" },
  { id: "permissions", label: "Permission System" },
];

export default function ArchitecturePage() {
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
            $ tree --depth=2 /claude-code/src/
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Architecture <span className="text-accent">Deep Dive</span>
          </h1>
          <p className="text-text-secondary mt-4 max-w-2xl">
            How Claude Code boots, runs, and manages 184 tools across 28
            subsystems. From the first prefetch to the query engine loop.
          </p>

          {/* Section nav */}
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
        </div>
      </motion.div>

      <div className="px-6 lg:px-12 pb-20 max-w-4xl space-y-16">
        {/* Bootstrap Flow */}
        <section>
          <SectionHeader
            id="bootstrap"
            title="Bootstrap Flow"
            subtitle="The startup sequence — from first import to interactive REPL"
          />
          <div className="space-y-0">
            {bootstrapSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 relative"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center text-xs font-bold text-white font-mono shrink-0 z-10`}
                  >
                    {step.step}
                  </div>
                  {i < bootstrapSteps.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-6 pt-1">
                  <div className="font-semibold font-mono text-sm">
                    {step.label}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">
                    {step.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <CodeBlock title="bootstrap_graph.py — simplified flow">
              {`prefetch_side_effects()     # MDM, keychain, project scan
  │
  ▼
warning_handler()           # suppress noisy warnings
env_guards()                # platform + version checks
  │
  ▼
cli_parser()                # parse args, flags
trust_gate()                # ← blocks until verified
  │
  ▼
┌─────────────────────────┐
│  setup() — parallel     │
│  ├─ load_commands()     │
│  ├─ load_agents()       │
│  └─ assemble_tool_pool()│
└─────────────────────────┘
  │
  ▼
deferred_init()             # MCP tools, extensions
mode_router()               # local|remote|ssh|teleport
  │
  ▼
query_engine.submit_loop()  # ← the main REPL`}
            </CodeBlock>
          </div>
        </section>

        {/* Runtime Architecture */}
        <section>
          <SectionHeader
            id="runtime"
            title="Runtime Architecture"
            subtitle='The single-threaded master loop, codename "nO"'
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-bg-secondary border border-border rounded-lg p-5">
              <h3 className="font-mono text-sm font-bold text-accent mb-3">
                QueryEngine
              </h3>
              <ul className="text-sm text-text-secondary space-y-2">
                <li>
                  <span className="text-text-muted">→</span> Turn-based loop
                  with budget tracking
                </li>
                <li>
                  <span className="text-text-muted">→</span> Automatic
                  compaction when context fills
                </li>
                <li>
                  <span className="text-text-muted">→</span> Structured output
                  parsing for tool calls
                </li>
                <li>
                  <span className="text-text-muted">→</span> Cost tracking per
                  turn and session
                </li>
              </ul>
            </div>

            <div className="bg-bg-secondary border border-border rounded-lg p-5">
              <h3 className="font-mono text-sm font-bold text-accent mb-3">
                Execution Registry
              </h3>
              <ul className="text-sm text-text-secondary space-y-2">
                <li>
                  <span className="text-text-muted">→</span> Routes prompts to
                  commands + tools
                </li>
                <li>
                  <span className="text-text-muted">→</span> Token scoring for
                  tool selection
                </li>
                <li>
                  <span className="text-text-muted">→</span> Slash command
                  prefix matching
                </li>
                <li>
                  <span className="text-text-muted">→</span> Fallback to
                  general agent
                </li>
              </ul>
            </div>

            <div className="bg-bg-secondary border border-border rounded-lg p-5">
              <h3 className="font-mono text-sm font-bold text-accent mb-3">
                Session Persistence
              </h3>
              <ul className="text-sm text-text-secondary space-y-2">
                <li>
                  <span className="text-text-muted">→</span> Transcript store
                  with flush/replay
                </li>
                <li>
                  <span className="text-text-muted">→</span> Resume from
                  session ID
                </li>
                <li>
                  <span className="text-text-muted">→</span> Conversation
                  export (JSON/Markdown)
                </li>
                <li>
                  <span className="text-text-muted">→</span> Session sharing
                  via links
                </li>
              </ul>
            </div>

            <div className="bg-bg-secondary border border-border rounded-lg p-5">
              <h3 className="font-mono text-sm font-bold text-accent mb-3">
                Context Management
              </h3>
              <ul className="text-sm text-text-secondary space-y-2">
                <li>
                  <span className="text-text-muted">→</span> PortContext tracks
                  source, tests, assets
                </li>
                <li>
                  <span className="text-text-muted">→</span> Archive
                  availability detection
                </li>
                <li>
                  <span className="text-text-muted">→</span> CLAUDE.md file
                  chain resolution
                </li>
                <li>
                  <span className="text-text-muted">→</span> Working directory
                  multi-root support
                </li>
              </ul>
            </div>
          </div>

          <CodeBlock title="runtime loop — pseudocode">
            {`while (session.active) {
  const userInput = await prompt.read();

  // Slash command?
  if (userInput.startsWith('/')) {
    const cmd = registry.matchCommand(userInput);
    if (cmd) { await cmd.execute(ctx); continue; }
  }

  // Submit to query engine
  const response = await queryEngine.submit({
    messages: session.messages,
    tools: toolPool.available(ctx.permissions),
    budget: ctx.remainingBudget,
  });

  // Process tool calls
  for (const toolCall of response.toolCalls) {
    const result = await toolPool.execute(toolCall, ctx);
    session.append(toolCall, result);
  }

  // Compact if needed
  if (session.tokenCount > ctx.compactionThreshold) {
    await session.compact();
  }
}`}
          </CodeBlock>
        </section>

        {/* Tool System */}
        <section>
          <SectionHeader
            id="tools"
            title="Tool System"
            subtitle="94 unique tools assembled per-session based on mode and permissions"
          />

          <div className="bg-bg-secondary border border-border rounded-lg p-5 mb-6">
            <h3 className="font-mono text-sm font-bold text-text-primary mb-3">
              Tool Pool Assembly
            </h3>
            <div className="font-mono text-sm text-text-secondary space-y-1">
              <div>
                <span className="text-text-muted">1.</span> Start with full tool
                registry (94 tools)
              </div>
              <div>
                <span className="text-text-muted">2.</span> If{" "}
                <span className="text-unshipped">simple mode</span>: restrict to{" "}
                <span className="text-accent">
                  BashTool, FileReadTool, FileEditTool
                </span>{" "}
                only
              </div>
              <div>
                <span className="text-text-muted">3.</span> Apply MCP
                inclusion/exclusion filters
              </div>
              <div>
                <span className="text-text-muted">4.</span> Apply{" "}
                <span className="text-internal">ToolPermissionContext</span>{" "}
                deny lists (exact name + prefix)
              </div>
              <div>
                <span className="text-text-muted">5.</span> Deferred tools
                loaded after trust gate
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {toolCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-bg-secondary border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className={`font-mono text-sm font-bold ${cat.color}`}>
                      {cat.name}
                    </h4>
                    {cat.note && (
                      <p className="text-xs text-text-muted mt-1 italic">
                        {cat.note}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-xs text-text-muted shrink-0">
                    {cat.tools.length} tools
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cat.tools.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2 py-1 rounded bg-bg-primary border border-border text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Command System */}
        <section>
          <SectionHeader
            id="commands"
            title="Command System"
            subtitle="141 unique commands organized by category — from /help to /buddy"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commandCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-bg-secondary border border-border rounded-lg p-4"
              >
                <h4 className="font-mono text-sm font-bold text-accent mb-2">
                  {cat.name}
                </h4>
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  {cat.commands}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Permission System */}
        <section>
          <SectionHeader
            id="permissions"
            title="Permission System"
            subtitle="Multi-layered permission enforcement from trust gate to tool execution"
          />

          <div className="space-y-4">
            <div className="bg-bg-secondary border border-border rounded-lg p-5">
              <h3 className="font-mono text-sm font-bold text-internal mb-3">
                ToolPermissionContext
              </h3>
              <p className="text-sm text-text-secondary mb-3">
                Every tool execution passes through the permission context,
                which maintains two deny lists:
              </p>
              <CodeBlock>
                {`interface ToolPermissionContext {
  denyNames: string[];     // exact tool name matches
  denyPrefixes: string[];  // prefix-based blocking
  trustLevel: TrustLevel;  // none | read | write | full
}`}
              </CodeBlock>
            </div>

            <div className="bg-bg-secondary border border-border rounded-lg p-5">
              <h3 className="font-mono text-sm font-bold text-unshipped mb-3">
                Trust-Gated Deferred Init
              </h3>
              <p className="text-sm text-text-secondary">
                Tools that require elevated access (MCP, scheduling, agent
                spawning) are not loaded at boot. They&apos;re deferred until the
                trust gate confirms the user&apos;s identity and permissions.
                This means a compromised or untrusted context can never access
                dangerous tools — they literally don&apos;t exist in the tool pool
                yet.
              </p>
            </div>

            <div className="bg-bg-secondary border border-border rounded-lg p-5">
              <h3 className="font-mono text-sm font-bold text-shipped mb-3">
                BashTool Special Handling
              </h3>
              <p className="text-sm text-text-secondary mb-3">
                BashTool gets extra layers because it can do anything:
              </p>
              <ul className="text-sm text-text-secondary space-y-1 ml-4 list-disc">
                <li>
                  <span className="text-internal font-mono text-xs">
                    destructiveCommandWarning
                  </span>{" "}
                  — warns before rm -rf, git reset --hard, etc.
                </li>
                <li>
                  <span className="text-shipped font-mono text-xs">
                    preapproved
                  </span>{" "}
                  — safe commands that skip confirmation (ls, cat, etc.)
                </li>
                <li>
                  <span className="text-accent font-mono text-xs">
                    bashSecurity
                  </span>{" "}
                  — command injection detection
                </li>
                <li>
                  <span className="text-accent font-mono text-xs">
                    bashPermissions
                  </span>{" "}
                  — per-project command allowlists
                </li>
              </ul>
            </div>

            <div className="bg-bg-secondary border border-border rounded-lg p-5">
              <h3 className="font-mono text-sm font-bold text-accent mb-3">
                Sandbox Toggle
              </h3>
              <p className="text-sm text-text-secondary">
                The <code className="font-mono text-xs text-accent">sandbox-toggle</code>{" "}
                command switches between sandboxed and unrestricted execution.
                In sandbox mode, BashTool runs commands in a restricted
                environment with limited filesystem access and no network.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
