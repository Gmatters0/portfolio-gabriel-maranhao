"use client";

import { useEffect, useState } from "react";

// Chave própria: quem entra no Modo Expedição vindo do clássico também vê a abertura.
const STORAGE_KEY = "portfolio-expedicao-welcomed";
const WORD = "Bem-vindo.";
const GLYPHS = "▖▗▘▙▚▛▜▝▞▟▌▐▀▄";
const STEP_MS = 90;
const TOTAL_MS = WORD.length * STEP_MS * 2 + 700;

// Tela de entrada: glifos pixelados que se "traduzem" em "Bem-vindo." (letra a letra).
// Roda só na primeira visita da sessão (sessionStorage).
export function Loader() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(() => WORD.replace(/./g, " "));

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage só existe no client
    setVisible(true);
    document.body.style.overflow = "hidden";

    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      const resolved = Math.floor(tick / 2) - 2;
      setText(
        WORD.split("")
          .map((ch, i) => {
            if (i < resolved) return ch;
            if (i > resolved + 3) return " ";
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (resolved >= WORD.length) clearInterval(interval);
    }, STEP_MS);

    const done = setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setVisible(false);
      document.body.style.overflow = "";
    }, TOTAL_MS + 800);

    return () => {
      clearInterval(interval);
      clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
      style={{ animation: `loader-out 700ms ease-in ${TOTAL_MS}ms forwards` }}
    >
      <p className="font-heading text-4xl font-semibold tracking-widest whitespace-pre text-foreground sm:text-6xl">
        {text}
      </p>
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        traduzindo transmissão…
      </p>
    </div>
  );
}
