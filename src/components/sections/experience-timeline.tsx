"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Carousel } from "@/components/motion/carousel";
import { CompanyLogo } from "@/components/company-logo";
import { PixelSprite } from "@/components/pixel/pixel-sprite";
import { planets, RES } from "@/components/pixel/planets";
import { Retractable } from "@/components/retractable";
import { portfolio } from "@/data";
import type { Experiencia } from "@/data/types";

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
      <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--accent-on-bg)]" />
      {children}
    </li>
  );
}

function ExperienceCard({ exp, showLogo = true }: { exp: Experiencia; showLogo?: boolean }) {
  const [first, ...rest] = exp.bullets;
  return (
    <div className="h-full pixel-card p-5 sm:p-6">
      {showLogo && <CompanyLogo empresa={exp.empresa} />}
      <div className={`${showLogo ? "mt-4 " : ""}flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1`}>
        <h3 className="font-heading text-xl font-semibold text-foreground">{exp.cargo}</h3>
        <span className="font-mono text-xs text-[var(--accent-on-bg)]">{exp.periodo}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-muted-foreground">
        {exp.empresa} · {exp.local}
      </p>

      <ul className="mt-4 space-y-2">
        <Bullet>{first}</Bullet>
      </ul>

      {rest.length > 0 && (
        <Retractable
          labelClosed={`Ver mais ${rest.length} ${rest.length === 1 ? "responsabilidade" : "responsabilidades"}`}
          labelOpen="Ver menos"
        >
          <ul className="space-y-2">
            {rest.map((bullet, i) => (
              <Bullet key={i}>{bullet}</Bullet>
            ))}
          </ul>
        </Retractable>
      )}
    </div>
  );
}

// Um planeta por experiência, posicionado na órbita. O grupo inteiro gira com o scroll;
// cada planeta gira ao contrário para o monograma ficar sempre de pé.
function OrbitPlanet({
  exp,
  index,
  step,
  rot,
  active,
}: {
  exp: Experiencia;
  index: number;
  step: number;
  rot: MotionValue<number>;
  active: boolean;
}) {
  const upright = useTransform(rot, (v) => -v - index * step);
  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ transform: `translate(-50%, -50%) rotate(${index * step}deg) translateX(var(--orbit))` }}
    >
      <motion.div
        style={{ rotate: upright }}
        animate={{ scale: active ? 1.35 : 0.85, opacity: active ? 1 : 0.55 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <CompanyLogo empresa={exp.empresa} scale={4} className="size-16" />
      </motion.div>
    </div>
  );
}

// Timeline em órbita: a seção fica "presa" na tela enquanto o scroll gira os planetas
// em círculo; o planeta que chega ao ponto de foco (à direita) abre sua experiência.
function OrbitTimeline({ items }: { items: Experiencia[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.0005 });
  const n = items.length;
  const step = 360 / n;
  const rot = useTransform(p, [0, 1], [0, -(n - 1) * step]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(p, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1)))));
  });

  const stage = {
    "--s": "min(68vh, 34rem)",
    "--orbit": "calc(var(--s) * 0.4)",
  } as CSSProperties;

  return (
    <div ref={outer} className="relative hidden lg:block" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center gap-10">
        <div className="relative shrink-0" style={{ ...stage, width: "var(--s)", height: "var(--s)" }}>
          <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full -scale-y-100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-strong)" strokeWidth="0.4" strokeDasharray="1 1.6" />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--accent-on-bg)"
              strokeWidth="0.9"
              style={{ pathLength: p }}
            />
          </svg>

          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [animation:bob_6s_ease-in-out_infinite] motion-reduce:animate-none"
          >
            <PixelSprite frames={[planets.sun]} scale={6 / RES} />
          </div>

          <motion.div style={{ rotate: rot }} className="absolute inset-0">
            {items.map((exp, i) => (
              <OrbitPlanet
                key={`${exp.empresa}-${exp.cargo}`}
                exp={exp}
                index={i}
                step={step}
                rot={rot}
                active={i === active}
              />
            ))}
          </motion.div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-3 font-mono text-xs tracking-widest text-muted-faint uppercase">
            Órbita {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · role para avançar
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="max-h-[calc(100vh-11rem)] overflow-y-auto p-1 pr-2 pb-2"
            >
              <ExperienceCard exp={items[active]} showLogo={false} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experiencia" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experiência profissional"
          title="Trajetória em desenvolvimento e gestão de projetos"
          align="center"
          className="mx-auto"
        />

        {/* Mobile/tablet: carrossel horizontal com arraste */}
        <div className="mt-14 lg:hidden">
          <Carousel
            slides={portfolio.experiencias.map((exp) => (
              <ExperienceCard key={`${exp.empresa}-${exp.cargo}`} exp={exp} />
            ))}
            slideClassName="basis-[88%] sm:basis-1/2"
          />
        </div>

        {/* Desktop: órbita guiada pelo scroll */}
        <div className="mt-10">
          <OrbitTimeline items={portfolio.experiencias} />
        </div>
      </div>
    </section>
  );
}
