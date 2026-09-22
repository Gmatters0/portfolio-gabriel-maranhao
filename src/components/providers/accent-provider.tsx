"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { withThemeTransition } from "@/lib/view-transition";

export type Accent = "blue" | "green" | "orange" | "red";

export const ACCENTS: { value: Accent; label: string; swatch: string }[] = [
  { value: "blue", label: "Azul", swatch: "#1d4ed8" },
  { value: "green", label: "Verde", swatch: "#047857" },
  { value: "orange", label: "Laranja", swatch: "#c2410c" },
  { value: "red", label: "Vermelho", swatch: "#b91c1c" },
];

const STORAGE_KEY = "portfolio-accent";
const DEFAULT_ACCENT: Accent = "blue";

type AccentContextValue = {
  accent: Accent;
  setAccent: (accent: Accent) => void;
};

const AccentContext = createContext<AccentContextValue | undefined>(undefined);

// Script injetado antes da hidratação para aplicar o accent salvo sem "flash" de cor errada.
export const ACCENT_INIT_SCRIPT = `(function(){try{var a=localStorage.getItem("${STORAGE_KEY}");var v=(a==="blue"||a==="green"||a==="orange"||a==="red")?a:"${DEFAULT_ACCENT}";document.documentElement.setAttribute("data-accent",v);}catch(e){}})();`;

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<Accent>(DEFAULT_ACCENT);

  useEffect(() => {
    // Sincroniza o estado React com o atributo já aplicado pelo script anti-flash
    // (ACCENT_INIT_SCRIPT), que roda antes da hidratação a partir do localStorage.
    const current = document.documentElement.getAttribute("data-accent") as Accent | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única de estado externo (DOM) no mount, não é derivação de props/estado React
    if (current) setAccentState(current);
  }, []);

  const setAccent = useCallback((next: Accent) => {
    withThemeTransition(() => {
      setAccentState(next);
      document.documentElement.setAttribute("data-accent", next);
    });
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage indisponível (modo privado, etc.) — troca ainda funciona na sessão atual.
    }
  }, []);

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>
  );
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent deve ser usado dentro de <AccentProvider>");
  return ctx;
}
