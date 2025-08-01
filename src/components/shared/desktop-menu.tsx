"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function DesktopMenu() {
  const links = [
  { text: "About", url: "#about", label: "My Ethos" },
  { text: "Journey", url: "#journey", label: "View My Journey" },
  { text: "Projects", url: "#projects", label: "Explore Projects" },
  { text: "Contact", url: "#contact", label: "Say Hello" },
];


  return (
    <motion.nav
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: 1.6,
          },
        },
      }}
      className="fixed hidden sm:block top-20 right-20 z-20"
    >
      <ul className="flex flex-col space-y-4 items-end uppercase font-medium backdrop-blur pl-20 pr-4 py-4 rounded-lg">
        {links.map(({ text, url, label }) => (
          <motion.li
            key={text}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="transition duration-500 hover:text-primary active:text-primary focus:text-primary"
            data-cursor="hover"
            data-cursor-label={label}
          >
            <Link href={url}>{text}</Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
