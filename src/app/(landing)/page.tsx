import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import JourneySection from "@/components/home/journey-section";
import Projects from "@/components/home/Projects";
import ToolsSection from "@/components/home/tools-section";
import WhatIDoSection from "@/components/home/what-i-do-section";

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
