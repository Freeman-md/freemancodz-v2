import { useProjectStore } from "@/store/useProjectStore";
import { Project } from "@/types/project";
import { useEffect, useMemo } from "react";

export function useProjects() {
  const { setProjects } = useProjectStore()

  const rawProjects: Project[] = useMemo(() => [
    {
      id: "1",
      title: "FileTidy",
      status: "Live",
      role: "Solo Build",
      description: "Cross-platform file organization tool built with Avalonia and .NET.",
      longdescription:
        "FileTidy is a cross-platform native desktop app that automatically organizes cluttered folders like Downloads or Desktop. Built with Avalonia UI and .NET, it uses smart sorting logic to move files into categorized subfolders based on extension and metadata. The project started as a CLI tool but evolved into a sleek GUI experience. It's designed for freelancers, remote workers, and anyone tired of messy desktops. All sorting logic lives in a shared core library, making it easy to reuse across CLI, GUI, and mobile in the future.",
      cover_image: "/images/filetidy-og-image.png",
      video_url: "https://www.youtube.com/embed/hl2d-QiPfQA",
      link: "https://github.com/freemancodz/filetidy",
      github: "https://github.com/freemancodz/filetidy",
      featured: true,
      is_private: false,
      year: 2025,
      tools: [".NET", "C#", "Avalonia", "SQLite"],
      categories: ["Desktop", "Cross-platform", "Automation"],
      impact_note: "Currently being used to organize 5k+ files weekly"
    },
    {
      id: "2",
      title: "SnappShare",
      status: "Archived",
      role: "Solo Build",
      description: "Fast, secure file sharing built with .NET, Azure Blob Storage & Vue.js.",
      longdescription:
        "SnappShare is a blazing-fast, secure file sharing web app powered by .NET and Azure Blob Storage. It allows users to upload files and instantly generate shareable links, with built-in expiry, skip checks, and chunked uploads for performance. The frontend is built with Vue.js and Tailwind, while backend logic handles validation and storage orchestration. SnappShare is privacy-first, stateless, and entirely serverless—ideal for developers, collaborators, and remote teams sharing builds or assets.",
      cover_image: "/images/snappshare-og-image.png",
      link: "https://snappshare.vercel.app",
      github: "https://github.com/freemancodz/snappshare",
      featured: false,
      is_private: false,
      year: 2024,
      tools: [".NET", "Azure Blob Storage", "Vue.js", "TailwindCSS"],
      categories: ["Cloud", "File Sharing", "Frontend"],
      impact_note: "Shared over 10GB worth of files during launch week"
    },
    {
      id: "3",
      title: "TellTheDev",
      status: "Beta",
      role: "Solo Build",
      description: "Lightweight dev feedback widget built with Vite, Supabase & TailwindCSS.",
      longdescription:
        "TellTheDev is a lightweight, plug-and-play feedback widget for developers to collect real-time reactions from users during early product testing. It integrates easily into any app and stores feedback securely using Supabase. Built with Vite and TailwindCSS, the widget is super fast and customizable. It's perfect for solo devs and indie hackers who want insights without setting up full analytics or survey tools—just drop it in and start learning what users really think.",
      cover_image: "/images/tellthedev-og-image.png",
      link: "https://tellthedev.vercel.app",
      github: "https://github.com/freemancodz/tellthedev",
      featured: false,
      is_private: false,
      year: 2024,
      tools: ["Vite", "Supabase", "TailwindCSS", "TypeScript"],
      categories: ["Widget", "Developer Tools", "Feedback"],
      impact_note: "Helped validate 3+ early products during alpha"
    }
  ], []);


  // Enhance with aspect ratios
  const projects = useMemo(() => {
    return rawProjects.map((project, index) => {
      let aspect = "aspect-[4/3]";
      if (index % 3 === 1) aspect = "aspect-square";
      if (index % 3 === 2) aspect = "aspect-[5/6]";
      return { ...project, aspect };
    });
  }, [rawProjects]);

  useEffect(() => {
    setProjects(projects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useMemo(() => {
    return [...new Set(rawProjects.flatMap(project => project.categories))];
  }, [rawProjects]);

  const tools = useMemo(() => {
    return [...new Set(rawProjects.flatMap(project => project.tools))];
  }, [rawProjects]);

  return {
    categories,
    tools,
    projects,
  };
}
