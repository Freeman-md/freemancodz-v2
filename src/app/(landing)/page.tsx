import About from "@/app/(landing)/components/About";
import Contact from "@/app/(landing)/components/Contact";
import Hero from "@/app/(landing)/components/Hero";
import Projects from "@/app/(landing)/components/Projects";
import ToolsSection from "@/app/(landing)/components/tools-section";
import WhatIDoSection from "@/app/(landing)/components/what-i-do-section";
import JourneySection from "./components/journey/JourneySection";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <ToolsSection />

      <WhatIDoSection />

      <JourneySection />

      <Projects />

      <Contact />
    </>
  );
}
