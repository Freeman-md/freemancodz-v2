"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MailIcon, MapPin, Send } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section id="contact" className=" relative bg-dot-pattern">
      <div
        ref={ref}
        className="container py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center md:text-left"
        >
          <h2 className="uppercase text-base font-medium text-primary tracking-wider">
            Let’s Connect
          </h2>

          <p className="text-4xl sm:text-5xl font-medium leading-tight tracking-tight">
            I’m open to new challenges, collabs, or just good conversations.
          </p>

          <div className="space-y-4 text-white/80 text-base">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <MailIcon size={20} className="text-primary" />
              <a
                href="mailto:freemanmadudili@gmail.com"
                className="hover:underline"
              >
                freemanmadudili@gmail.com
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <MapPin size={20} className="text-primary" />
              <span>London, United Kingdom</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            // handle form logic here
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="transition bg-background border border-white/20 rounded-lg px-4 py-3 text-sm w-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              placeholder="Your email"
              className="transition bg-background border border-white/20 rounded-lg px-4 py-3 text-sm w-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <textarea
            rows={5}
            placeholder="Your message"
            className="transition bg-background border border-white/20 rounded-lg px-4 py-3 text-sm w-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            required
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background text-sm font-medium rounded-full transition-all"
          >
            <Send size={18} />
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
