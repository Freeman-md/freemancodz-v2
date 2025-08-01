import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Journey from "@/components/home/Journey";
import Projects from "@/components/home/Projects";
import TechStackMarquee from "@/components/home/TechStackMarquee";
import WhatIDo from "@/components/home/WhatIDo";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <TechStackMarquee />

      <WhatIDo />

      <Journey />

      <Projects />

      <Contact />
    </>
  );
}
