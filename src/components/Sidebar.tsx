"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    label: "Overview",
    href: "/",
    icon: "~",
    description: "Stats & timeline",
  },
  {
    label: "Architecture",
    href: "/architecture",
    icon: ">",
    description: "Bootstrap, runtime, tools",
  },
  {
    label: "Hidden Features",
    href: "/features",
    icon: "#",
    description: "44 feature flags",
  },
  {
    label: "Explorer",
    href: "/explorer",
    icon: "$",
    description: "Commands & tools search",
  },
  {
    label: "Subsystems",
    href: "/subsystems",
    icon: "%",
    description: "28 subsystem map",
  },
  {
    label: "Archaeology",
    href: "/archaeology",
    icon: "?",
    description: "Code curiosities",
  },
  {
    label: "Lessons",
    href: "/lessons",
    icon: "!",
    description: "Takeaways for builders",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-bg-secondary border border-border rounded-md p-2 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Toggle navigation"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-bg-secondary border-r border-border z-40 flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" onClick={() => setOpen(false)}>
            <h1 className="font-mono text-sm font-bold text-accent tracking-wider">
              inside_claude_code
            </h1>
            <p className="text-xs text-text-muted mt-1 font-mono">
              v2.1.88 // architecture study
            </p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-3 px-6 py-3 text-sm transition-colors group ${
                  active
                    ? "bg-accent/10 text-accent border-r-2 border-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50"
                }`}
              >
                <span
                  className={`font-mono text-xs mt-0.5 ${active ? "text-accent" : "text-text-muted group-hover:text-text-secondary"}`}
                >
                  {item.icon}
                </span>
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div
                    className={`text-xs mt-0.5 ${active ? "text-accent/70" : "text-text-muted"}`}
                  >
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-text-muted font-mono">
            educational // research
          </p>
          <p className="text-xs text-text-muted font-mono mt-1">
            by Paulo Salvatore
          </p>
        </div>
      </aside>
    </>
  );
}
