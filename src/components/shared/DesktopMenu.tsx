"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function DesktopMenu() {
  const links = [
    { text: "About", url: "#about" },
    { text: "Projects", url: "#projects" },
    { text: "Work", url: "#work" },
    { text: "Contact", url: "#contact" },
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
      className="hidden sm:block my-20"
    >
      <ul className="flex flex-col space-y-4 items-end uppercase font-medium">
        {links.map(({ text, url }) => (
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
          >
            <Link href={url}>{text}</Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
