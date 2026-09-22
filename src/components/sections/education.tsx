import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeInStagger, FadeInStaggerItem } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { portfolio } from "@/data";

export function Education() {
  return (
    <section id="formacao" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Formação"
          title="Formação acadêmica e certificações"
          align="center"
          className="mx-auto"
        />

        <FadeInStagger className="mt-14 grid gap-5 sm:grid-cols-2">
          {portfolio.educacao.map((edu) => (
            <FadeInStaggerItem key={`${edu.instituicao}-${edu.curso}`}>
              <div className="flex h-full gap-4 rounded-sm border border-border bg-card p-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-[var(--accent-soft)] text-[var(--accent-on-bg)]">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {edu.curso}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {edu.instituicao}
                  </p>
                  <p className="font-mono text-xs text-muted-faint">
                    {edu.periodo}
                    {edu.modalidade ? ` · ${edu.modalidade}` : ""}
                  </p>
                  {edu.disciplinas_relevantes && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {edu.disciplinas_relevantes.map((d) => (
                        <Badge
                          key={d}
                          variant="secondary"
                          className="cursor-default rounded-sm text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-[var(--accent-soft-border)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-on-bg)]"
                        >
                          {d}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
