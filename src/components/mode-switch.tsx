"use client";

import { Rocket } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export type SiteMode = "classico" | "expedicao";

const TARGET: Record<SiteMode, string> = { classico: "/expedicao", expedicao: "/" };

// Interruptor entre o portfólio clássico e o "Modo Expedição" (Outer Wilds). Cada modo tem seu
// próprio root layout, então a troca é uma navegação completa; antes dela, um círculo escuro
// se expande a partir do botão para a passagem não parecer um recarregamento seco.
export function ModeSwitch({
  mode,
  labelClassName,
  className,
}: {
  mode: SiteMode;
  /** Ex.: "max-sm:sr-only" esconde o rótulo visualmente em telas estreitas (segue para leitores de tela). */
  labelClassName?: string;
  className?: string;
}) {
  const on = mode === "expedicao";
  const [flipped, setFlipped] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Voltar pelo histórico (bfcache) restaura a página com o overlay ainda na tela.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      overlayRef.current?.remove();
      overlayRef.current = null;
      setFlipped(false);
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  const go = (e: MouseEvent<HTMLButtonElement>) => {
    const target = TARGET[mode];
    setFlipped(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.assign(target);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.cssText = `position:fixed;inset:0;z-index:200;pointer-events:none;background:#09090b;clip-path:circle(0px at ${x}px ${y}px)`;
    document.body.appendChild(overlay);
    overlayRef.current = overlay;
    overlay
      .animate([{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${radius}px at ${x}px ${y}px)` }], {
        duration: 550,
        delay: 180,
        easing: "cubic-bezier(0.7, 0, 0.3, 1)",
        fill: "forwards",
      })
      .finished.then(() => window.location.assign(target));
  };

  const lit = on !== flipped;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={go}
      title={on ? "Voltar ao portfólio clássico" : "Explorar o portfólio no Modo Expedição"}
      className={cn(
        "group inline-flex shrink-0 items-center gap-2 font-mono text-[11px] font-medium tracking-wide text-foreground/70 uppercase transition-colors hover:text-foreground",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-300",
          lit ? "border-[var(--accent)] bg-[var(--accent)]/25" : "border-border bg-muted"
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 left-0.5 flex size-3.5 -translate-y-1/2 items-center justify-center rounded-full transition-[translate,background-color,box-shadow] duration-300",
            lit
              ? "translate-x-4 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
              : "translate-x-0 bg-foreground/60"
          )}
        >
          <Rocket className={cn("size-2.5 text-background transition-opacity", lit ? "opacity-100" : "opacity-0")} />
        </span>
      </span>
      <span className={labelClassName}>Modo Expedição</span>
    </button>
  );
}
