"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";

import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MagicButton } from "@/components/ui/magic-button";
import { RobotHead } from "@/components/robot-head";
import { ThreeCanvas } from "@/components/three-canvas";
import { links } from "@/config";

export const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
          fill="white"
        />
        <Spotlight
          className="left-full top-10 h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black-100 dark:bg-grid-white/[0.03]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />
        <ThreeCanvas />
      </div>

      <div className="relative z-10 my-20 flex items-center justify-center">
        <div className="flex w-full max-w-7xl flex-col lg:flex-row items-center gap-8 lg:gap-4 px-4">
          {/* Left: Text content */}
          <div className="flex flex-col items-center lg:items-start lg:flex-1 lg:max-w-[55%]">
            {/* Profile Image */}
            <div className="relative mb-8 group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple via-teal-500 to-blue-500 opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-full border-2 border-white/20">
                <Image
                  src="/profile_pic.jpg"
                  alt="Akansha Lakhina"
                  width={150}
                  height={150}
                  className="rounded-full object-cover object-center w-[120px] h-[120px] md:w-[150px] md:h-[150px]"
                  priority
                />
              </div>
            </div>

            <h2 className="max-w-80 text-center lg:text-left text-xs uppercase tracking-widest text-purple">
              AI + Full Stack Developer | MERN Developer
            </h2>

            <TextGenerateEffect
              className="text-center lg:text-left text-[32px] md:text-4xl lg:text-5xl xl:text-6xl"
              words="Engineering Scalable Systems from Front-End to AI Backend"
            />

            <p className="mb-4 text-center lg:text-left text-sm md:text-base lg:text-lg text-white-200 max-w-xl">
              Hi, I&apos;m{" "}
              <span className="text-purple font-semibold">{links.ownerName}</span>
              {" "}- an AI & Full Stack Developer specializing in the MERN Stack, Next.js, FastAPI, and Generative AI. Amazon Future Engineer Scholar and GDG Solution Challenge Finalist.
            </p>

            <Link href="#about" className="md:mt-6">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
                asChild
              />
            </Link>
          </div>

          {/* Right: Interactive Robot Head */}
          <div className="lg:flex-1 lg:max-w-[45%] w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] relative">
            <RobotHead />
          </div>
        </div>
      </div>
    </div>
  );
};


