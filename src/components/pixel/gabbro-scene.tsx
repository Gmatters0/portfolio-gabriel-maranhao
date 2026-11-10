import { PixelSprite } from "@/components/pixel/pixel-sprite";
import { gabbro } from "@/components/pixel/gabbro";

// Hearthian descansando na rede: balança devagar e solta "z" subindo.
export function GabbroScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative inline-block">
        <div
          className="origin-top motion-reduce:animate-none"
          style={{ animation: "hammock 6s ease-in-out infinite" }}
        >
          <PixelSprite frames={[gabbro]} scale={3} label="Pixel art de um Hearthian descansando em uma rede" />
        </div>
      </div>
      <p className="mt-2 font-mono text-[11px] tracking-widest text-muted-faint uppercase">
        Pausa para olhar as estrelas
      </p>
    </div>
  );
}
