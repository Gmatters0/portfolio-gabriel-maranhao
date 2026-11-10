"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type CSSProperties } from "react";
import { SectionHeading } from "@/components/section-heading";
import { PixelSprite } from "@/components/pixel/pixel-sprite";
import { planets, RES } from "@/components/pixel/planets";
import { portfolio } from "@/data";
import { cn } from "@/lib/utils";

// Cada especialização é um dos Gêmeos da Ampulheta, girando um ao redor do outro.
const TWINS = [
  { name: "Gêmeo de Cinzas", sprite: planets.ashTwin },
  { name: "Gêmeo de Brasa", sprite: planets.emberTwin },
];
const PERIOD = "28s";

export function Specializations() {
  const items = portfolio.especializando_atualmente;
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section id="especializacoes" className="overflow-x-clip py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Especializações atuais"
          title="Em que estou me aprofundando agora"
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div
            className="group relative mx-auto size-72 sm:size-80"
            style={{ "--d": "6.4rem" } as CSSProperties}
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-border-strong" />
            {/* Braço do sistema binário: gira; os planetas giram ao contrário para ficarem de pé. */}
            <div
              className="absolute inset-0 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              style={{ animation: `spin ${PERIOD} linear infinite` }}
            >
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 h-1 -translate-x-1/2 -translate-y-1/2 motion-reduce:animate-none"
                style={{
                  width: "calc(var(--d) * 2 - 5rem)",
                  backgroundImage: "repeating-linear-gradient(90deg, #f0d595 0 6px, transparent 6px 12px)",
                  animation: "sand-flow 0.8s linear infinite",
                }}
              />
              {items.map((item, i) => (
                <div
                  key={item.area}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translateX(calc(var(--d) * ${i === 0 ? -1 : 1}))`,
                  }}
                >
                  <div
                    className="group-hover:[animation-play-state:paused] motion-reduce:animate-none"
                    style={{ animation: `spin-rev ${PERIOD} linear infinite` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={active === i}
                      aria-label={`${TWINS[i].name}: ${item.area}`}
                      className="flex flex-col items-center gap-2 rounded-sm p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span
                        className={cn(
                          "block transition-transform duration-300",
                          active === i ? "scale-125 drop-shadow-[0_0_14px_rgba(255,176,59,0.55)]" : "scale-90 opacity-70 hover:opacity-100"
                        )}
                      >
                        <PixelSprite frames={[TWINS[i].sprite]} scale={7 / RES} />
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[10px] tracking-widest whitespace-nowrap uppercase",
                          active === i ? "text-[var(--accent-on-bg)]" : "text-muted-faint"
                        )}
                      >
                        {item.area}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-h-56">
            <p className="font-mono text-xs tracking-widest text-muted-faint uppercase">
              Clique em um dos gêmeos · {TWINS[active].name}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.area}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="mt-4 pixel-card p-6 sm:p-8"
                aria-live="polite"
              >
                <h3 className="font-heading text-2xl font-bold text-foreground">{current.area}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {current.detalhes}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
