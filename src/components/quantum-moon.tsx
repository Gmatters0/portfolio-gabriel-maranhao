"use client";

import { useEffect, useRef, useState } from "react";
import { PixelSprite } from "@/components/pixel/pixel-sprite";
import { planets, RES } from "@/components/pixel/planets";

const SECTIONS = ["sobre", "pilares", "projetos", "especializacoes", "lideranca", "servicos", "formacao"];

type Spot = { top: number; left: string };

// Lua Quântica: só muda de lugar quando ninguém está olhando. Ao sair da tela, ela "salta"
// para outra seção (também fora da tela) e você a encontra em um lugar diferente depois.
export function QuantumMoon() {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState<Spot | null>(null);

  useEffect(() => {
    const pick = (avoid?: string) => {
      const candidates = SECTIONS.filter((id) => id !== avoid)
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)
        .map((el) => {
          const top = el.getBoundingClientRect().top + window.scrollY + 60 + Math.random() * 160;
          return { id: el.id, top };
        })
        // nunca aparece "na sua frente": só em posições fora da tela atual
        .filter((c) => c.top < window.scrollY - 200 || c.top > window.scrollY + window.innerHeight + 50);
      if (!candidates.length) return null;
      const c = candidates[Math.floor(Math.random() * candidates.length)];
      const side = Math.random() > 0.5;
      return { id: c.id, spot: { top: c.top, left: side ? "calc(100% - 9rem)" : "2rem" } };
    };

    let current = "";
    const first = pick();
    if (first) {
      current = first.id;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- posição depende do layout real da página
      setSpot(first.spot);
    }

    let seen = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        seen = true;
        return;
      }
      if (!seen) return;
      seen = false;
      const next = pick(current);
      if (next) {
        current = next.id;
        setSpot(next.spot);
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      title="Lua Quântica: ela só se move quando você não está olhando."
      aria-hidden
      className="pointer-events-auto absolute z-0 hidden opacity-90 lg:block"
      style={spot ? { top: spot.top, left: spot.left } : { top: -9999, left: 0 }}
    >
      <div className="[animation:bob_7s_ease-in-out_infinite] motion-reduce:animate-none">
        <PixelSprite frames={[planets.quantumMoon]} scale={5 / RES} />
      </div>
    </div>
  );
}
