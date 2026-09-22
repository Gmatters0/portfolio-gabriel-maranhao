"use client";

import { BookOpen, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { portfolio } from "@/data";

const ICONS = [GraduationCap, BookOpen];

export function Specializations() {
  return (
    <section id="especializacoes" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Especializações atuais"
          title="Em que estou me aprofundando agora"
          align="center"
          className="mx-auto"
        />

        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <Tabs defaultValue={portfolio.especializando_atualmente[0]?.area}>
            <TabsList className="mx-auto h-auto w-full flex-wrap gap-2 bg-transparent p-0 sm:flex-nowrap">
              {portfolio.especializando_atualmente.map((item) => (
                <TabsTrigger
                  key={item.area}
                  value={item.area}
                  className="h-11 flex-1 rounded-lg border border-border text-sm font-semibold data-active:border-[var(--accent-soft-border)] data-active:bg-[var(--accent-soft)] data-active:text-[var(--accent-on-bg)]"
                >
                  {item.area}
                </TabsTrigger>
              ))}
            </TabsList>

            {portfolio.especializando_atualmente.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <TabsContent key={item.area} value={item.area} className="mt-6">
                  <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-on-bg)]">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {item.area}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {item.detalhes}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </FadeIn>
      </div>
    </section>
  );
}
