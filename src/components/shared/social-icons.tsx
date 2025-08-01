"use client";

import { Github, Linkedin, Instagram, Youtube, X } from "lucide-react";
import { motion } from "motion/react";

const icons = {
  github: Github,
  linkedin: Linkedin,
  twitter: X,
  youtube: Youtube,
  instagram: Instagram,
};

export default function SocialIcons() {
  const links = [
    {
      name: "github",
      url: "https://github.com/Freeman-md",
      label: "View GitHub",
    },
    {
      name: "linkedin",
      url: "https://linkedin.com/in/freeman-madudili",
      label: "Connect on LinkedIn",
    },
    {
      name: "x",
      url: "https://x.com/freemancodz",
      label: "Follow on X",
    },
    {
      name: "instagram",
      url: "https://instagram.com/freemancodz",
      label: "Follow on Instagram",
    },
    {
      name: "youtube",
      url: "https://www.youtube.com/@freemancodz",
      label: "Watch on YouTube",
    },
  ];

  return (
    <div className="fixed bottom-16 left-10 z-50">
      <div className="flex flex-col space-y-4 items-center">
        {links.map(({ name, url, label }, index) => {
          const Icon = icons[name as keyof typeof icons];
          if (!Icon || !url) return null;

          return (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2.2 + index * 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-8 h-8 rounded-full border border-white flex items-center justify-center transition duration-200 transform hover:-translate-y-1 backdrop-blur-2xl"
              data-cursor="hover"
              data-cursor-label={label}
            >
              <Icon size={16} />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
