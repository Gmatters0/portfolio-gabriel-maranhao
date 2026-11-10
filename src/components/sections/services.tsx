"use client";

import { ArrowRight, GraduationCap, Layers, Settings, Wand2, Wrench, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { FadeInStagger, FadeInStaggerItem } from "@/components/motion/fade-in";
import { buildWhatsAppLink, portfolio } from "@/data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "Manutenção e evolução de sistemas": Wrench,
  "Criação de sites e landing pages": Layers,
  "Criação de sistemas web": Settings,
  "Automação de processos": Wand2,
  "Consultoria em programação e resolução de problemas": Wrench,
  "Aulas particulares de programação": GraduationCap,
};

const STATUS = "> módulo online";

// Radar da nave: um blip por serviço; o blip do console sob o mouse pulsa.
function Radar({ count, active }: { count: number; active: number | null }) {
  return (
    <div aria-hidden className="relative size-52 shrink-0 rounded-full border-2 border-border-strong bg-card/40">
      {[0.33, 0.66].map((s) => (
        <div
          key={s}
          className="absolute rounded-full border border-border"
          style={{ inset: `${(1 - s) * 50}%` }}
        />
      ))}
      <div className="absolute top-1/2 left-0 h-px w-full bg-border" />
      <div className="absolute top-0 left-1/2 h-full w-px bg-border" />
      <div
        className="absolute inset-0 rounded-full motion-reduce:animate-none"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, var(--accent-soft-border) 50deg, transparent 52deg)",
          animation: "spin 4s linear infinite",
        }}
      />
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 - Math.PI / 2;
        const r = 30 + (i % 2) * 12;
        return (
          <span
            key={i}
            className={cn(
              "absolute size-2 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent-on-bg)]",
              active === i ? "[animation:blip_0.9s_ease-in-out_infinite]" : "opacity-50"
            )}
            style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%` }}
          />
        );
      })}
    </div>
  );
}

export function Services() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="servicos" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <SectionHeading
            eyebrow="Serviços"
            title="Como posso ajudar o seu projeto"
            description="Do levantamento de requisitos à entrega, com comunicação clara em cada etapa. Escolha o serviço e solicite um orçamento sem compromisso."
          />
          <div className="hidden lg:block">
            <Radar count={portfolio.servicos.length} active={hover} />
          </div>
        </div>

        <FadeInStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.servicos.map((servico, i) => {
            const Icon = ICONS[servico.nome] ?? Wrench;
            const message = `Olá Gabriel, gostaria de solicitar um orçamento para: ${servico.nome}.`;
            return (
              <FadeInStaggerItem key={servico.nome}>
                <div
                  className="group flex h-full flex-col pixel-card"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                >
                  {/* Barra do console: número do módulo e LEDs */}
                  <div className="flex items-center justify-between border-b-2 border-border-strong px-4 py-2 font-mono text-[10px] tracking-widest text-muted-faint uppercase">
                    <span>Módulo {String(i + 1).padStart(2, "0")}</span>
                    <span className="flex gap-1.5">
                      <span className="size-1.5 bg-muted-faint transition-colors group-hover:bg-[var(--accent-on-bg)] group-hover:[animation:led_0.6s_steps(1)_infinite]" />
                      <span className="size-1.5 bg-muted-faint transition-colors delay-100 group-hover:bg-[#ffd86b]" />
                      <span className="size-1.5 bg-muted-faint transition-colors delay-200 group-hover:bg-[#e8452c]" />
                    </span>
                  </div>

                  {/* Tela do console */}
                  <div className="relative flex flex-1 flex-col gap-4 overflow-hidden p-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-10 opacity-0 transition-opacity group-hover:opacity-100 group-hover:[animation:scan_1.8s_linear_infinite] motion-reduce:hidden"
                      style={{ background: "linear-gradient(to bottom, transparent, var(--accent-soft), transparent)" }}
                    />
                    <div className="flex size-11 items-center justify-center rounded-sm bg-[var(--accent-soft)] text-[var(--accent-on-bg)] transition-shadow group-hover:shadow-[0_0_18px_var(--accent-soft-border)]">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{servico.nome}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{servico.descricao}</p>
                    <p
                      aria-hidden
                      className="w-0 overflow-hidden font-mono text-xs whitespace-nowrap text-[var(--accent-on-bg)] transition-[width] duration-700 ease-[steps(15)] group-hover:w-[15ch]"
                    >
                      {STATUS}
                    </p>
                    <a
                      href={buildWhatsAppLink(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                      className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--accent-on-bg)] hover:opacity-80"
                    >
                      Solicitar orçamento
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
