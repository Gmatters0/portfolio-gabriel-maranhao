import { FolderKanban } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Carousel } from "@/components/motion/carousel";
import { Badge } from "@/components/ui/badge";
import { portfolio } from "@/data";

export function Projects() {
  const slides = portfolio.projetos.map((projeto) => (
    <div
      key={projeto.nome}
      className="flex h-full flex-col gap-4 rounded-sm border border-border bg-card p-6"
    >
      <div className="flex size-11 items-center justify-center rounded-sm bg-[var(--accent-soft)] text-[var(--accent-on-bg)]">
        <FolderKanban className="size-5" />
      </div>
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground">{projeto.nome}</h3>
        <p className="mt-1 font-mono text-xs text-muted-faint uppercase">{projeto.contexto}</p>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{projeto.descricao}</p>
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
    </div>
  ));

  return (
    <section id="projetos" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Projetos em destaque"
          title="Trabalhos recentes"
          description="Projetos conduzidos na AWT Development e na sustentação técnica da Tron Informática. Links serão adicionados em breve."
          align="center"
          className="mx-auto"
        />

        <FadeIn delay={0.1} className="mt-14">
          <Carousel slides={slides} slideClassName="basis-[85%] sm:basis-1/2 lg:basis-1/3" />
        </FadeIn>
      </div>
    </section>
  );
}
