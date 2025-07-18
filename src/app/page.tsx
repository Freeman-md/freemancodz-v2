import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import TechStackMarquee from "@/components/home/TechStackMarquee";
import WhatIDo from "@/components/home/WhatIDo";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <TechStackMarquee />

      <WhatIDo />
    </>
  );
}
