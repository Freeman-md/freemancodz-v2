import { Experience } from "@/types/journey";

const parseDate = (dateStr: string): Date => {
  if (dateStr.toLowerCase() === "present") return new Date();
  return new Date(`${dateStr} 01`);
};

export const useExperience = () => {
  const experienceData = [
    {
      id: "exp-open-source",
      type: "experience",
      title: ".NET + Azure Cloud Developer",
      company: "Open Source Projects",
      employmentType: "Contract",
      description: "Built developer tools and cloud-native apps, shared knowledge publicly, and mentored peers.",
      startDate: "Feb 2024",
      endDate: "Present",
      location: "Remote, Greater London",
      tools: ["ASP.NET Core", "Azure", "GitHub Actions", "Bicep", "Terraform"],
      responsibilities: [
        "Built scalable cloud-native apps with C# and Azure services",
        "Created tools like SnappShare and serverless image processors",
        "Shared walkthroughs and insights across LinkedIn, YouTube, and X",
        "Contributed to open-source repos, submitted PRs, reviewed code",
        "Set up solo CI/CD pipelines with GitHub Actions and Bicep",
        "Mentored devs and engaged in discussions on GitHub and Twitter Spaces",
      ],
    },
    {
      id: "exp-tru",
      type: "experience",
      title: "Lead Web Engineer & Systems Architect",
      company: "TRU",
      employmentType: "Contract",
      startDate: "Jul 2024",
      endDate: "Jan 2025",
      location: "Remote, Greater London",
      tools: ["Next.js", "TypeScript", "TailwindCSS", "GitHub Actions", "Slack", "OpenAPI"],
      responsibilities: [
        "Redesigned platform architecture and state management strategy",
        "Built secure milestone-based escrow system",
        "Automated job booking engine and status flows",
        "Implemented CI/CD with tests, Slack alerts, and CDN invalidation",
        "Led stakeholder demos and API design syncs with backend/mobile teams",
      ],
    },
    {
      id: "exp-kumtru",
      type: "experience",
      title: "Lead Frontend & DevOps Engineer",
      company: "KUMTRU",
      employmentType: "Contract",
      startDate: "Feb 2023",
      endDate: "Aug 2023",
      location: "Remote, Lagos, Nigeria",
      tools: ["Vue.js", "Nuxt", "TailwindCSS", "GitHub Actions", "DigitalOcean", "BugSnag"],
      responsibilities: [
        "Architected full-stack platform and DevOps infra with 99.97% uptime",
        "Implemented Agile rituals and boosted satisfaction to 9.1/10",
        "Advised on UI/UX friction points, reducing drop-off by 24%",
        "Built web app for demos and user acquisition",
      ],
    },
    {
      id: "exp-pay4me",
      type: "experience",
      title: "Mid-level Frontend Developer",
      company: "Pay4Me App",
      employmentType: "Full-time",
      startDate: "Jun 2022",
      endDate: "Feb 2023",
      location: "Boise, Idaho · Hybrid",
      tools: ["Vue.js", "React.js", "DigitalOcean", "TypeScript"],
      responsibilities: [
        "Developed and deployed payment solutions used across 20+ institutions",
        "Audited and optimized frontend performance, reducing load times by 20%",
        "Handled production deploys and secrets with DigitalOcean",
        "Wrote internal docs and led retros in the lead's absence",
      ],
    },
    {
      id: "exp-ath",
      type: "experience",
      title: "Frontend Developer",
      company: "Across the Horizon",
      employmentType: "Full-time",
      startDate: "Jan 2022",
      endDate: "Jun 2022",
      location: "Remote, Idaho, USA",
      tools: ["Vue.js", "Laravel", "Paystack", "Twilio", "Google Maps API"],
      responsibilities: [
        "Re-architected frontend for relaunch, generating $60K+ in first week",
        "Built Birbur car booking platform with 5,000+ Q1 bookings",
        "Integrated 3rd-party APIs and resolved high-volume bugs",
      ],
    },
    {
      id: "exp-hippodrome",
      type: "experience",
      title: "Casino Dealer",
      company: "The Hippodrome Casino",
      employmentType: "Full-time",
      startDate: "Aug 2023",
      endDate: "Present",
      location: "On-site, Greater London",
      responsibilities: [
        "Handled high-pressure scenarios with professionalism and calm",
        "Collaborated with security to ensure gaming compliance",
        "Applied pattern recognition and situational awareness to tech workflows",
        "Balanced this role alongside a parallel engineering career",
      ],
    },
  ] as Experience[]

  const sortedExperience = experienceData.sort((a, b) => {
    const aIsPresent = a.endDate?.toLowerCase() === "present";
    const bIsPresent = b.endDate?.toLowerCase() === "present";

    if (aIsPresent && !bIsPresent) return -1;
    if (!aIsPresent && bIsPresent) return 1;

    const aDate = parseDate(a.endDate ?? a.startDate);
    const bDate = parseDate(b.endDate ?? b.startDate);

    return bDate.getTime() - aDate.getTime();
  });

  return { experienceData: sortedExperience };
};
