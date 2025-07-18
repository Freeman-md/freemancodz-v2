"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView,
} from "motion/react";
import { wrap } from "@motionone/utils";
import { useRef } from "react";
import "@/app/tech-marquee.css";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap parallax -my-4">
      <motion.div
        className="scroller flex gap-x-10 text-4xl font-semibold"
        style={{ x }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-x-10">
            {children.split(" ").map((word, idx) => (
              <span
                key={idx}
                className="word text-primary/20 hover:text-primary transition-colors duration-300"
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackMarquee() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section id="tools" className="bg-secondary-light">
      <div ref={ref} className="py-5 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="uppercase text-base font-medium container mb-16"
        >
          Tools I Use To Build Magic
        </motion.h2>
        <ParallaxText baseVelocity={-2}>
          Next.js Tailwind Azure Supabase Git GitHub
        </ParallaxText>
        <ParallaxText baseVelocity={2}>
          TypeScript React Motion Node.js .NET Razor Vite
        </ParallaxText>
      </div>
    </section>
  );
}
