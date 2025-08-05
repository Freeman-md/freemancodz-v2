"use client";

import { useActionState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertCircleIcon, MailIcon, MapPin, Send } from "lucide-react";
import { submitContactMessage } from "@/lib/contact-messages/actions";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const [formState, formAction, isPending] = useActionState(
    submitContactMessage,
    {
      success: false,
      errors: {
        name: [],
        email: [],
        message: [],
        form: [],
      },
      values: {
        name: "",
        email: "",
        message: "",
      },
    }
  );

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
          action={formAction}
        >
          {formState.success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="success">
                <AlertCircleIcon />
                <AlertTitle>Your message has been sent!</AlertTitle>
                <AlertDescription>
                  I’ll get back to you as soon as I can. Thanks for reaching
                  out.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {"form" in formState.errors && formState.errors.form.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="error">
                <AlertCircleIcon />
                <AlertTitle>{formState.errors.form?.[0]}</AlertTitle>
              </Alert>
            </motion.div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Your name"
                className="transition bg-background border border-white/20 rounded-lg px-4 py-3 text-sm w-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                name="name"
              />
              {"name" in formState.errors &&
                formState.errors.name.length > 0 && (
                  <motion.small
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-red-500"
                  >
                    {formState.errors.name?.[0]}
                  </motion.small>
                )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Your email"
                className="transition bg-background border border-white/20 rounded-lg px-4 py-3 text-sm w-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                name="email"
              />
              {"email" in formState.errors &&
                formState.errors.email.length > 0 && (
                  <motion.small
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-red-500"
                  >
                    {formState.errors.email?.[0]}
                  </motion.small>
                )}
            </div>
          </div>

          <div>
            <textarea
              rows={5}
              placeholder="Your message"
              className="transition bg-background border border-white/20 rounded-lg px-4 py-3 text-sm w-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              name="message"
            />
            {"message" in formState.errors &&
              formState.errors.message.length > 0 && (
                <motion.small
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-red-500"
                >
                  {formState.errors.message?.[0]}
                </motion.small>
              )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background text-sm font-medium rounded-full transition-all"
          >
            <Send size={18} />
            {isPending ? "Sending" : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
