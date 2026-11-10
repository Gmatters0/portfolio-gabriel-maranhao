import { Bug, ClipboardList, Code2, GraduationCap, PenTool, type LucideIcon } from "lucide-react";
import { PixelPlanet } from "@/components/pixel/pixel-planet";
import { SectionHeading } from "@/components/section-heading";
import { PillarConstellation } from "@/components/pillar-constellation";
import { portfolio } from "@/data";

const ICONS: Record<string, LucideIcon> = {
  "Desenvolvimento de Software": Code2,
  "Debug e Investigação de Bugs": Bug,
  "Gestão de Projetos": ClipboardList,
  "UI/UX (Research e Benchmarking)": PenTool,
  "Docência e Suporte": GraduationCap,
};

export function Pillars() {
  return (
    <section id="pilares" className="relative overflow-x-clip border-t border-border py-20 sm:py-28">
      <PixelPlanet kind="darkBramble" scale={6} top={120} className="right-10 xl:right-24" />
      <div className="container-page">
        <SectionHeading
          eyebrow="Áreas de atuação"
          title="Onde eu entrego mais valor"
          description="Cinco pilares que combinam base técnica, visão de negócio e comunicação para conduzir projetos de tecnologia do início ao fim."
        />

        <div className="mt-12 max-w-3xl">
          <PillarConstellation
            items={portfolio.pilares_de_atuacao.map((pilar) => {
              const Icon = ICONS[pilar.titulo] ?? Code2;
              return {
                key: pilar.titulo,
                title: pilar.titulo,
                description: pilar.descricao,
                icon: <Icon className="size-4 shrink-0 text-[var(--accent-on-bg)]" />,
              };
            })}
          />
        </div>
      </div>
    </section>
  );
}
