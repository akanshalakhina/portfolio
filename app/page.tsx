import { About, Marquee } from "@/components/about";
import { AiTwin } from "@/components/ai-twin";
import { BootLoader } from "@/components/boot-loader";
import { CommandPalette } from "@/components/command-palette";
import { ConsoleEgg } from "@/components/console-egg";
import { Contact, Footer } from "@/components/contact";
import { Cursor } from "@/components/cursor";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Honors } from "@/components/honors";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { SiteProvider } from "@/components/site-context";
import { Skills } from "@/components/skills";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Work } from "@/components/work/work";

export default function Page() {
  return (
    <SiteProvider>
      <BootLoader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Projects />
        <Skills />
        <Honors />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <AiTwin />
      <ConsoleEgg />
      <div className="grain" aria-hidden />
    </SiteProvider>
  );
}
