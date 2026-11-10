"use client";

import { useEffect, useState } from "react";

const LOOP_SECONDS = 22 * 60;
const NOVA_MS = 3200;

type Phase = "idle" | "nova" | "wake";

// Easter egg do ciclo de 22 minutos de Outer Wilds: um relógio discreto no rodapé conta até o sol
// explodir; aí vem a supernova, a página volta ao topo e o ciclo recomeça. O tempo só corre com a
// aba visível, e clicar no relógio antecipa o fim do ciclo.
export function LoopClock() {
  const [left, setLeft] = useState(LOOP_SECONDS);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const t = setInterval(() => {
      if (!document.hidden) setLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Cada fase agenda a próxima em um efeito próprio (assim a troca de fase não cancela o timer).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dispara a sequência quando o relógio zera
    if (left === 0 && phase === "idle") setPhase("nova");
  }, [left, phase]);

  useEffect(() => {
    if (phase !== "nova") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(
      () => {
        window.scrollTo({ top: 0 });
        setLeft(LOOP_SECONDS);
        setPhase("wake");
      },
      reduced ? 0 : NOVA_MS
    );
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "wake") return;
    const t = setTimeout(() => setPhase("idle"), 3800);
    return () => clearTimeout(t);
  }, [phase]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <>
      <button
        type="button"
        onClick={() => setLeft(0)}
        title="O sol explode quando o relógio zerar. Clique para acelerar o fim do ciclo."
        className="font-mono text-xs text-muted-faint tabular-nums transition-colors hover:text-[#ff9a2b]"
      >
        ☉ Supernova em {mm}:{ss}
      </button>

      {phase === "nova" && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, #ffffff 0%, #bfe8ff 35%, #5aa9e6 60%, rgba(90,169,230,0) 72%)",
              animation: `supernova ${NOVA_MS}ms cubic-bezier(0.6, 0, 0.9, 0.4) forwards`,
            }}
          />
        </div>
      )}

      {phase === "wake" && (
        <div
          role="status"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-background px-6 text-center"
          style={{ animation: "fade-out 1.2s ease-in 2.6s forwards" }}
        >
          <div style={{ animation: "fade-in 0.8s ease-out" }}>
            <p className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Você acorda junto à fogueira.
            </p>
            <p className="mt-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              O ciclo recomeçou · 22:00
            </p>
          </div>
        </div>
      )}
    </>
  );
}
