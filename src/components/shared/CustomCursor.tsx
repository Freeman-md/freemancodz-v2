"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[9999] w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-200 ease-out mix-blend-difference ${
        clicking ? "scale-75" : "scale-100"
      }`}
    >
      <div className="w-full h-full rounded-full bg-primary/80 backdrop-blur-xl border border-white/10" />
    </div>
  );
}
