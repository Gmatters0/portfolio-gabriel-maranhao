"use client";

import { ACCENTS, useAccent } from "@/components/providers/accent-provider";
import { cn } from "@/lib/utils";

export function AccentSwitcher({ className }: { className?: string }) {
  const { accent, setAccent } = useAccent();

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2 py-1.5",
        className
      )}
      role="group"
      aria-label="Selecionar cor de destaque do site"
    >
      {ACCENTS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setAccent(option.value)}
          aria-label={`Cor de destaque ${option.label}`}
          aria-pressed={accent === option.value}
          title={option.label}
          className={cn(
            "size-4 rounded-full ring-offset-2 ring-offset-card transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            accent === option.value && "ring-2 ring-foreground/70 scale-110"
          )}
          style={{ backgroundColor: option.swatch }}
        />
      ))}
    </div>
  );
}
