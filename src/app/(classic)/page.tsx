import { Hero } from "@/components/classic/sections/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/classic/sections/about";
import { Pillars } from "@/components/classic/sections/pillars";
import { Specializations } from "@/components/classic/sections/specializations";
import { ExperienceTimeline } from "@/components/classic/sections/experience-timeline";
import { Leadership } from "@/components/classic/sections/leadership";
import { Services } from "@/components/classic/sections/services";
import { Projects } from "@/components/classic/sections/projects";
import { Education } from "@/components/classic/sections/education";
import { Contact } from "@/components/classic/sections/contact";

// Rótulos curados para o marquee (funções no mercado, não os cargos formais do currículo).
const MARQUEE_ROLES = [
  "Desenvolvedor de Software",
  "Gestor de Projetos",
  "Instrutor de Robótica e Programação",
  "Sócio Fundador AWT (COO)",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ROLES} />
      <About />
      <Pillars />
      <Specializations />
      <ExperienceTimeline />
      <Leadership />
      <Services />
      <Projects />
      <Education />
      <Contact />
    </>
  );
}
