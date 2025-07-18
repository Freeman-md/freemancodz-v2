"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MailIcon } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section id="contact" className="bg-secondary/50">
      <div ref={ref} className="container py-32 space-y-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="uppercase text-base font-medium"
        >
          Let’s Connect
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-4xl sm:text-5xl font-medium leading-tight tracking-tight">
            Have a project in mind <br />
            or just want to say hello?
          </p>

          <motion.a
            href="mailto:freemanmadudili@gmail.com"
            className="inline-flex items-center gap-2 text-primary hover:underline text-lg font-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <MailIcon size={20} />
            freemanmadudili@gmail.com
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
