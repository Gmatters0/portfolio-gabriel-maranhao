"use client";

import { useState, type ReactNode } from "react";
import { Carousel } from "@/components/motion/carousel";
import { RumorMap } from "@/components/rumor-map";
import { cn } from "@/lib/utils";

const MODES = [
  { id: "cards", label: "Cartões" },
  { id: "rumor", label: "Diário de bordo" },
] as const;

export function ProjectsView({ slides }: { slides: ReactNode[] }) {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("cards");

  return (
    <>
      <div className="mb-8 hidden justify-center md:flex">
        <div className="inline-flex border-2 border-border-strong" role="group" aria-label="Modo de visualização">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                "px-4 py-1.5 font-mono text-xs tracking-wide uppercase transition-colors",
                mode === m.id ? "bg-[var(--accent)] text-[var(--accent-foreground)]" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {mode === "rumor" ? (
        <div className="hidden md:block" style={{ animation: "fade-in 0.5s ease-out" }}>
          <RumorMap />
        </div>
      ) : null}
      <div className={cn(mode === "rumor" && "md:hidden")}>
        <Carousel slides={slides} slideClassName="basis-[85%] sm:basis-1/2 lg:basis-1/3" />
      </div>
    </>
  );
}
