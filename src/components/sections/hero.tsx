"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/typing-text";
import { buildWhatsAppLink, portfolio, WHATSAPP_DEFAULT_MESSAGE } from "@/data";

// Resumo de impacto para o hero: as duas primeiras frases do resumo oficial do JSON.
const heroSummary = portfolio.resumo.split(". ").slice(0, 2).join(". ").trim();
const heroSummaryFormatted = heroSummary.endsWith(".") ? heroSummary : `${heroSummary}.`;

const [firstName, ...restName] = portfolio.nome.split(" ");
const lastName = restName.join(" ");

export function Hero() {
  return (
    <section id="top" className="pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div className="container-page">
        <TypingText
          text={`${portfolio.headline} — ${portfolio.localizacao}`}
          speed={22}
          className="font-mono text-xs tracking-wider text-muted-foreground uppercase sm:text-sm"
        />

        <h1 className="mt-5 max-w-4xl font-heading text-[clamp(3rem,11vw,7.5rem)] leading-[0.92] font-bold tracking-tight text-foreground">
          {firstName}{" "}
          <span className="font-normal text-[var(--accent-on-bg)] italic">{lastName}.</span>
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
            className="h-12 rounded-sm bg-[var(--accent)] px-6 text-base font-semibold text-[var(--accent-foreground)] hover:bg-[var(--accent)] hover:opacity-90"
          >
            <MessageCircle className="size-5" />
            Conversar no WhatsApp
          </Button>
          <Button
            render={<a href="#projetos" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="h-12 rounded-sm border-border-strong px-6 text-base font-semibold"
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
            className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)]"
          >
            <LinkedinIcon className="size-5" />
          </a>
          <a
            href={portfolio.contato.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Gabriel Maranhão"
            className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)]"
          >
            <GithubIcon className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
