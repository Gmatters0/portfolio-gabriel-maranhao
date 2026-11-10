"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PixelSprite } from "@/components/pixel/pixel-sprite";
import { lander } from "@/components/pixel/lander";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/typing-text";
import { launchProbe } from "@/lib/probe-launch";
import { buildWhatsAppLink, portfolio, WHATSAPP_DEFAULT_MESSAGE } from "@/data";

// Resumo de impacto para o hero: as duas primeiras frases do resumo oficial do JSON.
const heroSummary = portfolio.resumo.split(". ").slice(0, 2).join(". ").trim();
const heroSummaryFormatted = heroSummary.endsWith(".") ? heroSummary : `${heroSummary}.`;

const [firstName, ...restName] = portfolio.nome.split(" ");
const lastName = restName.join(" ");

const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0");

export function Hero() {
  const hud = useRef<HTMLSpanElement>(null);

  function onMove(e: MouseEvent<HTMLElement>) {
    if (hud.current) hud.current.textContent = `X:${pad(e.clientX)}  Y:${pad(e.clientY)}`;
  }

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative overflow-hidden pt-10 pb-24 sm:pt-14 sm:pb-32"
    >
      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <TypingText
              text={`${portfolio.headline} — ${portfolio.localizacao}`}
              speed={22}
              className="font-mono text-xs tracking-wider text-muted-foreground uppercase sm:text-sm"
            />

            <h1 className="mt-5 font-heading text-[clamp(2.6rem,7.5vw,5.8rem)] leading-[1.02] font-bold tracking-tight text-foreground">
              {firstName} <span className="text-[var(--accent-on-bg)]">{lastName}.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {heroSummaryFormatted}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                render={
                  <a
                    href={buildWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
                size="lg"
                className="h-12 rounded-none bg-[var(--accent)] px-6 text-base font-semibold text-[var(--accent-foreground)] shadow-[4px_4px_0_0_rgba(0,0,0,0.55)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[var(--accent)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.55)]"
              >
                <MessageCircle className="size-5" />
                Conversar no WhatsApp
              </Button>
              <Button
                render={<a href="#projetos" onClick={(e) => launchProbe(e, "projetos")} />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="h-12 rounded-none border-border-strong px-6 text-base font-semibold"
              >
                Ver projetos
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="mt-9 flex items-center gap-4">
              <a
                href={portfolio.contato.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Gabriel Maranhão"
                className="flex size-10 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)]"
              >
                <LinkedinIcon className="size-5" />
              </a>
              <a
                href={portfolio.contato.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Gabriel Maranhão"
                className="flex size-10 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)]"
              >
                <GithubIcon className="size-5" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute inset-[10%] rounded-full blur-3xl"
              style={{ background: "var(--accent-soft)" }}
            />
            <div className="relative [animation:bob_5s_ease-in-out_infinite] motion-reduce:animate-none">
              <PixelSprite
                frames={lander}
                fluid
                frameDuration={0.6}
                label="Pixel art da nave Hearthian de Outer Wilds"
              />
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-14 hidden font-mono text-[11px] tracking-widest text-muted-faint uppercase sm:block"
        >
          Coordenadas do cursor — <span ref={hud}>X:0000 Y:0000</span>
        </p>
      </div>
    </section>
  );
}
