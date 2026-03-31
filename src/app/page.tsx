"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { label: "TypeScript Files", value: "1,902", color: "text-accent" },
  { label: "Commands", value: "207", color: "text-accent" },
  { label: "Tools", value: "184", color: "text-accent" },
  { label: "Subsystems", value: "28", color: "text-accent" },
  { label: "Feature Flags", value: "44", color: "text-unshipped" },
];

const timeline = [
  {
    date: "Feb 2025",
    title: "First source leak",
    desc: "Source maps included in npm package — quickly patched.",
  },
  {
    date: "Mar 31, 2026",
    title: "Second leak — v2.1.88",
    desc: "npm .map file exposes full TypeScript source. Community analysis begins within hours.",
  },
  {
    date: "Apr 2026",
    title: "Community analysis",
    desc: "Multiple deep dives published. Architecture documented. Feature flags cataloged.",
  },
];

const sections = [
  {
    href: "/architecture",
    title: "Architecture Deep Dive",
    desc: "Bootstrap flow, runtime loop, tool system, command registry, permissions",
    icon: ">_",
    border: "border-accent/30",
  },
  {
    href: "/features",
    title: "Hidden Features",
    desc: "44 feature flags — shipped, unshipped, and internal-only",
    icon: "##",
    border: "border-unshipped/30",
  },
  {
    href: "/explorer",
    title: "Interactive Explorer",
    desc: "Search and filter all 207 commands and 184 tools",
    icon: "$$",
    border: "border-accent/30",
  },
  {
    href: "/subsystems",
    title: "Subsystems Map",
    desc: "28 subsystems from 389-file components to 1-file voice module",
    icon: "%%",
    border: "border-shipped/30",
  },
  {
    href: "/archaeology",
    title: "Code Archaeology",
    desc: "460 eslint-disables, hex-encoded ducks, and the 803KB main.tsx",
    icon: "??",
    border: "border-internal/30",
  },
  {
    href: "/lessons",
    title: "Lessons for Builders",
    desc: "Architecture patterns, tool design, and multi-agent strategies to steal",
    icon: "!!",
    border: "border-shipped/30",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="px-6 lg:px-12 pt-12 lg:pt-20 pb-12"
      >
        <div className="max-w-4xl">
          <p className="font-mono text-sm text-text-muted mb-4">
            $ cat /analysis/claude-code/v2.1.88/summary.md
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Inside{" "}
            <span className="text-accent">Claude Code</span>
          </h1>
          <p className="text-lg text-text-secondary mt-4 max-w-2xl">
            An interactive architecture study based on the March 2026 source
            analysis. 1,902 TypeScript files. 28 subsystems. Every tool,
            command, and hidden feature — mapped.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-3xl font-bold font-mono ${s.color}`}>
                  {s.value}
                </div>
                <div className="text-xs text-text-muted mt-1 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <div className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl bg-bg-secondary border border-border rounded-lg p-4 font-mono text-xs text-text-muted">
          <span className="text-unshipped">// disclaimer:</span> This is an
          educational study tool, not a source distribution site. All analysis
          is based on publicly available community research of the leaked npm
          source maps.
        </div>
      </div>

      {/* Timeline */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl">
          <h2 className="text-xl font-bold font-mono text-text-primary mb-6" id="timeline">
            <span className="text-text-muted">##</span> Timeline
          </h2>
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent/50 z-10" />
                  {i < timeline.length - 1 && (
                    <div className="w-px h-full bg-border" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="font-mono text-xs text-accent">{t.date}</div>
                  <div className="font-semibold mt-1">{t.title}</div>
                  <div className="text-sm text-text-secondary mt-1">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Leaked */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl">
          <h2 className="text-xl font-bold font-mono text-text-primary mb-6" id="what-leaked">
            <span className="text-text-muted">##</span> What Leaked
          </h2>
          <div className="bg-bg-secondary border border-border rounded-lg p-6 font-mono text-sm space-y-3">
            <div>
              <span className="text-text-muted">package:</span>{" "}
              <span className="text-accent">@anthropic-ai/claude-code@2.1.88</span>
            </div>
            <div>
              <span className="text-text-muted">artifact:</span>{" "}
              <span className="text-text-primary">cli.mjs.map</span> (npm source map)
            </div>
            <div>
              <span className="text-text-muted">contents:</span>{" "}
              <span className="text-text-primary">
                Full TypeScript source — components, tools, commands, services,
                system prompts
              </span>
            </div>
            <div>
              <span className="text-text-muted">prior_leak:</span>{" "}
              <span className="text-text-secondary">
                Feb 2025 — similar .map exposure, quickly patched
              </span>
            </div>
            <div>
              <span className="text-text-muted">system_prompts:</span>{" "}
              <span className="text-unshipped">
                Assembled client-side, not server-side
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-4xl">
          <h2 className="text-xl font-bold font-mono text-text-primary mb-6" id="explore">
            <span className="text-text-muted">##</span> Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((s, i) => (
              <Link key={s.href} href={s.href}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`bg-bg-secondary border ${s.border} rounded-lg p-5 hover:bg-bg-tertiary/50 transition-colors group cursor-pointer h-full`}
                >
                  <div className="font-mono text-xs text-text-muted mb-2">
                    {s.icon}
                  </div>
                  <div className="font-semibold group-hover:text-accent transition-colors">
                    {s.title}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">
                    {s.desc}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
