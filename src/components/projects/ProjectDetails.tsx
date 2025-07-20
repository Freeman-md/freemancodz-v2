// components/projects/ProjectDetails.jsx
"use client";
import { useProjectStore } from "@/store/useProjectStore";
import { AnimatePresence, motion } from "framer-motion"; // Import AnimatePresence
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GithubIcon, XIcon } from "lucide-react"; // Import XIcon for close button

export default function ProjectDetails() {
  const { selectedProject, clearSelectedProject } = useProjectStore();

  const handleClose = () => {
    clearSelectedProject()
  };

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          key="project-details-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
          onClick={handleClose}
        >
          <motion.div
            layoutId={`project-card-${selectedProject.id}`} 
            className="relative bg-white dark:bg-zinc-800 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <motion.div
              layoutId={`project-image-${selectedProject.id}`}
              className="relative w-full h-auto aspect-video rounded-t-xl overflow-hidden"
            >
              <Image
                src={selectedProject.coverImage}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-t-xl"
                sizes="100vw"
                priority
              />
            </motion.div>

            <div className="p-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-3xl font-bold mb-4 text-primary"
              >
                {selectedProject.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-white/80 leading-relaxed mb-6"
              >
                {selectedProject.description}
              </motion.p>

              {selectedProject.tools && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">Tools Used:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tech, index) => (
                      <span key={index} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex items-center gap-6 pt-4 border-t border-gray-700 mt-6"
              >
                <Link
                  href={selectedProject.link}
                  target="_blank"
                  className="text-lg flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="h-5 w-5" /> Live Project
                </Link>

                {selectedProject.github && (
                  <Link
                    href={selectedProject.github}
                    target="_blank"
                    className="text-lg flex items-center gap-2 text-white/70 hover:text-white"
                  >
                    <GithubIcon className="h-5 w-5" /> GitHub
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}