import { PixelSprite } from "@/components/pixel/pixel-sprite";
import { campfire } from "@/components/pixel/sprites";

const SPARKS = [
  { left: "42%", delay: "0s", dx: "-10px", dur: "2.6s" },
  { left: "50%", delay: "0.9s", dx: "8px", dur: "3s" },
  { left: "57%", delay: "1.7s", dx: "14px", dur: "2.3s" },
  { left: "47%", delay: "2.1s", dx: "-4px", dur: "3.2s" },
];

// Fogueira de acampamento no fim da página: brilho pulsando, 2 quadros de chama e faíscas.
export function Campfire() {
  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center pt-24 pb-2">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 size-72 -translate-x-1/2 rounded-full [animation:fire-glow_2.4s_ease-in-out_infinite] motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,138,43,0.38) 0%, rgba(255,138,43,0.12) 40%, transparent 70%)",
        }}
      />
      {SPARKS.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute bottom-24 size-1 bg-[#ffd86b] opacity-0 motion-reduce:hidden"
          style={
            {
              left: s.left,
              "--dx": s.dx,
              animation: `spark-rise ${s.dur} ease-out ${s.delay} infinite`,
            } as React.CSSProperties
          }
        />
      ))}
      <PixelSprite frames={campfire} scale={3} frameDuration={0.7} label="Fogueira de acampamento" />
      <p className="relative mt-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Fique um pouco. A noite está tranquila.
      </p>
    </div>
  );
}
