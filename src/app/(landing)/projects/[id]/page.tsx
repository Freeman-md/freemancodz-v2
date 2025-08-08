import type { Metadata } from "next";
// ...existing code...

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectById(id);
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for does not exist.",
      keywords: ["Freeman Madudili", "project not found", "portfolio"],
    };
  }
  return {
    title: project.title,
    description: project.description || "Project showcase by Freeman Madudili.",
    keywords: [
      "Freeman Madudili",
      "project",
      project.title,
      "portfolio",
      "full-stack developer",
      ".NET",
      "JavaScript",
      "Next.js",
      "cloud-native",
      "SaaS",
      "UI/UX",
      "software engineer",
    ],
  };
}
import { getProjectById } from "@/lib/projects/data";
import ProjectDetailsView from "./components/ProjectDetailsView";
import Empty from "@/components/shared/empty";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params
  const project = await getProjectById(id);

  if (!project) {
    return (
      <Empty
        title="Project not found"
        message="The project you are looking for does not exist."
      />
    );
  }

  return <ProjectDetailsView project={project} />;
}
