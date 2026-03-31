export function SectionHeader({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8" id={id}>
      <h2 className="text-2xl font-bold font-mono">
        <span className="text-text-muted">## </span>
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary mt-2">{subtitle}</p>
      )}
    </div>
  );
}
