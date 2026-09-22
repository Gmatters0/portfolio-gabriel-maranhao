import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Pillars } from "@/components/sections/pillars";
import { Specializations } from "@/components/sections/specializations";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Leadership } from "@/components/sections/leadership";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

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
