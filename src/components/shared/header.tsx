"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-4 sm:py-6 fixed w-full max-sm:bg-secondary sm:backdrop-blur z-50"
    >
      <div className="container flex justify-between space-x-4 items-center sm:items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <Link href="#hero">
            <Image
              src="/images/logo.png"
              width={100}
              height={100}
              alt="Freemancodz"
            />
          </Link>
        </motion.div>

        <MobileMenu />
      </div>
    </motion.header>
  );
}
