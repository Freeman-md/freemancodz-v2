"use client";

import { useState } from "react";
import { Github, Linkedin, Instagram, Youtube, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

const icons = {
  github: Github,
  linkedin: Linkedin,
  x: X,
  youtube: Youtube,
  instagram: Instagram,
};

export default function SocialIcons() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "github", url: "https://github.com/Freeman-md", label: "View GitHub" },
    { name: "linkedin", url: "https://www.linkedin.com/in/freeman-madudili-9864101a2/", label: "Connect on LinkedIn" },
    { name: "x", url: "https://x.com/freemancodz", label: "Follow on X" },
    { name: "instagram", url: "https://instagram.com/freemancodz", label: "Follow on Instagram" },
    { name: "youtube", url: "https://www.youtube.com/@freemancodz", label: "Watch on YouTube" },
  ];

  return (
    <div className="fixed bottom-16 left-4 z-50">
      {/* Mobile & Desktop Container */}
      <div className="flex flex-col-reverse items-center sm:flex-col sm:space-y-4">
        {/* Toggle Button (mobile only) */}
        <button
          className="sm:hidden w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20"
          onClick={() => setOpen(!open)}
        >
          {open ? <IconChevronLeft size={18} /> : <IconChevronRight size={18} />}
        </button>

        {/* Desktop: always visible icons */}
        <div className="hidden sm:flex flex-col space-y-4 items-center">
          {links.map(({ name, url, label }, index) => {
            const Icon = icons[name as keyof typeof icons];
            if (!Icon) return null;
            return (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  duration: 0.4,
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

        {/* Mobile: slide-in icons above toggle */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col space-y-3 mb-2 sm:hidden"
            >
              {links.map(({ name, url, label }) => {
                const Icon = icons[name as keyof typeof icons];
                if (!Icon) return null;
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-white flex items-center justify-center backdrop-blur-2xl"
                    data-cursor="hover"
                    data-cursor-label={label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
