# Portfólio — Gabriel Maranhão

Site de portfólio pessoal de [Gabriel Maranhão](https://github.com/Gmatters0), Desenvolvedor de Software & Analista de Gestão de Projetos. Construído com foco em venda de serviços (freelas, consultoria, aulas) e captação de oportunidades CLT/PJ.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **[Framer Motion](https://motion.dev)** — animações e transições
- **[shadcn/ui](https://ui.shadcn.com)** (estilo `base-nova`, sobre `@base-ui/react`) — componentes base
- **[Embla Carousel](https://www.embla-carousel.com)** — carrossel de projetos e experiências (mobile)
- **[lucide-react](https://lucide.dev)** — ícones
- Fontes: **Bricolage Grotesque** (títulos/nome), **Hanken Grotesk** (texto corrido), **JetBrains Mono** (labels, datas, eyebrows), via `next/font`

Sem backend/CMS — conteúdo 100% estático, vindo de um único arquivo de dados.

## Conteúdo é dado, não código

Todo o texto do site (experiências, serviços, projetos, formação, links de contato etc.) vive em [`src/data/portfolio-data.json`](src/data/portfolio-data.json), tipado por [`src/data/types.ts`](src/data/types.ts) e exposto pelos componentes via [`src/data/index.ts`](src/data/index.ts).

Para atualizar o currículo, edite esse JSON — não é necessário mexer em componentes.

## Funcionalidades

- **Accent switcher**: 4 cores de destaque (azul/verde/laranja/vermelho) trocáveis pelo visitante, persistidas em `localStorage` e propagadas via `data-accent` no `<html>`.
- **Tema claro/escuro**: `next-themes`, com script anti-flash.
- **Loading "Bem-vindo."**: roda uma vez por sessão do navegador (`sessionStorage`).
- **Conteúdo retrátil**: resumo (Sobre) e bullets de experiências mostram um teaser e expandem sob demanda.
- **Efeito de digitação**: subtítulos em mono digitam em tempo real ao entrar na tela (`useInView`), respeitando `prefers-reduced-motion`.
- **Timeline de experiência** animada no desktop, carrossel no mobile.
- **Marquee** de papéis/funções e lista numerada de áreas de atuação.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de produção
npm run lint    # ESLint
```

## Deploy

Projeto pronto para [Vercel](https://vercel.com/new) (ou qualquer host compatível com Next.js) — sem variáveis de ambiente necessárias.
