import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Inside Claude Code — Architecture Deep Dive",
  description:
    "An interactive study of Claude Code's architecture based on the March 2026 source analysis. Educational material for AI engineers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 min-w-0 lg:ml-64">{children}</main>
        </div>
      </body>
    </html>
  );
}
