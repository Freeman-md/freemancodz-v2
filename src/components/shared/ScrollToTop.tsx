"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.25 },
            scale: { duration: 0.25 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="fixed bottom-6 right-6 z-50"
          data-cursor="hover"
          data-cursor-label="Scroll To Top"
        >
          <button
            onClick={handleClick}
            aria-label="Scroll to top"
            className="rounded-full p-3 bg-background/70 backdrop-blur shadow-lg border border-primary/30 hover:bg-primary hover:text-background transition-colors text-primary"
            style={{ outline: "none" }}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
