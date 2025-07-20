import { motion } from "framer-motion";

type EmptyProps = {
  title?: string;
  message?: string;
};

export default function Empty({
  title = "Nothing here yet.",
  message = "Try resetting your filters or check back later.",
}: EmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center text-white/60"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm max-w-md">{message}</p>
    </motion.div>
  );
}
