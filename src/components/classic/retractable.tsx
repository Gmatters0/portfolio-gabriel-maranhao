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
        onClick={() => setOpen((v) => !v)}
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
        {children}
      </div>
    </div>
  );
}
