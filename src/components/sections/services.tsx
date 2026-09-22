import { GraduationCap, Layers, Settings, Wand2, Wrench, type LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { FadeInStagger, FadeInStaggerItem } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink, portfolio } from "@/data";

const ICONS: Record<string, LucideIcon> = {
  "Manutenção e evolução de sistemas": Wrench,
  "Criação de sites e landing pages": Layers,
  "Criação de sistemas web": Settings,
  "Automação de processos": Wand2,
  "Consultoria em programação e resolução de problemas": Wrench,
  "Aulas particulares de programação": GraduationCap,
};

export function Services() {
  return (
    <section id="servicos" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Serviços"
          title="Como posso ajudar o seu projeto"
          description="Do levantamento de requisitos à entrega, com comunicação clara em cada etapa. Escolha o serviço e solicite um orçamento sem compromisso."
          align="center"
          className="mx-auto"
        />

        <FadeInStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.servicos.map((servico) => {
            const Icon = ICONS[servico.nome] ?? Wrench;
            const message = `Olá Gabriel, gostaria de solicitar um orçamento para: ${servico.nome}.`;
            return (
              <FadeInStaggerItem key={servico.nome}>
                <div className="flex h-full flex-col gap-4 rounded-sm border border-border bg-card p-6 transition-colors duration-300 hover:border-[var(--accent-soft-border)] hover:bg-[var(--accent-soft)]">
                  <div className="flex size-11 items-center justify-center rounded-sm bg-[var(--accent-soft)] text-[var(--accent-on-bg)]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {servico.nome}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {servico.descricao}
                  </p>
                  <Button
                    render={
                      <a
                        href={buildWhatsAppLink(message)}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    nativeButton={false}
                    variant="ghost"
                    className="mt-1 h-auto w-fit justify-start gap-1.5 p-0 font-semibold text-[var(--accent-on-bg)] hover:bg-transparent hover:text-[var(--accent-on-bg)] hover:opacity-80"
                  >
                    Solicitar orçamento
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
