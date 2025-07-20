"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const rotatingTitles = [
  "self-taught developer",
  "creative technologist",
  "problem solver",
  "cloud-native builder",
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="bg-dot-pattern">
      <div
        ref={ref}
        className="container py-40 pb-20 space-y-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="uppercase text-base font-medium"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="space-y-6 text-4xl sm:text-6xl font-medium leading-tight tracking-tight"
        >
          <p>
            I’m a{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingTitles[currentIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-primary inline-block"
              >
                {rotatingTitles[currentIndex]}
              </motion.span>
            </AnimatePresence>{" "}
            building clean, creative, and real-world experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
