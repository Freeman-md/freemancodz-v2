"use client";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const rotatingWords = ["Cloud", "Web", "Mobile", "Desktop"];
const lines = ["Building", "Clean", "", "Apps", "Since", "2023"];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 18, stiffness: 120 },
    },
  };

  return (
    <section className="relative h-[calc(100vh-5rem)] overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container grid grid-cols-2 h-full content-center relative z-10"
      >
        <div className="text-7xl sm:text-8xl max-sm:col-span-2 lg:text-9xl uppercase font-medium tracking-wide sm:tracking-tighter space-y-2 leading-[0.9] max-sm:-mt-20">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              variants={item}
              className={['max-sm:text-center', index % 2 === 0 ? "sm:text-left" : "sm:text-right"].join(" ")}
            >
              {index === 2 ? (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[currentWordIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-primary"
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              ) : (
                line
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
        className="absolute -right-40 bottom-0 w-[70vw] h-[110vh] top-36 sm:top-20 md:top-4 pointer-events-none z-0"
      >
        <Image
          src="/images/me.png"
          alt="Freemancodz - Headshot"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </section>
  );
}
