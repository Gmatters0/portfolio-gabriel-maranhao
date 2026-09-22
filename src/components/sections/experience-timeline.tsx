"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Carousel } from "@/components/motion/carousel";
import { CompanyLogo } from "@/components/company-logo";
import { Retractable } from "@/components/retractable";
import { portfolio } from "@/data";
import type { Experiencia } from "@/data/types";

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
      <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--accent-on-bg)]" />
      {children}
    </li>
  );
}

function ExperienceCard({ exp }: { exp: Experiencia }) {
  const [first, ...rest] = exp.bullets;
  return (
    <div className="h-full rounded-sm border border-border bg-card p-5 sm:p-6">
      <CompanyLogo empresa={exp.empresa} />
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-heading text-lg font-semibold text-foreground">{exp.cargo}</h3>
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

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experiencia" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experiência profissional"
          title="Trajetória em desenvolvimento e gestão de projetos"
          align="center"
          className="mx-auto"
        />

        {/* Mobile: carrossel horizontal com arraste, mais compacto para telas pequenas */}
        <div className="mt-14 lg:hidden">
          <Carousel
            slides={portfolio.experiencias.map((exp) => (
              <ExperienceCard key={`${exp.empresa}-${exp.cargo}`} exp={exp} />
            ))}
            slideClassName="basis-[88%] sm:basis-1/2"
          />
        </div>

        {/* Desktop: linha do tempo vertical animada */}
        <div ref={containerRef} className="relative mx-auto mt-16 hidden max-w-3xl lg:block">
          {/* Trilho estático + linha animada que "desenha" conforme o scroll */}
          <div className="absolute top-0 bottom-0 left-[19px] w-px bg-border sm:left-6" />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute top-0 bottom-0 left-[19px] w-px origin-top bg-[var(--accent-on-bg)] sm:left-6"
          />

          <ol className="flex flex-col gap-12">
            {portfolio.experiencias.map((exp) => (
              <li key={`${exp.empresa}-${exp.cargo}`} className="relative pl-12 sm:pl-16">
                <FadeIn y={16}>
                  <CompanyLogo
                    empresa={exp.empresa}
                    className="absolute top-0 left-0 border border-[var(--accent-soft-border)] sm:size-12"
                  />
                  <ExperienceCard exp={exp} />
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
