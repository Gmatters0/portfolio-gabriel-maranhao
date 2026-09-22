export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-secondary/60 py-4 [transform:rotate(-0.4deg)] motion-reduce:[transform:none]">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 font-mono text-sm tracking-wide whitespace-nowrap text-muted-foreground uppercase after:content-['•'] after:text-[var(--accent-on-bg)]"
          >
            <span className="px-6">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
