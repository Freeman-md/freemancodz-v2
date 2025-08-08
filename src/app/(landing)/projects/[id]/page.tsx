import type { Metadata } from "next";
// ...existing code...

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = await getProjectById(params.id);
  if (!project) {
    return {
      title: "Project Not Found | Freeman Madudili Portfolio",
      description: "The project you are looking for does not exist.",
      openGraph: {
        title: "Project Not Found | Freeman Madudili Portfolio",
        description: "The project you are looking for does not exist.",
        url: `https://freemanmadudili.com/projects/${params.id}`,
        siteName: "Freeman Madudili Portfolio",
        images: [
          {
            url: "/images/og-image.png",
            width: 1200,
            height: 630,
            alt: "Freeman Madudili Portfolio OG Image",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Project Not Found | Freeman Madudili Portfolio",
        description: "The project you are looking for does not exist.",
        images: ["/images/og-image.png"],
      },
    };
  }
  return {
    title: `${project.title} | Freeman Madudili Portfolio`,
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
    openGraph: {
      title: `${project.title} | Freeman Madudili Portfolio`,
      description:
        project.description || "Project showcase by Freeman Madudili.",
      url: `https://freemanmadudili.com/projects/${params.id}`,
      siteName: "Freeman Madudili Portfolio",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Freeman Madudili Portfolio OG Image",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Freeman Madudili Portfolio`,
      description:
        project.description || "Project showcase by Freeman Madudili.",
      images: ["/images/og-image.png"],
    },
  };
}
import { getProjectById } from "@/lib/projects/data";
import ProjectDetailsView from "./components/ProjectDetailsView";
import Empty from "@/components/shared/empty";

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
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
