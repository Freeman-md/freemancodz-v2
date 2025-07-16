"use client";

import { Github, Linkedin, Instagram, Youtube, X } from "lucide-react";

const icons = {
  github: Github,
  linkedin: Linkedin,
  twitter: X,
  youtube: Youtube,
  instagram: Instagram
};

export default function SocialIcons() {
  const links = [
    {
      name: "github",
      url: "https://github.com/Freeman-md",
    },
    {
      name: "linkedin",
      url: "https://linkedin.com/in/freeman-madudili",
    },
    {
      name: "x",
      url: "https://x.com/freemancodz",
    },
    {
      name: "instagram",
      url: "https://instagram.com/freemancodz",
    },
{
      name: "youtube",
      url: "https://www.youtube.com/@freemancodz",
    },
  ];

  return (
    <div className="fixed bottom-16 left-10 z-50">
      <div className="flex flex-col space-y-4 items-center">
        {links.map(({ name, url }) => {
          const Icon = icons[name as keyof typeof icons];
          if (!Icon || !url) return null;

          return (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white flex items-center justify-center transition duration-200 transform hover:-translate-y-1"
            >
              <Icon size={16} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
