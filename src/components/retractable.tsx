"use client";

import { ChevronDown } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Retractable({
  teaser,
  labelClosed = "Ler mais",
  labelOpen = "Recolher",
  children,
  className,
}: {
  teaser?: ReactNode;
  labelClosed?: string;
  labelOpen?: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [opens, setOpens] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    // A altura real só existe depois do layout (não é derivável durante o render).
    setMaxHeight(contentRef.current.scrollHeight);
  }, [open, children]);

  return (
    <div className={className}>
      {teaser && <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">{teaser}</p>}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (!open) setOpens((n) => n + 1);
          setOpen((v) => !v);
        }}
        className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-wide text-[var(--accent-on-bg)] uppercase"
      >
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
        {open ? labelOpen : labelClosed}
      </button>

      <div
        id={id}
        ref={contentRef}
        style={{ maxHeight: open ? maxHeight : 0 }}
        className={cn(
          "overflow-hidden opacity-0 transition-[max-height,opacity,margin-top] duration-[420ms] ease-out",
          open && "mt-4 opacity-100"
        )}
      >
        <div key={opens} className="relative pl-11">
          {open && <NomaiSpiral />}
          <div style={open ? { animation: "nomai-reveal 1.1s ease-out both" } : undefined}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// Espiral de escrita Nomai (espiral de Arquimedes) que se desenha ao abrir o conteúdo.
const SPIRAL = (() => {
  const pts: string[] = [];
  for (let t = 0; t <= Math.PI * 5; t += 0.18) {
    const r = 1.05 * t;
    pts.push(`${(16 + Math.cos(t) * r).toFixed(2)} ${(16 + Math.sin(t) * r).toFixed(2)}`);
  }
  return `M${pts.join(" L")}`;
})();

function NomaiSpiral() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className="absolute top-0 left-0 size-8 drop-shadow-[0_0_6px_rgba(143,180,255,0.7)]"
    >
      <title>Tradução Nomai</title>
      <path
        d={SPIRAL}
        pathLength={1}
        fill="none"
        stroke="#8fb4ff"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="1"
        style={{ animation: "nomai-draw 1s ease-out both" }}
      />
    </svg>
  );
}
