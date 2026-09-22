"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Efeito de máquina de escrever para subtítulos curtos (eyebrows). O texto completo
// fica sempre disponível para leitores de tela via aria-label; a animação é decorativa.
export function TypingText({
  text,
  className,
  speed = 32,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Preferência só existe no client; não é derivável durante o render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(text.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed]);

  return (
    <span ref={ref} aria-label={text} className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span
          className={cn(
            "ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.1em] bg-current align-middle",
            inView && !done && "[animation:caret-blink_1s_step-end_infinite]",
            !inView && "opacity-0",
            done && "opacity-0"
          )}
        />
      </span>
    </span>
  );
}
