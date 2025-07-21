import { Education } from "@/types/journey";

export const useEducation = () => ({
  educationData: [
    {
      id: "edu-mdx",
      type: "education",
      title: "Bachelor of Science - BS, Information Technology",
      school: "Middlesex University",
      degree: "BSc Information Technology",
      startDate: "2020",
      endDate: "2023",
      grade: "First Class",
      modules: ["Advanced Web Development with Big Data", "Business Intelligence", "Web & Mobile App Development", "Artificial Intelligence"],
      description: "Graduated with First Class Honours. Built strong foundations in full-stack development, microservices, and modern software practices.",
      link: "https://www.mdx.ac.uk/",
    },
  ] as Education[],
});
