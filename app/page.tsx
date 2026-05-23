import { Approach } from "@/components/approach";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Grid } from "@/components/grid";
import { Hero } from "@/components/hero";
import { Hobbies } from "@/components/hobbies";
import { RecentProjects } from "@/components/recent-projects";
import { ResumeViewer } from "@/components/resume-viewer";
import { ScrollProgress } from "@/components/scroll-progress";
import { FloatingNav } from "@/components/ui/floating-nav";
import { navItems } from "@/data";
import dynamic from "next/dynamic";

const Contact = dynamic(
  () => import("@/components/contact").then((mod) => mod.Contact),
  { ssr: false }
);

const SplashCursor = dynamic(
  () => import("@/components/SplashCursor"),
  { ssr: false }
);

const ClickSpark = dynamic(
  () => import("@/components/ClickSpark"),
  { ssr: false }
);



const GradualBlur = dynamic(
  () => import("@/components/GradualBlur"),
  { ssr: false }
);

const MainPage = () => {
  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-clip bg-black-100 px-5 sm:px-10">
      <ScrollProgress />
      <FloatingNav navItems={navItems} />
      <SplashCursor />


      <div className="w-full max-w-7xl">
        <Hero />
        <Grid />

        {/* Dynamic section divider using GradualBlur */}
        <div className="relative w-full h-[6rem] overflow-hidden my-10 pointer-events-none">
          <GradualBlur position="bottom" strength={2} height="6rem" />
        </div>

        <RecentProjects />


        {/* Wrapping Hobbies in ClickSpark with Purple sparks on desktop */}
        <ClickSpark sparkColor="#a855f7" sparkCount={10} sparkRadius={25}>
          <Hobbies />
        </ClickSpark>

        <Experience />



        <Approach />

        {/* Dynamic section divider using GradualBlur */}
        <div className="relative w-full h-[6rem] overflow-hidden my-10 pointer-events-none">
          <GradualBlur position="top" strength={2.5} height="6rem" />
        </div>

        <ResumeViewer />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default MainPage;
