import ProjectsList from "./ProjectsList";
import { getFeaturedProjects } from "@/lib/projects/data";

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  const modifiedProjects = projects.map((project, index) => {
        let aspect = "aspect-[4/3]";
        if (index % 3 === 1) aspect = "aspect-square";
        if (index % 3 === 2) aspect = "aspect-[5/6]";
        return { ...project, aspect };
      });;

  return (
    <section id="projects" className="bg-dot-pattern">
      <ProjectsList projects={modifiedProjects} />
    </section>
  );
}
