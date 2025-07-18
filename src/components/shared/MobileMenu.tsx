"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Menu, X, Home, Info, Briefcase, Folder, Mail } from "lucide-react";

const links = [
  { text: "Home", url: "/", icon: <Home size={18} /> },
  { text: "About", url: "#about", icon: <Info size={18} /> },
  { text: "Projects", url: "#projects", icon: <Folder size={18} /> },
  { text: "Work", url: "#work", icon: <Briefcase size={18} /> },
  { text: "Contact", url: "#contact", icon: <Mail size={18} /> },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden relative z-[999]">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 bg-white text-black shadow rounded-full flex items-center justify-center ml-auto"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="absolute right-0 mt-2 bg-white shadow-xl rounded-md w-56 py-4 space-y-2"
          >
            {links.map(({ text, url, icon }, index) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link
                  href={url}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition"
                >
                  {icon}
                  <span>{text}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
