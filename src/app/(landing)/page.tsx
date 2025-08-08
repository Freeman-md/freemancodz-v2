import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Stack .NET & JavaScript Developer for Hire",
  description:
    "Hire Freeman Madudili, a full-stack .NET and JavaScript developer specializing in cloud-native apps, SaaS platforms, and high-quality UI/UX experiences.",
  keywords: [
    "Freeman Madudili",
    "full-stack developer",
    ".NET",
    "JavaScript",
    "Next.js",
    "cloud-native",
    "SaaS",
    "UI/UX",
    "portfolio",
    "developer for hire",
    "software engineer",
  ],
};

import About from "@/app/(landing)/components/About";
import Contact from "@/app/(landing)/components/Contact";
import Hero from "@/app/(landing)/components/Hero";
import ToolsSection from "@/app/(landing)/components/tools-section";
import WhatIDoSection from "@/app/(landing)/components/what-i-do-section";
import JourneySection from "./components/journey/JourneySection";
import ProjectsSection from "../../features/projects/components/ProjectsSection";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <ToolsSection />

      <WhatIDoSection />

      <JourneySection />

      <ProjectsSection />

      <Contact />
    </>
  );
}
