"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function MoreProjectsCta() {
  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Button
        asChild
        variant="ghost"
        className="rounded-full hover:bg-transparent hover:text-inherit hover:border-transparent"
        data-cursor="hover"
        data-cursor-label="View All Projects"
      >
        <Link href="/projects" className="inline-flex items-center -space-x-2">
          <span>More</span>
          <motion.span
            aria-hidden="true"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.span>
        </Link>
      </Button>
    </motion.div>
  );
}
