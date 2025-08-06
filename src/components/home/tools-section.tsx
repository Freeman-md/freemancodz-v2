import { getTools } from "@/lib/tools/data";
import TechStackMarquee from "./tech-stack-marquee";

export default async function ToolsSection() {
  const tools = await getTools();

  return (
    <section id="tools" className="bg-dot-pattern">
      <TechStackMarquee tools={tools} />
    </section>
  );
}
