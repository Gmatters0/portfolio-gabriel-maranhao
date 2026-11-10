import { ExternalLink, FolderKanban, Lock } from "lucide-react";
import Image from "next/image";
import { PixelPlanet } from "@/components/pixel/pixel-planet";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { ProjectsView } from "@/components/projects-view";
import { Badge } from "@/components/ui/badge";
import { portfolio } from "@/data";
import { cn } from "@/lib/utils";

export function Projects() {
  const slides = portfolio.projetos.map((projeto) => (
    <article
      key={projeto.nome}
      className="flex h-full flex-col overflow-hidden pixel-card"
    >
      {projeto.imagem ? (
        <div
          className={cn(
            "relative aspect-[16/10] w-full border-b border-border",
            projeto.imagem_ajuste === "contain" ? "bg-white" : "bg-muted"
          )}
        >
          <Image
            src={projeto.imagem}
            alt={`Captura de tela do projeto ${projeto.nome}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
            className={cn(
              projeto.imagem_ajuste === "contain"
                ? "object-contain p-10"
                : "object-cover object-top"
            )}
          />
        </div>
      ) : (
        <div className="p-6 pb-0">
          <div className="flex size-11 items-center justify-center rounded-sm bg-[var(--accent-soft)] text-[var(--accent-on-bg)]">
            <FolderKanban className="size-5" />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">{projeto.nome}</h3>
          <p className="mt-1 font-mono text-xs text-muted-faint uppercase">
            {projeto.tipo ? `${projeto.contexto} · ${projeto.tipo}` : projeto.contexto}
          </p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{projeto.descricao}</p>

        {projeto.tecnologias.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {projeto.tecnologias.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="cursor-default rounded-sm text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-[var(--accent-soft-border)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-on-bg)]"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {projeto.url ? (
          <a
            href={projeto.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 font-mono text-xs font-medium tracking-wide text-[var(--accent-on-bg)] uppercase hover:opacity-80"
          >
            Ver projeto
            <ExternalLink className="size-3.5" />
          </a>
        ) : (
          <span className="inline-flex w-fit items-center gap-1.5 font-mono text-xs tracking-wide text-muted-faint uppercase">
            <Lock className="size-3.5" />
            Uso privado
          </span>
        )}
      </div>
    </article>
  ));

  return (
    <section id="projetos" className="relative overflow-x-clip py-20 sm:py-28">
      <PixelPlanet kind="interloper" scale={4} top={120} className="right-6 xl:right-16" />
      <div className="container-page">
        <SectionHeading
          eyebrow="Projetos em destaque"
          title="Trabalhos recentes"
          description="Sites, sistemas e aplicativos entregues ou em andamento, com links para os projetos publicados."
          align="center"
          className="mx-auto"
        />

        <FadeIn delay={0.1} className="mt-14">
          <ProjectsView slides={slides} />
        </FadeIn>
      </div>
    </section>
  );
}
