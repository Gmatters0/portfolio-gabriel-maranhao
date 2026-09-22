import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Retractable } from "@/components/retractable";
import { Badge } from "@/components/ui/badge";
import { portfolio } from "@/data";

const highlightSkills = [
  ...portfolio.habilidades.tecnico.slice(0, 6),
  ...portfolio.habilidades.gestao_de_projetos.slice(0, 3),
];

// Primeira frase do resumo como teaser; o restante fica dentro do retrátil.
const resumoSentences = portfolio.resumo.split(". ");
const resumoTeaser = resumoSentences[0].trim() + ".";
const resumoRest = resumoSentences.slice(1).join(". ").trim();

export function About() {
  return (
    <section id="sobre" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <SectionHeading
          eyebrow="Sobre"
          title="Base técnica sólida, agora a serviço da gestão de projetos"
          className="lg:sticky lg:top-24 lg:self-start"
        />

        <FadeIn delay={0.1} className="space-y-8">
          <Retractable teaser={resumoTeaser} labelClosed="Ler resumo completo">
            <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {resumoRest}
            </p>
          </Retractable>

          <div>
            <p className="mb-3 font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Ferramentas e competências em destaque
            </p>
            <div className="flex flex-wrap gap-2">
              {highlightSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="cursor-default rounded-sm border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent-on-bg)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] hover:shadow-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
