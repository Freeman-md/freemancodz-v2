"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const y = useSpring(mouseY, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const handleHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("[data-cursor='hover']");
      setHovering(!!hoverable);
      setLabel(hoverable?.getAttribute("data-cursor-label") || null);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseout", handleHover);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseout", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      style={{ x, y }}
      className={`fixed top-0 left-0 z-[9999] min-w-10 min-h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${
        label ? "" : "mix-blend-difference"
      }`}
    >
      <motion.div
        animate={{
          scale: clicking ? 0.75 : hovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`min-w-10 min-h-10 px-2 max-w-24 max-h-24 aspect-square rounded-full border backdrop-blur-xl flex items-center justify-center text-[10px] font-medium uppercase tracking-wide transition-colors duration-300 ${
          hovering
            ? "bg-white border-white text-black"
            : "bg-primary/80 border-white/10 text-white"
        }`}
      >
        <span
          className={`transition-opacity duration-200 text-center break-words ${
            label ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function CursorWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check(); // initial
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop ? <CustomCursor /> : null;
}