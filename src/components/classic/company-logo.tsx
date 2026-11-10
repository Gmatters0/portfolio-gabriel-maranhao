import { cn } from "@/lib/utils";

// Sem arquivos de logo reais disponíveis: usamos um monograma tratado como "logo"
// estilizado, consistente com a identidade tipográfica do site.
const MONOGRAMS: Record<string, string> = {
  "AWT Development": "AWT",
  "Tron Informática": "TI",
  "CTRL+Play": "C+",
  "FGR Incorporações": "FGR",
};

export function CompanyLogo({ empresa, className }: { empresa: string; className?: string }) {
  const initials = MONOGRAMS[empresa] ?? empresa.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-on-bg)]",
        className
      )}
      title={empresa}
      aria-hidden="true"
    >
      <span className="font-mono text-[11px] font-semibold tracking-tight">{initials}</span>
    </div>
  );
}
