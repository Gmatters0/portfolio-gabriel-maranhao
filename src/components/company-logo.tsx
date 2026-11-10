import { PixelSprite } from "@/components/pixel/pixel-sprite";
import { planets, RES, type PlanetKind } from "@/components/pixel/planets";
import { cn } from "@/lib/utils";

// Sem arquivos de logo reais: cada empresa vira um planeta em pixel art com o monograma por cima.
const MONOGRAMS: Record<string, { text: string; planet: PlanetKind }> = {
  "AWT Development": { text: "AWT", planet: "timberHearth" },
  "Tron Informática": { text: "TI", planet: "brittleHollow" },
  "CTRL+Play": { text: "C+", planet: "lantern" },
  "FGR Incorporações": { text: "FGR", planet: "giantsDeep" },
};

export function CompanyLogo({ empresa, className, scale = 2 }: { empresa: string; className?: string; scale?: number }) {
  const m = MONOGRAMS[empresa] ?? { text: empresa.slice(0, 2).toUpperCase(), planet: "attlerock" as PlanetKind };

  return (
    <div
      className={cn("relative flex size-12 items-center justify-center", className)}
      title={empresa}
      aria-hidden="true"
    >
      <PixelSprite frames={[planets[m.planet]]} scale={scale / RES} className="opacity-90" />
      <span className="absolute font-mono text-[10px] font-semibold tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
        {m.text}
      </span>
    </div>
  );
}
