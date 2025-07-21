"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { text: "About", url: "#about" },
  { text: "Journey", url: "#journey" },
  { text: "Projects", url: "#projects" },
  { text: "Contact", url: "#contact" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden relative z-20">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 text-white ring-1 ring-white/20 shadow rounded-full flex items-center justify-center ml-auto"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Menu Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 18, stiffness: 160 }}
            className="absolute right-0 mt-8 w-56 py-4 rounded-xl backdrop-blur ring-1 ring-white/10 drop-shadow-lg z-[999]"
          >
            {links.map(({ text, url }, index) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  delay: 0.05 * index,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <Link
                  href={url}
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-2 text-xs tracking-wide uppercase text-white hover:text-primary transition"
                >
                  {text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
