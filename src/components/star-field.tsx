"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; depth: number; size: number; phase: number; color: string };

const COLORS = ["#ece4d4", "#ece4d4", "#9ab4ff", "#ffc66e"];
const WARM_DISTANCE = 900;

// Céu de pixels fixo no fundo. Estrelas paradas:
// cintilação suave e um brilho de fogueira que sobe pelas bordas ao chegar no rodapé.
export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(220, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          depth,
          size: depth > 0.8 ? 3 : depth > 0.45 ? 2 : 1,
          phase: Math.random() * Math.PI * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const draw = (t: number) => {
      const scroll = window.scrollY;
      const remaining = document.documentElement.scrollHeight - (scroll + h);
      const warm = Math.min(1, Math.max(0, 1 - remaining / WARM_DISTANCE));

      ctx.clearRect(0, 0, w, h);

      if (warm > 0) {
        const flicker = reduced ? 1 : 0.88 + 0.12 * Math.sin(t / 170) * Math.sin(t / 410 + 1);
        const g = ctx.createRadialGradient(w / 2, h, 0, w / 2, h, Math.max(w, h) * 0.75);
        g.addColorStop(0, `rgba(255,138,43,${0.34 * warm * flicker})`);
        g.addColorStop(0.5, `rgba(255,110,30,${0.12 * warm * flicker})`);
        g.addColorStop(1, "rgba(255,110,30,0)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      const dim = 1 - 0.55 * warm;
      for (const s of stars) {
        const y = s.y;
        const tw = reduced ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(t / 900 + s.phase));
        ctx.globalAlpha = tw * (0.35 + s.depth * 0.65) * dim;
        ctx.fillStyle = s.color;
        ctx.fillRect(Math.round(s.x), Math.round(y), s.size, s.size);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      if (t - last > 33 && !document.hidden) {
        last = t;
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    };
    const onScroll = () => draw(performance.now());
    if (reduced) {
      draw(0);
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
