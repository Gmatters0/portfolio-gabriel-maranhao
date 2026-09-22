import { Bug, ClipboardList, Code2, GraduationCap, PenTool, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { NumberedList } from "@/components/numbered-list";
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
    <section id="pilares" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Áreas de atuação"
          title="Onde eu entrego mais valor"
          description="Cinco pilares que combinam base técnica, visão de negócio e comunicação para conduzir projetos de tecnologia do início ao fim."
        />

        <div className="mt-12 max-w-3xl">
          <NumberedList
            items={portfolio.pilares_de_atuacao.map((pilar) => ({
              key: pilar.titulo,
              title: pilar.titulo,
              description: pilar.descricao,
              icon: ICONS[pilar.titulo] ?? Code2,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
