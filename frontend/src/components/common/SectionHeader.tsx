export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}

export function SectionHeader({
  title,
  subtitle,
  as: Tag = "h2",
  id,
}: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <Tag
        id={id}
        className="text-lg font-semibold tracking-tight text-zinc-900 md:text-xl"
      >
        {title}
      </Tag>
      {subtitle ? (
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      ) : null}
    </div>
  );
}
