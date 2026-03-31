export function CodeBlock({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="bg-bg-primary border border-border rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-border bg-bg-secondary">
          <span className="font-mono text-xs text-text-muted">{title}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm font-mono text-text-primary leading-relaxed">
        {children}
      </pre>
    </div>
  );
}
