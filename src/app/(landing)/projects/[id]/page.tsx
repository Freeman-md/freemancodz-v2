import { getProjectById } from "@/lib/projects/data";
import ProjectDetailsView from "./components/ProjectDetailsView";
import Empty from "@/components/shared/empty";

export default async function ProjectDetailsPage({
  params,
}: { params: { id: string } }) {
  const project = await getProjectById(params.id);

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
