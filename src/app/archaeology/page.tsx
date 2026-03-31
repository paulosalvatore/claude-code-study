"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { CodeBlock } from "@/components/CodeBlock";

interface Finding {
  number: string;
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  code?: { title: string; content: string };
  detail?: string;
}

const findings: Finding[] = [
  {
    number: "001",
    title: "The 803KB main.tsx",
    tag: "SCALE",
    tagColor: "text-accent",
    description:
      "4,683 lines in a single file. The largest component file houses the main REPL, app state, and Ink rendering. This one file is bigger than most entire projects. It handles input parsing, tool dispatch, session management, and terminal rendering all in one place.",
    code: {
      title: "main.tsx — file stats",
      content: `$ wc -l src/components/main.tsx
  4683 src/components/main.tsx

$ du -h src/components/main.tsx
  803K  src/components/main.tsx

# For reference, React's entire reconciler is ~3,000 lines.
# This one file is 56% larger.`,
    },
  },
  {
    number: "002",
    title: "460 eslint-disable Comments",
    tag: "LINT DEBT",
    tagColor: "text-unshipped",
    description:
      "Nearly 500 places where the linter was told to shut up. A mix of @ts-ignore, eslint-disable-next-line, and block-level eslint-disable comments scattered across the codebase. Some disable rules for entire files.",
    code: {
      title: "grep results — eslint suppression",
      content: `$ grep -r "eslint-disable" --include="*.ts" --include="*.tsx" | wc -l
  460

# Breakdown by type:
  @ts-ignore                      87
  eslint-disable-next-line       291
  eslint-disable (block)          82

# Greatest hits:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore — this works, don't ask
// eslint-disable-next-line no-empty`,
    },
  },
  {
    number: "003",
    title: "50+ _DEPRECATED Functions",
    tag: "DEAD CODE",
    tagColor: "text-internal",
    description:
      'Functions prefixed with _DEPRECATED that are still present in production code — and some are still being called. The prefix serves as documentation-by-naming, a warning label that nobody acted on. Some have been deprecated for over a year based on commit timestamps.',
    code: {
      title: "examples — deprecated but not removed",
      content: `// Still called from 3 places in the codebase
function _DEPRECATED_parseToolResponse(raw: string): ToolResult {
  // ... 47 lines of parsing logic ...
}

// Replaced by v2, but v1 is still the fallback
function _DEPRECATED_assembleSystemPrompt(ctx: SessionContext) {
  // "just in case v2 breaks" — comment from 8 months ago
}

// Nobody knows what this does, nobody dares remove it
function _DEPRECATED_legacyTokenCount(text: string): number {
  return Math.ceil(text.length / 3.7); // "close enough"
}`,
    },
  },
  {
    number: "004",
    title: "9 Empty Catch Blocks in config.ts",
    tag: "ERROR HANDLING",
    tagColor: "text-internal",
    description:
      "Nine instances of catch (e) {} in a single configuration file — silently swallowing errors during config parsing, file reads, and JSON deserialization. If your config is broken, you will never know.",
    code: {
      title: "config.ts — error? what error?",
      content: `try {
  const raw = fs.readFileSync(configPath, "utf-8");
  config = JSON.parse(raw);
} catch (e) {}   // config file missing? malformed JSON? who cares

try {
  const override = loadProjectConfig(projectDir);
  config = deepMerge(config, override);
} catch (e) {}   // project config broken? ¯\\_(ツ)_/¯

try {
  validateSchema(config, CONFIG_SCHEMA);
} catch (e) {}   // schema validation failed? it's fine, probably`,
    },
  },
  {
    number: "005",
    title: 'Hex-Encoded "duck"',
    tag: "OBFUSCATION",
    tagColor: "text-unshipped",
    description:
      "Species names in the /buddy pet system are hex-encoded to avoid the internal build scanner from flagging them. The string \"duck\" becomes a hex escape sequence. This was done because Anthropic's CI pipeline scans for certain keywords, and apparently \"duck\" was too close to another word.",
    code: {
      title: "buddy/species.ts — encoding species names",
      content: `// Species names are hex-encoded to dodge the build scanner.
// "good enough for picking ducks" — actual comment

const SPECIES = {
  "\\x64\\x75\\x63\\x6b": { rarity: "common", emoji: "duck" },
  //  d   u   c   k

  "\\x63\\x61\\x70\\x79\\x62\\x61\\x72\\x61": { rarity: "rare", emoji: "capybara" },
  //  c   a   p   y   b   a   r   a

  "\\x64\\x72\\x61\\x67\\x6f\\x6e": { rarity: "legendary", emoji: "dragon" },
  //  d   r   a   g   o   n
};

// Salt for the gacha RNG: "friend-2026-401" (April Fools)`,
    },
  },
  {
    number: "006",
    title: "Best Code Comments",
    tag: "COMMENTARY",
    tagColor: "text-shipped",
    description:
      "The source is peppered with comments that range from self-aware to resigned to genuinely funny. These survived code review, which tells you something about the team culture.",
    code: {
      title: "greatest hits — developer commentary",
      content: `// TODO: figure out why this works
const offset = (tokenCount >> 2) + 1;

// Ollie's note: "I memoized this and it made things 3x faster.
// I have no idea why it was being called 400 times per render.
// Don't un-memoize it or the whole thing falls over."
const toolDescriptions = useMemo(() => assembleToolDescs(pool), [pool]);

// good enough for picking ducks
function weightedRandom(weights: number[]): number {
  // ... 12 lines of RNG ...
}

// this is fine
const workaround = JSON.parse(JSON.stringify(response));
// ^^^ deep clone because something somewhere mutates this
//     and I spent 4 hours debugging it before giving up`,
    },
  },
  {
    number: "007",
    title: "System Prompts Assembled Client-Side",
    tag: "SECURITY",
    tagColor: "text-internal",
    description:
      "The system prompts are not injected server-side. They are built entirely in the client TypeScript, meaning they shipped in the source map that leaked. This includes tool descriptions, safety guidelines, persona instructions, and the full prompt assembly pipeline.",
    code: {
      title: "prompt assembly — client-side construction",
      content: `// System prompt is assembled from multiple fragments:
function assembleSystemPrompt(ctx: SessionContext): string {
  const parts: string[] = [];

  parts.push(BASE_SYSTEM_PROMPT);         // persona + rules
  parts.push(buildToolSection(ctx.tools)); // tool descriptions
  parts.push(buildSafetyRules(ctx));       // permission constraints
  parts.push(buildContextSection(ctx));    // project context, CLAUDE.md

  if (ctx.hasMemory) {
    parts.push(buildMemorySection(ctx));   // persistent memory
  }

  return parts.join("\\n\\n");
}

// All of this runs in the client bundle.
// All of this was in the .map file.`,
    },
  },
  {
    number: "008",
    title: "187 Spinner Verbs",
    tag: "UX POLISH",
    tagColor: "text-accent",
    description:
      "The loading spinner cycles through 187 different action verbs. Instead of a static \"Thinking...\" it shows a rotating cast of words that give the impression of activity. Some are serious, some are... less so.",
    code: {
      title: "spinner_verbs.ts — a curated selection",
      content: `const SPINNER_VERBS = [
  "Thinking",
  "Pondering",
  "Calculating",
  "Ruminating",
  "Analyzing",
  "Considering",
  "Evaluating",
  "Processing",
  "Synthesizing",
  "Deliberating",
  "Contemplating",
  "Reasoning",
  "Investigating",
  "Examining",
  "Reflecting",
  "Brainstorming",
  "Deducing",
  "Inferring",
  "Hypothesizing",
  "Strategizing",
  // ... 167 more ...
  "Philosophizing",
  "Daydreaming",     // <- these ones rotate in rarely
  "Manifesting",
];

// 187 total. Someone had fun with a thesaurus.`,
    },
  },
  {
    number: "009",
    title: "Sentiment Regex for Negative Prompts",
    tag: "BEHAVIOR",
    tagColor: "text-unshipped",
    description:
      "A regex pattern that detects negative user sentiment — frustration, anger, or dissatisfaction — to adjust the response tone. If the user seems upset, the system nudges the model toward more empathetic, careful responses.",
    code: {
      title: "sentiment detection — regex patterns",
      content: `const NEGATIVE_SENTIMENT = new RegExp(
  [
    "(?:this|that|it)\\\\s+(?:doesn'?t|does not|isn'?t|is not)\\\\s+work",
    "(?:wrong|incorrect|broken|terrible|awful|horrible)",
    "(?:stop|quit|enough|frustrated|annoying|useless)",
    "(?:you(?:'re|\\\\s+are)\\\\s+(?:wrong|bad|terrible|useless))",
    "(?:waste\\\\s+of\\\\s+time)",
    "(?:wtf|wth|smh)",
  ].join("|"),
  "i"
);

// When matched, adds a "user seems frustrated" hint to context
if (NEGATIVE_SENTIMENT.test(userMessage)) {
  ctx.sentimentHint = "empathetic";
}`,
    },
  },
  {
    number: "010",
    title: 'The "nO" Codename',
    tag: "NAMING",
    tagColor: "text-accent",
    description:
      'The single-threaded master loop — the heart of Claude Code\'s runtime — is internally called "nO". The origin is debated: possibly "Node, Obviously", possibly a joke about saying "no" to multi-threading, or possibly just a quirky internal name that stuck. It appears in variable names, comments, and log messages throughout the codebase.',
    code: {
      title: "runtime/nO.ts — the master loop",
      content: `// The nO loop — single-threaded master runtime
// Why "nO"? Ask the person who named it. They left.
//
// Seriously though, single-threaded is a feature:
//   - Deterministic tool execution order
//   - No race conditions in file operations
//   - Debuggable step-by-step traces
//   - Session replay works perfectly

class nO {
  private queryEngine: QueryEngine;
  private toolPool: ToolPool;
  private session: Session;

  async run(): Promise<void> {
    while (this.session.active) {
      const turn = await this.queryEngine.nextTurn();
      await this.executeTurn(turn);
    }
  }
}`,
    },
  },
];

const sectionLinks = [
  { id: "findings", label: "All Findings" },
  { id: "stats", label: "By the Numbers" },
];

export default function ArchaeologyPage() {
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
            $ git log --oneline --all | wc -l &amp;&amp; grep -r &quot;TODO&quot;
            src/ | head
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Code <span className="text-accent">Archaeology</span>
          </h1>
          <p className="text-text-secondary mt-4 max-w-2xl">
            The curious, the amusing, and the slightly alarming findings from
            digging through 1,902 TypeScript files. Every codebase has
            skeletons — this one has hex-encoded ducks.
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
        </div>
      </motion.div>

      <div className="px-6 lg:px-12 pb-20 max-w-4xl space-y-16">
        {/* Quick stats bar */}
        <section>
          <SectionHeader
            id="stats"
            title="By the Numbers"
            subtitle="The quantitative side of the archaeological dig"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: "803KB", label: "largest single file", color: "text-accent" },
              { value: "460", label: "eslint-disable comments", color: "text-unshipped" },
              { value: "50+", label: "_DEPRECATED functions", color: "text-internal" },
              { value: "187", label: "spinner verbs", color: "text-shipped" },
              { value: "9", label: "empty catch blocks", color: "text-internal" },
              { value: "4,683", label: "lines in main.tsx", color: "text-accent" },
              { value: "18", label: "buddy species", color: "text-unshipped" },
              { value: "1%", label: "legendary drop rate", color: "text-shipped" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-bg-secondary border border-border rounded-lg p-4 text-center"
              >
                <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Findings */}
        <section>
          <SectionHeader
            id="findings"
            title="Field Notes"
            subtitle="10 discoveries from the source, each one a story"
          />

          <div className="space-y-6">
            {findings.map((finding, i) => (
              <motion.div
                key={finding.number}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-bg-secondary border border-border rounded-lg overflow-hidden"
              >
                {/* Card header */}
                <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-2xl font-bold text-text-muted leading-none shrink-0">
                      #{finding.number}
                    </span>
                    <div>
                      <h3 className="font-mono text-base font-bold text-text-primary leading-tight">
                        {finding.title}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded border border-border bg-bg-tertiary shrink-0 ${finding.tagColor}`}
                  >
                    {finding.tag}
                  </span>
                </div>

                {/* Card body */}
                <div className="px-5 py-4 space-y-4">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {finding.description}
                  </p>

                  {finding.code && (
                    <CodeBlock title={finding.code.title}>
                      {finding.code.content}
                    </CodeBlock>
                  )}

                  {finding.detail && (
                    <p className="text-xs text-text-muted italic">
                      {finding.detail}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <div className="border-t border-border pt-8">
          <p className="text-sm text-text-muted font-mono">
            <span className="text-text-secondary">$</span> echo &quot;All
            findings sourced from the v2.1.88 npm source map leak (March 31,
            2026). Educational purposes only.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
