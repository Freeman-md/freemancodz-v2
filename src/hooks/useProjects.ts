import { Project } from "@/types/project";

export function useProjects() {
  const categories = [
    "Web App Development",
    "Native App Development",
    "DevOps & Infrastructure",
    "Agentic App Development",
  ];

  const tools = [
    "Next.js",
    "Nuxt.js",
    "C#",
    "Azure",
    "TypeScript",
    "Git",
    "GitHub",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
  ];

  const rawProjects: Project[] = [
  {
    id: 1,
    title: "FileTidy",
    category: "Native App Development",
    description: "Cross-platform file organization tool built with Avalonia and .NET.",
    coverImage: "/images/filetidy-og-image.png",
    link: "https://github.com/freemancodz/filetidy",
    github: "https://github.com/freemancodz/filetidy",
    featured: true,
    isPrivate: false,
    year: 2025,
    tools: [".NET", "C#", "Avalonia", "SQLite"],
    tags: ["Desktop", "Cross-platform", "Automation"],
    longdescription: "FileTidy is a cross-platform native desktop app that automatically organizes cluttered folders like Downloads or Desktop. Built with Avalonia UI and .NET, it uses smart sorting logic to move files into categorized subfolders based on extension and metadata. The project started as a CLI tool but evolved into a sleek GUI experience. It's designed for freelancers, remote workers, and anyone tired of messy desktops. All sorting logic lives in a shared core library, making it easy to reuse across CLI, GUI, and mobile in the future.",
    video_url: "https://www.youtube.com/embed/hl2d-QiPfQA"
  },
  {
    id: 2,
    title: "SnappShare",
    category: "Web App Development",
    description: "Fast, secure file sharing built with .NET, Azure Blob Storage & Vue.js.",
    coverImage: "/images/snappshare-og-image.png",
    link: "https://snappshare.vercel.app",
    github: "https://github.com/freemancodz/snappshare",
    featured: false,
    isPrivate: false,
    year: 2024,
    tools: [".NET", "Azure Blob Storage", "Vue.js", "TailwindCSS"],
    tags: ["Cloud", "File Sharing", "Frontend"],
    longdescription: "SnappShare is a blazing-fast, secure file sharing web app powered by .NET and Azure Blob Storage. It allows users to upload files and instantly generate shareable links, with built-in expiry, skip checks, and chunked uploads for performance. The frontend is built with Vue.js and Tailwind, while backend logic handles validation and storage orchestration. SnappShare is privacy-first, stateless, and entirely serverless—ideal for developers, collaborators, and remote teams sharing builds or assets."
  },
  {
    id: 3,
    title: "TellTheDev",
    category: "Feedback Tooling",
    description: "Lightweight dev feedback widget built with Vite, Supabase & TailwindCSS.",
    coverImage: "/images/tellthedev-og-image.png",
    link: "https://tellthedev.vercel.app",
    github: "https://github.com/freemancodz/tellthedev",
    featured: false,
    isPrivate: false,
    year: 2024,
    tools: ["Vite", "Supabase", "TailwindCSS", "TypeScript"],
    tags: ["Widget", "Developer Tools", "Feedback"],
    longdescription: "TellTheDev is a lightweight, plug-and-play feedback widget for developers to collect real-time reactions from users during early product testing. It integrates easily into any app and stores feedback securely using Supabase. Built with Vite and TailwindCSS, the widget is super fast and customizable. It's perfect for solo devs and indie hackers who want insights without setting up full analytics or survey tools—just drop it in and start learning what users really think."
  }
];


  // Enhance with aspect ratios
  const projects = rawProjects.map((project, index) => {
    let aspect = "aspect-[4/3]";
    if (index % 3 === 1) aspect = "aspect-square";
    if (index % 3 === 2) aspect = "aspect-[5/6]";

    return { ...project, aspect };
  });

  return {
    categories,
    tools,
    projects,
  };
}
