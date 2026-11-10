"use client";

import Image from "next/image";
import { useState } from "react";
import { portfolio } from "@/data";
import { cn } from "@/lib/utils";

// Os cartões alternam entre a fileira de cima e a de baixo, então podem ficar a menos de uma
// largura de distância um do outro sem se sobrepor.
const STEP = 112;
const CARD_W = 128;
const CARD_H = 118;
const TOP_Y = 16;
const HUB_Y = 226;
const BOTTOM_Y = 318;
const HEIGHT = BOTTOM_Y + CARD_H + 16;

// Modo "rumor" do diário de bordo da nave: projetos agrupados pela empresa/contexto em que
// nasceram, ligados por linhas tracejadas a um nó central, como as pistas que você conecta no jogo.
// Dentro de cada grupo, projetos do mesmo tipo ficam lado a lado.
const layout = (() => {
  const groups = new Map<string, typeof portfolio.projetos>();
  for (const p of portfolio.projetos) groups.set(p.contexto, [...(groups.get(p.contexto) ?? []), p]);

  const nodes: { p: (typeof portfolio.projetos)[number]; x: number; y: number; hub: string }[] = [];
  const hubs: { name: string; x: number }[] = [];
  let i = 0;
  for (const [name, list] of groups) {
    const xs: number[] = [];
    const byType = [...list].sort((a, b) => (a.tipo ?? "").localeCompare(b.tipo ?? "", "pt-BR"));
    for (const p of byType) {
      const x = 20 + i * STEP;
      nodes.push({ p, x, y: i % 2 === 0 ? TOP_Y : BOTTOM_Y, hub: name });
      xs.push(x + CARD_W / 2);
      i++;
    }
    hubs.push({ name, x: xs.reduce((a, b) => a + b, 0) / xs.length });
  }
  return { nodes, hubs, width: 40 + (i - 1) * STEP + CARD_W };
})();

export function RumorMap() {
  const [active, setActive] = useState<string | null>(null);
  const { nodes, hubs, width } = layout;

  return (
    <div className="overflow-x-auto pb-4">
      <div
        className="relative mx-auto border-2 border-border-strong bg-[#0c0c0f]"
        style={{
          width,
          height: HEIGHT,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <svg aria-hidden className="absolute inset-0" width={width} height={HEIGHT}>
          {nodes.map(({ p, x, y, hub }) => {
            const on = active === hub;
            const cx = x + CARD_W / 2;
            const cy = y === TOP_Y ? y + CARD_H : y;
            const h = hubs.find((hb) => hb.name === hub)!;
            return (
              <line
                key={p.nome}
                x1={cx}
                y1={cy}
                x2={h.x}
                y2={HUB_Y + 14}
                stroke={on ? "#ff9a2b" : "rgba(255,154,43,0.35)"}
                strokeWidth={on ? 2 : 1.5}
                strokeDasharray="6 5"
                className="transition-[stroke] duration-200 motion-safe:[animation:dash_1.2s_linear_infinite]"
              />
            );
          })}
        </svg>

        {hubs.map((h) => (
          <button
            key={h.name}
            type="button"
            onMouseEnter={() => setActive(h.name)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(h.name)}
            onBlur={() => setActive(null)}
            className={cn(
              "absolute -translate-x-1/2 border-2 px-2.5 py-1 font-mono text-[10px] tracking-widest whitespace-nowrap uppercase transition-colors",
              active === h.name
                ? "border-[#ff9a2b] bg-[#ff9a2b] text-black"
                : "border-[#ff9a2b]/60 bg-[#0c0c0f] text-[#ffb35c]"
            )}
            style={{ left: h.x, top: HUB_Y }}
          >
            {h.name}
          </button>
        ))}

        {nodes.map(({ p, x, y, hub }) => {
          const dim = active !== null && active !== hub;
          const Card = p.url ? "a" : "div";
          return (
            <Card
              key={p.nome}
              {...(p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {})}
              onMouseEnter={() => setActive(hub)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                "absolute flex flex-col overflow-hidden border-2 bg-card transition-[opacity,border-color,transform] duration-200",
                active === hub ? "-translate-y-0.5 border-[#ff9a2b]" : "border-border-strong",
                dim && "opacity-35"
              )}
              style={{ left: x, top: y, width: CARD_W, height: CARD_H }}
            >
              <div className="relative h-16 w-full shrink-0 bg-muted">
                {p.imagem && (
                  <Image
                    src={p.imagem}
                    alt=""
                    fill
                    sizes="128px"
                    className={cn(p.imagem_ajuste === "contain" ? "bg-white object-contain p-2" : "object-cover object-top")}
                  />
                )}
              </div>
              <p className="line-clamp-2 px-2 pt-1.5 text-[11px] leading-tight font-semibold text-foreground">{p.nome}</p>
              <p className="truncate px-2 pt-0.5 font-mono text-[9px] text-muted-faint uppercase">
                {[p.tipo, !p.url && "privado"].filter(Boolean).join(" · ")}
              </p>
            </Card>
          );
        })}
      </div>
      <p className="mt-3 text-center font-mono text-[10px] tracking-widest text-muted-faint uppercase">
        Passe o mouse num nó para seguir a pista
      </p>
    </div>
  );
}
