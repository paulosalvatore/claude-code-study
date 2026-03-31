"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { CodeBlock } from "@/components/CodeBlock";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

function PatternCard({
  title,
  description,
  index,
  accent = "border-accent",
}: {
  title: string;
  description: string;
  index: number;
  accent?: string;
}) {
  return (
    <motion.div
      className={`bg-bg-secondary border ${accent} rounded-lg p-5`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
    >
      <h4 className="font-mono text-sm font-bold text-text-primary mb-2">
        {title}
      </h4>
      <p className="text-text-secondary text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function WatchCard({
  title,
  description,
  status,
  index,
}: {
  title: string;
  description: string;
  status: string;
  index: number;
}) {
  return (
    <motion.div
      className="bg-bg-secondary border border-border rounded-lg p-5 flex gap-4 items-start"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
    >
      <span className="text-unshipped font-mono text-xs bg-bg-tertiary px-2 py-1 rounded whitespace-nowrap mt-0.5">
        {status}
      </span>
      <div>
        <h4 className="font-mono text-sm font-bold text-text-primary mb-1">
          {title}
        </h4>
        <p className="text-text-secondary text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

const architecturePatterns = [
  {
    title: "Single-threaded loop for debuggability",
    description:
      'No concurrent state mutations. Every tool call is sequential through the "nO" master loop. Makes debugging trivial and state predictable. When something breaks, the call stack tells the whole story.',
  },
  {
    title: "Tool permission layering",
    description:
      "Multiple layers: trust gate \u2192 deferred init \u2192 deny lists \u2192 per-tool safety checks. Defense in depth, not a single gate. Each layer is cheap to evaluate, and any one of them can block a dangerous operation.",
  },
  {
    title: "Session compaction",
    description:
      "When context fills up, compact instead of truncating. Preserves semantic meaning while reducing tokens. The agent can continue working on long tasks without losing critical context from early in the session.",
  },
  {
    title: "Trust-gated init",
    description:
      "Don't load dangerous capabilities until trust is verified. Tools literally don't exist in the pool until the gate passes. The LLM can't even hallucinate using a tool it hasn't been told about.",
  },
];

const toolPatterns = [
  {
    title: "Tool abstraction: name + responsibility + source_hint",
    description:
      "Each tool has a clean interface for the LLM to understand what it can do. The source_hint tells the model where results come from, improving grounding and reducing hallucination.",
  },
  {
    title: "Permission deny lists",
    description:
      "Both exact name matching and prefix-based blocking. Flexible enough for fine-grained control. You can deny 'FileWrite' exactly or deny everything starting with 'Dangerous' via prefix.",
  },
  {
    title: "Simple mode fallback",
    description:
      "When in doubt, restrict to BashTool + FileReadTool + FileEditTool. This minimum viable tool set covers 90% of coding tasks. Fewer tools means fewer opportunities for the model to pick the wrong one.",
  },
  {
    title: "Deferred tool loading",
    description:
      "Some tools are expensive to init (MCP connections, LSP servers). Load them lazily, only when trust allows. Startup stays fast, and unused tools never pay the init cost.",
  },
];

const multiAgentPatterns = [
  {
    title: "Built-in sub-agents by specialization",
    description:
      "explore, plan, general, verification, claudeCodeGuide \u2014 each specialized for a task type. Specialization means smaller system prompts, focused tool sets, and better performance per task.",
  },
  {
    title: "Agent memory snapshots",
    description:
      "Agents can snapshot and restore memory, enabling context switching without losing work. Critical for multi-step workflows where the agent needs to come back to a previous state.",
  },
  {
    title: "Fork vs Spawn",
    description:
      "fork creates a child with shared context \u2014 good for subtasks that need parent's knowledge. spawn creates an independent agent \u2014 good for parallel work on separate concerns. Different tools for different coordination patterns.",
  },
  {
    title: "Coordinator mode",
    description:
      "One Claude orchestrating multiple worker Claudes with restricted toolsets and scratchpads. The coordinator sees summaries, not full transcripts. Hierarchical delegation with information compression.",
  },
];

const watchFeatures = [
  {
    title: "Background Agents (Kairos)",
    description:
      "24/7 agents with GitHub webhooks, push notifications, PR monitoring. The biggest upcoming shift \u2014 agents that work while you sleep.",
    status: "near-ready",
  },
  {
    title: "Voice Mode (Tengu)",
    description:
      "Full push-to-talk with Deepgram Nova 3. Gemstone codenames for flags: tengu_cobalt_frost, tengu_amber_quartz.",
    status: "in progress",
  },
  {
    title: "Coordinator Mode",
    description:
      "Multi-agent orchestration at scale. One Claude spawning and managing workers with isolated tool sets.",
    status: "near-ready",
  },
  {
    title: "Plugin Marketplace",
    description:
      "Third-party extensions with discovery, installation, validation, and marketplace browsing. Full plugin lifecycle management.",
    status: "built",
  },
  {
    title: "Cron Scheduling",
    description:
      "CronCreateTool, CronDeleteTool, CronListTool \u2014 agents as scheduled jobs. Basically agent-powered CI/CD.",
    status: "built",
  },
];

const keyTakeaways = [
  {
    number: 1,
    text: "Single-threaded simplicity beats concurrent complexity for LLM agents",
    detail:
      "The entire Claude Code runtime is a sequential loop. No race conditions, no locks, no deadlocks. When your agent framework is hard to debug, that's a design smell.",
  },
  {
    number: 2,
    text: "Defense in depth for tool permissions \u2014 multiple layers, each cheap",
    detail:
      "Trust gate, deferred init, deny lists, per-tool safety, destructive command warnings. Five layers, each trivial to implement, together nearly impossible to bypass.",
  },
  {
    number: 3,
    text: "Session compaction is essential for long-running agents",
    detail:
      "Truncation loses information. Compaction preserves it. Any agent that runs for more than a few turns needs a strategy for managing context window pressure.",
  },
  {
    number: 4,
    text: "Specialize your sub-agents by task type",
    detail:
      "A general-purpose agent is mediocre at everything. An exploration agent with only read tools is excellent at investigation. Match the tool set to the job.",
  },
  {
    number: 5,
    text: "Build the infra for features before shipping them",
    detail:
      "44 feature flags, A/B testing, gradual rollout, kill switches. Claude Code has entire subsystems built and waiting behind flags. Ship the plumbing first.",
  },
];

export default function LessonsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold font-mono mb-2">
          <span className="text-text-muted">$ </span>
          <span className="text-text-primary">Lessons for Builders</span>
        </h1>
        <p className="text-text-secondary text-lg mb-12">
          Practical takeaways from studying 1,902 TypeScript files of production
          agentic infrastructure. These are patterns worth stealing.
        </p>
      </motion.div>

      {/* Section 1: Architecture Patterns */}
      <section className="mb-16" id="architecture-patterns">
        <SectionHeader
          id="architecture-patterns-header"
          title="Architecture Patterns Worth Stealing"
          subtitle="How Claude Code stays debuggable at scale"
        />

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {architecturePatterns.map((pattern, i) => (
            <PatternCard
              key={pattern.title}
              title={pattern.title}
              description={pattern.description}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <CodeBlock title="simplified master loop (codename 'nO')">
{`while (session.active) {
  const userInput = await queryEngine.getInput();
  const toolCalls = await queryEngine.submit(userInput, {
    budget: session.remainingBudget,
    tools: toolPool.getAvailable(permissionContext),
  });

  for (const call of toolCalls) {
    // Sequential execution — no concurrency
    const result = await executionRegistry.route(call);
    session.transcript.append(result);
  }

  if (session.contextPressure > COMPACTION_THRESHOLD) {
    await session.compact(); // Preserve meaning, reduce tokens
  }
}`}
          </CodeBlock>
        </motion.div>
      </section>

      {/* Section 2: Tool Design */}
      <section className="mb-16" id="tool-design">
        <SectionHeader
          id="tool-design-header"
          title="Tool Design Patterns"
          subtitle="How to give an LLM the right capabilities without the wrong ones"
        />

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {toolPatterns.map((pattern, i) => (
            <PatternCard
              key={pattern.title}
              title={pattern.title}
              description={pattern.description}
              index={i}
              accent="border-border"
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <CodeBlock title="tool permission layering">
{`// Layer 1: Trust gate — is the user trusted at all?
if (!trustContext.verified) return MINIMAL_TOOLS;

// Layer 2: Deferred init — load expensive tools now
await toolPool.loadDeferred(mcpConnections, lspServers);

// Layer 3: Deny lists — block specific tools
const filtered = toolPool.filter({
  denyNames: ["rm", "format", "drop"],
  denyPrefixes: ["Dangerous", "Internal"],
});

// Layer 4: Per-tool safety — tool-level checks
// BashTool: destructive command warnings + preapproved list
// FileWriteTool: path validation
// AgentTool: restricted sub-agent toolsets`}
          </CodeBlock>
        </motion.div>
      </section>

      {/* Section 3: Multi-Agent */}
      <section className="mb-16" id="multi-agent">
        <SectionHeader
          id="multi-agent-header"
          title="Multi-Agent Patterns"
          subtitle="How Claude Code coordinates multiple AI workers"
        />

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {multiAgentPatterns.map((pattern, i) => (
            <PatternCard
              key={pattern.title}
              title={pattern.title}
              description={pattern.description}
              index={i}
              accent="border-border"
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <CodeBlock title="fork vs spawn">
{`// Fork: child inherits parent context
const child = await forkSubagent({
  parentContext: session.transcript,
  tools: parentTools.subset(["FileReadTool", "GrepTool", "GlobTool"]),
  task: "Find all uses of deprecated API",
});

// Spawn: independent agent, clean slate
const worker = await spawnMultiAgent({
  tools: ["BashTool", "FileEditTool"],
  scratchpad: new Scratchpad(),
  task: "Refactor auth module",
  reportTo: coordinator,
});`}
          </CodeBlock>
        </motion.div>
      </section>

      {/* Section 4: What to Watch */}
      <section className="mb-16" id="what-to-watch">
        <SectionHeader
          id="what-to-watch-header"
          title="What to Watch"
          subtitle="Features that are built and waiting behind flags"
        />

        <div className="grid gap-4">
          {watchFeatures.map((feature, i) => (
            <WatchCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              status={feature.status}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Section 5: Key Takeaways */}
      <section className="mb-16" id="key-takeaways">
        <SectionHeader
          id="key-takeaways-header"
          title="Key Takeaways"
          subtitle="The 5 lessons that matter most"
        />

        <div className="space-y-4">
          {keyTakeaways.map((takeaway, i) => (
            <motion.div
              key={takeaway.number}
              className="bg-bg-secondary border border-border rounded-lg p-5"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
            >
              <div className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent font-mono font-bold text-sm flex items-center justify-center">
                  {takeaway.number}
                </span>
                <div>
                  <h4 className="font-mono text-sm font-bold text-text-primary mb-1">
                    {takeaway.text}
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {takeaway.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <motion.div
        className="border-t border-border pt-8 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-text-muted text-sm font-mono text-center">
          Extracted from analysis of Claude Code v2.1.88 source maps.
          <br />
          Educational reference only.
        </p>
      </motion.div>
    </div>
  );
}
