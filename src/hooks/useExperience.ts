import { Experience } from "@/types/journey";

const parseDate = (dateStr: string): Date => {
  if (dateStr.toLowerCase() === "present") return new Date();
  return new Date(`${dateStr} 01`);
};

export const useExperience = () => {
  const experienceData = [
    {
      id: "exp-freemancodz",
      type: "experience",
      title: "Lead Engineer & .NET + Azure Specialist",
      company: "Freemancodz (Open Source & Contract Projects)",
      start_date: "Feb 2023",
      end_date: "Present",
      location: "Remote, Greater London",
      tools: [
        "C#", "ASP.NET Core", "Azure Functions", "Cosmos DB", "Bicep", 
        "Terraform", "GitHub Actions", "Vue.js", "Nuxt", "React", "TailwindCSS"
      ],
      responsibilities: [
        "Architected and delivered cloud-native systems and developer tools, achieving 99.97% uptime and cutting onboarding time by 50%",
        "Built public-facing apps, escrow workflows, and booking engines with C#, ASP.NET Core, and Azure",
        "Led CI/CD automation and observability using GitHub Actions, Ploi, and Slack integrations",
        "Collaborated across backend, mobile, and frontend teams using OpenAPI and async tooling",
        "Contributed to open-source tools (e.g., SnappShare, Nuxt + Azure kits) and mentored devs through GitHub and community calls",
        "Delivered responsive UIs and prototypes using Vue.js, Nuxt, React, and Tailwind—raising stakeholder satisfaction to 9.1/10 and reducing drop-offs by 24%",
      ],
    },
    {
      id: "exp-pay4me",
      type: "experience",
      title: "Mid-Level Frontend Developer",
      company: "Pay4Me App",
      employmentType: "Full-time",
      start_date: "Jan 2022",
      end_date: "Feb 2023",
      location: "Boise, Idaho · Hybrid",
      tools: ["Vue.js", "React.js", "DigitalOcean", "TypeScript"],
      responsibilities: [
        "Built and deployed payment features used by 20+ institutions—driving 35% adoption and $500K+ in processed transactions",
        "Rewrote frontend architecture for major relaunch, improving UX and enabling 10% MoM growth",
        "Audited performance and led frontend DevOps with DigitalOcean—reducing load times by 20%",
        "Contributed to internal docs, team retrospectives, and release coordination",
      ],
    },
    {
      id: "exp-ath",
      type: "experience",
      title: "Frontend Developer",
      company: "Across the Horizon",
      employmentType: "Full-time",
      start_date: "Sep 2020",
      end_date: "Jan 2022",
      location: "Remote, Idaho, USA",
      tools: ["Vue.js", "Laravel", "Paystack", "Twilio", "Google Maps API"],
      responsibilities: [
        "Re-architected frontend for relaunch, generating $60K+ in first week and enabling 10% MoM growth",
        "Built the Birbur car booking platform with 5,000+ bookings in Q1 and 25% operational improvement",
        "Integrated third-party APIs and resolved high-volume bugs across payment and booking flows",
      ],
    },
  ] as Experience[]


  const sortedExperience = experienceData.sort((a, b) => {
    const aIsPresent = a.end_date?.toLowerCase() === "present";
    const bIsPresent = b.end_date?.toLowerCase() === "present";

    if (aIsPresent && !bIsPresent) return -1;
    if (!aIsPresent && bIsPresent) return 1;

    const aDate = parseDate(a.end_date ?? a.start_date);
    const bDate = parseDate(b.end_date ?? b.start_date);

    return bDate.getTime() - aDate.getTime();
  });

  return { experienceData: sortedExperience };
};
