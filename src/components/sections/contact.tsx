import { Mail, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { buildWhatsAppLink, MAILTO, portfolio, WHATSAPP_DEFAULT_MESSAGE } from "@/data";

export function Contact() {
  return (
    <section id="contato" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="relative overflow-hidden rounded-sm border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] px-6 py-16 text-center sm:px-12">
          <span className="inline-flex items-center rounded-full border border-[var(--accent-soft-border)] bg-background px-4 py-1.5 font-mono text-xs tracking-wide text-[var(--accent-on-bg)] uppercase">
            Disponível para novos projetos e oportunidades
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Vamos conversar sobre o seu <span className="text-[var(--accent-on-bg)] italic">próximo projeto</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Seja um freela, uma consultoria pontual ou uma vaga de gestão de projetos e
            desenvolvimento, estou aberto a novas conversas.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
              className="h-12 w-full rounded-sm bg-[var(--accent)] px-6 text-base font-semibold text-[var(--accent-foreground)] hover:bg-[var(--accent)] hover:opacity-90 sm:w-auto"
            >
              <MessageCircle className="size-5" />
              Chamar no WhatsApp
            </Button>
            <Button
              render={<a href={MAILTO} />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-sm border-border-strong bg-background px-6 text-base font-semibold sm:w-auto"
            >
              <Mail className="size-5" />
              Enviar e-mail
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href={portfolio.contato.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Gabriel Maranhão"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition-colors hover:text-[var(--accent-on-bg)]"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href={portfolio.contato.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Gabriel Maranhão"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition-colors hover:text-[var(--accent-on-bg)]"
            >
              <GithubIcon className="size-5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
