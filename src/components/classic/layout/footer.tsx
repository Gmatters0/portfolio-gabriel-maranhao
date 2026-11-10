import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { MAILTO, buildWhatsAppLink, WHATSAPP_DEFAULT_MESSAGE, portfolio } from "@/data";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page flex flex-col gap-8 py-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-sm">
            <p className="font-mono text-[13px] font-medium tracking-wide text-foreground uppercase">
              {portfolio.nome}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{portfolio.headline}</p>
            <p className="mt-1 text-sm text-muted-foreground">{portfolio.localizacao}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Links rápidos">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-start gap-3">
            <a
              href={buildWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)]"
            >
              <MessageCircle className="size-4" />
            </a>
            <a
              href={MAILTO}
              aria-label="E-mail"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)]"
            >
              <Mail className="size-4" />
            </a>
            <a
              href={portfolio.contato.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)]"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href={portfolio.contato.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--accent-soft-border)] hover:text-[var(--accent-on-bg)]"
            >
              <GithubIcon className="size-4" />
            </a>
          </div>
        </div>

        <p className="border-t border-border pt-6 font-mono text-xs text-muted-faint">
          © {year} {portfolio.nome}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
