"use client";

import { useState, useMemo } from "react";
import commandsData from "@/data/commands_snapshot.json";
import toolsData from "@/data/tools_snapshot.json";

interface Item {
  name: string;
  source_hint: string;
  responsibility: string;
}

type Tab = "commands" | "tools";

function getGroup(source_hint: string): string {
  // e.g. "commands/branch/branch.ts" → "branch", "tools/AgentTool/AgentTool.tsx" → "AgentTool"
  const parts = source_hint.split("/");
  if (parts.length >= 2) {
    return parts[1];
  }
  return parts[0] || "other";
}

function ItemRow({ item }: { item: Item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left border-b border-border hover:bg-bg-tertiary/50 transition-colors"
    >
      <div className="flex items-center gap-4 px-4 py-3">
        <span className="text-text-muted text-xs font-mono shrink-0">
          {expanded ? "[-]" : "[+]"}
        </span>
        <span className="text-accent font-mono text-sm font-semibold min-w-[140px] sm:min-w-[180px] shrink-0">
          {item.name}
        </span>
        <span className="text-text-muted font-mono text-xs hidden md:block truncate min-w-0">
          {item.source_hint}
        </span>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-1 space-y-2 border-t border-border/50 bg-bg-primary/50">
          <div>
            <span className="text-text-muted text-xs font-mono">
              source:{" "}
            </span>
            <span className="text-text-secondary font-mono text-xs break-all">
              {item.source_hint}
            </span>
          </div>
          <div>
            <span className="text-text-muted text-xs font-mono">
              responsibility:{" "}
            </span>
            <span className="text-text-secondary text-sm">
              {item.responsibility}
            </span>
          </div>
        </div>
      )}
    </button>
  );
}

export default function ExplorerPage() {
  const [activeTab, setActiveTab] = useState<Tab>("commands");
  const [search, setSearch] = useState("");
  const [groupByDir, setGroupByDir] = useState(false);

  const data: Item[] = activeTab === "commands" ? commandsData : toolsData;
  const totalCount = data.length;

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.source_hint.toLowerCase().includes(q) ||
        item.responsibility.toLowerCase().includes(q)
    );
  }, [data, search]);

  const grouped = useMemo(() => {
    if (!groupByDir) return null;
    const groups: Record<string, Item[]> = {};
    for (const item of filtered) {
      const group = getGroup(item.source_hint);
      if (!groups[group]) groups[group] = [];
      groups[group].push(item);
    }
    return Object.entries(groups).sort(([a], [b]) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
  }, [filtered, groupByDir]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="border-b border-border bg-bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-mono">
            <span className="text-accent">$</span> explorer
          </h1>
          <p className="text-text-secondary mt-2 text-sm sm:text-base">
            Browse all commands and tools extracted from the Claude Code source.
            Click any row to expand details.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Tab toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveTab("commands");
              setSearch("");
            }}
            className={`px-4 py-2 rounded font-mono text-sm transition-colors ${
              activeTab === "commands"
                ? "bg-accent text-white"
                : "bg-bg-tertiary text-text-secondary hover:text-text-primary"
            }`}
          >
            Commands ({(commandsData as Item[]).length})
          </button>
          <button
            onClick={() => {
              setActiveTab("tools");
              setSearch("");
            }}
            className={`px-4 py-2 rounded font-mono text-sm transition-colors ${
              activeTab === "tools"
                ? "bg-accent text-white"
                : "bg-bg-tertiary text-text-secondary hover:text-text-primary"
            }`}
          >
            Tools ({(toolsData as Item[]).length})
          </button>
        </div>

        {/* Search + controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent font-mono text-sm select-none">
              {">"}
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab} by name, path, or description...`}
              className="w-full bg-bg-secondary border border-border rounded px-4 py-2.5 pl-8 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-text-secondary text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={groupByDir}
                onChange={(e) => setGroupByDir(e.target.checked)}
                className="accent-accent"
              />
              <span className="font-mono">Group by directory</span>
            </label>
          </div>
        </div>

        {/* Result count */}
        <div className="text-text-muted text-xs font-mono">
          Showing {filtered.length} of {totalCount}{" "}
          {activeTab === "commands" ? "commands" : "tools"}
          {search.trim() && (
            <span>
              {" "}
              matching{" "}
              <span className="text-accent">&quot;{search.trim()}&quot;</span>
            </span>
          )}
        </div>

        {/* Table */}
        <div className="border border-border rounded bg-bg-secondary overflow-hidden">
          {/* Column headers */}
          <div className="flex items-center gap-4 px-4 py-2 bg-bg-tertiary/70 border-b border-border text-text-muted text-xs font-mono uppercase tracking-wider">
            <span className="shrink-0 w-6" />
            <span className="min-w-[140px] sm:min-w-[180px] shrink-0">
              Name
            </span>
            <span className="hidden md:block truncate min-w-0">
              Source Path
            </span>
          </div>

          {/* Rows */}
          <div className="max-h-[65vh] overflow-y-auto">
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-text-muted font-mono text-sm">
                No {activeTab} found matching &quot;{search}&quot;
              </div>
            )}

            {groupByDir && grouped
              ? grouped.map(([group, items]) => (
                  <div key={group}>
                    <div className="px-4 py-2 bg-bg-primary border-b border-border sticky top-0 z-10">
                      <span className="font-mono text-xs text-shipped font-semibold">
                        {group}/
                      </span>
                      <span className="text-text-muted text-xs font-mono ml-2">
                        ({items.length})
                      </span>
                    </div>
                    <div className="flex flex-col">
                      {items.map((item, i) => (
                        <ItemRow
                          key={`${group}-${item.name}-${i}`}
                          item={item}
                        />
                      ))}
                    </div>
                  </div>
                ))
              : filtered.map((item, i) => (
                  <ItemRow key={`${item.name}-${i}`} item={item} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
