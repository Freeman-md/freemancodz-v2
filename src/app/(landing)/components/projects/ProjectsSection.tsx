import Projects from "./Projects";
import { getFeaturedProjects } from "@/lib/projects/data";

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <section id="projects" className="bg-dot-pattern">
      <Projects projects={projects} />
    </section>
  );
}
