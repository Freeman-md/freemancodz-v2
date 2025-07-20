import { ExperienceItem } from "@/types/experience";

export const useExperience = () => ({
  experienceData: [
    {
      id: "exp-1",
      title: "Frontend Engineer",
      company: "FreemanCodz",
      description: "Led development of cross-platform UI components.",
      startDate: "Mar 2023",
      endDate: "Present",
      tools: ["React", "TailwindCSS", "Supabase"],
      link: "https:",
      responsibilities: ["Built dashboard", "Wrote unit tests", "Integrated Supabase"],
    },
    {
      id: "exp-2",
      title: "Frontend Engineer",
      company: "FreemanCodz",
      description: "Led development of cross-platform UI components.",
      startDate: "Mar 2023",
      endDate: "Present",
      tools: ["React", "TailwindCSS", "Supabase"],
      responsibilities: ["Built dashboard", "Wrote unit tests", "Integrated Supabase"],
      projects: [
        {
          id: 3,
          title: "TellTheDev",
          coverImage: "/images/tellthedev-og-image.png",
          link: "https://tellthedev.vercel.app",
        },
        {
          id: 4,
          title: "TellTheDev",
          coverImage: "/images/tellthedev-og-image.png",
          link: "https://tellthedev.vercel.app",
        },
        {
          id: 5,
          title: "TellTheDev",
          coverImage: "/images/tellthedev-og-image.png",
          link: "https://tellthedev.vercel.app",
        },
        {
          id: 6,
          title: "TellTheDev",
          coverImage: "/images/tellthedev-og-image.png",
          link: "https://tellthedev.vercel.app",
        },
      ]
    },
  ] as ExperienceItem[],
});
