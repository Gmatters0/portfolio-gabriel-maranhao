import { Award, CalendarDays, Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeInStagger, FadeInStaggerItem } from "@/components/motion/fade-in";
import { portfolio } from "@/data";

const ICONS = [Users, Award, CalendarDays];

export function Leadership() {
  return (
    <section id="lideranca" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Liderança e atividades acadêmicas"
          title="Além do CLT/PJ: liderança voluntária e institucional"
          description="Atuação em grupos e ligas acadêmicas, organizando eventos e liderando projetos de cunho social e educacional."
          align="center"
          className="mx-auto"
        />

        <FadeInStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.lideranca_e_atividades_academicas.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <FadeInStaggerItem key={`${item.organizacao}-${item.cargo}`}>
                <div className="flex h-full flex-col gap-4 rounded-sm border border-border bg-card p-6">
                  <div className="flex size-10 items-center justify-center rounded-sm bg-[var(--accent-soft)] text-[var(--accent-on-bg)]">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {item.cargo}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      {item.organizacao}
                    </p>
                    <p className="font-mono text-xs text-muted-faint">
                      {item.local} · {item.periodo}
                    </p>
                  </div>
                  <ul className="mt-1 space-y-2">
                    {item.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--accent-on-bg)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
