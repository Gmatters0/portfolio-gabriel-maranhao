import { PixelSprite } from "@/components/pixel/pixel-sprite";
import { planets, RES, type PlanetKind } from "@/components/pixel/planets";
import { cn } from "@/lib/utils";

// Planeta decorativo que fica "preso" na tela (sticky) enquanto a seção rola, flutuando devagar.
// Precisa de um ancestral sem overflow:hidden (use overflow-x-clip na seção).
export function PixelPlanet({
  kind,
  scale = 4,
  delay = 0,
  top = 112,
  className,
}: {
  kind: PlanetKind;
  scale?: number;
  delay?: number;
  top?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-y-0 hidden opacity-90 lg:block", className)}
    >
      <div className="sticky w-fit" style={{ top }}>
        <div className="motion-reduce:animate-none" style={{ animation: `bob 9s ease-in-out ${delay}s infinite` }}>
          <PixelSprite frames={[planets[kind]]} scale={scale / RES} />
        </div>
      </div>
    </div>
  );
}
