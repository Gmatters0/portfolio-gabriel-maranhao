"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-welcomed";
const WORD = "Bem-vindo.";

// Tela de entrada "Bem-vindo." — roda só na primeira visita da sessão (sessionStorage),
// depois some e não volta a aparecer até uma nova aba/sessão.
export function Loader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Flag de montagem evita mismatch de hidratação: o servidor não sabe se o
    // sessionStorage já marca esta sessão como "vista".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sem sessionStorage: melhor não bloquear a entrada do site
      return;
    }
    setVisible(true);
    document.body.style.overflow = "hidden";
    const timeout = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2200);
    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-background [animation:loader-out_900ms_ease-in_1300ms_forwards] motion-reduce:hidden"
    >
      <div className="flex font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
        {WORD.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block opacity-0 [animation:letter-in_620ms_cubic-bezier(0.2,0.9,0.25,1)_forwards]"
            style={{
              animationDelay: `${60 + i * 40}ms`,
              color: char === "." ? "var(--accent-on-bg)" : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="relative h-px w-56 overflow-hidden bg-border-strong">
        <div className="absolute inset-0 origin-left scale-x-0 bg-[var(--accent-on-bg)] [animation:rule-fill_1300ms_cubic-bezier(0.4,0,0.2,1)_forwards]" />
      </div>
    </div>
  );
}
