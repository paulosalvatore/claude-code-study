"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

const subsystems = [
  { name: "utils", files: 564, desc: "Shared utilities" },
  { name: "components", files: 389, desc: "UI components, React/Ink" },
  { name: "services", files: 130, desc: "AgentSummary, MagicDocs, etc." },
  { name: "hooks", files: 104, desc: "React hooks, notifications" },
  { name: "bridge", files: 31, desc: "Bridge API, config, debug" },
  { name: "constants", files: 21, desc: "API limits, betas, common" },
  { name: "skills", files: 20, desc: "Bundled skills (batch, claudeApi, etc.)" },
  { name: "cli", files: 19, desc: "CLI handlers" },
  { name: "keybindings", files: 14, desc: "Key binding system" },
  { name: "types", files: 11, desc: "Type definitions, generated events" },
  { name: "migrations", files: 11, desc: "Settings migration system" },
  { name: "memdir", files: 8, desc: "Memory directory, relevant memories" },
  { name: "entrypoints", files: 8, desc: "CLI, init, SDK types" },
  { name: "buddy", files: 6, desc: "The pet system" },
  { name: "state", files: 6, desc: "AppState, store" },
  { name: "vim", files: 5, desc: "Vim motions, operators, text objects" },
  { name: "remote", files: 4, desc: "Remote session manager, WebSocket" },
  { name: "native-ts", files: 4, desc: "Color diff, file index, yoga layout" },
  { name: "server", files: 3, desc: "Direct connect session, manager" },
  { name: "screens", files: 3, desc: "Doctor, REPL, ResumeConversation" },
  { name: "plugins", files: 2, desc: "Built-in plugins, bundled" },
  { name: "upstreamproxy", files: 2, desc: "Relay, proxy" },
  { name: "assistant", files: 1, desc: "Session history" },
  { name: "bootstrap", files: 1, desc: "State" },
  { name: "coordinator", files: 1, desc: "Coordinator mode" },
  { name: "moreright", files: 1, desc: "useMoreRight hook" },
  { name: "outputStyles", files: 1, desc: "Output style loading" },
  { name: "schemas", files: 1, desc: "Hook schemas" },
  { name: "voice", files: 1, desc: "Voice mode enabled flag" },
];

const totalFiles = subsystems.reduce((sum, s) => sum + s.files, 0);
const maxFiles = subsystems[0].files;

function getSizeCategory(files: number): "large" | "medium" | "small" {
  if (files >= 100) return "large";
  if (files >= 4) return "medium";
  return "small";
}

function getBarColor(files: number): string {
  if (files >= 100) return "bg-accent";
  if (files >= 10) return "bg-accent/60";
  if (files >= 4) return "bg-text-secondary";
  return "bg-text-muted";
}

function getTextColor(files: number): string {
  if (files >= 100) return "text-accent";
  if (files >= 10) return "text-text-primary";
  return "text-text-muted";
}

function getGridSpan(files: number): string {
  if (files >= 300) return "md:col-span-2 lg:col-span-2";
  if (files >= 100) return "md:col-span-2 lg:col-span-1";
  return "";
}

export default function SubsystemsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold font-mono mb-2">
          <span className="text-text-muted">$ </span>
          Subsystems Map
        </h1>
        <p className="text-text-secondary mb-8 max-w-2xl">
          Claude Code is organized into 29 subsystems containing {totalFiles.toLocaleString()} files.
          This map shows the relative scale and purpose of each module.
        </p>
      </motion.div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <div className="text-2xl font-mono font-bold text-accent">{subsystems.length}</div>
          <div className="text-text-muted text-sm">subsystems</div>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <div className="text-2xl font-mono font-bold text-shipped">{totalFiles.toLocaleString()}</div>
          <div className="text-text-muted text-sm">total files</div>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <div className="text-2xl font-mono font-bold text-unshipped">{subsystems.filter(s => s.files >= 100).length}</div>
          <div className="text-text-muted text-sm">large (&ge;100 files)</div>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <div className="text-2xl font-mono font-bold text-text-muted">{subsystems.filter(s => s.files <= 3).length}</div>
          <div className="text-text-muted text-sm">micro (&le;3 files)</div>
        </div>
      </motion.div>

      {/* Distribution bar */}
      <SectionHeader
        id="distribution"
        title="File Distribution"
        subtitle="Relative size of each subsystem — the top 4 account for 78% of all files"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 bg-bg-secondary border border-border rounded-lg p-4 md:p-6"
      >
        <div className="space-y-2">
          {subsystems.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-28 md:w-36 shrink-0 text-right">
                <span className={`font-mono text-sm ${getTextColor(s.files)}`}>
                  {s.name}
                </span>
              </div>
              <div className="flex-1 h-5 bg-bg-tertiary rounded-sm overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(s.files / maxFiles) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.04 }}
                  className={`h-full ${getBarColor(s.files)} rounded-sm`}
                  style={{ minWidth: s.files > 0 ? "2px" : "0" }}
                />
              </div>
              <div className="w-12 shrink-0 text-right">
                <span className={`font-mono text-xs ${getTextColor(s.files)}`}>
                  {s.files}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive grid */}
      <SectionHeader
        id="grid"
        title="Subsystem Grid"
        subtitle="Each card is sized proportionally to its file count"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {subsystems.map((s, i) => {
          const size = getSizeCategory(s.files);
          const span = getGridSpan(s.files);
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`bg-bg-secondary border border-border rounded-lg hover:border-accent/40 transition-colors ${span} ${
                size === "large" ? "p-6" : size === "medium" ? "p-4" : "p-3"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className={`font-mono font-bold ${
                  size === "large" ? "text-lg text-accent" : size === "medium" ? "text-base text-text-primary" : "text-sm text-text-muted"
                }`}>
                  {s.name}/
                </h3>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  size === "large"
                    ? "bg-accent/10 text-accent"
                    : size === "medium"
                    ? "bg-bg-tertiary text-text-secondary"
                    : "bg-bg-tertiary text-text-muted"
                }`}>
                  {s.files} {s.files === 1 ? "file" : "files"}
                </span>
              </div>
              <p className={`text-sm ${size === "small" ? "text-text-muted" : "text-text-secondary"}`}>
                {s.desc}
              </p>
              {/* Proportional indicator */}
              <div className="mt-3 h-1 bg-bg-tertiary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getBarColor(s.files)}`}
                  style={{ width: `${Math.max((s.files / maxFiles) * 100, 1)}%` }}
                />
              </div>
              {size === "large" && (
                <div className="mt-2 text-xs text-text-muted font-mono">
                  {((s.files / totalFiles) * 100).toFixed(1)}% of codebase
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Size tiers */}
      <SectionHeader
        id="tiers"
        title="Size Tiers"
        subtitle="Subsystems grouped by scale"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            label: "Large",
            range: "100+ files",
            color: "text-accent",
            borderColor: "border-accent/30",
            items: subsystems.filter(s => s.files >= 100),
          },
          {
            label: "Medium",
            range: "4-99 files",
            color: "text-text-primary",
            borderColor: "border-border",
            items: subsystems.filter(s => s.files >= 4 && s.files < 100),
          },
          {
            label: "Micro",
            range: "1-3 files",
            color: "text-text-muted",
            borderColor: "border-border",
            items: subsystems.filter(s => s.files <= 3),
          },
        ].map((tier, ti) => (
          <motion.div
            key={tier.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: ti * 0.1 }}
            className={`bg-bg-secondary border ${tier.borderColor} rounded-lg p-5`}
          >
            <div className="flex items-baseline gap-2 mb-3">
              <h3 className={`font-mono font-bold ${tier.color}`}>{tier.label}</h3>
              <span className="text-text-muted text-xs font-mono">{tier.range}</span>
            </div>
            <div className="text-sm text-text-muted mb-3 font-mono">
              {tier.items.length} subsystems / {tier.items.reduce((s, i) => s + i.files, 0).toLocaleString()} files
            </div>
            <ul className="space-y-1.5">
              {tier.items.map(s => (
                <li key={s.name} className="flex items-center justify-between text-sm">
                  <span className={`font-mono ${tier.color}`}>{s.name}/</span>
                  <span className="text-text-muted font-mono text-xs">{s.files}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-border pt-6 mb-8"
      >
        <p className="text-text-muted text-sm font-mono">
          // Data sourced from Claude Code v2.1.88 source map analysis.
          <br />
          // Total: {subsystems.length} subsystems, {totalFiles.toLocaleString()} TypeScript files across 1,902 source modules.
        </p>
      </motion.div>
    </div>
  );
}
