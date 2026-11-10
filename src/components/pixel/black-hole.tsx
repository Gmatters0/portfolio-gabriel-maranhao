"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const N = 192;
const K = N / 96;
const PALETTE: [number, number, number][] = [
  [90, 36, 14],
  [200, 84, 24],
  [255, 150, 48],
  [255, 232, 170],
];

// Buraco negro em pixel art: disco de acreção girando, anel de fótons e arco de lente gravitacional.
export function BlackHole({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = ctx.createImageData(N, N);
    const c = N / 2;

    const frame = (t: number) => {
      const d = img.data;
      for (let y = 0; y < N; y++)
        for (let x = 0; x < N; x++) {
          const dx = x - c + 0.5;
          const dy = y - c + 0.5;
          const r = Math.hypot(dx, dy);
          let color: [number, number, number] | null = null;
          // disco: elipse achatada
          const ed = (dx / (46 * K)) ** 2 + (dy / (9 * K)) ** 2;
          if (ed < 1 && ed > 0.1 && !(dy < 0 && r < 14 * K)) {
            const ang = Math.atan2(dy * 4, dx);
            const b = 0.5 + 0.5 * Math.sin(ang * 3 - t / 500 + ed * 6);
            const level = Math.min(3, Math.floor((b * 0.8 + (1 - ed) * 0.5) * 4));
            color = PALETTE[Math.max(0, level)];
          }
          // arco de lente por cima do horizonte
          const lens = (dx / (24 * K)) ** 2 + ((dy + 9 * K) / (24 * K)) ** 2;
          if (dy < -8 * K && lens < 1 && lens > 0.72) color = PALETTE[2];
          // anel de fótons
          if (r > 13 * K && r < 15.2 * K) color = PALETTE[3];
          // horizonte de eventos
          if (r <= 13 * K) color = [4, 4, 6];
          const i = (y * N + x) * 4;
          if (color) {
            d[i] = color[0];
            d[i + 1] = color[1];
            d[i + 2] = color[2];
            d[i + 3] = 255;
          } else d[i + 3] = 0;
        }
      ctx.putImageData(img, 0, 0);
    };

    if (reduced) {
      frame(0);
      return;
    }
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      if (t - last > 80 && !document.hidden) {
        last = t;
        frame(t);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      width={N}
      height={N}
      aria-hidden
      className={cn("pixelated pointer-events-none", className)}
    />
  );
}
