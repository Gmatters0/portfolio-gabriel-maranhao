import raw from "./portfolio-data.json";
import type { PortfolioData } from "./types";

// Fonte única de verdade: conteudo-portfolio.json. Edite o JSON para atualizar o site.
export const portfolio = raw as PortfolioData;

export function buildWhatsAppLink(message: string): string {
  return `${portfolio.contato.whatsapp_link}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá Gabriel, vi seu portfólio e gostaria de conversar sobre um projeto.";

export const MAILTO = `mailto:${portfolio.contato.email}`;
