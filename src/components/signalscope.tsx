"use client";

import { Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buildWhatsAppLink, MAILTO, portfolio, WHATSAPP_DEFAULT_MESSAGE } from "@/data";
import { cn } from "@/lib/utils";

const STATIONS = [
  { f: 14, label: "WhatsApp", href: buildWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE), external: true },
  { f: 38, label: "E-mail", href: MAILTO, external: false },
  { f: 63, label: "LinkedIn", href: portfolio.contato.linkedin, external: true },
  { f: 87, label: "GitHub", href: portfolio.contato.github, external: true },
];
const LOCK = 2.5;

function nearest(f: number) {
  let best = STATIONS[0];
  for (const s of STATIONS) if (Math.abs(s.f - f) < Math.abs(best.f - f)) best = s;
  return { station: best, d: Math.abs(best.f - f) };
}

// Sinalscópio de Outer Wilds: sintonize uma frequência; perto de um canal o ruído vira
// uma onda limpa e o canal de contato "trava" para você conectar.
export function Signalscope() {
  const [freq, setFreq] = useState(50);
  const freqRef = useRef(freq);
  const pathRef = useRef<SVGPathElement>(null);
  const { station, d } = nearest(freq);
  const strength = Math.max(0, 1 - d / 14);
  const locked = d < LOCK;

  useEffect(() => {
    freqRef.current = freq;
  }, [freq]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    const draw = (t: number) => {
      const { d: dist } = nearest(freqRef.current);
      const s = Math.max(0, 1 - dist / 14);
      const pts: string[] = [];
      for (let i = 0; i <= 80; i++) {
        const wave = Math.sin(i * 0.45 + t / 120) * 11 * s;
        const noise = (Math.random() - 0.5) * 22 * (1 - s) ** 1.5;
        pts.push(`${(i * 1.25).toFixed(2)} ${(16 + wave + noise).toFixed(2)}`);
      }
      pathRef.current?.setAttribute("d", `M${pts.join(" L")}`);
    };
    const loop = (t: number) => {
      if (t - last > 50 && !document.hidden) {
        last = t;
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    };
    if (reduced) draw(0);
    else raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-xl pixel-card p-5 text-left">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-muted-faint uppercase">
        <span className="flex items-center gap-2">
          <Radio className="size-3.5 text-[var(--accent-on-bg)]" />
          Sinalscópio · ajuste a frequência
        </span>
        <span className="tabular-nums">{(80 + freq * 0.4).toFixed(1)} MHz</span>
      </div>

      <svg viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden className="mt-3 h-16 w-full bg-background/60">
        <path
          ref={pathRef}
          fill="none"
          stroke={locked ? "var(--accent-on-bg)" : "var(--muted-foreground)"}
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <label htmlFor="signalscope-dial" className="sr-only">
        Frequência do sinalscópio
      </label>
      <input
        id="signalscope-dial"
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={freq}
        onChange={(e) => setFreq(Number(e.target.value))}
        aria-valuetext={locked ? `Sintonizado em ${station.label}` : "Ruído estático"}
        className="mt-3 w-full accent-[var(--accent-on-bg)]"
      />
      <div className="relative mt-1 h-6">
        {STATIONS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setFreq(s.f)}
            className={cn(
              "absolute -translate-x-1/2 font-mono text-[10px] tracking-wider uppercase transition-colors",
              locked && station === s ? "text-[var(--accent-on-bg)]" : "text-muted-faint hover:text-foreground"
            )}
            style={{ left: `${s.f}%` }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-end gap-1" aria-hidden>
          {[0.15, 0.35, 0.55, 0.75, 0.92].map((th, i) => (
            <span
              key={i}
              className={cn("w-1.5", strength >= th ? "bg-[var(--accent-on-bg)]" : "bg-border-strong")}
              style={{ height: 6 + i * 4 }}
            />
          ))}
        </div>
        <p aria-live="polite" className="flex-1 font-mono text-xs text-muted-foreground">
          {locked ? `Sinal travado: ${station.label}` : "Só ruído… continue procurando"}
        </p>
        <a
          href={locked ? station.href : undefined}
          target={locked && station.external ? "_blank" : undefined}
          rel={locked && station.external ? "noopener noreferrer" : undefined}
          aria-disabled={!locked}
          tabIndex={locked ? 0 : -1}
          className={cn(
            "border-2 px-3 py-1.5 font-mono text-xs tracking-wide uppercase transition-colors",
            locked
              ? "border-[var(--accent-on-bg)] text-[var(--accent-on-bg)] hover:bg-[var(--accent-soft)]"
              : "pointer-events-none border-border text-muted-faint"
          )}
        >
          Conectar
        </a>
      </div>
    </div>
  );
}
